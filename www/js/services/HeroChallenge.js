'use strict';

function HeroChallenge(MarvelApi, $q) {
  var challenge = {};
  var limit = 100;

  function init() {
    challenge = {
      selectedCharacter: '',
      options: []
    };

    var defer = $q.defer();

    getAnswer()
      .then(function() {
        for(var i = 0; i < 3; i++) {
          generateOptions()
            .then(function() {
              defer.resolve(challenge);
            });
        }
      });

    return defer.promise;
  }

  function generateOptions() {
    var defer = $q.defer();

    MarvelApi.getRandomCharacters(limit)
      .then(function(characters) {
        function selectCharacter() {
          var character = _.sample(characters);
          if(!_.some(challenge.options, {id: character.id})) {
            challenge.options.push(character);
            if (challenge.options.length == 4) {
              defer.resolve();
            }
          } else {
            _.remove(characters, {id: character.id});
            selectCharacter();
          }
        }

        selectCharacter();
      });

    return defer.promise;
  }

  function getAnswer() {
    var defer = $q.defer();

    MarvelApi.getRandomCharacters(limit)
      .then(function(characters) {

        function selectCharacter() {

          if (characters.length < 1) {
            getAnswer();
            return;
          }

          var character = _.sample(characters);
          var thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension;

          if (character.description == '' && thumbnail.indexOf('image_not_available') > -1
          ) {
            _.remove(characters, {
              id: character.id
            });
            selectCharacter();
          } else {
            challenge.selectedCharacter = character;
            challenge.options.push(character);

            defer.resolve();
          }
        }

        selectCharacter();

      });

    return defer.promise;
  }

  this.init = init;
  return this;

}