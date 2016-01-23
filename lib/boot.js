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

  let player = {
    x: 50,
    speedX: 30,
    y: 40,
    speedY: 5,
    name: 'x'
  }

  // enemy

  let enemy = {
    x: 150,
    speedX: 10,
    y: 350,
    speedY: 15,
    name: 'o'
  }

  console.log(enemy.x)

  const HEIGHT = 500
  const WIDTH = 500
  const message = 'Bouncing'

  const updatePlayer = () => {
    // player
    player.x += player.speedX
    console.log(player.x)
    player.y += player.speedY
    ctx.fillText(player.name, player.x, player.y)
    console.log('move', player.x)

    if (player.x < 0 || player.x > WIDTH) {
      console.log(message)
      player.speedX = -player.speedX
    }
    if (player.y < 0 || player.y > HEIGHT) {
      console.log(message)
      player.speedY = -player.speedY
    }      
  }

  const updateEnemy = function () {
    // enemy

    enemy.x += enemy.speedX
    enemy.y += enemy.speedY
    ctx.fillText(enemy.name, enemy.x, enemy.y)
    console.log('move', enemy.x)


    if (enemy.x < 0 || enemy.x > WIDTH) {
      console.log(message)
      enemy.speedX = -enemy.speedX
    }
    if (enemy.y < 0 || enemy.y > HEIGHT) {
      console.log(message)
      enemy.speedY = -enemy.speedY
    }     
  }

  const update = () => {
    updatePlayer()
    updateEnemy()
  }

  setInterval(update, 40) // 25 frames per sec

})