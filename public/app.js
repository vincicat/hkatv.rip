var myDataRef = new Firebase('https://atv-rip.firebaseio.com/messages');

var lastMessageQuery = myDataRef.endAt().limit(100)
lastMessageQuery.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
})

function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messages'));
  $('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;
}

$('#message').keypress(function (e) {
  if (e.keyCode == 13) {
    var name = $('#name').val()
    var text = $('#message').val()
    if (name.length > 0 && text.length > 0) {
      myDataRef.push({name: name, text: text})
      $('#messageInput').val('')
    }
  }
})
