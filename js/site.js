$(function() {
  var $nav = $('.main-nav');
  var $toggle = $('[data-tools="navigation-toggle"]');
  var $panel = $('#navbar-1');

  function navOffset() {
    return $nav.outerHeight() || 0;
  }

  function isPanelOpen() {
    return $panel.length > 0 && $panel[0].style.display !== 'none';
  }

  function closePanel() {
    if (isPanelOpen()) {
      $toggle.find('span').first().click();
    }
  }

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        closePanel();
        $('html,body').animate({
          scrollTop: Math.max(0, target.offset().top - navOffset())
        }, 1000);
        return false;
      }
    }
  });

  // Mobile navigation: keep aria-expanded in sync and support keyboard use
  if ($toggle.length) {
    var $label = $toggle.find('span').first();

    function syncExpanded() {
      $label.attr('aria-expanded', isPanelOpen() ? 'true' : 'false');
    }

    $label.on('click', function() {
      window.setTimeout(syncExpanded, 0);
    });

    $label.on('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        $label.trigger('click');
      }
    });

    $(window).on('resize', syncExpanded);
    syncExpanded();
  }
});