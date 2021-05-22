/* JS */

// Grid constants
var width = 10
const height = 20
const borderLength = 5

//Mini_Grid constants
const mini_width = 6
const mini_height = 4

//square constants
const square_side = 25

// Tetrominoes
var Ipiece = [
  [width, width+1, width+2, width+3],
  [2, width+2, 2*width+2, 3*width+2],
  [2*width, 2*width+1, 2*width+2, 2*width+3],
  [1, width+1, 2*width+1, 3*width+1]
]

var Jpiece = [
  [0, width, width+1, width+2],
  [2, 1, width+1, 2*width+1],
  [width, width+1, width+2, 2*width+2],
  [1, width+1, 2*width+1, 2*width]
]

var Lpiece = [
  [width, width+1, width+2, 2],
  [1, width+1, 2*width+1, 2*width+2],
  [2*width, width, width+1, width+2],
  [0, 1, width+1, 2*width+1]
]

var Opiece = [
  [1,2,width+1,width+2],
  [1,2,width+1,width+2],
  [1,2,width+1,width+2],
  [1,2,width+1,width+2]
]

var Spiece = [
  [2, 1, width+1, width],
  [1, width+1, width+2, 2*width+2],
  [2*width, 2*width+1, width+1, width+2],
  [0, width, width+1, 2*width+1]
]

var Tpiece = [
  [1, width, width+1, width+2],
  [1, width+1, 2*width+1, width+2],
  [width, width+1, width+2, 2*width+1],
  [1, width+1, 2*width+1, width]
]

var Zpiece = [
  [0, 1, width+1, width+2],
  [2, width+2, width+1, 2*width+1],
  [width, width+1, 2*width+1, 2*width+2],
  [1, width+1, width, 2*width]
]

// Collors pallete
const quadColor = ['qpurple', 'qgreen', 'qred', 'qorange', 'qyellow', 'qblue', 'qbrown']

// Tetrominoes vector
var theTetrominoes = [Ipiece, Jpiece, Lpiece, Opiece, Spiece, Tpiece, Zpiece]

document.addEventListener('DOMContentLoaded', () => {
	// Creating grid
  var grid = document.querySelector('.grid')
  grid.style.width = ((square_side*width) + (2*borderLength)) + 'px'
  grid.innerHTML = ""
  for(var x = 0; x < ( width* height); x++){
  	grid.innerHTML += "<div></div>"
  }

  //Creating mini-grid
  const mini_grid = document.querySelector('.mini-grid')
  for(var i = 0; i < (mini_width * mini_height); i++){
    mini_grid.innerHTML +="<div></div>"
  }
  
  // Loading squares
	var squares = Array.from(document.querySelectorAll('.grid div'))
  const mini_squares = Array.from(document.querySelectorAll('.mini-grid div'))

  // Loading score and start button vars
  const scoreDisplay = document.querySelector('#score_val')
  const nextmodeDisplay = document.querySelector('#next_mode')
  const startButton = document.querySelector('#start-button')
  const pauseButton = document.querySelector('#pause-button')
  const newGameButton = document.querySelector('#new-game-button') 
  const linesDisplay = document.querySelector('#lines_val')
  const modeButton = document.querySelector('#mode-button')

  // Loading music
  const audio = document.getElementById('tetrisAudio')
  audio.volume = 0.05
  
  var currentPosition = 4
  var currentRotation = 0
  var nextPiece = Math.floor(Math.random()*theTetrominoes.length)
  var nextBlocks = theTetrominoes[nextPiece][currentRotation]
  var actualPiece = Math.floor(Math.random()*theTetrominoes.length)
  var actualBlocks = theTetrominoes[actualPiece][currentRotation]
  var boolGameon = true // avisa se o jogo está rodando
  var boolClean = false //booleano que permite limpar a linha apos a animação
  var boolAnima = false //booleano que permite animar a linha
  var indan = [] //vetor com o indice de cada linha que deve ser animada e posteriormente destruida
  var level = 0
  var score = 0
  var lines = 0
  var timer1 = null //repetidor da função de descer
  var timer2 = null //repetidor do animador
  var timer3 = null //repetidor da função de descer mais rápido
  var fastDown = false //indica se o jogador está pressionando a seta pra baixo
  var originalWait = 500 //tempo que o repetidor demora para descer
  var wait = originalWait
  var animtime = 50
  var nextwidth = width
  
  //
  modeButton.addEventListener('click', () =>{
    if(nextwidth == 20)nextwidth = 10
    else nextwidth = 20
    nextmodeDisplay.innerHTML = nextwidth
  })

  //EventListener do StartButton
  startButton.addEventListener('click', () => {
      if(boolGameon){
        if(!timer1){
          draw()
          timer1 = setInterval(moveDown, originalWait)
          //actualPiece = Math.floor(Math.random()*theTetrominoes.length)
          audio.play()
        }
        if(!timer2){
          timer2 = setInterval(animator, animtime)
        }
        if(fastDown && !timer3){
          timer3 = setInterval(moveDown, wait)
        }
      }
    }
  )
  //EventListener do PauseButton
  pauseButton.addEventListener('click', () => {
      audio.pause()
      if(timer1){ //Verifica se pode mover para baixo
        clearInterval(timer1)
        timer1 = null
      }
      if(timer2){
        clearInterval(timer2)
        timer2 = null
      }
      if(timer3){
        clearInterval(timer3)
        timer3 = null
      }
    }
  )
  //EventListener do New Game
  newGameButton.addEventListener('click', () => {
    squares.forEach(square => {
      square.classList.remove('taken')
      quadColor.forEach(color => {
        square.classList.remove(color)
      })
    })
    mini_squares.forEach(square => {
      quadColor.forEach(color => {
        square.classList.remove(color)
      })
    })
    //
    width = nextwidth
    grid = document.querySelector('.grid')
    grid.innerHTML = ""
    grid.style.width = (square_side*width) + (2*borderLength) + 'px'
    for(var x = 0; x < ( width* height); x++){
  	  grid.innerHTML += "<div></div>"
    }
    squares = Array.from(document.querySelectorAll('.grid div'))
    rebuildPieces()

    //

    boolGameon = true
    currentPosition = 4
    currentRotation = 0
    actualPiece = Math.floor(Math.random()*theTetrominoes.length)
    actualBlocks = theTetrominoes[actualPiece][currentRotation]
    nextPiece = Math.floor(Math.random()*theTetrominoes.length)
    nextBlocks = theTetrominoes[nextPiece][currentRotation]
    boolClean = false
    boolAnima = false
    indan = []
    level = 0
    score = 0
    lines = 0
    scoreDisplay.innerHTML = score
    linesDisplay.innerHTML = lines
    clearInterval(timer1)
    clearInterval(timer2)
    clearInterval(timer3)
    timer1 = null
    timer2 = null
    timer3 = null
    
    // Pause audio
    audio.pause()
    audio.currentTime = 0
  })

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

  function undraw_next(){
    nextBlocks.forEach(item =>{
      var NextSqPosition = ((Math.floor((item+width)/width)*mini_width) + ((item%width)%mini_width)+1)
      mini_squares[NextSqPosition].classList.remove(quadColor[nextPiece])
    })
  }

  function draw_next(){
    nextBlocks.forEach(item =>{
      var NextSqPosition = ((Math.floor((item+width)/width)*mini_width) + ((item%width)%mini_width)+1)
      mini_squares[NextSqPosition].classList.add(quadColor[nextPiece])
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
    }
    if(boolClean == true){
      cleanit()
      boolClean = false
      clearInterval(timer1)
      timer1 = setInterval(moveDown,originalWait)
      clearInterval(timer3)
      timer3 = null
      if(fastDown) timer3 = setInterval(moveDown,wait)
      if(!fastDown) clearInterval(timer3) //isso é uma possível redundância

    }
    if(boolAnima == false && boolClean == false){
      //isso é uma grande possível redundância
      if(timer1 == null){
        console.log('to aqui gente')
        //timer1 = setInterval(moveDown,originalWait)
        clearInterval(timer3)
        timer3 = null
      }
    }
  }

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
    if(audio.currentTime == audio.duration){
      audio.pause()
      audio.currentTime = 0
      audio.play()
    }
    draw_next()
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
      timer1 = null
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
      undraw_next()
      currentPosition = 4
      currentRotation = 0
      actualPiece = nextPiece
      nextPiece = Math.floor(Math.random()*theTetrominoes.length)
      actualBlocks = theTetrominoes[actualPiece][currentRotation]
      nextBlocks = theTetrominoes[nextPiece][currentRotation]
      
      gameOver() //Nessa posicao, a peca acabou de ser criada (ou seja, ta na primeira linha).
      //O gameOver() tem que ta aqui.
      draw_next()
    }
  }
  
  //Funcao do Game-Over
  function gameOver(){
    if(actualBlocks.some(index => squares[currentPosition + index].classList.contains('taken'))){
      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)
      timer1 = null
      timer2 = null
      timer3 = null
      boolGameon = false
      // Pause audio
      audio.pause()
      audio.currentTime = 0

      // Alert
      swal({
        title: "Game Over",
        text: "Your score was: " + score,
        icon: "https://ethicsalarms.files.wordpress.com/2015/12/nelson-haha.png",
      })
    }
  }


  function control(e){
    if(e.keyCode === 65){
      moveLeft()
    }
    if(e.keyCode === 68){
      moveRight()
    }
    if(e.keyCode === 87){
      rotate()
    }
    if(e.keyCode === 83){
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
    if(e.keyCode === 83){
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
  
  function rebuildPieces(){
    Ipiece = [
      [width, width+1, width+2, width+3],
      [2, width+2, 2*width+2, 3*width+2],
      [2*width, 2*width+1, 2*width+2, 2*width+3],
      [1, width+1, 2*width+1, 3*width+1]
    ]
    
    Jpiece = [
      [0, width, width+1, width+2],
      [2, 1, width+1, 2*width+1],
      [width, width+1, width+2, 2*width+2],
      [1, width+1, 2*width+1, 2*width]
    ]
    
    Lpiece = [
      [width, width+1, width+2, 2],
      [1, width+1, 2*width+1, 2*width+2],
      [2*width, width, width+1, width+2],
      [0, 1, width+1, 2*width+1]
    ]
    
    Opiece = [
      [1,2,width+1,width+2],
      [1,2,width+1,width+2],
      [1,2,width+1,width+2],
      [1,2,width+1,width+2]
    ]
    
    Spiece = [
      [2, 1, width+1, width],
      [1, width+1, width+2, 2*width+2],
      [2*width, 2*width+1, width+1, width+2],
      [0, width, width+1, 2*width+1]
    ]
    
    Tpiece = [
      [1, width, width+1, width+2],
      [1, width+1, 2*width+1, width+2],
      [width, width+1, width+2, 2*width+1],
      [1, width+1, 2*width+1, width]
    ]
    
    Zpiece = [
      [0, 1, width+1, width+2],
      [2, width+2, width+1, 2*width+1],
      [width, width+1, 2*width+1, 2*width+2],
      [1, width+1, width, 2*width]
    ]
    theTetrominoes = [Ipiece, Jpiece, Lpiece, Opiece, Spiece, Tpiece, Zpiece]    
  }
})
