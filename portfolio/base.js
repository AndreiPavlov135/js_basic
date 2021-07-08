const $ = {};
function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('my_modal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal_overlay">
            <div class="modal_window">
                <div class="modal_header">
                    <span class="modal_titel">Gmail:</span>
                    <span class="modal_close win_none">&times;</span>
                </div>
                <div class="modal_body"><span>9000andrey@gmail.com</span></div>
                <div class="modal_footer">
                    <button class="win_none">Ok</button>
                </div>
            </div>
        </div>
    `)
    document.body.appendChild(modal);
    return modal;
}

$.modal = function (options){
    const $modal = _createModal(options);
    let closing = false;
    return {
        open() {
            !closing && $modal.classList.add('open')
        },
        close() {
            closing =  true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(()=>{
                $modal.classList.remove('hide');
                closing = false;
            }, 400);
        },
        destroy() {}
    }
}
