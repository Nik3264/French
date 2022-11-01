//import {Translate} from'@google-cloud/translate';
import Numbers from "./numbers.js";
import Menuitem from "./menuitem.js";
import {getRandomInt, numberToString} from "./calculation.js";

const synth = window.speechSynthesis;

let voices = synth.getVoices();
synth.onvoiceschanged = () => {
  voices = synth.getVoices().filter(function (voice) { return voice.name === "Google français"; })[0];
}

const menuItem=new Menuitem();
const numbers=new Numbers();
const namesClasses=[
  {
    parent:'main', 
    startClassName:'start10', 
    cardClassName:'card10', 
    translateClassName:'translate10', 
    soundClassName:'sound10',
    minNumber:0,
    maxNumber:10,
  },
  {
    parent:'main', 
    startClassName:'start20', 
    cardClassName:'card20', 
    translateClassName:'translate20', 
    soundClassName:'sound20',
    minNumber:10,
    maxNumber:20,
  },
  {
    parent:'main', 
    startClassName:'start30', 
    cardClassName:'card30', 
    translateClassName:'translate30', 
    soundClassName:'sound30',
    minNumber:1,
    maxNumber:10,
  },
  {
    parent:'main', 
    startClassName:'start60', 
    cardClassName:'card60', 
    translateClassName:'translate60', 
    soundClassName:'sound60',
    minNumber:20,
    maxNumber:60,
  },
  {
    parent:'main', 
    startClassName:'start100', 
    cardClassName:'card100', 
    translateClassName:'translate100', 
    soundClassName:'sound100',
    minNumber:80,
    maxNumber:100,
  },
  {
    parent:'main', 
    startClassName:'start9999', 
    cardClassName:'card9999', 
    translateClassName:'translate9999', 
    soundClassName:'sound9999',
    minNumber:0,
    maxNumber:9999,
  },
  {
    parent:'main', 
    startClassName:'input', 
    cardClassName:'cardinput', 
    translateClassName:'translateinput', 
    soundClassName:'soundinput',
    minNumber:0,
    maxNumber:1,
  },
];

namesClasses.map((namesClass,i)=>{
  menuItem.render('nav',namesClass.startClassName,namesClass.minNumber, namesClass.maxNumber,i);
});

const nav=document.querySelector("nav");
const menu=document.querySelector(".menu");
const burger=document.querySelector(".burger");
const main=document.querySelector("main");

let card,
    cardTranslate,
    buttonStart,
    buttonSpeak,
    input,
    number;

nav.addEventListener("click",(event)=>{
  let target=event.target;
  let index = +target.getAttribute("number");
  console.log(index);
  let isInput = index===6 ? true : false;
  console.log(isInput);

  nav.classList.add("slide__left");

  const {parent, startClassName, cardClassName, translateClassName, soundClassName,minNumber, maxNumber}=namesClasses[index];
  numbers.render(parent, startClassName, cardClassName, translateClassName, soundClassName,minNumber, maxNumber, isInput);

  setTimeout(()=>{
    card = document.querySelector(".card");
    cardTranslate = document.querySelector(".card__translate");
    buttonStart = document.querySelector(".start");
    input=document.querySelector("input");
    buttonSpeak = document.querySelector('.all');
    console.log("card ",card);
    console.log("cardTranslate ",cardTranslate);
    console.log("buttonStart ",buttonStart);
    console.log("buttonSpeak ",buttonSpeak);

    buttonStart.addEventListener("click", ()=>{
      number = getRandomInt(minNumber,maxNumber);
      if (minNumber===1 && maxNumber===10){
        number*=10;
        //buttonStart.innerText="десятки";
      }
      console.log("maxNum", maxNumber);
      console.log("card", card);
      console.log("cardTranslate", cardTranslate);
      console.log("soundButton", buttonSpeak);
    
      myHandler(number);
    
    });
    
function myHandler(number){
  console.log(number);
  card.innerHTML = number;
  const strNumber=numberToString(number);
  console.log(strNumber);
  const numberTranslated = translateHandler(strNumber);
  cardTranslate.innerHTML=numberTranslated;

  let utterThis = new SpeechSynthesisUtterance(numberTranslated);
  utterThis.volume = 1;
  utterThis.rate = 1;
  utterThis.pitch = 1;
  utterThis.lang = "fr-FR";
  //utterThis.text = numberTranslated;
  buttonSpeak.addEventListener("click", ()=>{
    synth.cancel();
    synth.speak(utterThis);
  });
}
    input.addEventListener("input", ()=>{
      console.log(input.value);
      number=input.value;
      myHandler(number);
    });

    card.addEventListener("click", ()=>{
      card.classList.add("rotate");
      cardTranslate.classList.add("show");
    });
    
    cardTranslate.addEventListener("click",()=>{
      cardTranslate.classList.remove("show");
      card.classList.remove("rotate");
    });

  },50);

  main.classList.add("slide__top");
  menu.classList.remove("hidden");
  burger.classList.add("open");
  burger.classList.remove("open__away");
}); //button.addEventListener

menu.addEventListener("click",()=>{
  console.log("menu");
  
  burger.classList.remove("open");
  burger.classList.add("open__away");
  main.innerHTML="";
  menu.classList.add("hidden");
  main.classList.remove("slide__top");
  nav.classList.remove("slide__left");
});


function translateHandler(str){
  let sl="uk";
  let tl="fr";
  const originalText=str;
  let translateUrl = "https://translate.googleapis.com/translate_a/single?format=text&client=gtx&sl=" + sl + "&tl=" + tl + "&dt=t&q=" + originalText;
// sl – язык оригинала, tl – язык для перевода, originalText – текст запроса (можно использовать результат string.match(/.{1,2000}(?=\.)/gi))
  let translatedText = httpGet(translateUrl);

  function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  translatedText=translatedText.split(",")[0].replaceAll('[','').replaceAll('\"','');
  return translatedText;
}





   /*         async function speak(txt) {
              await initVoices();
              const u = new SpeechSynthesisUtterance(txt);
              console.log("getVoices()  befpre: ",speechSynthesis.getVoices());
              u.voice = speechSynthesis.getVoices()[2];
              u.lang="fr-FR";
              console.log("getVoices()  after: ",speechSynthesis.getVoices());
              console.log(u);
              speechSynthesis.speak(u);
            }
          
            function initVoices() {
              return new Promise(function (res, rej){
                speechSynthesis.getVoices();
                if (window.speechSynthesis.onvoiceschanged) {
                  res();
                } else {
                  window.speechSynthesis.onvoiceschanged = () => res();
                }
              });
            }
    speak(translatedText);*/
