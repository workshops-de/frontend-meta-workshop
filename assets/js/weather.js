$(function () {
  // Form reference
  var $form = $('#form');

  var $cards = {
    initial: $('#initial'),
    loading: $('#loading'),
    widget: $('#widget')
  };

  // Functions
  function loadWidgetData() {
    $cards.loading.show();
    setTimeout(function() {
      $cards.loading.hide();
      $cards.widget.fadeIn();
    }, 2000);
  }

  // Form validation
  $form.on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($form[0].checkValidity() === false) {
      $form.addClass('was-validated');
    } else {
      $form.removeClass('was-validated');
      $cards.initial.hide();
      loadWidgetData();
    }
  });

  $cards.loading.hide();
  $cards.widget.hide();
});
