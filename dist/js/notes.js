"use strict";

function _readOnlyError(name) {
  throw new Error('"' + name + '" is read-only');
}

$(function () {
  // Form reference
  var $form = $("#form");
  var $formFields = {
    title: $("#title"),
    text: $("#text"),
    color: $("#color"),
    submit: $("#submit"),
  };
  var $notes = $("#notes"); // Notes model

  var notes = []; // Functions

  function generateId() {
    return Math.random().toString(36).substring(7);
  }

  function addNote() {
    var id = generateId();
    var note = new Note(
      id,
      $formFields.title.val(),
      $formFields.text.val(),
      $formFields.color.val(),
      moment().valueOf()
    );
    notes.push(note);
    appendNote(note);
    $formFields.title.val("");
    $formFields.text.val("");
    $formFields.color.val("");
    $formFields.title.trigger("focus");
  }

  function appendNote(note) {
    var $column = $("<div>").addClass("col-sm-3");
    var $card = $("<div>")
      .addClass("card text-white bg-" + note.color + " mb-3")
      .attr("id", note.id)
      .appendTo($column);
    var $cardHeader = $("<div>").addClass("card-header");
    var $cardTitle = $("<h2>")
      .addClass("m-0")
      .text(note.title)
      .appendTo($cardHeader);
    $cardHeader.appendTo($card);
    var $cardBody = $("<div>").addClass("card-body").appendTo($card);
    var $cardText = $("<p>")
      .addClass("card-text")
      .text(note.text)
      .appendTo($cardBody);
    var $cardDate = $("<small>")
      .addClass("card-text text-white-50")
      .text(moment(note.date).fromNow())
      .appendTo($cardBody);
    var $cardFooter = $("<div>").addClass("card-footer").appendTo($card);
    var $deleteButton = $("<a>")
      .attr("href", "#")
      .addClass("btn btn-outline-light btn-lg btn-block delete-button")
      .html("Löschen")
      .appendTo($cardFooter);
    $column.hide().appendTo($notes).fadeIn("slow");
  }

  function removeCard(id) {
    var newNotes = [];

    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];

      if (note.id !== id) {
        newNotes.push(note);
      }
    }

    notes = (_readOnlyError("notes"), newNotes);
  }

  function deleteNote(e) {
    var $card = $(e.target).parents(".card");
    var id = $card.attr("id");
    $card.parent().fadeOut("slow", function () {
      $(this).remove();
    });
    removeCard(id);
  }

  function saveToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function loadFromStorage() {
    var savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      savedNotes = (_readOnlyError("savedNotes"), JSON.parse(savedNotes));
      notes = (_readOnlyError("notes"), savedNotes);

      for (var i = 0; i < notes.length; i++) {
        appendNote(notes[i]);
      }
    }
  } // event listener

  $("#notes").on("click", ".delete-button", function (e) {
    e.preventDefault();
    e.stopPropagation();
    deleteNote(e);
  });
  $("#save").on("click", function (e) {
    saveToStorage();
  }); // Form validation

  $form.on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if ($form[0].checkValidity() === false) {
      $form.addClass("was-validated");
    } else {
      $form.removeClass("was-validated");
      addNote();
    }
  }); // Init notes

  loadFromStorage();
});
