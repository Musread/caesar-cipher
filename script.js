"use strict";

// $$$$$$ VARIABLES $$$$$$$$$

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// const words = [{ word: "france", key: randomNumber(5) }];

const buttonValidate = document.querySelector(".button__validate");
const buttonNext = document.querySelector(".button__next");
const cryptedWord = document.querySelector(".crypted-word");
const keyNumber = document.querySelector(".key-number");
const secretWord = document.querySelector(".secret-word");
const score = document.querySelector(".score");

let level, words;

// $$$$$$$$$$$$$$$$$$$$$$$$$

// $$$$$$ FUNCTIONS $$$$$$$$$

const nextLevel = function () {
  level++;
  localStorage.setItem("level", level);
  score.textContent = `${level + 1} / ${words.length}`;
  cryptedWord.textContent = encryption(words[level].word, words[level].key);
  keyNumber.textContent = words[level].key;
  secretWord.value = "";
};

const displayButtonNext = function () {
  secretWord.classList.add("secret-word__success");
  buttonNext.style.display = "inline-block";
};

const errorAnimation = function () {
  secretWord.classList.remove("animate__animated", "animate__shakeX");
  secretWord.classList.add("animate__animated", "animate__shakeX");
  secretWord.classList.remove("secret-word__error");
  secretWord.classList.add("secret-word__error");
};

const undisplayButtonNext = function () {
  secretWord.classList.remove("secret-word__success");
  buttonNext.style.display = "none";
};

const randomNumber = function (number) {
  return Math.trunc(Math.random() * number + 1);
};

const loadTab = function () {
  return JSON.parse(localStorage.getItem("words"));
};

const saveTab = function (tab) {
  localStorage.setItem("words", JSON.stringify(tab));
};

const saveLevel = function () {
  localStorage.setItem("level", level);
};

const createTab = function () {
  // const dictionary = [
  //   "rome",
  //   "pompei",
  //   "poivre",
  //   "asterix",
  //   "bouclier",
  //   "tour",
  //   "coussin",
  //   "pseudo",
  //   "orange",
  //   "pikachu",
  //   "soleil",
  //   "musique",
  //   "fruit",
  //   "egypte",
  //   "uglydeer",
  //   "mario",
  //   "capumain",
  //   "raiponce",
  //   "milan",
  //   "cesar",
  //   "soprano",
  //   "securite",
  //   "solstice",
  //   "grece",
  //   "ciel",
  // ];

  const dictionary = [
    "ucla",
    "fuse",
    "planner",
    "secours",
    "same",
    "facebook",
    "insecte",
    "atlanta",
    "google",
    "troie",
    "managing",
    "soldat",
    "number",
    "pissenlit",
    "football",
    "argentine",
    "venise",
    "dictionnaire",
    "ballon",
    "abysse",
  ];
  const dictionaryLength = dictionary.length;
  const words = [];

  for (let i = 0; i < dictionaryLength; i++) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    words.push({
      word: dictionary[randomIndex],
      key: randomNumber(15),
    });
    dictionary.splice(randomIndex, 1);
  }
  return words;
};

const initTab = function () {
  if (localStorage.getItem("words")) {
    return loadTab();
  } else {
    return createTab();
  }
};

const encryption = function (word, key) {
  let crypted_word = "";
  for (let i = 0; i < word.length; i++) {
    const characterIndex = alphabet.indexOf(word.charAt(i).toUpperCase());
    crypted_word +=
      characterIndex - key < 0
        ? alphabet[26 - Math.abs(characterIndex - key)]
        : alphabet[characterIndex - key];
  }
  return crypted_word;
};

const victory = function () {
  console.log("Victoire");
  document.querySelector(".left-section").style.display = "none";
  document.querySelector(".right-section").style.display = "none";
  document.querySelector(".victory").style.display = "block";
};

// $$$$$$$$$$$$$$$$$$$$$$$$$

// $$$$$$ EVENTS $$$$$$$$$

buttonValidate.addEventListener("click", function () {
  if (secretWord.value.toLowerCase() === words[level].word) {
    if (level === words.length - 1) {
      victory();
    } else {
      displayButtonNext();
    }
  } else {
    console.log("Wrong answer.");
    errorAnimation();
  }
});

buttonNext.addEventListener("click", function () {
  nextLevel();
  undisplayButtonNext();
});

secretWord.addEventListener("click", function () {
  secretWord.classList.remove("secret-word__error");
});
// $$$$$$$$$$$$$$$$$$$$$$$$$

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$ THE GAME $$$$$$$$$$$$$$$$$$$$$$$$$$$$$

words = initTab();
saveTab(words);
level = localStorage.getItem("level")
  ? parseInt(localStorage.getItem("level"))
  : 0;
saveLevel();
cryptedWord.textContent = encryption(words[level].word, words[level].key);
keyNumber.textContent = words[level].key;
score.textContent = `${level + 1} / ${words.length}`;

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
