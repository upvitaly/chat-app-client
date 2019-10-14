export const inlineTrackers = `
<VAST version="2.1">
  <Ad id="ad_id_0001" sequence="1">
    <InLine>
      <AdSystem version="2.0"><![CDATA[AdServer]]></AdSystem>
      <AdTitle><![CDATA[Ad title]]></AdTitle>
      <Advertiser id='advertiser-desc'><![CDATA[Advertiser name]]></Advertiser>
      <Description><![CDATA[Description text]]></Description>
      <Pricing model="CPM" currency="USD"><![CDATA[1.09]]></Pricing>
      <Survey><![CDATA[http://example.com/survey]]></Survey>
      <Error><![CDATA[http://example.com/error_[ERRORCODE]]]></Error>
      <Impression id="sample-impression1"><![CDATA[http://example.com/impression1_asset:[ASSETURI]_[CACHEBUSTING]]]></Impression>
      <Impression id="sample-impression2"><![CDATA[http://example.com/impression2_[random]]]></Impression>
      <Impression id="sample-impression3"><![CDATA[http://example.com/impression3_[RANDOM]]]></Impression>
      <AdVerifications>
        <Verification vendor="company.com-omid">
          <JavaScriptResource apiFramework="omid" browserOptional="true">
            <![CDATA[http://example.com/omid1]]>
          </JavaScriptResource>
        </Verification>
        <Verification vendor="company2.com-omid">
          <JavaScriptResource apiFramework="omid" browserOptional="false">
            <![CDATA[http://example.com/omid2]]>
          </JavaScriptResource>
          <VerificationParameters>
            <![CDATA[test-verification-parameter]]>
          </VerificationParameters>
        </Verification>
      </AdVerifications>
      <Creatives>
        <Creative id="id130984" adId="adId345690" sequence="1">
          <Linear>
            <Duration>00:01:30.123</Duration>
            <TrackingEvents>
              <Tracking event="midpoint"><![CDATA[http://example.com/linear-midpoint]]></Tracking>
              <Tracking event="complete"><![CDATA[http://example.com/linear-complete]]></Tracking>
              <Tracking event="start"><![CDATA[http://example.com/linear-start]]></Tracking>
              <Tracking event="firstQuartile"><![CDATA[http://example.com/linear-firstQuartile]]></Tracking>
              <Tracking event="close"><![CDATA[http://example.com/linear-close]]></Tracking>
              <Tracking event="thirdQuartile"><![CDATA[http://example.com/linear-thirdQuartile]]></Tracking>
              <Tracking event="progress" offset="00:00:30.000"><![CDATA[http://example.com/linear-progress-30sec]]></Tracking>
              <Tracking event="progress" offset="60%"><![CDATA[http://example.com/linear-progress-60%]]></Tracking>
              <Tracking event="otherAdInteraction"><![CDATA[http://example.com/linear-otherAdInteraction]]></Tracking>
              <Tracking event="acceptInvitation"><![CDATA[http://example.com/linear-acceptInvitation]]></Tracking>
              <Tracking event="adExpand"><![CDATA[http://example.com/linear-adExpand]]></Tracking>
              <Tracking event="adCollapse"><![CDATA[http://example.com/linear-adCollapse]]></Tracking>
              <Tracking event="minimize"><![CDATA[http://example.com/linear-minimize]]></Tracking>
              <Tracking event="overlayViewDuration"><![CDATA[http://example.com/linear-overlayViewDuration]]></Tracking>
              <Tracking event="notUsed"><![CDATA[http://example.com/linear-notUsed]]></Tracking>
            </TrackingEvents>
            <VideoClicks>
              <ClickTracking id='video-click-1'><![CDATA[http://example.com/linear-clicktracking1_ts:[TIMESTAMP]]]></ClickTracking>
              <ClickTracking id='video-click-2'><![CDATA[http://example.com/linear-clicktracking2]]></ClickTracking>
              <ClickThrough id='click-through'><![CDATA[http://example.com/linear-clickthrough]]></ClickThrough>
              <CustomClick id='custom-click-1'><![CDATA[http://example.com/linear-customclick]]></CustomClick>
            </VideoClicks>
            <MediaFiles>
              <MediaFile delivery="progressive" type="video/mp4" bitrate="849" width="512" height="288" scalable="true"><![CDATA[http://example.com/linear-asset.mp4]]></MediaFile>
              <MediaFile apiFramework="VPAID" type="application/javascript" width="512" height="288" delivery="progressive"><![CDATA[parser.js?adData=http%3A%2F%2Fad.com%2F%3Fcb%3D%5Btime%5D]]></MediaFile>
              <Mezzanine id="mezzanine-id-165468451" type="video/mp4" width="1080" height="720" delivery="progressive" codec="h264" fileSize="700"><![CDATA[http://example.com/linear-mezzanine.mp4]]></Mezzanine>
            </MediaFiles>
            <Icons>
              <Icon program="ad1" width="60" height="20" xPosition="left" yPosition="bottom" duration="00:01:30.000" offset="00:00:15.000" apiFramework="VPAID" pxratio="2">
                <StaticResource creativeType="image/gif"><![CDATA[http://example.com/linear-icon.gif]]></StaticResource>
                <IconViewTracking><![CDATA[http://example.com/linear-viewtracking]]></IconViewTracking>
                <IconClicks>
                  <IconClickThrough><![CDATA[http://example.com/linear-clickthrough]]></IconClickThrough>
                  <IconClickTracking id='icon-click-1'><![CDATA[http://example.com/linear-clicktracking1]]></IconClickTracking>
                  <IconClickTracking id='icon-click-2'><![CDATA[http://example.com/linear-clicktracking2]]></IconClickTracking>
                </IconClicks>
              </Icon>
            </Icons>
          </Linear>
        </Creative>
      </Creatives>
      <Extensions>
        <Extension type="Pricing">
          <Price model="CPM" currency="USD" source="someone">
            <![CDATA[ 0 ]]>
          </Price>
        </Extension>
        <Extension type="Count">
          <!-- -->
          <![CDATA[ 4 ]]>
        </Extension>
        <Extension>
            { foo: bar }
        </Extension>
      </Extensions>
    </InLine>
  </Ad>
</VAST>
`;
