class TennisGame {
    constructor(playerOne, playerTwo) {
        if (arguments.length < 2 
            || typeof arguments[0] !== 'string' 
            || typeof arguments[1] !== 'string') throw new Error('A tennis gamemust have two player and tennis player names must be strings')

        this.playerOne = playerOne
        this.playerTwo = playerTwo
        this.scores = {}
        this.scores[playerOne] = 0
        this.scores[playerTwo] = 0
        this.isDeuceState = false // Deuce state starts from the moment both players win 3 points
    }

    score() {
        // Returns the current score
        let isDeuceState = this.isDeuceState
        let playersHaveSameScore = this.scores[this.playerOne] === this.scores[this.playerTwo]
        let winningPlayer = this.winningPlayer()
        let losingPlayer = this.losingPlayer()
        let scoreDifference = this.scores[winningPlayer] - this.scores[losingPlayer]

        if (isDeuceState && playersHaveSameScore) return 'Deuce'

        else if (isDeuceState && scoreDifference === 1) return 'Advantage ' + winningPlayer

        else if (this.scores[winningPlayer] > 3 && scoreDifference > 1) return winningPlayer + ' has won'
        
        else return this.playerOne + ': ' + this.convertScore(this.scores[this.playerOne])
        + ' '
        + this.playerTwo + ': ' + this.convertScore(this.scores[this.playerTwo])
    }

    createScore(pointsFirstPlayer, pointsSecondPlayer) {
        // To initialize a score
        if (pointsFirstPlayer >=3 && pointsSecondPlayer >=3) this.isDeuceState = true

        if (pointsFirstPlayer >=3 && pointsSecondPlayer >=3
            && Math.abs(pointsFirstPlayer - pointsSecondPlayer) > 2) {
                throw new Error('This score cannot exist in a tennis game')
            }

        else {
            this.scores[this.playerOne] = pointsFirstPlayer
            this.scores[this.playerTwo] = pointsSecondPlayer   
        }
    }

    convertScore(numberPoints) {
        // Converts number of points won to tennis score
        let score;

        if (numberPoints === 0) score = 0
        else if (numberPoints === 1) score = 15
        else if (numberPoints === 2) score = 30
        else if (numberPoints >= 3) score = 40

        return score
    }

    winningPlayer() {
        // Returns the name of the currently winning player
        if (this.scores[this.playerOne] === this.scores[this.playerTwo]) return 'Players have same points number'
        return (this.scores[this.playerOne] > this.scores[this.playerTwo])? this.playerOne : this.playerTwo
    }

    losingPlayer() {
        // Returns name of currently losing player
        if (this.scores[this.playerOne] === this.scores[this.playerTwo]) return 'Players have same points number'
        return (this.scores[this.playerOne] < this.scores[this.playerTwo])? this.playerOne : this.playerTwo
    }
}

module.exports = TennisGame