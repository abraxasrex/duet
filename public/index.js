var socket = io();


$('#submit-chat').click(function(event){
  event.preventDefault();
    var req = { chatId: '1234'};
    $.post('/api', req, function(data){
      console.log('posted', data.token);
    });
});
