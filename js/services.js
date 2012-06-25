'use strict';

/* Services */


//This Service provides game objects
var servicesModule = angular.module('myApp.services', ['ngResource']);


servicesModule.factory('youTube', function($resource){
  return $resource('https://gdata.youtube.com/feeds/api/:type/:item/:kind', {callback:'JSON_CALLBACK',alt:'jsonc',format:5,v:'2'}, {
    mostPopular: {method:'JSONP', params:{type:'standardfeeds',item:'most_popular','max-results':5},isArray:false},
    byUser: {method:'JSONP', params:{type:'users',item:'twit',kind:'uploads','max-results':1},isArray:false},
    mostSubscribed: {method:'JSONP', params:{type:'channelstandardfeeds',item:'most_subscribed',alt:'jsonc','max-results':5},isArray:false},
    videoById: {method:'JSONP', params:{type:'videos',item:'videoid'},isArray:false}
  });
});


https://gdata.youtube.com/feeds/api/users/username/uploads

servicesModule.factory('flickr', function($resource){
  return $resource('http://api.flickr.com/services/rest/', {jsoncallback:'JSON_CALLBACK',format:'json','api_key':'80e4c0e695d5c41286ac950db072e5e3'}, {
    interesting: {method:'JSONP', params:{method:'flickr.interestingness.getList','per_page':1,'page':1},isArray:false},
    panda: {method:'JSONP', params:{method:'flickr.panda.getPhotos','per_page':1,'page':1,'panda_name':'ling ling'},isArray:false},
  });
});


servicesModule.factory('twitter', function($resource){
  return $resource('http://search.twitter.com/search.json', {callback:'JSON_CALLBACK','result_type':'popular','include_entities':true}, {
    search: {method:'JSONP', params:{q:'apple',rpp:1,page:1},isArray:false},
  });
});


servicesModule.factory('Storage', function() {
  
    var newServiceInstance = {};
    //factory function body that constructs newServiceInstance
    
    newServiceInstance.loadObject = function(key) {

        // variable to hold date found in local storage
        var data = [];

        // retrieve json data from local storage for key
        var json_object = localStorage[key];

        // if data was found in local storage convert to object
        if (json_object) {
          data = JSON.parse(json_object);
          return data;
        } else {
          return false;
        }
    };

    newServiceInstance.clear = function() {

      localStorage.clear();
      
    };
    
    newServiceInstance.saveObject = function(objectToSave,key) {

        // Save object to local storage under key
        localStorage[key] = JSON.stringify(objectToSave);

    };

    newServiceInstance.supported = function() {

      return 'localStorage' in window && window['localStorage'] !== null;
      
    };
    
    return newServiceInstance;

});