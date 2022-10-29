
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
 export function numberToString(number) {
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

  export default {getRandomInt, numberToString};