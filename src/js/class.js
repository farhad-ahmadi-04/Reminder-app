// variables
const settingSvg = `<svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9378 5.86295C11.8318 5.7626 11.7733 5.63358 11.7733 5.5C11.7733 5.36642 11.8318 5.2374 11.9378 5.13705L12.7847 4.34516C12.878 4.25864 12.936 4.14977 12.9502 4.03418C12.9645 3.91859 12.9343 3.80221 12.8641 3.70174L11.5409 1.799C11.4713 1.69865 11.3655 1.61911 11.2383 1.57171C11.1112 1.52431 10.9693 1.51148 10.8329 1.53504L9.5891 1.74401C9.43083 1.77119 9.26606 1.74928 9.12589 1.68242C8.98572 1.61555 8.87984 1.50836 8.82824 1.38106L8.42465 0.374697C8.38027 0.26547 8.29571 0.170601 8.18292 0.103497C8.07013 0.0363934 7.93482 0.000450277 7.79612 0.000747875H5.14966C5.00538 -0.00551139 4.8626 0.0276537 4.74313 0.0951778C4.62367 0.162702 4.53407 0.260873 4.48804 0.374697L4.11753 1.38106C4.06593 1.50836 3.96005 1.61555 3.81988 1.68242C3.67971 1.74928 3.51495 1.77119 3.35668 1.74401L2.07976 1.53504C1.95044 1.51985 1.81862 1.53681 1.70088 1.58378C1.58314 1.63076 1.48477 1.70564 1.41814 1.799L0.0949094 3.70174C0.0228992 3.80109 -0.00947893 3.91681 0.00240401 4.03237C0.014287 4.14793 0.0698225 4.25741 0.161071 4.34516L1.00132 5.13705C1.10739 5.2374 1.16589 5.36642 1.16589 5.5C1.16589 5.63358 1.10739 5.7626 1.00132 5.86295L0.161071 6.65484C0.0698225 6.74259 0.014287 6.85207 0.00240401 6.96763C-0.00947893 7.08319 0.0228992 7.19891 0.0949094 7.29826L1.41814 9.201C1.48768 9.30135 1.59355 9.38089 1.72067 9.42829C1.84778 9.47569 1.98966 9.48852 2.12607 9.46496L3.36991 9.25599C3.52818 9.22881 3.69294 9.25072 3.83311 9.31758C3.97328 9.38445 4.07916 9.49164 4.13077 9.61894L4.53435 10.6253C4.58039 10.7391 4.66998 10.8373 4.78945 10.9048C4.90892 10.9723 5.05169 11.0055 5.19597 10.9993H7.84243C7.98114 10.9995 8.11644 10.9636 8.22923 10.8965C8.34202 10.8294 8.42658 10.7345 8.47097 10.6253L8.87455 9.61894C8.92616 9.49164 9.03204 9.38445 9.1722 9.31758C9.31237 9.25072 9.47714 9.22881 9.63541 9.25599L10.8792 9.46496C11.0157 9.48852 11.1575 9.47569 11.2847 9.42829C11.4118 9.38089 11.5176 9.30135 11.5872 9.201L12.9104 7.29826C12.9807 7.19779 13.0108 7.08141 12.9965 6.96582C12.9823 6.85023 12.9243 6.74136 12.831 6.65484L11.9378 5.86295ZM10.952 6.59985L11.4813 7.09478L10.6345 8.31562L9.85374 8.18363C9.37723 8.10267 8.88155 8.16995 8.46078 8.3727C8.04 8.57545 7.72344 8.89955 7.57117 9.28348L7.31976 9.8994H5.62602L5.38784 9.27249C5.23557 8.88855 4.919 8.56445 4.49823 8.3617C4.07746 8.15895 3.58177 8.09168 3.10526 8.17264L2.32455 8.30462L1.46445 7.08928L1.99375 6.59435C2.31923 6.29188 2.49918 5.90031 2.49918 5.4945C2.49918 5.08869 2.31923 4.69712 1.99375 4.39465L1.46445 3.89972L2.31132 2.68988L3.09203 2.82186C3.56854 2.90283 4.06423 2.83555 4.485 2.6328C4.90577 2.43005 5.22234 2.10595 5.3746 1.72201L5.62602 1.1006H7.31976L7.57117 1.72751C7.72344 2.11145 8.04 2.43555 8.46078 2.6383C8.88155 2.84105 9.37723 2.90832 9.85374 2.82736L10.6345 2.69538L11.4813 3.91622L10.952 4.41115C10.6302 4.71292 10.4525 5.10223 10.4525 5.5055C10.4525 5.90877 10.6302 6.29807 10.952 6.59985ZM6.47289 3.3003C5.94947 3.3003 5.4378 3.42931 5.00259 3.67102C4.56738 3.91272 4.22818 4.25627 4.02787 4.65821C3.82757 5.06015 3.77516 5.50244 3.87727 5.92914C3.97939 6.35584 4.23144 6.74779 4.60155 7.05542C4.97167 7.36306 5.44322 7.57256 5.95659 7.65743C6.46995 7.74231 7.00207 7.69875 7.48564 7.53226C7.96922 7.36577 8.38254 7.08383 8.67334 6.72209C8.96414 6.36035 9.11935 5.93506 9.11935 5.5C9.11935 4.9166 8.84053 4.3571 8.34422 3.94458C7.84791 3.53205 7.17477 3.3003 6.47289 3.3003ZM6.47289 6.59985C6.21118 6.59985 5.95534 6.53535 5.73774 6.41449C5.52013 6.29364 5.35053 6.12187 5.25038 5.92089C5.15023 5.71992 5.12402 5.49878 5.17508 5.28543C5.22614 5.07208 5.35216 4.87611 5.53722 4.72229C5.72228 4.56847 5.95806 4.46372 6.21474 4.42128C6.47142 4.37884 6.73748 4.40063 6.97927 4.48387C7.22105 4.56712 7.42771 4.70809 7.57311 4.88896C7.71851 5.06983 7.79612 5.28247 7.79612 5.5C7.79612 5.7917 7.65671 6.07145 7.40855 6.27771C7.1604 6.48397 6.82383 6.59985 6.47289 6.59985Z" fill="#DCDCDC"/>
</svg>
`
const clockSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
<path d="M3.528 0.835651L2.757 0L0 2.10551L0.771 2.94116L3.528 0.835651ZM12 2.10824L9.243 0.00273088L8.472 0.838381L11.229 2.94389L12 2.10824ZM5.997 1.16882C3.012 1.16882 0.6 3.36991 0.6 6.08441C0.6 8.79891 3.012 11 5.997 11C8.982 11 11.4 8.79891 11.4 6.08441C11.4 3.36991 8.982 1.16882 5.997 1.16882ZM6 9.90765C3.681 9.90765 1.8 8.19538 1.8 6.08441C1.8 3.97344 3.681 2.26117 6 2.26117C8.319 2.26117 10.2 3.97344 10.2 6.08441C10.2 8.19538 8.322 9.90765 6 9.90765ZM6.6 3.8997H5.4V5.53823H3.6V6.63059H5.4V8.26912H6.6V6.63059H8.4V5.53823H6.6V3.8997Z" fill="#DCDCDC"/>
</svg>`
const mainUl = document.querySelector("main>.notes>ul")



// classes

class Note {

    // constructor

    constructor(title, description, noteID) {

        this.title = title;
        this.description = description;
        this.noteID = noteID;
    }
    // methods

    // Templates
    // note Template
    noteTemplate(notwTitle, noteID, noteText) {
        return `
        <li data-id='${noteID}'>
            <div>
                <div>${settingSvg}</div>
                <h3>${notwTitle}</h3>
                <div>${clockSvg}</div>
            </div>
            <div>
                <textarea data-id=>${noteText}</textarea>
            </div>
        </li>
    `
    }

    // functions

    laodNotesInPage() {
        let laodTime = laodOfLS()

        laodTime.forEach(
            function (eachNote) {
                addNoteToNoteList(eachNote.noteText, eachNote.ID)
            }
        )
    }

    // add new note in notelist

    addNoteToNoteList(notwTitle, noteID, noteText) {
        mainUl
            .insertAdjacentHTML('afterbegin', this.noteTemplate(notwTitle, noteID, noteText))
    }

    addNewNote() {

        // for add note+save in LocalStorage
        this.addNoteToNoteList(this.title, this.noteId, this.description)

        // save note
        this.addNoteInLS(this.title, this.noteId, this.description)
    }


    // remove function from DOM & LS
    remove(event) {
        event.preventDefault()
        // 1- remove from DOM
        console.log(event);
        if (event.target.classList.contains('removeBtn')) {
            event.target.parentElement.remove()
        }
        // 2-remove from LS
        let noteRId = event.target.parentElement.getAttribute('data-id')
        this.removeFromLS(noteRId)
    }

    removeFromLS(removeNote) {
        //  2-remove from LS
        //      2.1-first we load our notes
        let LSNotes = this.laodOfLS()
        //      2.2-remove text from LS
        LSNotes.forEach(
            function (eachNote, noteIndex) {
                if (removeNote == eachNote.ID) {
                    LSNotes.splice(noteIndex, 1)
                }
            })

        //      2.3-send that remove list to LS(update)
        this.saveNoteInLS(LSNotes)
    }
    // add note in local storage
    addNoteInLS(note, noteID) {
        // نوت جدید پوش میکنیم
        // 1 load LS note 
        let LSNotes = this.laodOfLS()

        // 2 add new notes
        LSNotes.push({
            noteText: note,
            ID: noteID
        })
        // 3 save notes in LS
        this.saveNoteInLS(LSNotes)
    }
    // function for load all notes from LS
    laodOfLS() {
        // 1 load LS note 
        let LSNotes = JSON.parse(localStorage.getItem('Notes'))
        if (LSNotes == null) {
            localStorage.setItem('Notes', '[]')
            LSNotes = JSON.parse(localStorage.getItem('Notes'))
        }
        return LSNotes
    }
    // save note function to LS
    saveNoteInLS(Notes) {
        // 3 save notes in LS
        let LSNotes = Notes
        LSNotes = JSON.stringify(LSNotes)
        localStorage.setItem('Notes', LSNotes)
    }
}