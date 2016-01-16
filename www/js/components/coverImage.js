'use strict';

function coverImage(MarvelApi) {

  function link(scope, element) {
    var limit = 20;

    function changeCoverImage() {
      MarvelApi.getRandomComics(limit)
        .then(function(comics) {
          var comic = _.sample(comics);
          var thumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;

          if(thumbnail.indexOf('image_not_available') > -1) {
            changeCoverImage();
          } else {
            element.css('background', 'url(' + thumbnail + ') no-repeat center center fixed')
              .css('background-size', 'cover');
          }

        });
    }

    changeCoverImage();
  }

  var directive = {
    link: link,
    restrict: 'A',
    replace: true
  };

  return directive;

}