const myModal = $.modal();
const modalWin = document.querySelector('.gmail');
const modalWinNone = document.querySelectorAll('.win_none');

modalWin.addEventListener('click', ()=>{
    myModal.open();
})

for(let i of modalWinNone){
    i.addEventListener('click', ()=>{
        myModal.close();
    })
}
