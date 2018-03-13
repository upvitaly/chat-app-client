/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const XHRURLHandler = require('./urlhandlers/xmlhttprequest.coffee');
const FlashURLHandler = require('./urlhandlers/flash.coffee');
const NodeURLHandler = require('./urlhandlers/node.coffee');

class URLHandler {
    constructor() {
        this.flash = new FlashURLHandler();
        this.node = new NodeURLHandler();
        this.xhr = new XHRURLHandler();
    }

    get(url, options, cb) {
        // Allow skip of the options param
        if (!cb) {
            if (typeof options === 'function') { cb = options; }
            options = {};
        }

        if (options.response != null) {
            // Trick: the VAST response XML document is passed as an option
            const { response } = options;
            delete options.response;
            return cb(null, response);
        } else if (options.urlhandler != null ? options.urlhandler.supported() : undefined) {
            // explicitly supply your own URLHandler object
            return options.urlhandler.get(url, options, cb);
        } else if ((typeof window === 'undefined' || window === null)) {
            // prevents browserify from including this file
            return this.node.get(url, options, cb);
        } else if (this.xhr.supported()) {
            return this.xhr.get(url, options, cb);
        } else if (this.flash.supported()) {
            return this.flash.get(url, options, cb);
        } else {
            return cb(new Error('Current context is not supported by any of the default URLHandlers. Please provide a custom URLHandler'));
        }
    }
}

module.exports = URLHandler;
