/* JS */

// Grid constants
const width = 20
const height = 20

// Tetrominoes
const Ipiece = [
  [width, width+1, width+2, width+3],
  [2, width+2, 2*width+2, 3*width+2],
  [2*width, 2*width+1, 2*width+2, 2*width+3],
  [1, width+1, 2*width+1, 3*width+1]
]

const Jpiece = [
  [0, width, width+1, width+2],
  [2, 1, width+1, 2*width+1],
  [width, width+1, width+2, 2*width+2],
  [1, width+1, 2*width+1, 2*width]
]

const Lpiece = [
  [width, width+1, width+2, 2],
  [1, width+1, 2*width+1, 2*width+2],
  [2*width, width, width+1, width+2],
  [0, 1, width+1, 2*width+1]
]

const Opiece = [
  [1,2,width+1,width+2],
  [1,2,width+1,width+2],
  [1,2,width+1,width+2],
  [1,2,width+1,width+2]
]

const Spiece = [
  [2, 1, width+1, width],
  [1, width+1, width+2, 2*width+2],
  [2*width, 2*width+1, width+1, width+2],
  [0, width, width+1, 2*width+1]
]

const Tpiece = [
  [1, width, width+1, width+2],
  [1, width+1, 2*width+1, width+2],
  [width, width+1, width+2, 2*width+1],
  [1, width+1, 2*width+1, width]
]

const Zpiece = [
  [0, 1, width+1, width+2],
  [2, width+2, width+1, 2*width+1],
  [width, width+1, 2*width+1, 2*width+2],
  [1, width+1, width, 2*width]
]

// Collors pallete
const quadColor = ['qpurple', 'qgreen', 'qred', 'qorange', 'qyellow', 'qblue', 'qbrown']

// Tetrominoes vector
const theTetrominoes = [Ipiece, Jpiece, Lpiece, Opiece, Spiece, Tpiece, Zpiece]

document.addEventListener('DOMContentLoaded', () => {
  // Creating grid
  const grid = document.querySelector('.grid')
  for(var x = 0; x < (width * height); x++){
  	grid.innerHTML += "<div></div>"
  }
  
  // Loading squares
  const squares = Array.from(document.querySelectorAll('.grid div'))
  
  // Loading score and start button vars
  const scoreDisplay = document.querySelector('#score')
  const startButton  = document.querySelector('#start-button')
  
  //Variables associated with the grid.
  var currentPosition = 4
  var currentRotation = 0
  var actualPiece = Math.floor(Math.random()*theTetrominoes.length)
  var actualBlocks = theTetrominoes[actualPiece][currentRotation]

  //Function to Draw every block of the grid
  function draw(){
    actualBlocks.forEach(item => {
      squares[(currentPosition + item)].classList.add(quadColor[actualPiece])
    })
  }

  //Function to undraw every block of the grid	 
  function undraw(){
    actualBlocks.forEach(item =>{
      squares[currentPosition + item].classList.remove(quadColor[actualPiece])
    })
  }

  function moveDown(){
    freeze()
    undraw()
    currentPosition += width
    draw()
  }

	function freeze(){
  	draw()
    var lock = false
    actualBlocks.forEach(item =>{
      if(item+currentPosition+width >= (width*height)){
        lock = true
      }
    })
    if(lock == false){
      actualBlocks.forEach(item => {
        if(squares[currentPosition + item + width].classList.contains('taken')){
          lock = true
        }
      })
    }
    if(lock == true){
      actualBlocks.forEach(item => {
      	squares[(currentPosition + item)].classList.add('taken')
    	})

      currentPosition = 4
      currentRotation = 0
      actualPiece = Math.floor(Math.random()*theTetrominoes.length)
      actualBlocks = theTetrominoes[actualPiece][currentRotation]
    }
  }
  
  // Setting loop for moveDown tetrominoes
  var fastDown = false
  var originalWait = 500
  var wait = originalWait
  timer1 = setInterval(moveDown, wait)
  var timer3 = null
  function control(e){
    if(e.keyCode === 37){
      moveLeft()
    }
    if(e.keyCode === 39){
      moveRight()
    }
    if(e.keyCode === 38){
      rotate()
    }
    if(e.keyCode === 40){
      wait = originalWait
      if(timer1){
        fastDown = false
        clearInterval(timer3)
        timer3 = null
        //timer1 = setInterval(moveDown, wait)
      }
    }
  }
  document.addEventListener('keyup',control)
  
  function downBlock(e){
    if(e.keyCode === 40){
      if(!fastDown){
        wait = Math.min(wait,100)
        clearInterval(timer3)
        timer3 = null
        if(timer1){
          fastDown = true
          clearInterval(timer3)
          timer3 = setInterval(moveDown,wait)
        }
      }
    }
  }
  document.addEventListener('keydown', downBlock)
  
  function moveLeft(){
    if(timer1 != null || timer3 != null){ 

      undraw()

      const isAtLeftEdge = actualBlocks.some(index => (currentPosition + index) % width === 0)

      if(!isAtLeftEdge) currentPosition = currentPosition - 1

      if(actualBlocks.some(index => squares[currentPosition + index].classList.contains('taken'))){
          currentPosition = currentPosition + 1
      }

      draw()
    }
  }
  
  function moveRight(){
    if(timer1 != null || timer3 != null){
    
      undraw()

      const isAtRightEdge = actualBlocks.some(index => (currentPosition + index) % width === width - 1)

      if(!isAtRightEdge) currentPosition = currentPosition + 1

      if(actualBlocks.some(index => squares[currentPosition + index].classList.contains('taken'))){
          currentPosition = currentPosition - 1
      }

      draw()
    }
  }
  
  function rotate(){
    if(timer1 != null || timer3 != null){

      undraw()

      // Check if rotate collides
      auxRotation = (currentRotation + 1) % 4
      auxSquares = theTetrominoes[actualPiece][currentRotation]

      vet = []

      auxSquares.forEach(index => {
          vet.push((currentPosition + index) % 10)
      })

      var cross = 0
      for(var x = 0; x < vet.length; x++){
          for(var y = 0; y < vet.length; y++){
              if(Math.abs(vet[x] - vet[y]) > 3){
                  cross = 1;
                  break;
              }
          }
      }

      if(!cross && !auxSquares.some(index => squares[currentPosition + index].classList.contains('taken'))){
          currentRotation = auxRotation
          actualBlocks = auxSquares
      }

      draw()
    }
  }

})
