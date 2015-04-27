var list = $('<li><img src="" class="desc-content-img"><div class="desc-content-text"><h2></h2><div></div><a class="desc-content-more">详情>></a></div></li>');
var localData = null;
//get json
$.ajax({
  url: 'data.json',
  method: 'get',
  success: function(data) {
    localData = data;
    var html = null;
    var btn = null;
    // set html
    for(key in data) {
      for(var i = 0; i < data[key].length; i ++) {
        btn = list.find('.desc-content-more');
        list.find('.desc-content-img').attr('src', 'image/' + key + (i + 1) + '-1.png');
        list.find('.desc-content-text h2').html(data[key][i].title);
        list.find('.desc-content-text div').html(data[key][i].content.replace(/<[^>]+>/g,'').substr(0,80) + '...');
        btn.attr('key', key);
        btn.attr('index', i);
        $('#' + key + '-list').append(list.html());
      }
    }
    bind();
  }
});

var bind = function() {
  var key = null;
  var index = null;
  var el = null;
  var title = $('.modal-box-title');
  var content = $('.modal-box-content div');
  $('.desc-content-more').on('click', function(e) {
    el = $(e.target);
    key = el.attr('key');
    index = el.attr('index');
    title.html(localData[key][index].title);
    content.html(localData[key][index].content);
    $('.modal').show();
    $('.modal-box').animate({
      'marginTop': 100
    }, 500);
  });

  var hide = function() {
    $('.modal-box').animate({
      'marginTop': -999
    }, 500, function() {
      $('.modal').hide();
    });
  };

  $('.modal').on('click', function(e) {
    if(!$(e.target).hasClass('modal')) return;
    hide();
  });

  $('.modal-box-close').on('click', function() {
    hide();
  });
};

$('.desc-item li').on('click', function(e) {
  $('.desc-content').removeClass('focus');
  $('#' + e.target.id + '-list').addClass('focus');
  $('.desc-item li').removeClass('focus');
  $(e.target).addClass('focus');
});
