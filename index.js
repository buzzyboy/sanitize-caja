var html_sanitize = require('./sanitizer-bundle.js');

/**
 * @param inputHtml
 * @param {Array<string>} [allowedTags] - Array of allows element tag names
 * @param {Array<string>} [allowedAttributes] - Array of allows element attributes
 * @returns {string}
 */
module.exports = function(inputHtml, allowedTags, allowedAttributes) {
    if (!inputHtml) return '';
    if (!allowedTags) allowedTags = [];
    if (!allowedAttributes) allowedAttributes = [];
    return html_sanitize(inputHtml, cleanUrl, cleanId, null, allowedTags, allowedAttributes);
};

// https://bugzilla.mozilla.org/show_bug.cgi?id=255107
function cleanUrl(url) {
    'use strict';
    if (/^https?/.test(url.getScheme())) return url.toString();
    if (/^mailto?/.test(url.getScheme())) return url.toString();
    if ('data' == url.getScheme() && /^image/.test(url.getPath())) {
        return url.toString();
    }
}

function cleanId(id) {
    return id;
}
