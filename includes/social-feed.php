<?php
/**
 * Created by PhpStorm.
 * User: stephen
 * Date: 2018-01-12
 * Time: 11:49 AM
 */

interface social_mixer_feed {

    /**
     * Returns an array of posts.
     * @param int  $count // Max number of posts to return. May return fewer, if fewer exist.
     * @param null $older_than // Optional id or date of the oldest post already retrieved. Used for getting ranges.
     *
     * @return array An array of socialfeedpost objects.
     */
    public static function fetch_posts($count, $older_than);

}

interface social_mixer_post {

    /**
     * socialfeedpost constructor. Allows you to pass in the json-decoded object.
     *
     * @param null $post_object The object after json decoding.
     */
    public function __construct($post_object = null);

    /**
     * Echo out the post data
     */
    public function print_post_html();

    public function post_html();

    /**
     * Return the date and time of the post.
     * @return int Date and time in linux epoch format
     */
    public function get_date();

    /**
     * Return the post data in object form
     * @return stdClass
     */
    public function get_item();

}