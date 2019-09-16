import { CompanionAd } from '../companion_ad';
import { CreativeCompanion } from '../creative/creative_companion';
import { parserUtils } from './parser_utils';

/**
 * This module provides methods to parse a VAST CompanionAd Element.
 */

/**
 * Parses a CompanionAd.
 * @param  {Object} creativeElement - The VAST CompanionAd element to parse.
 * @param  {Object} creativeAttributes - The attributes of the CompanionAd (optional).
 * @return {CreativeCompanion}
 */
export function parseCreativeCompanion(creativeElement, creativeAttributes) {
  const creative = new CreativeCompanion(creativeAttributes);
  creative.required = creativeElement.getAttribute('required') || null;

  creative.variations = parserUtils
    .childrenByName(creativeElement, 'Companion')
    .map(companionResource => {
      const companionAd = new CompanionAd(
        parserUtils.parseAttributes(companionResource)
      );

      companionAd.htmlResources = parserUtils
        .childrenByName(companionResource, 'HTMLResource')
        .reduce((urls, resource) => {
          const url = parserUtils.parseNodeText(resource);
          return url ? urls.concat(url) : urls;
        }, []);

      companionAd.iframeResources = parserUtils
        .childrenByName(companionResource, 'IFrameResource')
        .reduce((urls, resource) => {
          const url = parserUtils.parseNodeText(resource);
          return url ? urls.concat(url) : urls;
        }, []);

      companionAd.staticResources = parserUtils
        .childrenByName(companionResource, 'StaticResource')
        .reduce((urls, resource) => {
          const url = parserUtils.parseNodeText(resource);
          return url
            ? urls.concat({
                url,
                creativeType: resource.getAttribute('creativeType') || null
              })
            : urls;
        }, []);

      companionAd.altText =
        parserUtils.parseNodeText(
          parserUtils.childByName(companionResource, 'AltText')
        ) || null;

      const trackingEventsElement = parserUtils.childByName(
        companionResource,
        'TrackingEvents'
      );
      if (trackingEventsElement) {
        parserUtils
          .childrenByName(trackingEventsElement, 'Tracking')
          .forEach(trackingElement => {
            const eventName = trackingElement.getAttribute('event');
            const trackingURLTemplate = parserUtils.parseNodeText(
              trackingElement
            );
            if (eventName && trackingURLTemplate) {
              if (!Array.isArray(companionAd.trackingEvents[eventName])) {
                companionAd.trackingEvents[eventName] = [];
              }
              companionAd.trackingEvents[eventName].push(trackingURLTemplate);
            }
          });
      }

      companionAd.companionClickTrackingURLTemplates = parserUtils
        .childrenByName(companionResource, 'CompanionClickTracking')
        .map(clickTrackingElement =>
          parserUtils.parseNodeText(clickTrackingElement)
        );

      companionAd.companionClickThroughURLTemplate =
        parserUtils.parseNodeText(
          parserUtils.childByName(companionResource, 'CompanionClickThrough')
        ) || null;

      const adParametersElement = parserUtils.childByName(
        companionResource,
        'AdParameters'
      );
      if (adParametersElement) {
        companionAd.adParameters = parserUtils.parseNodeText(
          adParametersElement
        );
        companionAd.xmlEncoded =
          adParametersElement.getAttribute('xmlEncoded') || null;
      }

      return companionAd;
    });

  return creative;
}
