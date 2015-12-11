Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {return Meteor.subscribe("messages");}
});

Router.route('/', {name: 'home'});