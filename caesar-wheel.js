const innerWheel = document.querySelector(".caesarWheel__inner");
const outerWheelLetters = document.querySelectorAll(
  ".caesarWheel__letter--outside",
);
const innerWheelLetters = document.querySelectorAll(
  ".caesarWheel__letter--inside",
);
const plusButton = document.querySelector(".add");
const minusButton = document.querySelector(".minus");
const caesarKey = document.querySelector(".keyNumber");

const nbLetters = 26;
let key = 0;
const gap = 360 / nbLetters;

for (let i = 0; i <= nbLetters - 1; i++) {
  outerWheelLetters[i].style.transform = `rotate(${gap * i}deg)`;
  innerWheelLetters[i].style.transform = `rotate(${gap * i}deg)`;
}

const turnWheel = function (step) {
  innerWheel.style.transform = `translate(-50%, -50%) rotate(${gap * step}deg)`;
};

plusButton.addEventListener("click", function () {
  if (key >= 0 && key < 25) {
    key++;
    caesarKey.textContent = key;
    turnWheel(key);
  }
});

minusButton.addEventListener("click", function () {
  if (key > 0) {
    key--;
    caesarKey.textContent = key;
    turnWheel(key);
  }
});
