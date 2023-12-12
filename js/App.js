import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
    
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes(); // model

        this._setNotes(notes) // controller

        if (notes.length > 0) {
            this._setActiveNote(notes[0]); // controller
        }
    }

    _setNotes(notes) {
        this.notes = notes; // controller
        this.view.updateNotesList(notes); // view
        this.view.updateNotePreviewVisibility(notes.length > 0); // view
    }

    _setActiveNote(note) {
        this.activeNote = note; // controller
        this.view.updateActiveNote(note); // view
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => noteId == note.id);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };

                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title: title,
                    body: body
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        }
    }
}