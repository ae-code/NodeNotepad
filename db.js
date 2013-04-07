var mongoose = require("mongoose");
var _ = require("underscore")._;

// Basic Note Structure
var Note = new mongoose.Schema({
  author: String,
  creation_date: Date,
  update_date: Date,
  title: String,
  note: String
});
mongoose.model("Note", Note);

// initiate connection to database
function connect(options) {
  var defaultOptions = {
    host: "localhost"
  };

  options = _.defaults(options || {}, defaultOptions);

  mongoose.connect("mongodb://"+options.host+"/notepad");
}

exports.connect = connect;
