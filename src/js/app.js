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

// if the click ul in nav header
navHeader.addEventListener('click', TabSwitchInMain)

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