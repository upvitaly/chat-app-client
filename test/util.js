/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require('should');
const sinon  = require('sinon');
const VASTUtil = require('../src/util');

const now      = new Date();
const playhead = '00:12:30.212';
const assetURI = 'http://example.com/linear-asset.mp4?foo=1&bar=_-\[{bar';
const util = new VASTUtil();

const resolve = (URLTemplate, variables) => util.resolveURLTemplates([URLTemplate], variables)[0];

const encodeRFC3986 = str => util.encodeURIComponentRFC3986(str);

const encodedAssetURI  = encodeRFC3986(assetURI);
const encodedPlayhead  = encodeRFC3986(playhead);
const encodedTimestamp = encodeRFC3986(now.toISOString());

describe('VASTUtil', function() {
    before(() => {
        this.sinon = sinon.sandbox.create();
        this.sinon.stub(Math, 'random').returns(0.0012);
        return this.clock = sinon.useFakeTimers(now.getTime());
    });

    after(() => {
        this.clock.restore();
        return this.sinon.restore();
    });

    describe('#resolveURLTemplates', function() {

        describe('assetURI', function() {
            it('should resolve assetURI', () => resolve("http://test.com/?url=[ASSETURI]", { "ASSETURI" : assetURI }).should.match(`http://test.com/?url=${encodedAssetURI}`));

            return it('should resolve assetURI, with percents', () => resolve("http://test.com/?url=%%ASSETURI%%", { "ASSETURI" : assetURI }).should.match(`http://test.com/?url=${encodedAssetURI}`));
        });

        describe('cacheBusting', function() {
            it('should resolve cache busting', () => resolve("http://test.com/[CACHEBUSTING]").should.match(/^http:\/\/test.com\/00120000$/));

            return it('should resolve cache buster, with percents', () => resolve("http://test.com/%%CACHEBUSTING%%", {CACHEBUSTING: 178}).should.match(/^http:\/\/test.com\/00120000$/));
        });

        describe('contentPlayhead', function() {
            it('should resolve playhead', () => resolve("http://test.com/[CONTENTPLAYHEAD]", {CONTENTPLAYHEAD: playhead}).should.equal(`http://test.com/${encodedPlayhead}`));

            return it('should resolve playhead, with percents', () => resolve("http://test.com/%%CONTENTPLAYHEAD%%", {CONTENTPLAYHEAD: playhead}).should.equal(`http://test.com/${encodedPlayhead}`));
        });

        describe('timestamp', function() {
            it('should resolve timestamp', () => resolve("http://test.com/[TIMESTAMP]").should.equal(`http://test.com/${encodedTimestamp}`));

            return it('should resolve timestamp, with percents', () => resolve("http://test.com/%%TIMESTAMP%%", {TIMESTAMP: 12345678}).should.equal(`http://test.com/${encodedTimestamp}`));
        });

        describe('random/RANDOM', function() {
            it('should resolve random', () => resolve("http://test.com/[random]").should.match(/^http:\/\/test.com\/[0-9]+$/));

            return it('should resolve cache buster, with percents', () => resolve("http://test.com/%%RANDOM%%").should.match(/^http:\/\/test.com\/[0-9]+$/));
        });

        it('should resolve weird cases', () => resolve("http://test.com/%%CONTENTPLAYHEAD%%&[CONTENTPLAYHEAD]", {CONTENTPLAYHEAD: 120}).should.equal("http://test.com/120&120"));

        return it('should handle undefined', () => should(resolve(undefined)).equal(undefined));
    });

    return describe('#merge', function() {
        it('should merge 2 objects', function() {
            const foo = { a: 1, b: 1 };
            const bar = { b: 2, c: 3 };
            return util.merge(foo, bar).should.eql({ a: 1, b: 2, c: 3 });
    });

        return it('should merge 3 objects', function() {
            const foo = { a: 1, b: 1 };
            const bar = { b: 2, c: 3 };
            const lol = { b: 7, d: 4 };
            return util.merge(foo, bar, lol).should.eql({ a: 1, b: 7, c: 3, d: 4 });
    });
});
});
