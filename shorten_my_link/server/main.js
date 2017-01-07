import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

// executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
  // Take the token out of the url and try to find a
  // matching link in the Links collection
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    // if we find a link object, redirect the user to the
    // long url
    Links.update(link, { $inc: { clicks: 1 }});
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    // If we don't find the link object, send the user
    // to our normal React app
    next();
  }
  
}

// localhost:3000/ NO MATCH
// localhost:3000/books/harry_potter NO MATCH
// localhost:3000/abcd MATCH!!! -- just 1 slash and something after

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
