// Grid constants
const width = 10
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
const quad = ['qpurple', 'qgreen', 'qred', 'qorange', 'qyellow', 'qblue', 'qbrown']

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
  
})
