/**
   Constructor for the NotepadApp application
*/
function NotepadApp(options) {
  // set up dialog for new notes
  this.newDialog = $(options.newNoteDialog);
  this.newDialog.find(".new_note_create").click($.proxy(this.DoActualAddNote, this));

  // main table
  this.notesTable = $(options.notesTable);
  this.itemTemplate = options.itemTemplate;
  this.fullNoteTemplate = options.fullNoteTemplate;
  this.notesTable.delegate("tr.notes_row", "click", $.proxy(this.DoNoteClick, this));
  this.notesTable.delegate("div.note_remove", "click", $.proxy(this.DoNoteRemove, this));
  this.notesTable.delegate(".note_edit", "click", $.proxy(this.DoNoteUpdate, this));

  // table sorting
  this.notesTable.find(".tsort").click($.proxy(this.DoTableSort, this));
  this.sortIndex = -1;
  this.sortDirection = 1;
}

/**
   Launches dialog for adding new notes
*/
NotepadApp.prototype.DoAddNote = function() {
  this.newDialog.modal();
};

/**
   Handler for create button from new
   note dialog.  Does actual adding of
   the new note
*/
NotepadApp.prototype.DoActualAddNote = function() {
  // temporary note object
  var newnote = { 
    author: this.newDialog.find(".author").val(), 
    title: this.newDialog.find(".title").val(), 
    note: this.newDialog.find(".note_text").val() 
  };
  
  // create temporary ID
  var temp_id = "new" + String(Math.floor(Math.random()*10000));

  // make save request
  var that = this;
  $.post("/create", newnote, function(data) {
    // replace placeholders with actual saved object
    that.notesTable.find("[row_id='"+temp_id+"']").replaceWith(that.itemTemplate({ notes: [ data ] }));
  });

  // fill in other necessary items with placeholders
  newnote.creation_date = "New";
  newnote.update_date = "New";
  newnote._id = temp_id;

  this.notesTable.find("tbody").append(this.itemTemplate({ notes: [ newnote ] }));
  this.newDialog.modal("hide");
};

/**
   Handler for clicking on column headers for sorting
   the main table rows
*/
NotepadApp.prototype.DoTableSort = function(evt) {
  // get the column to sort on
  var index = $(evt.target).parents("tr").children().index(evt.target)+1;
  if ((index <= 1) || (index > 5))
    return;

  // setup book keeping
  if (index == this.sortIndex)
    this.sortDirection = this.sortDirection * -1;
  else {
    this.sortIndex = index;
    this.sortDirection = 1;
  }

  this.CollapseAll();

  // pull out data to sort on
  var rows = this.notesTable.find("tbody tr");
  rows.remove();

  var rows_array = [];
  for (var i = 0; i < rows.length; ++i) {
    var sortval = $(rows.get(i)).find("td:nth-child("+index+")").text();
    rows_array.push({ sortval: sortval, element: rows.get(i) });
  }

  // actual sort
  var sortdir = this.sortDirection;
  rows_array.sort(function(a,b) {
    if (a.sortval > b.sortval)
      return 1 * sortdir;
    else if (a.sortval < b.sortval)
      return -1 * sortdir;
    else
      return 0;
  });

  // restore rows
  var table = this.notesTable.find("tbody");
  for (var i = 0; i < rows_array.length; ++i) {
    table.append(rows_array[i].element);
  }
};

/**
   Handler for clicking on a note in the main table,
   which displays entire notes content
*/
NotepadApp.prototype.DoNoteClick = function(evt) {
  var row = $(evt.currentTarget);

  if (row.hasClass("note_expanded")) {
    // already expanded, collapse

    row.removeClass("note_expanded");

    var icon = row.find("td:first-child").children();
    icon.removeClass("icon-chevron-down");
    icon.addClass("icon-chevron-right");

    // remove full note row
    var s = row.next();
    if (!s.hasClass("notes_row"))
      s.remove();
  }
  else {
    // already collapsed, expand

    row.addClass("note_expanded");

    var icon = row.find("td:first-child").children();
    icon.removeClass("icon-chevron-right");
    icon.addClass("icon-chevron-down");

    var that = this;
    $.getJSON("/get/"+row.attr("row_id"), function(data) {
		row.after(that.fullNoteTemplate(data));
    });
  }
};

/**
   Collapse all notes
*/
NotepadApp.prototype.CollapseAll = function() {
  this.notesTable.find(".note_expanded").removeClass("note_expanded");
  this.notesTable.find("tbody tr").not(".notes_row").remove();
  this.notesTable.find(".icon-chevron-down").addClass("icon-chevron-right").removeClass("icon-chevron-down");
};

/**
   Handler for deleting a note
*/
NotepadApp.prototype.DoNoteRemove = function(evt) {
  // find row
  var row = $(evt.currentTarget).parents("tr");
  
  // send actual delete command
  $.post("/delete/"+row.attr("row_id"));

  // remove row and expanded full note if open

  if (row.hasClass("note_expanded")) {
    var s = row.next();
    if (!s.hasClass("notes_row"))
      s.remove();
  }

  row.remove();
};

/**
   Handler for updating the full note content
*/
NotepadApp.prototype.DoNoteUpdate = function(evt) {
  // get rows and id
  var row = $(evt.currentTarget).parents("tr");
  var mrow = row.prev();
  var id = mrow.attr("row_id");

  var new_note = { 
    title: row.find("input").val(), 
    note: row.find("textarea").val() 
  };

  // send actual update
  var that = this;
  $.post("/update/"+id, new_note, function(data) {
    // update summary row (update date, maybe title, etc.)
    mrow.replaceWith(that.itemTemplate({ notes: [ data ] }));
    row.remove();
  });
};

$(function() {
    var app = new NotepadApp({
      newNoteDialog: "#new_note_dlg",
      notesTable: "#notes",
      itemTemplate: Handlebars.templates["index"],
      fullNoteTemplate: Handlebars.templates["index_note"]
    });

    $("#new_note").click($.proxy(app.DoAddNote, app));
});

