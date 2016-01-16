'use strict';

function GameController(HeroChallenge, $scope) {

  $scope.correctAnswer = '';
  $scope.options = [];
  $scope.thumbnail = '';
  $scope.description = '';

  function start() {
    console.log('starting....');
    HeroChallenge.init()
      .then(function (challenge) {
        console.log('generating....');

        if (challenge.selectedCharacter.thumbnail.path.indexOf('image_not_available') > -1) {
          $scope.description = challenge.selectedCharacter.description.replace(challenge.selectedCharacter.name, '_____');
        } else {
          $scope.thumbnail = challenge.selectedCharacter.thumbnail.path
            + '.'
            + challenge.selectedCharacter.thumbnail.extension;
        }

        $scope.correctAnswer = challenge.selectedCharacter;
        $scope.challenge = challenge;
        $scope.options = _.shuffle(challenge.options);
      });
  }

  start();

  $scope.answer = function(id) {
    if (id == $scope.correctAnswer.id) {
      alert('Correct!');
    } else {
      alert('That was wrong! The answer is ' + $scope.correctAnswer.name);
    }

    $scope.correctAnswer = '';
    $scope.options = [];
    $scope.thumbnail = '';
    $scope.description = '';

    start();
  }
}