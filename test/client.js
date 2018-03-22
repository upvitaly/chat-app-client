import path from 'path';
import should from 'should';
import sinon from 'sinon';
import { VASTClient } from '../src/client';

describe('VASTClient', () => {
  const urlfor = relpath =>
    `file://${path
      .resolve(path.dirname(module.filename), 'vastfiles', relpath)
      .replace(/\\/g, '/')}`;
  const wrapperUrl = urlfor('wrapper-a.xml');

  describe('when cappingFreeLunch is set to 1', () => {
    const vastClient = new VASTClient(1);

    describe('the 1st call', () => {
      it('should be ignored', done => {
        vastClient.get(wrapperUrl, (err, response) => {
          should.equal(
            err.message,
            'VAST call canceled – FreeLunch capping not reached yet 1/1'
          );
          should.equal(response, null);
          done();
        });
      });

      it('totalCalls should be equal to 1', () => {
        vastClient.totalCalls.should.eql(1);
      });
    });

    describe('the 2nd call', () => {
      it('should be successfull', done => {
        vastClient.get(wrapperUrl, (err, response) => {
          should.notEqual(response, null);
          done();
        });
      });

      it('totalCalls should be equal to 2', () => {
        vastClient.totalCalls.should.eql(2);
      });
    });
  });

  describe('when cappingMinimumTimeInterval is set to 30 seconds', () => {
    const vastClient = new VASTClient(0, 30000);

    describe('the 1st call', () => {
      it('should be successfull', done => {
        vastClient.get(wrapperUrl, (err, response) => {
          vastClient.lastSuccessfullAd = +new Date();
          should.notEqual(response, null);
          done();
        });
      });

      it('totalCalls should be equal to 3', () => {
        vastClient.totalCalls.should.eql(3);
      });
    });

    describe('the 2nd call (executed before 30 seconds)', () => {
      it('should be ignored', done => {
        vastClient.get(wrapperUrl, (err, response) => {
          should.equal(
            err.message,
            'VAST call canceled – (30000)ms minimum interval reached'
          );
          should.equal(response, null);
          done();
        });
      });

      it('totalCalls should be equal to 4', () => {
        vastClient.totalCalls.should.eql(4);
      });
    });
  });

  describe('get', () => {
    const vastClient = new VASTClient();

    it('should merge options when called with options parameter', () => {
      const options = {
        withCredentials: true
      };
      const mergedOptions = {
        withCredentials: true,
        timeout: 0
      };
      vastClient.vastParser.parse = sinon.spy();

      vastClient.get(wrapperUrl, options, (err, response) => {
        vastClient.vastParser.parse.should.be.alwaysCalledWith(
          wrapperUrl,
          mergedOptions
        );
        done();
      });
    });

    it('should throw an error if no callback is provided', () => {
      should(() => vastClient.get(wrapperUrl)).throw(
        new Error(
          'VASTClient get method called without valid callback function'
        )
      );
      should(() => vastClient.get(wrapperUrl, {})).throw(
        new Error(
          'VASTClient get method called without valid callback function'
        )
      );
    });
  });
});
