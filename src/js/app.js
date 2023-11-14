// ---varibles--
let body = document.querySelector('body')
let cal = new Calendar() // calendar
// Select ul in the nav header
let navHeader = document.querySelector('.div-left-header ul')
// Select the folders section
let folderSection = document.querySelector('#folderSection')
// Select the all section
let allSection = document.querySelector('#allSection')
// Select the alarms section
let alarmsSecion = document.querySelector('#alarmsSecion')
// Select element main
let main = document.querySelector('main section')

let dateButton = document.querySelector(".time>div>button"); //date btn in landing page
const dateButtonimg = document.querySelector(".time>div>button>img"); //svg in date btn in landing page
const date = document.querySelector(".date") // date section
const save = document.querySelector(".footerNewToDo>div:last-of-type");
const cancel = document.querySelector(".footerNewToDo>div:first-of-type");
const adding = document.querySelector("#svgAddNote")
const newToDo = document.querySelector("#allSection .newToDo")
const calendarModalSvg = document.querySelector(".calendar:not(.calendarModal)")


// Modal to create a new folder
let containerAddNewFolder = document.querySelector("#containerAddNewFolder")
// button to delete the modal to create a new folder
let closeModalAddNewFolder = document.querySelector("#closeModalAddNewFolder")
// icon Add New Folder
let iconAddNewFolder = document.querySelector("#iconAddNewFolder")
// icon add new not in folder
let svgAddNoteInFolder = document.querySelector("#svgAddNoteInFolder")

const prev = document.querySelector(".prev") // prev icon in calendar
const next = document.querySelector(".next") // next icon in calendar
const calendarModal = document.querySelector(".calendarModal")
// select btn save in modal new folder
let saveNewFolder = document.querySelector("#saveNewFolder")
// The user is active in this section
let activeNow = document.querySelector("#activeNow")
// modal (create new note in folder)
let activeNowToDo = document.querySelector('#activeNow >.newToDo')
// div close modal (create new note in folder)
let closeModalAddNewNoteInFolder = document.querySelector('#activeNow .footerNewToDo #close')

let saveModalAddNewNoteInFolder = document.querySelector('#activeNow .footerNewToDo #save')
let folder = document.querySelector('.folder')
const iconAddNewNoteInAlarm = document.querySelector('#iconAddNewNoteInAlarm')

let clock = document.querySelector(".clock")

// calendar header (year)
let calendarYear = document.querySelector(".calendarHeader>div>p")
// resulte Date
const resulteDate = document.querySelector(".resulteDate")
// days in calendar
let days = document.querySelector(".days")
// clock => hours
let hours = document.querySelector(".hours")
let minutes = document.querySelector(".minuts")

let menuFolder = document.querySelector('#menuFolder')
let deleteFolderBtn = document.querySelector('#deleteFolderBtn')
let modalMenuFolder = document.querySelector('#modalMenuFolder')
let bacModalDeleteFolder = document.querySelector('#bac-modalDeleteFolder')
let btnCloseModalDeleteFolder = document.querySelector('#closeModalDeleteFolder')
let deleteFolder = document.querySelector('#deleteFolder')
// hours and minutes division
let selectedHour = document.querySelector(".clock>div>.selectedHour")
let SelectMinutes = document.querySelector(".clock>div>.SelectMinutes")

let PlacementOfNotesNoteLi = document.querySelector('#PlacementOfNotes .noteLi')
let sectionValueNote = document.querySelector('#sectionValueNote')



// --event--
// if the click ul in nav header
navHeader.addEventListener('click', TabSwitchInMain)
dateButton.addEventListener("touchend", setDate) // when touched on btn in date section in landing page
save.addEventListener("touchend", saveNote)
cancel.addEventListener("click", cancelNote)
adding.addEventListener("touchend", addTemplate) //show template for adding
// when touched on btn in date section in landing page
dateButton.addEventListener("touchend", setDate)
// By clicking on the Add New Folder icon, display the folder creation modal
iconAddNewFolder.addEventListener('click', ShowModalAddNewFolder)
// Hide the modal by clicking the delete icon on the modal
closeModalAddNewFolder.addEventListener('click', closeModalNewFolder)
document.addEventListener("DOMContentLoaded", loadPage)
calendarModalSvg.addEventListener("touchend", showCalender)
prev.addEventListener("touchend", prevMonth)
next.addEventListener("touchend", nextMonth)
// create new folder and show in dom
saveNewFolder.addEventListener('click', createNewFolder)
// load all notes
document.addEventListener('DOMContentLoaded', new SetNewFolderInLS().loadNotesInPage())
// show notes in folder 
// create new btn in header
//  Switch to the notes screen in the folder
containerAllFolders.addEventListener('click', showNoteInFolder)
// show modal create new not in folder
svgAddNoteInFolder.addEventListener("click", showModalNewNoteInFolder)
// close modal new note in folder
closeModalAddNewNoteInFolder.addEventListener('click', closeModalNewNoteInFolder)

clock.addEventListener('click', setClock)
// each days user click
days.addEventListener("click", full)
// calendarModal.addEventListener("click", full) // for show date in template
saveModalAddNewNoteInFolder.addEventListener('click', addNewNoteInFolder)
menuFolder.addEventListener('click', showModalMenuFolder)
deleteFolderBtn.addEventListener('click', showModalDeleteFolder)
btnCloseModalDeleteFolder.addEventListener('click', closeModalDeleteFolder)
deleteFolder.addEventListener('click', deleteFolderInDomAndLs)




// add time to divition
hours.addEventListener("click", addTime)
minutes.addEventListener("click", addTime)



// -- function---
function loadPage() {
    let notePage = new Note()
    notePage.laodNotesInPage()
}

// create new folder and show in dom
function createNewFolder() {
    // Calling the create new folder method in the new folder class
    new NewFolder().createNewFolder()
}


function TabSwitchInMain(e) {
    // Get the value of the clicked element
    // Send the received value to the changeSectionInMain function 
    changeSectionInMain(e.target.value)
}

// Switch main sections by clicking on the header navigation
function changeSectionInMain(info) {

    switch (info) {
        case 1:
            info.classList = "activeLi"
            // Delete all main sections
            removeSection()
            // The display section is all flexed
            allSection.style.display = 'flex'
            // Change the add icon in the footer
            ChangeTheNewAddIcon(1)
            // Removing the New Folder modal opened when switching pages
            closeModalNewNote()
            break;
        case 2:
            // Delete all main sections
            removeSection()
            // The display section is folders flexed
            folderSection.style.display = 'flex'
            // Change the add icon in the footer
            ChangeTheNewAddIcon(2)
            // Removing the New Note modal opened when switching pages
            closeModalNewFolder()
            containerAllFolders.innerHTML = ''
            new SetNewFolderInLS().loadNotesInPage()
            break;
        case 3:
            // Delete all main sections
            removeSection()
            window.location.href = "src/note/valueNote.html"
            break;
        case 4:
            // Delete all main sections
            removeSection()
            // The display section is active now flexed
            activeNow.style.display = 'inline-block'
            // Change the add icon in the footer
            ChangeTheNewAddIcon(4)
            // close modal add new note in folder
            closeModalNewNoteInFolder()
            break;
    }
}

// Delete all main sections
function removeSection() {
    for (let i = 0; i < 3; i++) {
        // get all section in main
        let info = document.querySelectorAll('main section')[i]
        info.style.display = 'none'
    }
}

// show template for add notre
function addTemplate() {
    newToDo.style.display = 'flex'

}

// show template add new note in folder
function showModalNewNoteInFolder() {
    activeNowToDo.style.display = 'flex'
}

// Change the add icon in the footer
function ChangeTheNewAddIcon(key) {
    // Hide all footer icons
    adding.style.display = 'none'
    iconAddNewFolder.style.display = 'none'
    svgAddNoteInFolder.style.display = 'none'

    // Display the icon relative to the page in the footer
    switch (key) {
        case 1:
            adding.style.display = 'inline-block'
            break;
        case 2:
            iconAddNewFolder.style.display = 'inline-block'
            break;
        case 4:
            svgAddNoteInFolder.style.display = 'inline-block'
            break;
    }
}

// By clicking on the Add New Folder icon, display the folder creation modal
function ShowModalAddNewFolder() {
    containerAddNewFolder.style.display = 'flex'
}
// Hide the modal by clicking the delete icon on the modal
function closeModalNewFolder() {
    containerAddNewFolder.style.display = 'none'
    // Remove the input value of the title of the new folder modal
    document.querySelector('#containerAddNewFolder input').value = ''
}
// Removing the New Note modal opened when switching pages
function closeModalNewNote() {
    newToDo.style.display = 'none'
}

// close from modal create new note in folder
// Emptying the value of template inputs
function closeModalNewNoteInFolder() {
    activeNowToDo.style.display = 'none'
    activeNowToDo.querySelector('input').value = ''
    activeNowToDo.querySelector('textarea').value = ''
}

// defualt value for date division
resulteDate.textContent = `${new Calendar().date.getFullYear()}/${new Calendar().date.getMonth() + 1}/${new Calendar().date.getDate()}`
// default time for clock division
selectedHour.textContent = new Date().getHours()
SelectMinutes.textContent = new Date().getMinutes()

// status of date div 
let isDivVisible = false;
// date div for choosing date
function setDate() {
    if (!isDivVisible) {
        // when touch btn => svg in button will move right
        svgPosition(38)
        // change background color of btn
        dateButton.style = "background: rgba(59, 238, 44, 0.56);"
        // show date div
        date.style.display = "flex"
        // default date => current date
        resulteDate.textContent = `${new Calendar().date.getFullYear()}/${new Calendar().date.getMonth() + 1}/${new Calendar().date.getDate()}`

        // change status of date div
        isDivVisible = true;
    } else {
        // when touch btn => svg in button will move left
        svgPosition(-38)
        // change background color of btn
        dateButton.style = "background: rgba(255, 255, 255, 0.56);"
        // show date div
        date.style.display = "none"
        // change status of date div
        isDivVisible = false
    }
}
// paramt1 : Spacing SVG with button from right or left (typeof number)
// + resulte : change position of svg in btn
function svgPosition(num) {
    // Find the current value of left
    let svgPosition = parseInt(getComputedStyle(dateButtonimg).left);
    // change svg position to right or left
    let newLeft = svgPosition + num;
    dateButtonimg.style.left = newLeft + 'px';
}


let saveCount = 0;
// save note to DOM
function saveNote() {
    saveCount += 1;
    // title text in input (new to do modal)
    const title = document.querySelector(".newToDo>div:nth-of-type(2)>input").value;
    // description text in texterea (new to do moodal)
    const des = document.querySelector(".newToDo>div:nth-of-type(3)>textarea").value;
    // create random id => each note hase diffrent id
    let noteId = (Math.random() * 1000000).toFixed()
    // data in resulteDate div (new to do modal)
    let date = document.querySelector(".resulteDate")
    // time clock div (new to do modal)
    let timeH = document.querySelector(".clock>div:first-of-type>.selectedHour").textContent
    let timeM = document.querySelector(".clock>div:first-of-type>.SelectMinutes").textContent
    let targetTime = `${timeH}:${timeM}`
    // if user don not want to choose time and date
    if (!isDivVisible) {
        // chick validaition 
        if (!validate(title, des)) {
            let errorMessage = new ErrorMsg("Check the title and description", newToDo)
            errorMessage.positionTemplate()
            // if user fill the title & description
        } else {
            // create obj from Note class
            let saveInDom = new Note(title, des, noteId, date.textContent, targetTime);
            const saveInLs = new NoteLs()
            // use obj for add note to DOM + LS
            saveInDom.addNewNote()
            // save note in local storage
            saveInLs.addNoteInLS(title, noteId, des, date.textContent, targetTime)
            // change style in new to do modal
            newToDo.style.display = 'none';
            document.querySelector(".newToDo>div:nth-of-type(2)>input").value = "";
            document.querySelector(".newToDo>div:nth-of-type(3)>textarea").value = "";
            // defualt set current date for notes
            resulteDate.textContent = `${new Calendar().date.getFullYear()}/${new Calendar().date.getMonth() + 1}/${new Calendar().date.getDate()}`
        }
        // if user want to choose time and date
    } else {
        // first check the validation of title and description
        if (!validate(title, des)) {
            let errorMessage = new ErrorMsg("Check the title and description", newToDo)
            errorMessage.positionTemplate()
        } else {
            // if user choose date
            if (calendarCount >= 1) {
                // if user choose time
                if (timeCount >= 3) {
                    // if user target date was today
                    if (`${new Calendar().date.getFullYear()}/${new Calendar().date.getMonth() + 1}/${new Calendar().date.getDate()}` == resulteDate.textContent) {
                        // if user selected previous time that now
                        if (!checkTimeNewNode(document.querySelector('.selectedHour').textContent, document.querySelector('.SelectMinutes').textContent)) {
                            let errorMessage = new ErrorMsg("don't choose pass time", newToDo)
                            errorMessage.positionTemplate()
                            // // if user did not selected previous time that now
                        } else {
                            // create obj from Note class
                            let saveInDom = new Note(title, des, noteId, date.textContent, targetTime);
                            const saveInLs = new NoteLs()
                            // use obj for add note to DOM + LS
                            saveInDom.addNewNote()
                            // save note in local storage
                            saveInLs.addNoteInLS(title, noteId, des, date.textContent, targetTime)
                            // show alarm when user target date is arive
                            let alarm = new Alarm(date.textContent, timeH, timeM, null, noteId)
                            alarm.setAlarm()
                            // change style in new to do modal
                            cancelNote()

                            timeCount = 0
                        }
                        // if user target date was future
                    } else {
                        // create obj from Note class
                        let saveInDom = new Note(title, des, noteId, date.textContent, targetTime);
                        const saveInLs = new NoteLs()
                        // use obj for add note to DOM + LS
                        saveInDom.addNewNote()
                        // save note in local storage
                        saveInLs.addNoteInLS(title, noteId, des, date.textContent, targetTime)
                        // show alarm when user target date is arive
                        let alarm = new Alarm(date.textContent, timeH, timeM, null, noteId)
                        alarm.setAlarm()
                        // change style in new to do modal
                        cancelNote()

                        timeCount = 0
                    }
                } else {
                    let errorMessage = new ErrorMsg("choose your target time", newToDo)
                    errorMessage.positionTemplate()
                    console.log(timeCount);
                }
            } else {
                let errorMessage = new ErrorMsg("choose your target date", newToDo)
                errorMessage.positionTemplate()
            }
        }
    }
    saveCount = 0
}


// if user cancel the save note 
function cancelNote() {
    // change style in new to do modal
    newToDo.style.display = 'none';
    document.querySelector(".newToDo>div:nth-of-type(2)>input").value = "";
    document.querySelector(".newToDo>div:nth-of-type(3)>textarea").value = "";
    // data in resulteDate div (new to do modal)
    // let date = document.querySelector(".resulteDate")
    resulteDate.textContent = `${new Calendar().date.getFullYear()}/${new Calendar().date.getMonth() + 1}/${new Calendar().date.getDate()}`

    selectedHour.textContent = new Date().getHours()
    SelectMinutes.textContent = new Date().getMinutes()
    if (isDivVisible) {
        svgPosition(-38)
        dateButton.style = "background: rgba(255, 255, 255, 0.56);"
        // show date div
        date.style.display = "none"
        isDivVisible = false
        calendarCount = 0
        timeCount = 0
    }
}
// validation for add note
function validate(tit, des) {
    let status = false;
    if (tit == "" && des == "" || tit.length > 13) {
        status = false;
    } else {
        status = true;
    }
    return status
}

function checkTimeNewNode(e, x) {
    let status = false
    if (e < getNewYears().hour) {
        status = false
    } else if (e == getNewYears().hour) {
        if (x < getNewYears().minutes) {
            status = false
        } else {
            // alert('dorostrh');
            status = true
        }
    } else {
        status = true
    }
    return status
}

// Get the current year and convert it to type number
function getNewYears() {
    // saet
    let hour = new Date().getHours()
    // daghigeh
    let minutes = new Date().getMinutes()

    return {
        hour,
        minutes
    }
}




// Convert string to number
function toNumber(info) {
    // To recognize the language of numbers, this array is created
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

    // Convert Persian and Arabic numbers to English
    for (let i = 0; i < 10; i++) {
        info = info.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
    }

    // tabdil type string be number
    info = parseInt(info)
    // Returns a number by typing a number
    return info
}

// for show next month in calendar
function nextMonth() {
    cal.nextMonth()
    cal.renderCalendar()
}
// for show previuse month in calendar
function prevMonth() {
    cal.prevMonth()
    cal.renderCalendar()
}

// shoeing calendar
function showCalender() {
    calendarModal.style.display = "flex";
    cal.renderCalendar()
}







let count = 0
let calendarCount = 0
// 
function full(e) {
    count++
    if (count == 2) {
        if (e.target.getAttribute("data-id")) {
            // calendar header (month)
            let calendarHeader = document.querySelector(".calendarHeader>div>h3")
            // get user target date
            let date = parseInt(e.target.getAttribute("data-id"))
            // get user target month
            // +1 => becouse in js month start with 0 and our month start with 1
            let monthValue = parseInt(calendarHeader.getAttribute("value")) + 1
            // get user target year
            let yearValue = calendarYear.getAttribute("value")
            // checking condition of calendar
            if (calendarValidate(yearValue, monthValue, date)) {
                // show result
                resulteDate.innerHTML = `${yearValue}/${monthValue}/${date}`
                // hide calendar
                calendarModal.style.display = 'none'
                calendarCount += 1
            } else {
                calendarModal.style.display = 'flex'
                calendarCount = 0
            }
        }
        count = 0
    }
}

function calendarValidate(yearValue, monthValue, date) {
    // first check the year => if target year is less than current year, then calendar does not send value
    if (parseInt(yearValue) < new Date().getFullYear()) {
        return false;
        // secends must check the month => if target month is less than current month, then calendar does not send value
    } else if (parseInt(yearValue) == new Date().getFullYear() && parseInt(monthValue) < new Date().getMonth() + 1) {
        return false;
        // finaly must check the date => if target date is less than current date, then calendar does not send value
    } else if ((parseInt(yearValue) == new Date().getFullYear()) && (parseInt(monthValue) == new Date().getMonth() + 1) && (parseInt(date) < new Date().getDate())) {
        return false;
        // but if all the conditions are true, so calendar send the value and change display to "none"
    } else {
        return true;
    };
}



// --------------------- clock --------------------------
function setClock(e) {
    if (e.target.classList.contains('clock')) {
        new Clock().template()
    }
}
// for count how many time user click on clock modal
let timeCount = 0
// adding time divition
function addTime(e) {
    // if parent target user click, its class name is hours
    if (e.target.parentElement == hours) {
        // add hours to divition
        selectedHour.textContent = e.target.textContent
        timeCount += 1
    }
    // if parent target user click, its class name is minutes
    if (e.target.parentElement == minutes) {
        // add minutes to divition
        SelectMinutes.textContent = e.target.textContent
        timeCount += 2
    }
    // if click count of user is less that 3 times
    if (timeCount < 3) {
        document.querySelector(".clock-modal").style.display = "block";
        document.querySelector(".clock-modal02").style.display = "block"
    } else {
        document.querySelector(".clock-modal").style.display = "none";
        document.querySelector(".clock-modal02").style.display = "none"
    }

}

// stop modal
function stopAlarm() {
    document.querySelector(".alarmtemplate").remove()
}

//     console.log(calendarModal);
//     console.log("ok");

//     calendarModal.addEventListener("click", () => {
//         let lastDayy = new Calendar().lastDay
//         console.log(lastDayy);
//         days.forEach((i, index) => {
//             for (let i = 0; i < array.length; i++) {
//                 const element = array[i];

//             }
//             console.log(index);
//         })
//     })


//     // calendarModal.style.display = "none"

//     // let month = document.querySelector(".calendarHeader>div h3").textContent
//     // let year = document.querySelector(".calendarHeader>div>p").textContent
//     // year.toString()
//     // console.log(yearSpan, monthSpan, daySpan);
//     // let day = e.target.value
//     // yearSpan.textContent = `${year}/`
//     // monthSpan.textContent = `${month}/`
//     // daySpan.textContent = day
// }
// ...........................

// show notes in folder
function showNoteInFolder(e) {
    // If you click on the folder
    if (e.target.classList.contains('folder')) {
        //set the title folder
        addBtnNewHeader(e.target.querySelector('h3').textContent, e.target.classList[0])
        // show page notes in folder
        changeSectionInMain(4)
        new ShowNoteInFolderByLs(e.target.classList[0]).getNotesInLs()
        folderName.textContent = e.target.querySelector('h3').textContent
        // If you click on the title folder
    } else if (e.target.classList.contains('h3')) {
        //set the title folder
        addBtnNewHeader(e.target.textContent, e.target.parentElement.parentElement.classList[0])
        // show page notes in folder
        changeSectionInMain(4)
        new ShowNoteInFolderByLs(e.target.parentElement.parentElement.classList[0]).getNotesInLs()
        folderName.textContent = e.target.textContent
    }
}

// Description in removeBtnHeader function
let info = 0

function addBtnNewHeader(valueTitleFolder, x) {
    info++
    removeBtnHeader(info)
    // create new btn 
    let newLi = `<li id="liActiveNow" class="${x}" value="4">${valueTitleFolder}</li>`
    // show new btn in header for title folder( new / show )
    navHeader.insertAdjacentHTML('beforeend', newLi)
}

// remove btn title folder in header
function removeBtnHeader(info) {
    // In the first click, info is 0, and in the second click, info becomes more than 0
    // When it leaves a folder and goes to another folder, so that the first one is deleted and the new folder title is displayed.
    // We leave the info at 0 in the first step
    if (info > 1) {
        document.querySelector('#liActiveNow').remove()
    }
}


// --------------------  ADD NEW NOTE IN FOLDER ---------------------

// The command to add a note in the local storage of notes and folders and create the desired folder and all section on the page
function addNewNoteInFolder() {
    // Get the title entered in the note
    let tit = document.querySelector('#activeNow #tilte').value
    // Receive the description entered in the note
    let des = document.querySelector('#activeNow #des').value
    // Create a random ID
    let noteId = (Math.random() * 1000000).toFixed()
    // set 1 = id folder for create new note in folder
    // set 2 = id random
    // set 3 = title new note
    // set 4 = description new note
    new AddNoteInFolder().addNoteInDom(document.querySelector('#liActiveNow').classList, noteId, tit, des)
    // Hide the modal to create a new note in the folder
    closeModalNewNoteInFolder()
}

// By clicking on the folder menu, the display of the folder menu will be flexed
function showModalMenuFolder() {
    modalMenuFolder.style.display = 'flex'
}

// Click the delete button to hide the menu
// The modal display of the question is to be flexed
function showModalDeleteFolder() {
    modalMenuFolder.style.display = 'none'
    bacModalDeleteFolder.style.display = 'flex'
}

// With the no button, display the question modal to indicate none
function closeModalDeleteFolder() {
    bacModalDeleteFolder.style.display = 'none'
}

// With the Use button, display the question modal to delete none
// Delete the folder from local storage and DOM
function deleteFolderInDomAndLs() {
    bacModalDeleteFolder.style.display = 'none'
    let liActiveNow = document.querySelector('#liActiveNow').classList[0]
    let lsFolder = JSON.parse(localStorage.getItem('folders'))

    lsFolder.forEach(
        (idFolder, indexFolder) => {
            if (toNumber(liActiveNow) == idFolder.folderID) {
                console.log(idFolder.folderID);
                lsFolder.splice(indexFolder, 1)
            }
        }
    );
    lsFolder = JSON.stringify(lsFolder)
    localStorage.setItem('folders', lsFolder)

    changeSectionInMain(2)
    document.querySelector('#liActiveNow').remove()
    info = 0
}

let y = localStorage.setItem('newNote', '[]')

function showValueNote(IDR, tit, des) {
    let x = localStorage.getItem('newNote')
    x = JSON.parse(x)
    let info = {
        IDR: IDR,
        tit: tit,
        des: des
    }
    x.push(info)
    x = JSON.stringify(x)

    localStorage.setItem('newNote', x)



    changeSectionInMain(3)
}