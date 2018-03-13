/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const VASTUtil = require('../util.js');

class ParserUtils {
    constructor() {
        this.vastUtil = new VASTUtil();
    }

    childByName(node, name) {
        for (let child of Array.from(node.childNodes)) {
            if (child.nodeName === name) {
                return child;
            }
        }
    }

    childrenByName(node, name) {
        const children = [];
        for (let child of Array.from(node.childNodes)) {
            if (child.nodeName === name) {
                children.push(child);
            }
        }
        return children;
    }

    parseBoolean(booleanString) {
        return ['true', 'TRUE', '1'].includes(booleanString);
    }

    // Parsing node text for legacy support
    parseNodeText(node) {
        return node && (node.textContent || node.text || '').trim();
    }

    copyNodeAttribute(attributeName, nodeSource, nodeDestination) {
        const attributeValue = nodeSource.getAttribute(attributeName);
        if (attributeValue) {
            return nodeDestination.setAttribute(attributeName, attributeValue);
        }
    }

    parseDuration(durationString) {
        if (durationString == null) {
            return -1;
        }
        // Some VAST doesn't have an HH:MM:SS duration format but instead jus the number of seconds
        if (this.vastUtil.isNumeric(durationString)) {
            return parseInt(durationString);
        }

        const durationComponents = durationString.split(":");
        if (durationComponents.length !== 3) {
            return -1;
        }

        const secondsAndMS = durationComponents[2].split(".");
        let seconds = parseInt(secondsAndMS[0]);
        if (secondsAndMS.length === 2) {
            seconds += parseFloat(`0.${secondsAndMS[1]}`);
        }

        const minutes = parseInt(durationComponents[1] * 60);
        const hours = parseInt(durationComponents[0] * 60 * 60);

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || (minutes > (60 * 60)) || (seconds > 60)) {
            return -1;
        }
        return hours + minutes + seconds;
    }
}

module.exports = ParserUtils;
