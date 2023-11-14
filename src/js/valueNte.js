function setDataInDom(IDR, tit, des) {
    document.querySelector('#nameNote').setAttribute('data-id', IDR)
    document.querySelector('#nameNote').textContent = tit
    document.querySelector('#paragraphNote').textContent = des
}

function loadValueNote() {
    let LSNewNote = localStorage.getItem('newNote')
    LSNewNote = JSON.parse(LSNewNote)
    console.log(LSNewNote);
    setDataInDom(LSNewNote[0].IDR, LSNewNote[0].tit, LSNewNote[0].des)
}
loadValueNote()