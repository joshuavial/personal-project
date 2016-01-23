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

  const HEIGHT = 500
  const WIDTH = 500
  const message = 'Bouncing'

  const updateEntity = (entity) => {
    // enemy

    entity.x += entity.speedX
    entity.y += entity.speedY
    ctx.fillText(entity.name, entity.x, entity.y)
    console.log('move', entity.x)


    if (entity.x < 0 || entity.x > WIDTH) {
      console.log(message)
      entity.speedX = -entity.speedX
    }
    if (entity.y < 0 || entity.y > HEIGHT) {
      console.log(message)
      entity.speedY = -entity.speedY
    }     
  }

  const update = () => {
    updateEntity(player)
    updateEntity(enemy)
  }

  setInterval(update, 40) // 25 frames per sec

})