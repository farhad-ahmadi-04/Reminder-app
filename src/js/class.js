// variables
const mainUl = document.querySelector("#allSection>.notes>ul")
// select section all folders
let containerAllFolders = document.querySelector("#containerAllFolders")

let PlacementOfNotes = document.querySelector('#PlacementOfNotes')



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
    addNoteInLS(noteTitle, noteID, noteDes, date) {
        // 1 load LS note 
        let LSNotes = this.laodOfLS()

        // 2 add new notes
        LSNotes.push({
            ID: noteID,
            noteText: noteTitle,
            description: noteDes,
            date: date
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

    constructor(title, description, noteID, date) {
        this.title = title;
        this.description = description;
        this.noteID = noteID;
        this.noteLs = new NoteLs()
        this.date = date
    }
    // methods


    // note Template
    // paramt1 : note title
    // paramt2 : note data ID
    // paramt3 : note description
    // return : template of note
    noteTemplate(notwTitle, noteID, noteText, date) {
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
                <div>${date}</div>
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
                new Note().addNoteToNoteList(eachNote.noteText, eachNote.ID, eachNote.description, eachNote.date)
            }
        )
    }

    // add new note in notelist
    // paramt : note title
    // paramt2 : note data ID
    // paramt3 : note description
    addNoteToNoteList(noteTitle, noteID, noteText, date) {
        mainUl
            .insertAdjacentHTML('afterbegin', this.noteTemplate(noteTitle, noteID, noteText, date))
    }
    // add note to DOM
    addNewNote() {
        // for add note to DOM
        this.addNoteToNoteList(this.title, this.noteID, this.description, this.date)

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
        //last date of current month
        this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        //last date of prevent month
        this.prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        //current day
        this.firstDayIndex = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        // last day of current month
        this.lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        //number of days for next month
        this.nextDays = 7 - this.lastDayIndex - 1

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

    // show next month
    nextMonth() {
        // set new month (next month)
        this.date.setMonth(this.date.getMonth() + 1)
        this.renderCalendar()

        // get last date of next month
        const currentMonthEnd = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        // last day of previous month
        const prevMonthEndd = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        // upgrade veribles 
        this.lastDay = currentMonthEnd.getDate();
        this.prevLastDay = prevMonthEndd.getDate();

        // get first date of  prvious month
        const prevMonthStart = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        // get last date of previous month
        const prevMonthEnd = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        // upgrade varibles
        this.prevLastDay = prevMonthEnd.getDate();
        this.firstDayIndex = prevMonthStart.getDay();
    }
    // show previous month
    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1)

        // get fisrt date of previous month
        const prevMonthStart = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        // get last date of previous month
        const prevMonthEnd = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        // upgrade varibles
        this.prevLastDay = prevMonthEnd.getDate();
        this.firstDayIndex = prevMonthStart.getDay();


        // get last date of next month
        const currentMonthEnd = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        // last date of previous month
        const prevMonthEndd = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        // upgarde varibles
        this.lastDay = currentMonthEnd.getDate();
        this.prevLastDay = prevMonthEndd.getDate();
    }

    // show month and date
    renderCalendar() {
        const mothHeader = document.querySelector(".calendarHeader>div h3")
        // get month will return the number => search for number in month array
        mothHeader.innerHTML = this.month[this.date.getMonth()]
        // set value for month
        mothHeader.setAttribute("value", this.date.getMonth())
        // set date (year)
        document.querySelector(".calendarHeader>div p").innerHTML = this.date.getFullYear()
        // set value for date (year)
        document.querySelector(".calendarHeader>div p").setAttribute("value", this.date.getFullYear())

        const monthDays = document.querySelector(".days");
        let day = ""
        // for show prevent date
        for (let j = this.firstDayIndex; j > 0; j--) {
            day += `<div class="prev-date">${this.prevLastDay - j + 1}</div>`
        }
        // fro show current + dates of the month
        for (let i = 1; i <= this.lastDay; i++) {
            if (i === new Date().getDate() && this.date.getMonth() === new Date().getMonth()) {
                day += `<div data-id="${i}"     class="today">${i}</div>`
            } else {
                day += `<div data-id="${i}">${i}</div>`
            }
        }
        // for show date in next month
        for (let i = 1; i <= this.nextDays; i++) {
            day += `<div class="next-date">${i}</div>`
        }
        monthDays.innerHTML = day
        return day
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

class Clock {
    selctors() {
        return {
            liClock: document.querySelector('.selectedHour'),
            placeClock: document.querySelector('.placeClock'),
            SelectMinutes: document.querySelector('.SelectMinutes'),
            placeMinutes: document.querySelector('.placeMinutes')
        }
    }

    showListHoursClock() {

        let placeClock = document.createElement('ul')
        placeClock.classList.add('placeClock')
        placeClock.insertAdjacentHTML('beforeend', `<li class="optionClock">ساعت</li>`)
        for (let i = 1; i <= 24; i++) {
            placeClock.insertAdjacentHTML('beforeend', `<li onclick="new Clock().setClock(${i})" class="optionClock">${i}</li>`)
        }
        clock.append(placeClock)
    }
    showListMinutes() {

        let placeMinutes = document.createElement('ul')
        placeMinutes.classList.add('placeMinutes')
        placeMinutes.insertAdjacentHTML('beforeend', `<li class="optionMinutes">دقیقه</li>`)
        for (let i = 1; i < 60; i++) {
            placeMinutes.insertAdjacentHTML('beforeend', `<li onclick="new Clock().setMinutes(${i})" class="optionMinutes">${i}</li>`)
        }
        clock.append(placeMinutes)
    }
    setClock(e) {
        this.selctors().liClock.innerHTML = e
        this.selctors().placeClock.remove()
        this.showListMinutes()
    }
    setMinutes(e) {
        this.selctors().SelectMinutes.innerHTML = e
        this.selctors().placeMinutes.remove()
    }
}


class ErrorMsg {
    // constructor
    constructor(msg, pos) {
        this.msg = msg
        this.pos = pos
    }
    // methods
    // template of error massage
    template() {
        return `
        <div class="error">
            <div>${this.msg}</div>
            <div class="divImg">
                <img src="images/icons/error.svg" alt="">
            </div>
        </div>`
    }
    // template position
    positionTemplate() {
        this.pos.insertAdjacentHTML("afterbegin", this.template())
        setTimeout(() => {
            document.querySelector(".error").remove()

        }, 5000);
    }
}

// dar hal tamir 🤠🛠️
class AddNoteInFolder {
    constructor(tit, des, IDR) {
        this.tit = tit,
            this.des = des,
            this.IDR = IDR
    }

    template(IDR, tit, des) {
        return `
        <li data-id='${IDR}' class="noteLi">
            <div class="noteHeader">
                <h3>${tit}</h3>
                <div><img src="../../images/icons/Vector.svg" alt=""></div>
            </div>
            <div class="noteMain">
                <p>${des}</p>
            </div>
            <div class="dateTime">
                <div>2023/10/04</div>
                <div>22:30</div>
            </div>
        </li>
        `
    }

    addNoteInDom() {
        PlacementOfNotes.insertAdjacentHTML('beforeend', this.template(this.IDR, this.tit, this.des))
        getIdNotesInFolder()
    }

    getIdNotesInFolder(e) {
        let x = JSON.parse(localStorage.getItem('folders'))

        x.forEach(
            (eachFolder, indexFolder) => {
                if (e == eachFolder.folderID) {
                    x[indexFolder].arrayNotes.push(
                        {
                            tit: this.tit,
                            des: this.des,
                            noteID: this.IDR
                        }
                    )
                }
            }
        );
        // JSON.stringify(localStorage.setItem('folders', x))
        console.log(this.tit);
        console.log(this.des);
        console.log(this.IDR);
    }
}