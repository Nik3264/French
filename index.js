//import {Translate} from'@google-cloud/translate';
import Numbers from "./numbers.js";
import {getRandomInt, numberToString} from "./calculation.js";
const synth = window.speechSynthesis;

let voices = synth.getVoices();
synth.onvoiceschanged = () => {
  voices = synth.getVoices().filter(function (voice) { return voice.name === "Google français"; })[0];
}

const numbers=new Numbers();
const namesClasses=[
  {
    parent:'main', 
    startClassName:'start9999', 
    cardClassName:'card9999', 
    translateClassName:'translate9999', 
    soundClassName:'sound9999',
    maxNumber:9999,
  },
  {
    parent:'main', 
    startClassName:'start10', 
    cardClassName:'card10', 
    translateClassName:'translate10', 
    soundClassName:'sound10',
    maxNumber:10,
  },
  {
    parent:'main', 
    startClassName:'start60', 
    cardClassName:'card60', 
    translateClassName:'translate60', 
    soundClassName:'sound60',
    maxNumber:60,
  }
];

namesClasses.map((namesClass)=>{
  const {parent, startClassName, cardClassName, translateClassName, soundClassName, maxNumber}=namesClass;
  numbers.render(parent, startClassName, cardClassName, translateClassName, soundClassName, maxNumber);
});

const card = document.querySelectorAll(".card");
const cardTranslate = document.querySelectorAll(".card__translate");
const button = document.querySelectorAll(".card__button");
const buttonSpeak = document.querySelectorAll('.all');


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

function buttonStartHandler(maxNum, card, cardTranslate, soundButton){
  const number = getRandomInt(maxNum);
  card.innerHTML = number;
  const strNumber=numberToString(number);
  const numberTranslated = translateHandler(strNumber);
  cardTranslate.innerHTML=numberTranslated;

  let utterThis = new SpeechSynthesisUtterance(numberTranslated);
  utterThis.volume = 1;
  utterThis.rate = 1;
  utterThis.pitch = 1;
  utterThis.lang = "fr-FR";
  //utterThis.text = numberTranslated;
  soundButton.addEventListener("click", ()=>{
    synth.cancel();
    synth.speak(utterThis);
  });

}

button.forEach((button1,index)=>{
  let str=+button1.innerText.slice(6);
  console.log(str);
  button1.addEventListener("click", () => buttonStartHandler(str, card[index], cardTranslate[index], buttonSpeak[index]));
});

card.forEach((card1, index)=>{
  card1.addEventListener("click", ()=>{
    card1.classList.add("rotate");
    cardTranslate[index].classList.add("show");
  });
});

cardTranslate.forEach((cardTranslate1, index)=>{
  cardTranslate1.addEventListener("click",()=>{
    cardTranslate1.classList.remove("show");
    card[index].classList.remove("rotate");
  });
});

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
