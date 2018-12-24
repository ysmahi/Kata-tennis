let should = require('chai').should()
let TennisGame = require('../TennisGame')

describe('TennisGame', function() {
    let tennisGame;

    describe('Players', function() {

        it('should have two players', function() {
            (function createOnlyOnePlayer(){
                var t = new TennisGame('PlayerOne')
            }).should.throw(Error)
          })

          it('should be strings', function() {
            (function createNotStringPlayers(){
                var t = new TennisGame(1, 2)
            })
            .should.throw(Error)
          })
    })

    describe('Score', function() {

        beforeEach(() => {
            // Create a tennis game before each test
            tennisGame = new TennisGame('Player One', 'Player Two')
          })

        it ('should be 0 0 at the beggining of the game', function() {
            tennisGame.score().should.equal('Player One: 0 Player Two: 0')
        })

        it('should be 15 0 if a player wins a point', function() {
            tennisGame.createScore(1, 0)

            tennisGame.score().should.equal('Player One: 15 Player Two: 0')
        })
        
        it('should be 30 0 if a player wins two points', function() {
            tennisGame.createScore(2, 0)

            tennisGame.score().should.equal('Player One: 30 Player Two: 0')
        })
        
        it('should be 0 40 if a player wins three points', function() {
            tennisGame.createScore(0, 3)

            tennisGame.score().should.equal('Player One: 0 Player Two: 40')
        })
        
        it('should be Deuce if both players win three points', function() {
            tennisGame.createScore(3, 3)

            tennisGame.score().should.equal('Deuce')
        })
        
        it('should be Deuce if players win 4 points each', function() {
            tennisGame.createScore(4, 4)

            tennisGame.score().should.equal('Deuce')
        })
        
        it('should be Advantage if one player scores 4 points and the other 3', function() {
            tennisGame.createScore(4, 3)

            tennisGame.score().should.equal('Advantage Player One')
        })
        
        it('should be Advantage if one player scores 5 points and the other 4', function() {
            tennisGame.createScore(5, 4)

            tennisGame.score().should.equal('Advantage Player One')
        })
        
        it('should be Advantage if one player scores 4 points and the other 5', function() {
            tennisGame.createScore(4, 5)

            tennisGame.score().should.equal('Advantage Player Two')
        })

        it('should have a difference of 2 maximum on deuce state', function(){
            (function() {
                tennisGame.createScore(10, 5)
            }).should.throw(Error)
        })
    })

    describe('Result', function() {
        beforeEach(() => {
            // Create a tennis game before each test
            tennisGame = new TennisGame('Player One', 'Player Two')
          })

          it('should be "first player has won" when 4 points to 0', function() {
              tennisGame.createScore(4, 0)

              tennisGame.score().should.equal('Player One has won')
          })
          
          it('should be "first player has won" when 4 points to 2', function() {
              tennisGame.createScore(4, 2)

              tennisGame.score().should.equal('Player One has won')
          })
          
          it('should be "second player has won" when 4 points to 2', function() {
              tennisGame.createScore(1, 4)

              tennisGame.score().should.equal('Player Two has won')
          })

          it('should be "second player has won" when 6 points to 8', function() {
              tennisGame.createScore(6, 8)

              tennisGame.score().should.equal('Player Two has won')
          })
    })

})