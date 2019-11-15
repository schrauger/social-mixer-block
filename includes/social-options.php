<?php
/**
 * Created by IntelliJ IDEA.
 * User: stephen
 * Date: 2019-08-09
 * Time: 1:28 PM
 */

class social_mixer_block_options {

	const page = 'social-mixer-options';
	const option_group = 'social-mixer-group';
	const option_name = 'social-mixer-options';
	const section_twitter = 'social-mixer-options-social-twitter';
	const section_instagram = 'social-mixer-options-social-instagram';


	private $options;

	function __construct() {
		if(is_admin()){
			add_action('admin_menu', array($this, 'add_theme_options_page'));
			add_action('admin_init', array($this, 'register_settings'));
		}
	}

	function add_theme_options_page(){
		add_options_page(
			"Social Mixer Settings",
			"Social Mixer Settings",
			"manage_options",
			self::option_name,
			array($this, 'settings_page')
		);
	}

	function settings_page(){
		$this->options = get_option(self::option_name);
		?>
		<div class="wrap">
			<h1>Social Mixer Settings</h1>
			<form method="post" action="options.php">
				<?php
				settings_fields(self::option_group);
				do_settings_sections(self::page);
				submit_button();
				?>
			</form>
		</div>
		<?php
	}

	function register_settings(){
		register_setting(
			self::option_group,
			self::option_name
		);

		add_settings_section(
			self::section_twitter,
			'Twitter Tokens',
			array($this, 'options_header'),
			self::page
		);

		add_settings_section(
			self::section_instagram,
			'Instagram Tokens',
			array($this, 'options_header'),
			self::page
		);

		add_settings_field(
			'twitter_oauth_access_token',
			'Twitter OAuth Access Token',
			array($this, 'option_text_input'),
			self::page,
			self::section_twitter,
			array(
				'label_for' => 'twitter_oauth_access_token'
			)
		);

		add_settings_field(
			'twitter_oauth_access_token_secret',
			'Twitter OAuth Access Token Secret',
			array($this, 'option_text_input'),
			self::page,
			self::section_twitter,
			array(
				'label_for' => 'twitter_oauth_access_token_secret'
			)
		);

		add_settings_field(
			'twitter_oauth_consumer_key',
			'Twitter OAuth Consumer Key',
			array($this, 'option_text_input'),
			self::page,
			self::section_twitter,
			array(
				'label_for' => 'twitter_oauth_consumer_key'
			)
		);

		add_settings_field(
			'twitter_oauth_consumer_secret',
			'Twitter OAuth Consumer Secret',
			array($this, 'option_text_input'),
			self::page,
			self::section_twitter,
			array(
				'label_for' => 'twitter_oauth_consumer_secret'
			)
		);

		add_settings_field(
			'instagram_user_id',
			'Instagram User ID',
			array($this, 'option_text_input'),
			self::page,
			self::section_instagram,
			array(
				'label_for' => 'instagram_user_id'
			)
		);

		// to regenerate the access_toke, go to https://outofthesandbox.com/pages/instagram-access-token
		// instagram is stupid hard to get set up. you have to use a redirect and accept connections from their endpoint
		// just to authorize a single user to get an access token. way too much work just to be able to use their
		// api to view a user's posts. so we use a 3rd party who already has this set up and get an access code from there.
		// The access_token *shouldn't* expire, but if it does, it must be generated again.
		add_settings_field(
			'instagram_access_token',
			'Instagram Access Token',
			array($this, 'option_text_input'),
			self::page,
			self::section_instagram,
			array(
				'label_for' => 'instagram_access_token'
			)
		);
	}

	function options_header(){
		print 'Enter your settings below:';
	}

	function option_text_input($args){
		$id = $args['label_for'];
		$data = get_option(self::option_name);
		$value = $data[$id];
		$value = esc_attr($value);
		$name = self::option_name . '[' . $id . ']';

		printf(
			'<input type="text" id="%s" name="%s" value="%s" />',
			$id, $name, $value
		);
	}
}

new social_mixer_block_options();