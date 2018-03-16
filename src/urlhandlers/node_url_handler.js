import uri from 'url';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { DOMParser } from 'xmldom';

export class NodeURLHandler {
  get(url, options, cb) {
    url = uri.parse(url);
    const httpModule = url.protocol === 'https:' ? https : http;
    if (url.protocol === 'file:') {
      fs.readFile(url.pathname, 'utf8', function(err, data) {
        if (err) {
          return cb(err);
        }
        const xml = new DOMParser().parseFromString(data);
        cb(null, xml);
      });
    } else {
      let timing;
      let data = '';

      const timeout_wrapper = req => () => req.abort();

      const req = httpModule.get(url.href, function(res) {
        res.on('data', function(chunk) {
          let timing;
          data += chunk;
          clearTimeout(timing);
          timing = setTimeout(fn, options.timeout || 120000);
        });
        res.on('end', function() {
          clearTimeout(timing);
          const xml = new DOMParser().parseFromString(data);
          cb(null, xml);
        });
      });

      req.on('error', function(err) {
        clearTimeout(timing);
        cb(err);
      });

      var fn = timeout_wrapper(req);
      timing = setTimeout(fn, options.timeout || 120000);
    }
  }
}
