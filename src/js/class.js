// variables
const mainUl = document.querySelector("#allSection>.notes>ul")
// select section all folders
let containerAllFolders = document.querySelector("#containerAllFolders")



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
            <h3>${notwTitle}</h3>
            <div><img src="../../images/icons/Vector.svg" alt=""></div>
            </div>
            <div class="noteMain">
                <p>${noteText}</p>
            </div>
            <div class="dateTime">
                <div>2023/10/04</div>
                <div>22:30</div>
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
        this.addNoteToNoteList(this.title, this.noteID, this.description)

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

// add new folder in dom
class NewFolder {
    // The controller method of the methods
    createNewFolder() {
        // If there was no problem with validation
        if (this.cheackValidationNewFolder().info) {
            const Idrandom = this.idRandom()
            // Creating a folder and displaying it in Dom
            // Set 1 (new folder name)
            // Set 2 (Random ID)
            this.addNoteInList(this.cheackValidationNewFolder().NameNewFolder.value, Idrandom)
            // Set 1 to class (SetNewFolderInLS) "new folder name"
            // Set 2 to class (SetNewFolderInLS) "Random ID"
            // Calling the addNoteinLS method in the class (SetNewFolderInLS)
            new SetNewFolderInLS(this.cheackValidationNewFolder().NameNewFolder.value, Idrandom).addNoteinLS()
            // By clicking on the save button, the input value of the new folder model will be null
            this.cheackValidationNewFolder().NameNewFolder.value = null
            // By clicking on the save button, the new folder medal will be hidden
            containerAddNewFolder.style.display = 'none'
        } else {
            // Error calling function
            // set Input error text
            this.error('the name min 1 character and max 13 character')
        }
    }
    // New folder modal validation check
    cheackValidationNewFolder() {
        let info = false
        let NameNewFolder = document.querySelector('#NameNewFolder')
        if (NameNewFolder.value == '') {
            info = false
        } else if (NameNewFolder.value.length > 13) {
            info = false
        } else {
            info = true
        }
        return {
            NameNewFolder: NameNewFolder,
            info: info
        }
    }

    // Create a random ID for each folder
    idRandom() {
        return (Math.random() * 10000000).toFixed()
    }

    // Create and display folders in Dom
    addNewFolderInDom(info, IdRandom) {
        let NewFolderTemplate = `
        <div class="${IdRandom} folder">
            <div>
                <h3 class="h3">${info}</h3>
            </div>
            <div>
                <span>0, File</span>
                <img src="images/icons/folder.svg" alt="">
                <img src="images/icons/setting.svg" alt="">
            </div>
        </div>
        `
        return NewFolderTemplate
    }

    // add note in noteList
    addNoteInList(noteText, noteID) {
        containerAllFolders.insertAdjacentHTML('afterbegin', this.addNewFolderInDom(noteText, noteID))
    }

    // Display the New Folder modal input error
    error(info) {
        let newError = `<p class="errorModalNewFolder">${info}</p>`
        this.cheackValidationNewFolder().NameNewFolder.insertAdjacentHTML('afterend', newError)
        // After 3 seconds, the error will be hidden
        setTimeout(() => {
            document.querySelector('.errorModalNewFolder').remove()
        }, 3000);

    }
}


class Calendar {
    // constructor
    constructor() {
        this.date = new Date(); //new date
        this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate(); //last date of current month
        this.prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate(); //last date of prevent month
        this.firstDayIndex = this.date.getDay(); //current day
        console.log(this.firstDayIndex);
        this.lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay(); // last day of current month
        this.nextDays = 7 - this.lastDayIndex + 1 //number of days for next month
        // month
        this.month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    }
    // methods
    // show month and date
    monthTitle() {
        const mothHeader = document.querySelector(".calendarHeader>div h3")
        // get month will return the number => search for number in month array
        mothHeader.innerHTML = this.month[this.date.getMonth()]
        // set value for month
        mothHeader.setAttribute("value", this.date.getMonth())
        // set date
        document.querySelector(".calendarHeader>div p").innerHTML = this.date.getFullYear()
    }
    // show date + prevent and next date
    monthDays() {
        const monthDays = document.querySelector(".days");
        let day = ""
        // for show prevent date
        for (let j = this.firstDayIndex; j > 0; j--) {
            day += `<div class="prev-date">${this.prevLastDay - j + 1}</div>`
        }
        // fro show current + dates of the month
        for (let i = 1; i < this.lastDay; i++) {
            if (i === new Date().getDate() && this.date.getMonth() === new Date().getMonth()) {
                day += `<div class="today">${i}</div>`
            } else {
                day += `<div>${i}</div>`
            }
        }
        // for show date in next month
        for (let i = 1; i < this.nextDays; i++) {
            day += `<div class="next-date">${i}</div>`
            monthDays.innerHTML = day
        }
    }
    // show next month
    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1)
    }
    // show previous month
    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1)
    }
}

// Folder set in local storage
class SetNewFolderInLS {
    constructor(NameNewFolder, idRandom) {
        this.NameNewFolder = NameNewFolder,
            this.idRandom = idRandom
    }

    // save note in local storage
    addNoteinLS() {
        // 1. Load LS FOLDER
        let LSFolder = this.loadOfLS()

        // 2. Add new Folder
        LSFolder.push({
            folderText: this.NameNewFolder,
            folderID: this.idRandom,
            arrayNotes: []
        })
        // 3. Save FOLDER in LS
        this.saveNotesInLS(LSFolder)
    }

    // load Folders from localstorage
    loadOfLS() {
        // 1. Load LS FOLDER
        let LSFolder = JSON.parse(localStorage.getItem('folders'))

        if (LSFolder == null) {
            localStorage.setItem('folders', '[]')
            LSFolder = JSON.parse(localStorage.getItem('folders'))
        }

        return LSFolder
    }

    // save all Folder in Local storage
    saveNotesInLS(folder) {
        // 3. Save folder in LS
        let LSFolder = folder

        LSFolder = JSON.stringify(LSFolder)
        localStorage.setItem('folders', LSFolder)
    }


    // Load Folder on Page Load
    loadNotesInPage() {
        // STEP 1 :  Load All Folder from LS
        let LSFolder = this.loadOfLS()

        // STEP 2 : Add Folder on Page
        LSFolder.forEach(
            function (eachNote) {
                new NewFolder().addNoteInList(eachNote.folderText, eachNote.folderID)
            }
        )
    }
}