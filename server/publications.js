Meteor.publish('messages', function() {
  if (this.userId) {
    return Messages.find();
  } else {
    this.ready();
  }
});