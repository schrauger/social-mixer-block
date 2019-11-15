<?php

/**
 * Created by PhpStorm.
 * User: stephen
 * Date: 2017-12-18
 * Time: 12:59 PM
 */
class instagram_feed implements social_mixer_feed {

	public function __construct( $post ) {

	}

	/**
	 * @param int $count  Number of posts to return. Defaults to 20.
	 * @param     $min_id The Media ID of the oldest media you have. The API will return up to $count of *older* posts
	 *                    than the one listed here.
	 *
	 * @return array Array of media objects.
	 */
	public static function fetch_posts( $count = 20, $min_id = null ) {
		$data = get_option( 'social-mixer-options' );

		$user_id      = esc_attr( $data[ 'instagram_user_id' ] );
		$access_token = esc_attr( $data[ 'instagram_access_token' ] );

		$userid_url    = "https://api.instagram.com/v1/users/$user_id/media/recent/?access_token=$access_token&count=$count";

		$json_posts    = file_get_contents( $userid_url );
		$posts         = json_decode( $json_posts, true )[ 'data' ];
		$instagram_feed = array();

		foreach ( $posts as $post ) {
			$instagram_feed[] = new instagram_feed_post( $post );

		}

		return $instagram_feed;

	}

}

class instagram_feed_post implements social_mixer_post {
	private $date; // the timestamp of the post
	private $post_object; // contains the entire post in object format

	function __construct( $post = null ) {
		$this->post_object = $post;
		$this->date        = $post[ 'created_time' ];
	}

	public function get_item() {
		return $this->post_object;
	}

	public function get_date() {
		return $this->date;
	}

	function get_date_formatted() {
		date_default_timezone_set( 'EST' );

		return date( "F j, Y", $this->date );
	}

	function print_date() {
		echo $this->get_date_formatted();
	}

	public function print_post_html() {
		echo $this->post_html();
	}

	public function post_html() {
		$return_html = '';

		$return_html .= "
			<div class='grid-item grid-item--width2 white-box image instagram-post' data-instagram-id='{$this->post_object['id']}'>
				<img src='{$this->post_object['images']['standard_resolution']['url']}' />
				<span class='caption'>{$this->post_object['caption']['text']}</span>
			</div>
		";

		return $return_html;
	}
}