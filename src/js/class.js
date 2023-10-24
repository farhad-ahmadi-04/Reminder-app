// variables
const mainUl = document.querySelector("#allSection>.notes>ul")

// classes
//      class noteLS for save + remove notes in LS
class NoteLs {
    // constructor

    // methods
    // save note function to LS
    // paramet1 : object of note want save in LS
    saveNoteInLS(Notes) {
        //  save notes in LS
        let LSNotes = Notes
        LSNotes = JSON.stringify(LSNotes)
        localStorage.setItem('Notes', LSNotes)
    }
    // function for load all notes from LS
    // return : obj of note from LS
    laodOfLS() {
        //  load LS note 
        let LSNotes = JSON.parse(localStorage.getItem('Notes'))
        // if have not any obj in LS => create
        if (LSNotes == null) {
            localStorage.setItem('Notes', '[]')
            LSNotes = JSON.parse(localStorage.getItem('Notes'))
        }
        return LSNotes
    }
    // add note in local storage
    // paramt : title of note
    // paramt : data id of note
    // paramt : note description
    // output : add note to DOm + LS
    addNoteInLS(noteTitle, noteID, noteDes) {
        // 1 load LS note 
        let LSNotes = this.laodOfLS()

        // 2 add new notes
        LSNotes.push({
            ID: noteID,
            noteText: noteTitle,
            description: noteDes
        })
        // 3 save notes in LS
        this.saveNoteInLS(LSNotes)
    }
    // remove note from DOM + LS
    // paramt1 : id of note that user click on
    // output : remove note from Dom + LS
    removeFromLS(removeNote) {
        //  remove from LS
        //     first load our notes
        let LSNotes = this.laodOfLS()
        //     remove text from LS
        LSNotes.forEach(
            function (eachNote, noteIndex) {
                if (removeNote == eachNote.ID) {
                    LSNotes.splice(noteIndex, 1)
                }
            })

        //      send that remove list to LS(update)
        this.saveNoteInLS(LSNotes)
    }
}

// class Note for add + remove notes from DOM and  use NOteLS class for add + remove notes from LS
class Note {

    // constructor

    constructor(title, description, noteID) {
        this.title = title;
        this.description = description;
        this.noteID = noteID;
        this.noteLs = new NoteLs()
    }
    // methods


    // note Template
    // paramt1 : note title
    // paramt2 : note data ID
    // paramt3 : note description
    // return : template of note
    noteTemplate(notwTitle, noteID, noteText) {
        return `
        <li data-id='${noteID}' class="noteLi">
            <div class="noteHeader">
                <div><img src="../../images/icons/Vector.svg" alt=""></div>
                <h3>${notwTitle}</h3>
                <div><img src="../../images/icons/icons8-setting (1).svg" alt=""></div>
            </div>
            <div class="noteMain">
                <p>${noteText}</p>
            </div>
        </li>
    `
    }
    // load note from LS => still we have notes when user refresh the page
    laodNotesInPage() {
        // call note from LS
        let laodTime = this.noteLs.laodOfLS()
        // adding them to DOM
        laodTime.forEach(
            function (eachNote) {
                new Note().addNoteToNoteList(eachNote.noteText, eachNote.ID, eachNote.description)
            }
        )
    }

    // add new note in notelist
    // paramt : note title
    // paramt2 : note data ID
    // paramt3 : note description
    addNoteToNoteList(noteTitle, noteID, noteText) {
        mainUl
            .insertAdjacentHTML('afterbegin', this.noteTemplate(noteTitle, noteID, noteText))
    }
    // add note to DOM + LS
    addNewNote() {
        // for add note to DOM
        this.addNoteToNoteList(this.title, this.noteId, this.description)
        // save note in LS
        this.noteLs.addNoteInLS(this.title, this.noteId, this.description)
    }


    // remove note from DOM & LS
    remove(event) {
        event.preventDefault()
        // remove from DOM
        if (event.target.classList.contains('removeBtn')) {
            event.target.parentElement.remove()
        }
        // remove from LS
        let noteRId = event.target.parentElement.getAttribute('data-id')
        this.noteLs.removeFromLS(noteRId)
    }
}