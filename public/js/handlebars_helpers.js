/**
   Formats a date/time, such that for dates other than today
   just the date is returned, while for today just the time
   is returned.
*/
function PrettyDateTime(d) {
  var dd = new Date(d);
  var now = new Date();
  if ((now.getDate() == dd.getDate()) &&
      (now.getMonth() == dd.getMonth()) &&
      (now.getFullYear() == dd.getFullYear())) {
    return String(dd.getHours()) + ":" + (dd.getMinutes() < 10 ? "0" : "") + String(dd.getMinutes());
  }
  else {
    return String(dd.getMonth()+1) + "/" + String(dd.getDate()) + "/" + String(dd.getFullYear());
  }
}

/**
   Formats full date/time a little more cleanly
*/
function FullDateTime(d) {
  var dd = new Date(d);
  return String(dd.getMonth()+1) + "/" + String(dd.getDate()) + "/" + String(dd.getFullYear()) + " " + String(dd.getHours()) + ":" + (dd.getMinutes() < 10 ? "0" : "") + String(dd.getMinutes());
}

/*
  Register helpers
*/

if (typeof exports !== 'undefined') {
  exports.prettyDateTime = PrettyDateTime;
  exports.fullDateTime = FullDateTime;
}

if (typeof Handlebars !== 'undefined') {
  Handlebars.registerHelper('prettyDateTime', PrettyDateTime);
  Handlebars.registerHelper('fullDateTime', FullDateTime);
}

