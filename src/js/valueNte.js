
function asdasd(IDR, tit, des) {
    document.querySelector('#nameNote').setAttribute('data-id', IDR)
    document.querySelector('#nameNote').textContent = tit
    document.querySelector('#paragraphNote').textContent = des
}

function loadValueNote() {
    let x = localStorage.getItem('newNote')
    x = JSON.parse(x)
    console.log(x);
    asdasd(x[0].IDR, x[0].tit, x[0].des)
}
loadValueNote()