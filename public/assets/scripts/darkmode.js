document.addEventListener('DOMContentLoaded', function() {

const checkbox = document.getElementById('toggleMode');

checkbox.checked = localStorage.getItem('lightMode') === 'true';

checkbox.addEventListener('change', function (event) {
  localStorage.setItem('lightMode', event.currentTarget.checked);
});

});