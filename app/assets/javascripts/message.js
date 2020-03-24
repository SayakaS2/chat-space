$(function(){
  
  function buildHTML(message){
    if ( message.image ) {
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message-info">
                      <div class="user-name">
                        ${message.user_name}
                      </div>
                      <div class="message-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src=${message.image} >
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message-info">
                      <div class="user-name">
                        ${message.user_name}
                      </div>
                      <div class="message-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    return html;
    };
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(message){
      var html = buildHTML(message);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({scrollTop: $('.main-chat__message-list')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
      $('input').prop('disabled', false);
    })
    
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('input').prop('disabled', false);
    })
  });
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function (messages) {
      console.log(messages)
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })

    .fail(function() {
      alert('error');
    });
  };
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});