$(function(){

  function buildMessage(message){
    if ( message.image ) {
      var html = `<div class="message">
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
                  <img src=${message.image} >
                </div>`
      return html;
    } else {
      var html = `<div class="message">
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
  }
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
      var html = buildMessage(message);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({scrollTop: $('.main-chat__message-list')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
      $('input').prop('disabled', false);
    })
    
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })

  });
});