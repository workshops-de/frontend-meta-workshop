$(function () {
  // Form reference
  var $form = $('#form');

  // Form validation
  $form.on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($form[0].checkValidity() === false) {
      $form.addClass('was-validated');
    } else {
      $form.removeClass('was-validated');
    }
  });
});
