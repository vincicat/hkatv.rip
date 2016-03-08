$(function(){

  var myDataRef = new Firebase('https://atv-rip.firebaseio.com/messages');

  var pendingMessages = [];

  var lineHeight = 28 * 1.2; //in px

  var cacheSize = 5;

  var lastMessageQuery = myDataRef.limitToLast(100);
  lastMessageQuery.on('child_added', function(snapshot) {
    var message = snapshot.val();
    pendingMessages.push(message.text);
  });

  console.log(pendingMessages)
  var $container = $('#messages');

  var maxLine;
  var lineDispatched = 0;
  var mainThread;

  $(window).on('resize orientationchange', initScreen);

  initScreen();

  mainThread = setInterval(function () {
    for (var j = 0; j < cacheSize; j++) {

      var message = pendingMessages.shift();
      if (message) {
        // console.log(500*j,"in:", message)
        delayedChat(message, 1800*j)
      } else {
        delayedChat("~~~亞視永恆~~~", 2000)
        window.clearInterval(mainThread);
        console.log("Admin:","多謝收看")
        break;
      }

    }
  }, 2000);

  function delayedChat(text, delay){
    var chat = text;
    // console.log(delay, "out", chat)
    setTimeout(function(){
      displayChatMessage(chat);
    }, delay)
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function initScreen(){
    $container.html('');
    maxLine = setCapacity();
    var el = '';
    console.log('lane set: ', maxLine)
    for (var i = 0; i <= maxLine; i++) {
      el += '<div class="lane lane-'+i+'"></div>';
    }
    $container.append(el)
  }

  function setCapacity(){
    var bodyHeight = $container.height(); //
    lineDispatched = 0;
    // Do some math...will update on every resize
    return Math.floor( bodyHeight / (lineHeight) );

  }

  function displayChatMessage(text) {
    var move = getRandomInt(1,5);
    var style = {
      'animationDuration': getRandomInt(10, 20)+'s'
      // 'animationDelay': (getRandomInt(0,3) + (move - 1))+'s'
    }

    var $line = $('<p>', {'class':'marquee line'}).css(style);
    $line.text(text)
    $('.lane-'+lineDispatched).append($line);
    // var move = getRandomInt(1, maxLine - lineDispatched);
    lineDispatched += move;

    if(lineDispatched >= maxLine) {
      lineDispatched = 0; //start over

    }
  }

  $container.on('animationend', '.line', function(){
    var $el = $(this)
    $el.hide()
    setTimeout(function(){
      $el.remove();
    }, 3200);
  } )


  // Form
  $('#name')
    .val(localStorage.getItem('name'))
    .on('input propertychange paste', function (e) {
      localStorage.setItem('name', $(this).val());
    });


  $('#message').on('keydown', function (e) {
    if (e.keyCode == 13) {
      var name = $('#name').val();
      var text = $('#message').val();
      if (name.length > 0 && text.length > 0) {
        myDataRef.push({ name: name, text: text });
        $('#message').val('');
      }
    }
  });
});
