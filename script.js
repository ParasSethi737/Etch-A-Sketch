const DEFAULT_COLOR = `#555555`
const DEFAULT_MODE = `color`
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

const colorPicker = document.getElementById(`colorPicker`)
const colorBtn = document.getElementById(`colorBtn`)
const rainbowBtn = document.getElementById(`rainbowBtn`)
const eraser = document.getElementById(`eraserBtn`)
const clear = document.getElementById(`clearBtn`)
const sizeValue = document.getElementById(`sizeValue`)
const sizeSlider = document.getElementById(`sizeSlider`)
const grid = document.getElementById(`grid`)

function setCurrentColor(newColor){
    currentColor = newColor
}

function setCurrentMode(newMode){
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize){
    currentSize = newSize
}

function updateSizeValue(newSize){
    sizeValue.innerText = `${newSize} x ${newSize}`
}

function clearGrid(){
    grid.innerHTML = ``
}

function reloadGrid(){
    clearGrid()
    createGrid(currentSize)
}

function changeSize(newSize){
    setCurrentSize(newSize)
    updateSizeValue(newSize)
    reloadGrid()
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = (e) => setCurrentMode(`color`)
rainbowBtn.onclick = (e) => setCurrentMode(`rainbow`)
eraserBtn.onclick = (e) => setCurrentMode(`eraser`)
clear.onclick = (e) => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmousedown = (e) => (mouseDown = true)
document.body.onmouseup = (e) => (mouseDown = false)


function createGrid(size){
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`

    for(let i=0;i<size*size;i++){
        const gridElement = document.createElement(`div`)
        gridElement.classList.add(`grid-element`)
        gridElement.addEventListener(`mouseover`, changeColor)
        gridElement.addEventListener(`mousedown`, changeColor)
        grid.appendChild(gridElement)
    }
}

function changeColor(e){
    if(e.type===`mouseover` && !mouseDown) return
    if(currentMode === `rainbow`){
        const randomR = Math.floor(Math.random()*256)
        const randomG = Math.floor(Math.random()*256)
        const randomB = Math.floor(Math.random()*256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if(currentMode === `color`){
        e.target.style.backgroundColor = currentColor
    }
    else if(currentMode === `eraser`){
        e.target.style.backgroundColor = `#fefefe`
    }
}

function activateButton(newMode){
    if(currentMode === `rainbow`){
        rainbowBtn.classList.remove(`active`)
    }
    if(currentMode === `color`){
        colorBtn.classList.remove(`active`)
    }
    if(currentMode === `eraser`){
        eraserBtn.classList.remove(`active`)
    }

    if(newMode === `rainbow`){
        rainbowBtn.classList.add(`active`)
    }
    if(newMode === `color`){
        colorBtn.classList.add(`active`)
    }
    if(newMode === `eraser`){
        eraserBtn.classList.add(`active`)
    }
}

window.onload = () =>
{
    createGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
};