'use strict'

import $ from 'jquery'

$( () => {

  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  // styling

  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'
  ctx.globalAlpha = 0.5

  // player

  let playerX = 50
  let playerSpeedX = 30
  let playerY = 40
  let playerSpeedY = 5
  let playerName = 'x'

  // enemy

  let enemyX = 150
  let enemySpeedX = 10
  let enemyY = 350
  let enemySpeedY = 15
  let enemyName = 'o'

  const HEIGHT = 500
  const WIDTH = 500
  const message = 'Bouncing'

  // move positioning

  const update = () => {

    // player

    playerX += playerSpeedX
    playerY += playerSpeedY
    ctx.fillText(playerName, playerX, playerY)
    console.log('move', playerX)

    if (playerX < 0 || playerX > WIDTH) {
      console.log(message)
      playerSpeedX = -playerSpeedX
    }
    if (playerY < 0 || playerY > HEIGHT) {
      console.log(message)
      playerSpeedY = -playerSpeedY
    }     

    // enemy

    enemyX += enemySpeedX
    enemyY += enemySpeedY
    ctx.fillText(enemyName, enemyX, enemyY)
    console.log('move', enemyX)


    if (enemyX < 0 || enemyX > WIDTH) {
      console.log(message)
      enemySpeedX = -enemySpeedX
    }
    if (enemyY < 0 || enemyY > HEIGHT) {
      console.log(message)
      enemySpeedY = -enemySpeedY
    }     
  }

    setInterval(update, 40) // 25 frames per sec

})