var allTestFiles=[],TEST_REGEXP=/(spec|test)\.js$/i;Object.keys(window.__karma__.files).forEach(function(e){TEST_REGEXP.test(e)&&allTestFiles.push(e)}),require.config({baseUrl:"/base/scripts/lib",paths:{jquery:"//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery",jquerymobile:"//code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5",jscookie:"js.cookie",underscore:"//cdn.jsdelivr.net/lodash/3.10.0/lodash",backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone",parse:"parse-1.5.0",pretty:"prettyprint",moment:"moment",marionette:"backbone.marionette",app:"../app"},shim:{backbone:{deps:["underscore","jquery"],exports:"Backbone"},parse:{deps:["underscore","jquery"],exports:"Parse"}},deps:allTestFiles,callback:window.__karma__.start});