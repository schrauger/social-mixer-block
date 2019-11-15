/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var registerBlockType = wp.blocks.registerBlockType; //Blocks API

var _wp$element = wp.element,
    createElement = _wp$element.createElement,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment; //React.createElement

var InspectorControls = wp.editor.InspectorControls; //Block inspector wrapper

var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    SelectControl = _wp$components.SelectControl,
    CheckboxControl = _wp$components.CheckboxControl,
    Button = _wp$components.Button,
    ServerSideRender = _wp$components.ServerSideRender,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    ToggleControl = _wp$components.ToggleControl,
    URLInputButton = _wp$components.URLInputButton; //Block inspector wrapper

var _wp$data = wp.data,
    registerStore = _wp$data.registerStore,
    withSelect = _wp$data.withSelect; // used to run json requests for wordpress data (blogs, taxonomies)

var __ = wp.i18n.__;
var _wp = wp,
    apiFetch = _wp.apiFetch;

// note: React components must start with a Capital letter


var social_mixer_block = function (_Component) {
    _inherits(social_mixer_block, _Component);

    _createClass(social_mixer_block, null, [{
        key: 'getInitialState',


        // state is used to save temporary data, like the list of sites or taxonomies.
        // we don't need that saved and retrieved from database fields.
        // for data we save in order to render, that gets set in the attributes.
        value: function getInitialState() {
            return {
                sources: []
            };
        }

        /**
         * Returns a list of all methods (functions) for a given object, and optionally only those methods whose name begins with a specific string
         * @param obj
         * @param prefix_filter Filter list of methods to only include those starting with this string
         * @returns {string[]} Array of methods from object
         */

    }, {
        key: 'getMethods',
        value: function getMethods(obj) {
            var prefix_filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            return Object.getOwnPropertyNames(obj).filter(function (item) {
                if (prefix_filter) {
                    return typeof obj[item] === 'function' && item.startsWith(prefix_filter);
                } else {
                    return typeof obj[item] === 'function';
                }
            });
        }
    }]);

    // Call super(props) and bind functions
    function social_mixer_block() {
        _classCallCheck(this, social_mixer_block);

        var _this = _possibleConstructorReturn(this, (social_mixer_block.__proto__ || Object.getPrototypeOf(social_mixer_block)).apply(this, arguments));

        _this.updateTwitter = function (twitter) {
            _this.props.setAttributes({ twitter: twitter });
        };

        _this.updateInstagram = function (instagram) {
            _this.props.setAttributes({ instagram: instagram });
        };

        _this.updateMaxPosts = function (max_posts) {
            max_posts = parseInt(max_posts);
            _this.props.setAttributes({ max_posts: max_posts });
        };

        _this.updateMaxExcerptLength = function (max_excerpt_length) {
            max_excerpt_length = parseInt(max_excerpt_length);
            _this.props.setAttributes({ max_excerpt_length: max_excerpt_length });
        };

        _this.updateHeight = function (max_height) {
            max_height = parseInt(max_height);
            _this.props.setAttributes({ max_height: max_height });
        };

        _this.update_text_only_mode = function (text_only_mode) {
            _this.props.setAttributes({ text_only_mode: text_only_mode });
        };

        return _this;
    }

    _createClass(social_mixer_block, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(this.props.attributes.sources);
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props);
            return [React.createElement(
                InspectorControls,
                { key: 'inspector' },
                React.createElement(
                    PanelBody,
                    {
                        title: 'Social Mixer Block Controls',
                        initialOpen: true
                    },
                    React.createElement(ToggleControl, {
                        label: 'Twitter',
                        checked: this.props.attributes.twitter,
                        onChange: this.updateTwitter
                    }),
                    React.createElement(ToggleControl, {
                        label: 'Instagram',
                        checked: this.props.attributes.instagram,
                        onChange: this.updateInstagram
                    }),
                    React.createElement(TextControl, {
                        type: 'number',
                        value: this.props.attributes.max_posts,
                        label: 'Max posts',
                        help: 'How many posts to show',
                        onChange: this.updateMaxPosts,
                        min: 0,
                        max: 100,
                        step: 1
                    }),
                    React.createElement(TextControl, {
                        type: 'number',
                        value: this.props.attributes.height,
                        label: 'Block max height (in pixels)',
                        onChange: this.updateHeight,
                        min: 0,
                        step: 10
                    }),
                    React.createElement(ToggleControl, {
                        label: this.props.attributes.text_only_mode ? 'Text-only mode (enabled)' : 'Text-only mode (disabled)',
                        checked: this.props.attributes.text_only_mode,
                        onChange: this.update_text_only_mode,
                        help: this.props.attributes.text_only_mode ? 'Hide images from output' : 'Show images in output'
                    })
                )
            ), React.createElement(
                'div',
                {
                    className: 'overlaypage',
                    onClickCapture: this.constructor.preventLink },
                React.createElement(ServerSideRender, {
                    block: 'schrauger/social-mixer-block',
                    attributes: this.props.attributes
                })
            )];
        }
    }], [{
        key: 'preventLink',


        /**
         * Prevents users from clicking away from editor by clicking on a link in the server rendered post list.
         * @param event
         */
        value: function preventLink(event) {
            if (event.nativeEvent) {
                event.nativeEvent.preventDefault();
                event.nativeEvent.stopPropagation();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }]);

    return social_mixer_block;
}(Component);

registerBlockType('schrauger/social-mixer-block', {
    title: __('Social Mixer Block', 'social-mixer-block-for-gutenberg'),
    description: __('Lists the most recent social posts, with the ability to pull in and sort from twitter and instagram.', 'social-mixer-block-for-gutenberg'),
    icon: 'format-aside',
    category: 'embed',
    attributes: {
        twitter: { type: 'boolean', default: true },
        instagram: { type: 'boolean', default: true },
        text_only_mode: { type: 'boolean', default: false },
        max_posts: { type: 'number', default: 5 },
        max_excerpt_length: { type: 'number', default: 55 },
        height: { type: 'number', default: 500 }
    },

    edit: social_mixer_block,

    save: function save(_ref) {
        var props = _ref.props,
            className = _ref.className;


        // this can simply return 'null', which tells wordpress to just save the input attributes.
        // however, by actually saving the html, this saves the html in the database as well, which means
        // that our plugin can be disabled and the old pages will still have iframe html. however, if an unprivileged
        // user edits that page, the iframe code will be stripped out upon saving.
        // due to the html filtering, this return is not strictly used, as the server-side render method overwrites
        // this when printing onto the page (but that allows us to print out raw html without filtering, regardless of user).
        return null;
    }
});

/***/ })
/******/ ]);