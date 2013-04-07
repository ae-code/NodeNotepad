var mongoose = require("mongoose");
var Note = mongoose.model("Note");

/**
   main listing page
*/
exports.index = function(req, res) {
  Note.find(function(err, notes, count) {
    if (err)
      next(err);

    res.render("index", { notes: notes });
  });
};

/**
   gets complete contents of all notes
*/
exports.get_all = function(req, res) {
  Note.find(function(err, notes, count) {
    if (err)
      res.json([]);

    res.json(notes);
  });
};

/**
   gets contents of note specified by the id param
*/
exports.get = function(req, res) {
  Note.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, function(err, notes, count) {
    if (err)
      res.json([]);

    res.json(notes);
  });
};

/**
   creates a new note
*/
exports.create = function(req, res) {
  var note = new Note({
    author: req.body.author,
    title: req.body.title,
    note: req.body.note,
    creation_date: Date.now(),
    update_date: Date.now()
  });

  note.save(function(err, n, count) {
    res.json(note);
  });
};

/**
   deletes note specified by id param
*/
exports.delete = function(req, res) {
  Note.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, function(err, note, count) {
    if (err || !note)
      next();

    note.remove();
  });
};

/**
   updates the title or body of note specified by id param
*/
exports.update = function(req, res) {
  var update = { update_date: Date.now() };
  if (req.body.title)
    update.title = req.body.title;
  if (req.body.note)
    update.note = req.body.note;

  Note.update({ _id: new mongoose.Types.ObjectId(req.params.id) },
	      update,
	      function(err) {
    if (err)
      res.json({});
    Note.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, function(err, notes, count) {
      res.json(notes);
    });
  });
};


