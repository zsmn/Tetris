// Grid constants
const width = 10
const height = 20

// Tetrominoes

document.addEventListerner('DOMContentLoaded', () => {
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
  
})

