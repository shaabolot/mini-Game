const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time_list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FA8072', '#00FF00', '#00BFFF', '#FFD700', '#FF1493', '#FFFFE0', '#4B0082', '#8B0000', '#000080']

let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
        startGame()
    }
}) 

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
    finishGame()
    }else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNamber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNamber(0, width - size)
    const y = getRandomNamber(0, height - size)
    const color = randomColor()
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = color
    board.append(circle)
}

function getRandomNamber(min, max) {
return Math.round(Math.random() * (max - min) + min)
}

function randomColor(){
    return colors[ Math.floor( Math.random() * colors.length)]
}

function finishGame() {
    timeEl.parentNode.remove()
    board.innerHTML = `<h1>Счет:<span class="primary">${score}</span></h1>`
}

function setTime(velue) {
    timeEl.innerHTML = `00:${velue}`
}