export default class Menuitem {
    render(parent, startClassName, minNumber=0, maxNumber, number){
       let page= `
       <div class="container">
           <div class="wrap">
               <button class="${startClassName} nav card__button" number="${number}">${minNumber} - ${maxNumber}</button>
           </div>            
       </div>
       `;
       let parentNode=document.querySelector(parent);
       parentNode.innerHTML+=page;
   }
}