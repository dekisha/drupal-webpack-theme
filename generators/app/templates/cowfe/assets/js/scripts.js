(function($) {
  'use strict';

  Drupal.behaviors.sampleDrupal8 = {
    attach: function (context, settings) {

      $('body', context).once('sampleDrupal8').each(function() {
        alert("It 's working remove sample from file in: assets/js/scripts.js");
      });
    }
  };

})(jQuery);