const {registerBlockType} = wp.blocks; //Blocks API
const {createElement, Component, Fragment} = wp.element; //React.createElement
const {InspectorControls} = wp.editor; //Block inspector wrapper
const {
    TextControl,
    SelectControl,
    CheckboxControl,
    Button,
    ServerSideRender,
    PanelBody,
    PanelRow,
    ToggleControl,
    URLInputButton
} = wp.components; //Block inspector wrapper
const {registerStore, withSelect,} = wp.data; // used to run json requests for wordpress data (blogs, taxonomies)
const {__} = wp.i18n;
const {apiFetch} = wp;




// note: React components must start with a Capital letter


class social_mixer_block extends Component {

    // state is used to save temporary data, like the list of sites or taxonomies.
    // we don't need that saved and retrieved from database fields.
    // for data we save in order to render, that gets set in the attributes.
    static getInitialState() {
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
    static getMethods(obj, prefix_filter = '') {
        return Object.getOwnPropertyNames(obj).filter((item) => {
            if (prefix_filter) {
                return ((typeof obj[ item ] === 'function') && (item.startsWith(prefix_filter)));

            } else {
                return (typeof obj[ item ] === 'function');
            }
        })
    };

    // Call super(props) and bind functions
    constructor() {
        super(...arguments);
    }


    componentDidMount() {
        console.log(this.props.attributes.sources);

    }

    updateTwitter = (twitter) => {
        this.props.setAttributes({twitter});
    };

    updateInstagram = (instagram) => {
        this.props.setAttributes({instagram});
    };


    updateMaxPosts = (max_posts) => {
        max_posts = parseInt(max_posts);
        this.props.setAttributes({max_posts});
    };

    updateMaxExcerptLength = (max_excerpt_length) => {
        max_excerpt_length = parseInt(max_excerpt_length);
        this.props.setAttributes({max_excerpt_length});
    };

    update_text_only_mode = (text_only_mode) => {
        this.props.setAttributes({text_only_mode});
    };



    /**
     * Prevents users from clicking away from editor by clicking on a link in the server rendered post list.
     * @param event
     */
    static preventLink(event) {
        if (event.nativeEvent) {
            event.nativeEvent.preventDefault();
            event.nativeEvent.stopPropagation();
        }
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        console.log(this.props);
        return [

            <InspectorControls key='inspector' >
                <PanelBody
                    title={'Social Mixer Block Controls'}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={'Twitter'}
                        checked={this.props.attributes.twitter}
                        onChange={this.updateTwitter}
                    />
                    <ToggleControl
                        label={'Instagram'}
                        checked={this.props.attributes.instagram}
                        onChange={this.updateInstagram}
                    />
                    <TextControl
                        type={'number'}
                        value={this.props.attributes.max_posts}
                        label={'How many posts to show'}
                        onChange={this.updateMaxPosts}
                        min={0}
                        max={100}
                        step={1}
                    />

                </PanelBody >


            </InspectorControls >

            ,
            <div
                className="overlaypage"
                onClickCapture={this.constructor.preventLink} >
                <ServerSideRender
                    block='schrauger/social-mixer-block'
                    attributes={this.props.attributes}
                />
            </div >

        ];

    }


}


registerBlockType(
    'schrauger/social-mixer-block', {
        title: __('Social Mixer Block', 'social-mixer-block-for-gutenberg'),
        description: __('Lists the most recent social posts, with the ability to pull in and sort from twitter and instagram.', 'social-mixer-block-for-gutenberg'),
        icon: 'format-aside',
        category: 'embed',
        attributes: {
            twitter: {type: 'boolean', default: true},
            instagram: {type: 'boolean', default: true},
            text_only_mode: {type: 'boolean', default: false},
            max_posts: {type: 'number', default: 5},
            max_excerpt_length: {type: 'number', default: 55},
        },

        edit: social_mixer_block,

        save({props, className}) {

            // this can simply return 'null', which tells wordpress to just save the input attributes.
            // however, by actually saving the html, this saves the html in the database as well, which means
            // that our plugin can be disabled and the old pages will still have iframe html. however, if an unprivileged
            // user edits that page, the iframe code will be stripped out upon saving.
            // due to the html filtering, this return is not strictly used, as the server-side render method overwrites
            // this when printing onto the page (but that allows us to print out raw html without filtering, regardless of user).
            return null;
        }

    });
