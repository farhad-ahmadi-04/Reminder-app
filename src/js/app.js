// ---varibles--
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
const dateButtonSvg = document.querySelector(".time>div>button>svg"); //svg in date btn in landing page
const date = document.querySelector(".date") // date section
const save = document.querySelector(".footerNewToDo>div:last-of-type");
const cancel = document.querySelector(".footerNewToDo>div:first-of-type");
const adding = document.querySelector(".adding")
const newToDo = document.querySelector(".newToDo")


// --event--
// if the click ul in nav header
navHeader.addEventListener('click', TabSwitchInMain)
dateButton.addEventListener("touchend", setDate) // when touched on btn in date section in landing page
save.addEventListener("touchend", saveNote)
// cancel.addEventListener("click", cancelNote)
adding.addEventListener("touchend", addTemplate) //show template for adding


// -- function---
// Switch main sections by clicking on the header navigation
function TabSwitchInMain(e) {
    // Get the value of the clicked element
    let info = e.target.value

    switch (info) {
        case 1:
            // Delete all main sections
            removeSection()
            // The display section is all flexed
            allSection.style.display = 'flex'
            break;
        case 2:
            // Delete all main sections
            removeSection()
            // The display section is folders flexed
            folderSection.style.display = 'flex'
            break;
        case 3:
            // Delete all main sections
            removeSection()
            console.log('3');
            break;
        case 4:
            // Delete all main sections
            removeSection()
            console.log('4');
            break;
    }
}


// Delete all main sections
function removeSection() {
    for (let i = 0; i < 4; i++) {
        let y = document.querySelectorAll('main section')[i]
        y.style.display = 'none'
    }
}

// show tremplate for add notre
function addTemplate() {
    newToDo.style.display = 'flex'
}

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
    let svgPosition = parseInt(getComputedStyle(dateButtonSvg).left);
    // change svg position to right or left
    let newLeft = svgPosition + num;
    dateButtonSvg.style.left = newLeft + 'px';
}

// save note to DOM
function saveNote() {
    const title = document.querySelector(".newToDo>div:nth-of-type(2)>input[type=text]").value;
    const des = document.querySelector(".newToDo>div:nth-of-type(3)>textarea").value;
    let noteId = (Math.random() * 1000000).toFixed()

    if (validate(title, des)) {
        let saving = new Note(title, des, noteId);
        saving.addNewNote()
        newToDo.style.display = 'none';
    } else {
        alert("RIP...")
    }
}

function validate(tit, des) {
    let status = false;
    if (tit == "" && des == "") {
        status = false;
    } else {
        status = true;
    }
    return status
}