Template.layout.rendered = function() {
  if (Meteor.isCordova) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    StatusBar.hide();
  }
}