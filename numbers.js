export default class Numbers {

     render(parent, startClassName, cardClassName, translateClassName, soundClassName, maxNumber){
        let page= `
        <div class="container">
            <div class="wrap">
                <button class="${startClassName} card__button">start ${maxNumber}</button>
                <div class="${cardClassName} card">5698</div>
            </div>
            <div class="translate__wrap">
                <div class="${translateClassName} card__translate">OK</div>
                <button class="${soundClassName} all">&#128227;</button>
            </div>
        </div>
        `;
        let parentNode=document.querySelector(parent);
        parentNode.innerHTML+=page;
    }
}
