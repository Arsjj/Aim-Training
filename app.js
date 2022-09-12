const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector("#board")
const chooseTimeButton = document.querySelector("#button")
const chooseTimeElement = document.querySelector(".time-bt")
const input = document.querySelector('input')

let time = 0
let score = 0

const colors = [
  "red",
  "blue",
  "#00fa9a",
  "yelllow",
  "orange",
  "#40e0d0",
  "#9370db",
  "90deg, #33ccff 0%, #ff99cc 100%",
  "90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%"
];


chooseTimeButton.addEventListener('click', () => {
  if (parseInt(input.value) < 0 || isNaN(input.value) || input.value.length === 0) {
    alert('Пожалуйста введите число большое 100')
  } else {
    chooseTimeElement.remove()
    const newBtn = document.createElement('li')
    newBtn.innerHTML = `${input.value} сек`
    newBtn.classList.add('time-btn')
    newBtn.setAttribute("data-time", input.value)
    timeList.append(newBtn)
  }
})


startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});


timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})


board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})


function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle()
  setTIme(time)
}


function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (time < 10) {
      current = `0${current}`
    }
    setTIme(current)
  }
}


function setTIme(value) {
  timeEl.innerHTML = `00:${value}`
}


function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1> 
  Count <span class='primery'>${score}</span></h1>`
  const newBtn = document.createElement('a')
  newBtn.innerHTML = 'Play again'
  newBtn.classList.add('new-btn')
  board.append(newBtn)

  newBtn.addEventListener('click', () => {
    screens[1].classList.remove('up')
  })
}


function createRandomCircle() {
  const circle = document.createElement('div')

  const size = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  const color = colors[Math.floor(Math.random() * colors.length)]
  circle.style.background = color
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`;

  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.left = `${x}px`
  circle.style.top = `${y}px`

  board.append(circle)
}


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)

}



