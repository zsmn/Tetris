describe('Tetris', function() {
    it('Open site', function (){
        cy.visit('https://tetris-ess.herokuapp.com')
    })

    it('Check if the title of the application is correct', function (){
        cy.title().should('eq', 'Tetris 20')
    })

    it('Check if site contains buttons', function (){
        cy.contains('Mode')
        cy.contains('Start/Resume')
        cy.contains('Pause')
        cy.contains('New Game')
    })

    it('Check if grid and mini grid exists', function (){
        cy.get('.mini-grid')
        cy.get('.grid')
    })

    it('Check if grid has loaded tetrominoes', function (){
        cy.get('.grid').children().should('have.length', 400)
    })

    it('Check if mini-grid has loaded tetrominoes', function (){
        cy.get('.mini-grid').children().should('have.length', 24)
    })

    it('Check if the score of the player and number of lines are being displayed', function (){
        cy.contains('Player\'s Score:')
        cy.contains('Burned Lines:')
    })
    
    it('Check if we loaded the placeholder for the score and the number of burned lines', function (){
        cy.get('#score_val')
        cy.get('#lines_val')
    })

    it('Check if we loaded the tag related to the loading of the game\'s music', function (){
        cy.get('#tetrisAudio')
    })

    it('Check mode button swapping to 20x10 grid', function (){
        // Click in Mode
        cy.contains('Mode')
          .click()
        
        // New game
        cy.contains('New Game')
          .click()
        
        // Check if game have 20x10 tetrominoes
        cy.get('.grid').children().should('have.length', 200)
    })

    it('Check mode button swapping back to 20x20 grid', function (){
        // Click in Mode
        cy.contains('Mode')
          .click()
        
        // New game
        cy.contains('New Game')
          .click()
        
        // Check if game have 20x20 tetrominoes
        cy.get('.grid').children().should('have.length', 400)
    })

    it('Check if Start/Resume button create tetrominoe and if it freeze correctly', function (){
        // Click in Start/Resume
        cy.contains('Start/Resume')
          .click()
        
        // Check if an created tetrominoe contains 'q' (indicates class)
        cy.get('.grid')
          .children()
          .each(($t) => {
              let className = $t[0].className
              
              if(className.includes('q')){
                expect(className).to.match(/q/)
              }
          })
        
        // Wait tetrominoes goes totally back (and freeze)
        cy.wait(8000)

        // Check if tetrominoe freeze correctly
        cy.get('.grid').find('>div').filter('.taken')
    })

    it('Check if next tetrominoe is working', function (){        
        // New game
        cy.contains('New Game')
          .click()

        // Start game
        cy.contains('Start/Resume')
          .click()
        
        // Wait for draw
        cy.wait(500)

        // Check if an tetrominoe contains 'q' (indicates class)
        cy.get('.mini-grid')
          .children()
          .each(($t) => {
              let className = $t[0].className
              
              if(className.includes('q')){
                expect(className).to.match(/q/)
              }
          })
    })

    it('Check if Stop button works correctly', function (){
        // Click in New Game
        cy.contains('New Game')
          .click()
        
        // Click in Start/Resume
        cy.contains('Start/Resume')
          .click()

        // Click in pause
        cy.contains('Pause')
          .click()
        
        // Wait tetrominoes goes totally back (and freeze)
        cy.wait(8000)

        // Check if tetrominoe freeze correctly
        cy.get('.grid').find('>div').filter('.taken').should('have.length', 0)
    })
})