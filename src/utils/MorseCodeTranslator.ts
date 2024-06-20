
type ob = {[key:string]:string}
const morseCodeMap : ob = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/'
  };
  
  const textToMorse = (text:string) => {
    return text.toUpperCase().split('').map(char => morseCodeMap[char] || '').join(' ');
  };
  
  const morseToText = (morse:string) => {
    const reversedMorseCodeMap : ob = Object.entries(morseCodeMap).reduce((acc:ob, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});
    return morse.split(' ').map(code => reversedMorseCodeMap[code] || '').join('');
  };
  
  export { textToMorse, morseToText };