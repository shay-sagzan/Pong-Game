// Variable declaration
let gameState = "start"
const playerOne = document.querySelector(".paddle-1") as HTMLDivElement
const playerTwo = document.querySelector(".paddle-2") as HTMLDivElement
const board = document.querySelector(".game-board") as HTMLDivElement
const ball = document.querySelector(".ball") as HTMLDivElement
const reset = document.querySelector(".reset") as HTMLButtonElement
const playerOneScore = document.querySelector(
  ".player-1-score"
) as HTMLHeadingElement
const playerTwoScore = document.querySelector(
  ".player-2-score"
) as HTMLHeadingElement
const message = document.querySelector(".message") as HTMLHeadingElement

let playerOneCoord: DOMRect = playerOne.getBoundingClientRect()
let playerTwoCoord: DOMRect = playerTwo.getBoundingClientRect()
const ballStartPosition: DOMRect = ball.getBoundingClientRect()
let ballPosition: DOMRect = ballStartPosition
const boardPosition: DOMRect = board.getBoundingClientRect()

// position for the ball
let ballX: number = boardPosition.width / 2
let ballY: number = boardPosition.height / 2
let directionX: number = 1
let directiony: number = 1

let playerOneCounter: number = 0
let playerTwoCounter: number = 0

/*
  Event listener which responsible for the functionality and the movement of the ball,
   legality of the game and update the score of the players according to the rules, wins and loose.
*/
window.addEventListener("keydown", (e) => {
  playerOneScore.innerHTML = `${playerOneCounter}`
  playerTwoScore.innerHTML = `${playerTwoCounter}`

  if (e.key == "Enter") {
    message.style.left = 42 + "vw"
    gameState = gameState == "start" ? "play" : "start"
    if (gameState == "play") {
      message.innerHTML = "May the best win"

      setInterval(function ballMovement(): void {
        ball.style.display = "block"

        ballX = ballX + directionX
        ballY = ballY + directiony
        ball.style.left = ballX + "px"
        ball.style.top = ballY + "px"
        ballPosition = ball.getBoundingClientRect()

        // Bottom Border of the board
        if (ballY >= boardPosition.height - ballPosition.height) {
          directiony *= -1
        }

        if (ballX <= 0) {
          directionX *= -1
        }
        if (ballY <= 0) {
          directiony *= -1
        }
        if (
          ballPosition.left <= playerOneCoord.right &&
          ballPosition.top >= playerOneCoord.top &&
          ballPosition.bottom <= playerOneCoord.bottom
        ) {
          directionX *= -1
        }
        if (
          ballPosition.right >= playerTwoCoord.left &&
          ballPosition.top >= playerTwoCoord.top &&
          ballPosition.bottom <= playerTwoCoord.bottom
        ) {
          directionX *= -1
        }
        if (
          ballPosition.left < playerOneCoord.left - 50 ||
          ballPosition.right > playerTwoCoord.right + 50
        ) {
          if (ballPosition.left < playerOneCoord.left) {
            playerTwoScore.innerHTML = `${++playerTwoCounter}`
            newScore()
            return
          } else if (ballPosition.right > playerTwoCoord.right) {
            playerOneScore.innerHTML = `${++playerOneCounter}`
            newScore()
            return
          }
        }
      }, 3)

      /*
      Event listener which responsible for the functionality and movement of the left player.
      */
      window.addEventListener("keydown", (e) => {
        const posTop: number = playerOne.offsetTop

        switch (e.key) {
          case "w":
            if (posTop < 0) {
              break
            }
            playerOne.style.marginTop = posTop - 100 + "px"
            playerOneCoord = playerOne.getBoundingClientRect()
            break
          case "s":
            if (posTop > 925) {
              break
            }
            playerOne.style.marginTop = posTop + 20 + "px"
            playerOneCoord = playerOne.getBoundingClientRect()
            break
        }
      })

      /*
      Event listener which responsible for the functionality and movement of the right player.
      */
      window.addEventListener("keydown", (e) => {
        const posTop: number = playerTwo.offsetTop

        switch (e.key) {
          case "ArrowUp":
            if (posTop < 0) {
              break
            }
            playerTwo.style.marginTop = posTop - 100 + "px"
            playerTwoCoord = playerTwo.getBoundingClientRect()
            break
          case "ArrowDown":
            if (posTop > 925) {
              break
            }
            playerTwo.style.marginTop = posTop + 20 + "px"
            playerTwoCoord = playerTwo.getBoundingClientRect()
            break
        }
      })
    }
  }
})

function newScore() {
  ball.style.visibility = ""
  ballX = boardPosition.width / 2
  ballY = boardPosition.height / 2
  directionX = 1
  directiony = 1
}

reset.addEventListener("click", () => {
  window.location.reload()
})

// module.exports = test123
