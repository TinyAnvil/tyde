Messages.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc) {
    return userId === doc.userId;
  },
  'remove': function(userId, doc) {
    return false;
  }
});