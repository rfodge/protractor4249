'use strict';

exports.config = {

  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [
    {
      'browserName': 'chrome'
    }
  ],

  specs: [
    '*.js'
  ],

  allScriptsTimeout: 60000,

  maxSessions: 1,

  params: {
    route: 'http://localhost:8000/index.html#!/view1',
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 300000,
    showColors:             true,
    showTiming:             true,
    includeStackTrace:      true,
    isVerbose:              true,
    realtimeFailure:        true,
    print: function() {
    }
  },

  framework: 'jasmine2',

  //rootElement: 'body',

  onPrepare: function() {
    var jasmineReporters = require( 'jasmine-reporters' );
    jasmine.getEnv().addReporter( new jasmineReporters.JUnitXmlReporter( {
      consolidateAll: true,
      savePath:       'testresults',
      filePrefix:     'xmloutput'
    } ) );

    var SpecReporter = require( 'jasmine-spec-reporter' ).SpecReporter;
    jasmine.getEnv().addReporter( new SpecReporter( {
      displayStacktrace:      true,
      displayFailuresSummary: true,
      displayPendingSummary:  true,
      displaySuccessfulSpec:  true,
      displayFailedSpec:      true,
      displayPendingSpec:     true,
      displaySpecDuration:    false,
      displaySuiteNumber:     false,
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      customProcessors: []
    } ) );

    var HttpBackend = require( 'http-backend-proxy' );
    global.httpBackend = new HttpBackend( browser );
    httpBackend.onLoad.whenGET(/\.html$/).passThrough();

    browser.get( browser.params.route );

    httpBackend.whenGET('http://pappu687.github.io/angular-weather-widget/#/').respond( function() {
      return [200, {"city":{"id":5206379,"name":"Pittsburgh","coord":{"lon":-79.9959,"lat":40.4406},"country":"US","population":0},"cod":"200","message":0.8319735,"cnt":7,"list":[{"dt":1493917200,"temp":{"day":15.24,"min":12.85,"max":17.51,"night":12.85,"eve":15.63,"morn":15.24},"pressure":987.03,"humidity":54,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":3.95,"deg":141,"clouds":88,"rain":0.77},{"dt":1494003600,"temp":{"day":20.8,"min":12.04,"max":20.8,"night":12.04,"eve":14.71,"morn":15.25},"pressure":967.24,"humidity":68,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":2.51,"deg":174,"clouds":92,"rain":10.53},{"dt":1494090000,"temp":{"day":8.36,"min":4.07,"max":8.36,"night":4.07,"eve":5.37,"morn":7.38},"pressure":968.88,"humidity":84,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":3.91,"deg":266,"clouds":88,"rain":2.84},{"dt":1494176400,"temp":{"day":4.75,"min":2.56,"max":4.75,"night":2.56,"eve":4.02,"morn":4.61},"pressure":972.82,"humidity":0,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":3.62,"deg":286,"clouds":88,"rain":4.66,"snow":0.01},{"dt":1494262800,"temp":{"day":5.88,"min":1.21,"max":5.88,"night":1.21,"eve":4.89,"morn":2.66},"pressure":980.85,"humidity":0,"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"speed":3.02,"deg":311,"clouds":53,"rain":3.29,"snow":0.23},{"dt":1494349200,"temp":{"day":11.06,"min":1.91,"max":11.06,"night":6.81,"eve":10.94,"morn":1.91},"pressure":985.71,"humidity":0,"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"speed":1.64,"deg":317,"clouds":58,"rain":1.2,"snow":0.03},{"dt":1494435600,"temp":{"day":16.54,"min":7.95,"max":16.54,"night":8.48,"eve":14.44,"morn":7.95},"pressure":981.29,"humidity":0,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":1.36,"deg":88,"clouds":17}]}];
    } );

    $('#weather').click();
    browser.pause();

    return;
  }
};
