<?php
/*
Plugin Name: Social Mixer Block
Plugin URI: https://github.com/schrauger/social-mixer-block
Description: WordPress Block for embedding Twitter, Instagram, Facebook, and other social media posts.
Version: 1.0
Author: Stephen Schrauger
Author URI: https://github.com/schrauger/social-mixer-block
License: GPL2
*/
require_once( 'includes/social-feed.php' );
require_once( 'includes/instagram-feed.php' );
require_once( 'includes/twitter-feed.php' );
require_once( 'includes/social-options.php' );

class social_mixer_block {

	/**
	 * register the react script for a block, and also define
	 * the server side render callback to allow for raw html.
	 */
	public static function load_social_mixer_block() {

		wp_enqueue_style(
			'social-mixer-block-plugin-style',
			plugins_url( 'css/social-mixer-block.css', __FILE__ ), // this will load the current theme's style.css file, not necessarily the parent theme style.
			false,
			filemtime( plugin_dir_path( __FILE__ ) . 'css/social-mixer-block.css' ),
			false
		);

		wp_register_script(
			'social-mixer-block-js',
			plugins_url( 'js/social-mixer-block.build.js', __FILE__ ),
			[ 'wp-blocks', 'wp-editor', 'wp-data', 'wp-element', 'wp-i18n', 'wp-components' ],
			filemtime( plugin_dir_path( __FILE__ ) . 'js/social-mixer-block.build.js' )
		);

		register_block_type(
			'schrauger/social-mixer-block',
			[
				'editor_script'   => 'social-mixer-block-js',
				'render_callback' => [ 'social_mixer_block', 'render_social_mixer_callback' ],
				// attributes must be defined here as well as on the client-side js file
				'attributes'      => self::block_atts(),
			]
		);
	}

	/**
	 * Apply defaults to specified attributes if attribute is not defined by the user.
	 *
	 * @return array
	 */
	public static function block_atts() {

		return [
			'twitter'            => [
				'type'    => 'boolean',
				'default' => true
			],
			'instagram'          => [
				'type'    => 'boolean',
				'default' => true
			],
			'text_only_mode'     => [
				'type'    => 'boolean',
				'default' => false
				// when true, add a class to inhibit pictures
			],
			'max_posts'          => [
				'type'    => 'integer',
				'default' => 5
			],
			'max_excerpt_length' => [
				'type'    => 'integer',
				'default' => 55
			],
			'limit_height'       => [
				'type'    => 'boolean',
				'default' => true
			],
			'div_height'         => [
				'type'    => 'integer',
				'default' => 700
			],
			'className'          => [
				// this is the attribute created if the user chooses 'additional css class' for the block
				'type'    => 'string',
				'default' => ''
			]
		];
	}


	/**
	 * Overwrites the client side 'save' method with our own data. This allows us to print out raw html without
	 * filtering it based on user permissions, so we can embed an iframe.
	 *
	 * @param $attributes // input elements from the client
	 * @param $content    // post-filtered html from the client-side 'save' method. we don't use it here, instead we
	 *                    create our own html.
	 *
	 * @return string // like shortcode callbacks, this is the html that we render in place of the block.
	 */
	public static function render_social_mixer_callback( $attributes, $content ) {

		$return_rendered_html = "";

		// if text-only, set a class that css will use to hide images.
		$classes   = [ 'social', 'grid', 'container' ];
		$text_only = false;
		if ( ( $attributes[ 'text_only_mode' ] === true ) || ( $attributes[ 'text_only_mode' ] === 'true' ) ) {
			$classes[] = 'text-only';
			$text_only = true;
		} else {
			$classes[] = 'images';
		}
		// adds support for 'additional css class' in the advanced section of any block
		if ( $attributes[ 'className' ] ) {
			$classes[] = $attributes[ 'className' ];
		}

		$style_html = '';
		if ( ( $attributes[ 'limit_height' ] === true ) || ( $attributes[ 'limit_height' ] === 'true' ) ) {
			$style_html = "style='height: {$attributes['div_height']}px !important;'";
		}

		$classes_string       = implode( ' ', $classes );
		$return_rendered_html .= "<div class='social-parent' $style_html><section class='{$classes_string}' $style_html>";

		// loop through all our sources and build an array with all the posts
		$social_mixer_posts = [];
		if ( ( $attributes[ 'twitter' ] === true ) || ( $attributes[ 'twitter' ] === 'true' ) ) {
			$source_posts       = self::twitter_query( $attributes );
			$social_mixer_posts = array_merge( $social_mixer_posts, $source_posts );
		}

		if ( ( $attributes[ 'instagram' ] === true ) || ( $attributes[ 'instagram' ] === 'true' ) ) {
			$source_posts       = self::instagram_query( $attributes );
			$social_mixer_posts = array_merge( $social_mixer_posts, $source_posts );
		}
		// sort all the posts by date
		$social_mixer_posts = self::sort_posts( $social_mixer_posts );
		// trim down our array based on the max number we want to display

		$social_mixer_posts = array_slice( $social_mixer_posts, 0, $attributes[ 'max_posts' ] );
		// finally, print out all the posts
		$i = 0;
		foreach ( $social_mixer_posts as $post ) {
			$i ++;
			/* @var $post social_mixer_post */
			$return_rendered_html .= $post->post_html();
		}

		$return_rendered_html .= "</section>";

		// add a fade-out to a limit height, rather than a sharp cutoff
		if ( ( $attributes[ 'limit_height' ] === true ) || ( $attributes[ 'limit_height' ] === 'true' ) ) {
			$return_rendered_html .= "<div class='overlay-white-fade'>&nbsp;</div>";
		}

		$return_rendered_html .= "</div>";

		return $return_rendered_html;

	}

	public static function twitter_query( $attributes ) {
		$twitter_posts = get_transient( "social-mixer-block-twitter-posts-{$attributes['max_posts']}" );
		if ( ! $twitter_posts ) {
			$twitter_posts = twitter_feed::fetch_posts( $attributes[ 'max_posts' ] );
			set_transient( "social-mixer-block-twitter-posts{$attributes['max_posts']}", $twitter_posts, WP_FS__TIME_10_MIN_IN_SEC );
		}

		return $twitter_posts;

	}

	public static function instagram_query( $attributes ) {
		$instagram_posts = null;
		//		$instagram_posts = get_transient("social-mixer-block-instagram-posts-{$attributes['max_posts']}");
		if ( ! $instagram_posts ) {
			$instagram_posts = instagram_feed::fetch_posts( $attributes[ 'max_posts' ] );
			//			set_transient("social-mixer-block-instagram-posts{$attributes['max_posts']}", $instagram_posts, WP_FS__TIME_10_MIN_IN_SEC);
		}

		return $instagram_posts;
	}

	/**
	 * Takes all instagram and twitter posts (and any other types) and sorts them by date into one large array.
	 * The newest post is first.
	 *
	 * @param $array_of_all_posts socialfeedpost[] An array containing every post. You should use array_merge on all
	 *                            your feeds.
	 *
	 * @return socialfeedpost[]
	 */
	public static function sort_posts( $array_of_all_posts ) {
		usort( $array_of_all_posts, "social_mixer_block::cmp" );

		return $array_of_all_posts;
	}

	/**
	 * @param $a socialfeedpost
	 * @param $b socialfeedpost
	 *
	 * @return int
	 */
	public static function cmp( $a, $b ) {
		if ( $a->get_date() == $b->get_date() ) {
			return 0;
		}

		return ( $a->get_date() < $b->get_date() ) ? 1 : - 1;
	}
}

// have to use init hook, since there is server-side rendering
add_action( 'init', [ 'social_mixer_block', 'load_social_mixer_block' ] );



