//import {Translate} from'@google-cloud/translate';



const card = document.querySelector(".card");
const cardTranslate = document.querySelector(".card__translate");
const button = document.querySelector(".card__button");
const buttonSpeak = document.querySelector("#speak");
let number;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function numberToString(number) {
  let units = number % 10;
  const dozens = Math.floor(number / 10) % 10;
  const hundreds = Math.floor(number / 100) % 10;
  const thousands = Math.floor(number / 1000) % 10;

  console.log(units, " ", dozens, " ", hundreds, " ", thousands);
  const listOfThousands = ["тисяча", "тисячі", "тисяч"];
  const listOfHundreds = [
    "сто",
    "двісті",
    "триста",
    "чотириста",
    "пятсот",
    "шістсот",
    "сімсот",
    "вісімсот",
    "девятсот",
  ];
  const listOfDozens = [
    "",
    "двадцять",
    "тридцять",
    "сорок",
    "пятдесят",
    "шістдесят",
    "сімдесят",
    "вісімдесят",
    "девяносто",
  ];
  const listOfTeens = [
    "одинадцять",
    "дванадцять",
    "тринадцять",
    "чотирнадцять",
    "пятнадцять",
    "шістнадцять",
    "сімнадцять",
    "вісімнадцять",
    "девятнадцять",
  ];
  const listOfUnits = [
    "один",
    "два",
    "три",
    "чотири",
    "пять",
    "шість",
    "сім",
    "вісім",
    "девять",
  ];

  let str =
    (thousands == 1
      ? listOfThousands[0]
      : thousands < 5
      ? listOfUnits[thousands-1] +" " + listOfThousands[1]
      : listOfUnits[thousands-1] +" " + listOfThousands[2]) + " ";
  str += (hundreds ? listOfHundreds[hundreds - 1] : "") + " ";
  str += (dozens ? listOfDozens[dozens - 1] : "") + " ";
  str += (dozens == 1 ? listOfTeens[units - 1] : "") + " ";
  units = dozens == 1 ? 0 : units;
  str += units ? listOfUnits[units - 1] : "";

  return str;
}

function showResponse(response) {
  cardTranslate.innerHTML = response.data.translations[0].translatedText;
}

button.addEventListener("click", () => {
  number = getRandomInt(9999);
  card.innerHTML = number;
  const strNumber=numberToString(number);
  console.log(strNumber);

  let sl="uk";
  let tl="fr";
  const originalText=strNumber;
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
  console.log("translatedText",translatedText);
  cardTranslate.innerHTML=translatedText;

  const synth = window.speechSynthesis;
  console.log("synth", synth);
  let voices = synth.getVoices();
  synth.onvoiceschanged = () => {
    voices = synth.getVoices().filter(function (voice) { return voice.name === "Google français"; })[0];

    //populateVoices(voices)
  }

  console.log(voices);

  let utterThis = new SpeechSynthesisUtterance(translatedText);
    
  utterThis.volume = 1;
  utterThis.rate = 1;
  utterThis.pitch = 1;
  utterThis.lang = "fr-FR";
  utterThis.text =translatedText;
  //speechSynthesis.speak(utterThis);

  console.log("utterThis", utterThis);

  speak.addEventListener("click", ()=>{
    synth.cancel();
    synth.speak(utterThis);

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
  });

  //"Google français" Female	French	fr-FR

  //let voice1 = { voiceURI: "Google Franch", name: "Google Franch", lang: "fr-FR", localService: false, default: false };

  //utterThis.voice=voice1;


});
