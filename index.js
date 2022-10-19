
const card = document.querySelector(".card");
const button = document.querySelector(".card__button");


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

button.addEventListener("click", ()=>{
    card.innerHTML=getRandomInt(9999);
});