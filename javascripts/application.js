$('#showtime').click(function(event){
  event.preventDefault();

  $('#header nav a').first().trigger('click');
});

$('ul.tabs a').on('click.tab', function(event){
  var $this           = $(this),
      $container      = $(this.hash);

  event.preventDefault();

  if ($this.data('group')) {
    if ($container.is(':hidden')) {
      $('.' + $this.data('group')).hide();
      $('ul.tabs a[data-group=' + $this.data('group') + ']').removeClass('active');
    
      $this.addClass('active');
      $container.show();
    }
  } else {
    $this.addClass('active');
    $container.show();
  }
});


$('form.subscribe').submit(function(event){
  if (typeof sendsay_check_form === 'function') {
    return sendsay_check_form(this);
  }
});


(function(){
  var busy          = false,
      $window       = $(window),
      $nav          = $('#header nav a'),
      $navigatable  = $('section.navigatable');

  $nav.each(function(){
    var $this = $(this);

    if (this.hash == window.location.hash) {
      $this.addClass('active');
    }

    $this.click(function(event){
      var $container  = $(this.hash),
          top         = $container.offset().top - 60;

      busy = true;

      if ($container.length) {
        event.preventDefault();

        $nav.removeClass('active');
        $this.addClass('active');

        if (window.history.pushState) {
          window.history.pushState(null, null, this.hash);
        }

        $('html, body').animate({ scrollTop: top }, 'fast', function(){
          setTimeout(function(){
            busy = false;
          }, 100);
        });
      }
    });
  });

  $window.scroll(function(){
    if (!busy) {
      var current,
          scrollTop    = $window.scrollTop(),
          screenHeight = $window.height();

      $navigatable.each(function(){
        var $this = $(this);

        if (scrollTop + screenHeight / 2 > $this.offset().top) {
          current = $this;
        }
      });

      if (current) {
        $nav.removeClass('active');
        $nav.filter('a[href=#' + current.attr('id') + ']').addClass('active');
      }
    }
  });
})();
