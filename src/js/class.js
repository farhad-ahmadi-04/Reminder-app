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
    addNoteInLS(noteTitle, noteID, noteDes, date, targetTime) {
        // 1 load LS note 
        let LSNotes = this.laodOfLS()

        // 2 add new notes
        LSNotes.push({
            ID: noteID,
            noteText: noteTitle,
            description: noteDes,
            date: date,
            createDate: `${new Calendar().date.getFullYear()}/${new Calendar().date.getMonth() + 1}/${new Calendar().date.getDate()}`,
            targetTime: targetTime,
            currentTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
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

    constructor(title, description, noteID, date, targetTime) {
        this.title = title;
        this.description = description;
        this.noteID = noteID;
        this.noteLs = new NoteLs()
        this.date = date
        this.targetTime = targetTime
    }
    // methods


    // note Template
    // paramt1 : note title
    // paramt2 : note data ID
    // paramt3 : note description
    // paramt4 : target date
    // paramt5: target time
    // return : template of note
    noteTemplate(notwTitle, noteID, noteText, date, targetTime) {
        return `
        <li data-id='${noteID}' class="noteLi" onclick="showValueNote('${noteID}','${notwTitle}','${noteText}')">
            <div class="noteHeader">
            <h3>${notwTitle}</h3>
            <div><img src="../../images/icons/Vector.svg" alt=""></div>
            </div>
            <div class="noteMain">
                <p>${noteText}</p>
            </div>
            <div class="dateTime">
                <div>${date}</div>
                <div>${targetTime}</div>
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
                new Note().addNoteToNoteList(eachNote.noteText, eachNote.ID, eachNote.description, eachNote.date, eachNote.targetTime)
            }
        )
    }

    // add new note in notelist
    // paramt : note title
    // paramt2 : note data ID
    // paramt3 : note description
    // paramt4: target date
    // paramt5: target time
    addNoteToNoteList(noteTitle, noteID, noteText, date, targetTime) {
        mainUl
            .insertAdjacentHTML('afterbegin', this.noteTemplate(noteTitle, noteID, noteText, date, targetTime))
    }
    // add note to DOM
    addNewNote() {
        // for add note to DOM
        this.addNoteToNoteList(this.title, this.noteID, this.description, this.date, this.targetTime)

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
        <span><span class="lengthNoteInFolder">${this.getLengthNoteInFolder(IdRandom)}</span>, File</span>
        <img src="images/icons/folder.svg" alt="">
        </div>
        </div>
        `
        return NewFolderTemplate
    }

    // add note in noteList
    addNoteInList(noteText, noteID) {
        let info = JSON.parse(localStorage.getItem('folders'))

        containerAllFolders.insertAdjacentHTML('afterbegin', this.addNewFolderInDom(noteText, noteID))

        info = JSON.stringify(info)
        localStorage.setItem('folders', info)

    }

    getLengthNoteInFolder(e) {
        let LSFolder = JSON.parse(localStorage.getItem('folders'))
        let info = 0
        LSFolder.forEach((eachFolder, indexFolder) => {
            if (e == eachFolder.folderID) {
                info = LSFolder[indexFolder].arrayNotes.length
            }
        });
        return info
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

// class Clock {
//     selctors() {
//         return {
//             liClock: document.querySelector('.selectedHour'),
//             placeClock: document.querySelector('.placeClock'),
//             SelectMinutes: document.querySelector('.SelectMinutes'),
//             placeMinutes: document.querySelector('.placeMinutes')
//         }
//     }

//     showListHoursClock() {

//         let placeClock = document.createElement('ul')
//         placeClock.classList.add('placeClock')
//         placeClock.insertAdjacentHTML('beforeend', `<li class="optionClock">ساعت</li>`)
//         for (let i = 1; i <= 24; i++) {
//             placeClock.insertAdjacentHTML('beforeend', `<li onclick="new Clock().setClock(${i})" class="optionClock">${i}</li>`)
//         }
//         clock.append(placeClock)
//         for (let i = 1; i < 60; i++) {
//             placeMinutes.insertAdjacentHTML('beforeend', `<li onclick="new Clock().setMinutes(${i})" class="optionMinutes">${i}</li>`)
//         }
//     }
//     showListMinutes() {

//         let placeMinutes = document.createElement('ul')
//         placeMinutes.classList.add('placeMinutes')
//         placeMinutes.insertAdjacentHTML('beforeend', `<li class="optionMinutes">دقیقه</li>`)
//         clock.append(placeMinutes)
//     }
//     setClock(e) {
//         this.selctors().liClock.innerHTML = e
//         this.selctors().placeClock.remove()
//         this.showListMinutes()
//     }
//     setMinutes(e) {
//         this.selctors().SelectMinutes.innerHTML = e
//         this.selctors().placeMinutes.remove()
//     }
// }

class Clock {
    // constructor
    constructor() {
        // get current hours
        this.currentHours = new Date().getHours();
        // get current minutes
        this.currentMinutes = new Date().getMinutes();
    }
    // methods
    ClockModal(hours, minuts) {
        let clockTemplate = document.querySelector(".clock-modal")
        let clockTemplate02 = document.querySelector(".clock-modal02")
        // change style of clock div for show it to user
        clockTemplate.style.display = "block"
        clockTemplate02.style.display = "block"

        let selectH = document.querySelector(".hours")

        let selectM = document.querySelector(".minuts")
        if (minuts == "") {
            let optionH = document.createElement("li")
            optionH.value = hours
            optionH.textContent = hours

            selectH.appendChild(optionH)
        } else if (hours == "") {
            let optionM = document.createElement("li")
            optionM.value = minuts
            optionM.textContent = minuts

            selectM.appendChild(optionM)
        }



    }

    template() {
        // create loop for sent hours => we have 24 hourd in a day
        for (let h = 1; h <= 24; h++) {
            if (h < 10) {
                this.ClockModal(`0${h}`, "")
            } else {
                this.ClockModal(h, "")
            }
        }
        // create loop for sent minutes => we have 60 hourd in a 1 hour
        for (let m = 0; m <= 60; m++) {
            if (m < 10) {
                this.ClockModal("", `0${m}`)
            } else {
                this.ClockModal("", m)
            }
        }
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

class AddNoteInFolder {

    template(IDR, tit, des) {
        return `
        <li data-id='${IDR}' class="noteLi" onclick="showValueNote('${IDR}','${tit}','${des}')">
                <div class="noteHeader">
                    <h3>${tit}</h3>
                    <div>
                        <img src="../../images/icons/Vector.svg" alt="">
                    </div>
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

    addNoteInDom(idFolder, IDR, tit, des) {
        PlacementOfNotes.insertAdjacentHTML('beforeend', this.template(IDR, tit, des))
        this.getIdNotesInFolder(idFolder, IDR, tit, des)
        this.setNoteInLsNotes(IDR, tit, des)
        mainUl.insertAdjacentHTML('beforeend', this.template(IDR, tit, des))
    }

    getIdNotesInFolder(e, IDR, tit, des) {
        let LSFolder = JSON.parse(localStorage.getItem('folders'))

        LSFolder.forEach(
            (eachFolder, indexFolder) => {
                if (e == eachFolder.folderID) {
                    LSFolder[indexFolder].arrayNotes.push({
                        noteID: IDR,
                        tit: tit,
                        des: des
                    })
                }
            }
        );
        LSFolder = JSON.stringify(LSFolder)
        localStorage.setItem('folders', LSFolder)
    }

    setNoteInLsNotes(IDR, tit, des) {
        let LSNotes = JSON.parse(localStorage.getItem('Notes'))
        LSNotes.push({
            ID: IDR,
            noteText: tit,
            description: des
        })
        LSNotes = JSON.stringify(LSNotes)
        localStorage.setItem('Notes', LSNotes)
    }
}
// /////////////////////////////////////////////
class ShowNoteInFolderByLs {
    constructor(idFolder) {
        this.idFolder = idFolder
    }

    getNotesInLs() {
        PlacementOfNotes.innerHTML = ' '
        let lsNotes = localStorage.getItem('folders')
        lsNotes = JSON.parse(lsNotes)

        lsNotes.forEach(
            (eachFolder, indexFolder) => {
                if (this.idFolder == eachFolder.folderID) {
                    for (let i = 0; i < lsNotes[indexFolder].arrayNotes.length; i++) {
                        PlacementOfNotes.insertAdjacentHTML('afterbegin', new AddNoteInFolder().template(lsNotes[indexFolder].arrayNotes[i].noteID, lsNotes[indexFolder].arrayNotes[i].tit, lsNotes[indexFolder].arrayNotes[i].des))
                    }
                }
            }
        );
    }
}


class Alarm {
    // construction
    // paramet01 : user target full date (year/month/day)
    // paramet02 : user target time (hour, minute)
    // paramet03 : type of alarm (user target like daily, weekly, etc...)
    constructor(date, timeH, timeM, alarmType, noteId) {
        this.date = date;
        this.timeH = timeH
        this.timeM = timeM
        this.alarmType = alarmType
        this.noteId = noteId
    }
    // methods
    // get date and time => change to number and put them to obj for use it easily
    // return : obj
    dateAlarm() {
        let year = parseInt(this.date.slice(0, 4))
        let month = parseInt(this.date.slice(5, 7))
        let day = parseInt(this.date.slice(8, 10))
        let hour = parseInt(this.timeH)
        let minute = parseInt(this.timeM)
        return {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute
        }
    }
    // get current date - user target date = date we have
    // return : extra date we have (object)
    extraDate() {
        // current year
        let currentYear = new Date().getFullYear()
        // current month
        let currentMonth = new Date().getMonth() + 1
        // current day
        let currentDay = new Date().getDate()
        // current hour
        let currentHour = new Date().getHours()
        // current minute
        let currentMinute = new Date().getMinutes()
        // target year - current year = year for change it to seconds
        let targetYear = this.dateAlarm().year - currentYear
        // target month - current month = month for change it to seconds
        let targetMonth = this.dateAlarm().month - currentMonth
        // target day - current day = day for change it to seconds
        let targetDay = this.dateAlarm().day - currentDay
        // target hour - current hour = hour for change it to seconds
        let targetHour = this.dateAlarm().hour
        // target minute - current minute = minute for change it to seconds
        let targetMinute = this.dateAlarm().minute
        console.log(targetHour, targetMinute, currentHour, currentMinute);
        return {
            targetYear: targetYear,
            targetMonth: targetMonth,
            targetDay: targetDay,
            targetHour: targetHour,
            targetMinute: targetMinute,
        }
    }
    // change extra date to second
    // return date second units
    dateFormula() {
        // 1year = 31536000 seconds
        let yearToSecond = this.extraDate().targetYear * 31536000
        // 1month = 2628000 seconds
        let monthToSecond = this.extraDate().targetMonth * 2628000
        //  1day = 86400 seconds
        let dayToSecond = this.extraDate().targetDay * 86400
        // 1hours = 3600 seconds
        let hourToSecond = this.extraDate().targetHour * 3600
        // 1minutes = 60 seconds
        let minuteToSecond = this.extraDate().targetMinute * 60



        // formula for set alarm
        let userTargetDate = (yearToSecond) + (monthToSecond) + (dayToSecond) + (hourToSecond) + (minuteToSecond)
        console.log(userTargetDate);
        return userTargetDate
    }
    // pass targetTime to this function and after the user target time set alarm
    setAlarm() {
        let alarm = setTimeout(() => {
            document.querySelector("body").insertAdjacentHTML("afterbegin", this.alarmTemplate())
        }, this.dateFormula() * 1000);
    }
    // template of alarm
    alarmTemplate() {
        return `
        <div class="alarmtemplate">
            <div class="text">${this.noteId}</div>
            <div>
                <button class="alarmStop">undrestood</button>
            </div>
        </div>`
    }
}