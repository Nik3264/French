export default class Numbers {

     render(parent, startClassName, cardClassName, translateClassName, soundClassName, minNumber, maxNumber, input=false){
        let inputHidden = input ? "":"non";
        let cardHidden = input ? "non":"";
        console.log(inputHidden);
        let page= `
        <div class="container">
            <div class="wrap">
                <button class="${startClassName} start card__button ${cardHidden}">${minNumber} - ${maxNumber}</button>
            </div>  
            <input type="text" class="${cardClassName} card__button ${inputHidden}" placeholder="..."/>
            <div class="translate__wrap">
                <div class="${cardClassName} card ">5698</div>
                <div class="${translateClassName} card__translate">OK</div>
            </div>

            <button class="${soundClassName} all">&#128227;</button>
            
        </div>
        `;
        let parentNode=document.querySelector(parent);
        parentNode.innerHTML+=page;
    }
}

/*export default class Numbers {

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
}*/
