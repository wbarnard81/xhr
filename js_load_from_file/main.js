$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'clockings.csv',
    dataType: 'text',
    success: function(data) {
      processData(data);
    },
  });
});

var textline = document.querySelector('.text');

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);

  allTextLines.forEach(function(element) {
    var textnode = `<li>${element}</li>`;
    console.log(textnode);
    textline.innerHTML = 'test';
  });
}

var test = '<li>Salt</li>';

function myFunction(test) {
  var node = document.createElement('LI');
  var textnode = document.createTextNode('Water');
  node.appendChild(test);
  document.getElementById('myList').appendChild(node);
}
