export class CompanionAd {
  constructor(creativeAttributes = {}) {
    this.id = creativeAttributes.id || null;
    this.width = creativeAttributes.width || 0;
    this.height = creativeAttributes.height || 0;
    this.assetWidth = creativeAttributes.assetWidth || null;
    this.assetHeight = creativeAttributes.assetHeight || null;
    this.expandedWidth = creativeAttributes.expandedWidth || null;
    this.expandedHeight = creativeAttributes.expandedHeight || null;
    this.apiFramework = creativeAttributes.apiFramework || null;
    this.adSlotID = creativeAttributes.adSlotID || null;
    this.creativeType = null;
    this.staticResource = null;
    this.htmlResource = null;
    this.iframeResource = null;
    this.adParameters = null;
    this.xmlEncoded = null;
    this.altText = null;
    this.companionClickThroughURLTemplate = null;
    this.companionClickTrackingURLTemplates = [];
    this.trackingEvents = {};
  }
}
