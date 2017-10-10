(function($) {
  'use strict';

  Drupal.behaviors.sampleDrupal8 = {
    attach: function (context, settings) {

      $('body', context).once('sampleDrupal8').each(function() {
        alert("If it's working please remove sample from file in: assets/js/scripts.js");
      });
    }
  };

})(jQuery);