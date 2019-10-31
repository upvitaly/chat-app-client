export const supportedMacros = [
  'CONTENTPLAYHEAD', // @deprecated VAST 4.1
  'ADPLAYHEAD',
  'MEDIAPLAYHEAD',
  'ADPLAYHEAD',
  'ASSETURI',
  'PODSEQUENCE',
  'UNIVERSALADID',
  'CONTENTURI',
  'CONTENTID',
  'VERIFICATIONVENDORS',
  'EXTENSIONS',
  'DEVICEIP',
  'SERVERSIDE',
  'CLIENTUA',
  'SERVERUA',
  'DEVICEUA',
  'TRANSACTIONID',
  'ADCOUNT',
  'BREAKPOSITION',
  'PLACEMENTTYPE',
  'IFA',
  'IFATYPE',
  'LATLONG',
  'DOMAIN',
  'PAGEURL',
  'APPBUNDLE',
  'VASTVERSIONS',
  'APIFRAMEWORKS',
  'MEDIAMIME',
  'PLAYERCAPABILITIES',
  'CLICKTYPE',
  'PLAYERSTATE',
  'INVENTORYSTATE',
  'CLICKPOS',
  'PLAYERSIZE',
  'LIMITADTRACKING',
  'REGULATIONS',
  'GDPRCONSENT',
  // <BlockedAdCategories> element is not parsed for now so the vastTracker
  // can't replace the macro with element value automatically.
  // The player need to pass it inside "macro" parameter when calling trackers
  'BLOCKEDADCATEGORIES',
  'ADCATEGORIES', // <Category> element is also not parsed for now. Same instructions as above
  'ADTYPE', //adType attribute of <Ad> element is not parsed for now. Same instructions as above
  'ADSERVINGID' // <AdServingId> element is also not parsed for now. Same instructions as above
];
