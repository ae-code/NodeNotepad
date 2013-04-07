var hbs = require('hbs');

// register all custom helpers
var hbs_helpers = require('./public/js/handlebars_helpers');

hbs.registerHelper('prettyDateTime', hbs_helpers.prettyDateTime);
hbs.registerHelper('fullDateTime', hbs_helpers.fullDateTime);

// return original rendering engine
exports.__express = hbs.__express;
