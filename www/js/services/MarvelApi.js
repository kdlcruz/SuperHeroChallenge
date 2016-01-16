'use strict';

function MarvelApi($http, $q) {

  var publicKey = 'fdb1ded317ec9b2c994b451c547c054e';
  var privateKey = '28094ac8efa32166807e87e7bba031cdcf294aa2';

  // action ['characters', 'comics']
  function apiRequest(action, data) {
    var defer = $q.defer();
    var ts = new Date().getTime();
    var params = {
      apikey: publicKey,
      ts: ts,
      hash: MD5(ts + privateKey + publicKey)
    };

    for (var key in data) {
      // skip loop if the property is from prototype
      if (!data.hasOwnProperty(key)) {
        continue;
      }
      params[key] = data[key]
    }

    $http({
      method: 'get',
      url: 'http://gateway.marvel.com:80/v1/public/' + action,
      params: params
    })
      .then(function (response) {
        //console.log('API success: ', response);
        defer.resolve(response);
      }, function (response) {
        //console.log('API error: ', response);
        defer.reject(response);
      });

    return defer.promise;
  }

  function getRandomString() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    return _.sample(chars) || getRandomString();
  }

  /**
   *
   * @param limit
   * @returns {*}
   */
  function getRandomComics(limit) {
    var defer = $q.defer();
    var data = {
      titleStartsWith: getRandomString(),
      limit: limit
    };

    apiRequest('comics', data)
      .then(function(res) {
        var results = res.data.data.results;
        if (results.length < 1) {
          getRandomComics(limit).then(function(res) {
            defer.resolve(res);
          });
        } else {
          defer.resolve(results);
        }
      }, function(err) {
        getRandomComics(limit).then(function(res) {
          defer.resolve(res);
        });
      });

    return defer.promise;
  }

  function getRandomCharacters(limit) {
    var defer = $q.defer();
    var data = {
      nameStartsWith: getRandomString(),
      limit: limit
    };

    apiRequest('characters', data)
      .then(function(res) {
        var results = res.data.data.results;
        if (results.length < 1) {
          getRandomCharacters(limit).then(function(res) {
            defer.resolve(res);
          });
        } else {
          defer.resolve(results);
        }
      }, function(err) {
        getRandomCharacters(limit).then(function(res) {
          defer.resolve(res);
        });
      });

    return defer.promise;
  }

  this.getRandomComics = getRandomComics;
  this.getRandomCharacters = getRandomCharacters;

  return this;

}