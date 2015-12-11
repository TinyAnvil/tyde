function shrink() {
  $('.message-list .message-item').each(function() {
    var $self = $(this);
    var width = $self.find('.date').width() + 15;

    if ($self.hasClass('left')) {
      $self.find('.message').attr('style', 
        'transform: translate('+ -width +'px,0);'+
        '-webkit-transform: translate('+ -width +'px,0);'+
        '-moz-transform: translate('+ width +'px,0);');
    } else if ($self.hasClass('right')) {
      $self.find('.message').attr('style', 
        'transform: translate('+ width +'px,0);'+
        '-webkit-transform: translate('+ width +'px,0);'+
        '-moz-transform: translate('+ width +'px,0);');
    }
  });
}

Template.home.rendered = function() {
  $('.message-form textarea').autosize();

  window.addEventListener('native.keyboardshow', keyboardShowHandler);
  window.addEventListener('native.keyboardhide', keyboardHideHandler);

  function keyboardShowHandler(e) {
    $('body').css('height', $('body').height() - e.keyboardHeight);
  }
  function keyboardHideHandler(e) {
    $('body').css('height', '100%');
  }

  Tracker.autorun(function() {
    Messages.find().fetch();
    shrink();
  });
}

Template.home.events({
  'submit .message-form': function(event) {
    var message = $('.text', event.target).val();

    if (message.length <= 0) return false;

    Messages.insert({
      message: message,
      sentBy: Meteor.userId(),
      sentAt: new Date
    }, function(error, id) {
      $('.text', event.target).val('');
    });

    event.preventDefault();
  }
});

Template.home.helpers({
  messages: function() {
    return Messages.find({}, {sort: {sentAt: 1}});
  },
  position: function(sentBy) {
    if (Meteor.userId() == sentBy) {
      return "right"
    } else {
      return "left"
    }
  }
});

UI.registerHelper('parseDate', function(context) {
  return moment(context).format('MMM DD hh:mm');
});