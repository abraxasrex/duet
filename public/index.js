var socket = io();

socket.on('blahblah', function(msg){
  //socket.emit('inst', inst);
});

$('#submit-chat').click(function(event){
  event.preventDefault();
    var req = { chatId: '1234'};
    $.post('/api', req, function(token){
      console.log('posted', token);
    });
});
