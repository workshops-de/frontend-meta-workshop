import $ from "jquery";
import moment from "moment";
import "moment/locale/de";
import Note from "./Note";

moment.locale("de");

$(function () {
  if ($("#notes-app").length > 0) {
    // Form reference
    const $form = $("#form");

    const $formFields = {
      title: $("#title"),
      text: $("#text"),
      color: $("#color"),
      submit: $("#submit"),
    };

    const $notes = $("#notes");

    // Notes model
    const notes = [];

    // Functions
    function generateId() {
      return Math.random().toString(36).substring(7);
    }

    function addNote() {
      const id = generateId();
      const note = new Note(
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
      const $column = $("<div>").addClass("col-sm-3");

      const $card = $("<div>")
        .addClass(`card text-white bg-${note.color} mb-3`)
        .attr("id", note.id)
        .appendTo($column);

      const $cardHeader = $("<div>").addClass("card-header");
      const $cardTitle = $("<h2>")
        .addClass("m-0")
        .text(note.title)
        .appendTo($cardHeader);
      $cardHeader.appendTo($card);

      const $cardBody = $("<div>").addClass("card-body").appendTo($card);
      const $cardText = $("<p>")
        .addClass("card-text")
        .text(note.text)
        .appendTo($cardBody);
      const $cardDate = $("<small>")
        .addClass("card-text text-white-50")
        .text(moment(note.date).fromNow())
        .appendTo($cardBody);

      const $cardFooter = $("<div>").addClass("card-footer").appendTo($card);
      const $deleteButton = $("<a>")
        .attr("href", "#")
        .addClass("btn btn-outline-light btn-lg btn-block delete-button")
        .html("Löschen")
        .appendTo($cardFooter);

      $column.hide().appendTo($notes).fadeIn("slow");
    }

    function removeCard(id) {
      const newNotes = [];
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.id !== id) {
          newNotes.push(note);
        }
      }
      notes = newNotes;
    }

    function deleteNote(e) {
      const $card = $(e.target).parents(".card");
      const id = $card.attr("id");
      $card.parent().fadeOut("slow", function () {
        $(this).remove();
      });

      removeCard(id);
    }

    function saveToStorage() {
      localStorage.setItem("notes", JSON.stringify(notes));
    }

    function loadFromStorage() {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        savedNotes = JSON.parse(savedNotes);
        notes = savedNotes;

        for (let i = 0; i < notes.length; i++) {
          appendNote(notes[i]);
        }
      }
    }

    // event listener
    $("#notes").on("click", ".delete-button", function (e) {
      e.preventDefault();
      e.stopPropagation();
      deleteNote(e);
    });

    $("#save").on("click", function (e) {
      saveToStorage();
    });

    // Form validation
    $form.on("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if ($form[0].checkValidity() === false) {
        $form.addClass("was-validated");
      } else {
        $form.removeClass("was-validated");
        addNote();
      }
    });

    // Init notes
    loadFromStorage();
  }
});
