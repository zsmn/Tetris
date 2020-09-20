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
  const scoreDisplay = document.querySelector('#score_val')
  const startButton  = document.querySelector('#start-button')
  const linesDisplay = document.querySelector('#lines_val')
  
  var currentPosition = 4
  var currentRotation = 0
  var actualPiece = Math.floor(Math.random()*theTetrominoes.length)
  var actualBlocks = theTetrominoes[actualPiece][currentRotation]
  var boolClean = false
  var boolAnima = false
  var indan = []
  var level = 0
  var score = 0
  var lines = 0

  function draw(){
    actualBlocks.forEach(item => {
      squares[(currentPosition + item)].classList.add(quadColor[actualPiece])
    })
  }

  function undraw(){
    actualBlocks.forEach(item =>{
      squares[currentPosition + item].classList.remove(quadColor[actualPiece])
    })
  }
  
  function cleanit(){
    let indexes = []
    var nlines = 0
    for(var i=0; i<height; i++){
      var clean = 0
      for(var j=0; j<width; j++){
        if(squares[(i*width) + j].classList.contains('taken')){
          clean++
        }
      }
      if(clean == width){
        nlines++
        indexes = indexes.concat([i])
      }
    }
    destroy(indexes)
    let mnlin = [0,100,250,400,800]
    let multi = (level+1)
    score += multi * mnlin[nlines]
    lines += nlines
    scoreDisplay.innerHTML = score
    linesDisplay.innerHTML = lines

  }
  
  function destroy(indexes){
    if(indexes.length > 0){
      indexes.forEach(i => {
        for(var j=0; j<width; j++){
          quadColor.forEach(type => squares[(i*width) + j].classList.remove(type))
          squares[(i*width) + j].classList.remove('taken')
        }
        for(var k = i-1; k>=0; k--){
          for(var j=0; j<width; j++){
            if(squares[(k*width) + j].classList.contains('taken')){
              squares[(k*width) + j].classList.remove('taken')
              quadColor.forEach(item => {
                if(squares[(k*width) + j].classList.contains(item)){
                  squares[(k*width) + j].classList.remove(item)
                  squares[((k+1)*width) + j].classList.add(item)
                }
              })
              squares[((k+1)*width) + j].classList.add('taken')
            }
          }
        }
      })
    }
  }
  
  function animator(){
    if(boolAnima == true){
      clearInterval(timer1)
      clearInterval(timer3)
      timer3 = null
      timer1 = null
      if(indan.length == 4 ){
        animaTetris()
      }else{
        animate()
      }
      for(var i=0; i< (100000000/5)*2 ; i++){

      }
    }
    if(boolClean == true){
      cleanit()
      boolClean = false
      clearInterval(timer1)
      timer1 = setInterval(moveDown,originalWait)
      clearInterval(timer3)
      if(fastDown)timer3 = setInterval(moveDown,wait)
      if(!fastDown)clearInterval(timer3) //isso é uma possível redundância

    }
    if(boolAnima == false && boolClean == false){
      //isso é uma grande possível redundância
      if(timer1 == null){
        console.log('to aqui gente')
        //timer1 = setInterval(moveDown,originalWait)
        clearInterval(timer3)
      }
    }
  }
  timer2 = setInterval(animator,1)

  function animaTetris(){
    var iteractions = quadColor.length
    if(countAnim < iteractions){
        indan.forEach(i =>{
            for(var j=0; j<width; j++){
                quadColor.forEach(type => {
                    squares[i*width + j].classList.remove(type)
                })
                squares[i*width + j].classList.add(quadColor[countAnim])
            }
        })
        countAnim++;
    }else{
      boolAnima = false
      boolClean = true
      indan = []
      countAnim = 0
    }
    for(var i=0; i< (200000000/5)*2 ; i++){

    }
  }

  function animate(){
    var iteractions = (width/2)
    if(countAnim < iteractions){
      indan.forEach(i =>{
        quadColor.forEach(type => {
          squares[i*width + ((iteractions-1)-countAnim)].classList.remove(type)
          squares[i*width + (iteractions+countAnim)].classList.remove(type)
        })
      })
      countAnim++
    }else{
      boolAnima = false
      boolClean = true
      indan = []
      countAnim = 0
    }
  }
  
  function moveDown(){
    freeze()
    undraw()
    currentPosition += width
    draw()
    verify()
  }
  
  function verify(){
    indan = []
    let indexes = []
    var nlines = 0
    for(var i=0; i<height; i++){
      var clean = 0
      for(var j=0; j<width; j++){
        if(squares[(i*width) + j].classList.contains('taken')){
          clean++
        }
      }
      if(clean == width){
        nlines++
        indexes = indexes.concat([i])
      }
    }
    if(nlines > 0){
      indan = indexes
      boolAnima = true
      countAnim = 0
      clearInterval(timer1)
    }
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
      fastDown = false //isso acabou com o bug
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
        if(timer1 && /*esse && !timer3 nem faz sentido estar aqui, pq eu acabei de setar ele pra null*/!timer3){
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
  
  /*
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
  */
  
  function rotate(){
    if(timer1 != null || timer3 != null){
      var newRotation = (currentRotation -1 + 4)%4
      var newBlocks = theTetrominoes[actualPiece][newRotation]
      var turn = true

      if(newBlocks.some(item => squares[currentPosition + item].classList.contains('taken'))){
        turn = false
      }
      var indLef = 0
      var colLef = (newBlocks[0])%width
      var indRig = 0
      var colRig = (newBlocks[0])%width
      for(var i=0; i<4; i++){
        var colatu = (newBlocks[i])%width
        if(colatu < colLef){
          colLef = colatu
          indLef = i
        }
        if(colatu > colRig){
          colRig = colatu
          indRig = i
        }
      }
      var ncr = (currentPosition + newBlocks[indRig])%width
      var ncl = (currentPosition + newBlocks[indLef])%width
      if(ncr < ncl){
        turn = false
      }
      if(turn){
        undraw()
        actualBlocks = newBlocks
        currentRotation = newRotation
        draw()
      }
    }
	}
})
