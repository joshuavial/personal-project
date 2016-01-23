'use strict'

import $ from 'jquery'

$(() => {
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

  let enemyList = {}

  // enemy 1

  let enemy1 = {
    x: 150,
    speedX: 10,
    y: 350,
    speedY: 15,
    name: 'e',
    id: 'E1'
  }

  enemyList['E1'] = enemy1

  // enemy 2

  let enemy2 = {
    x: 220,
    speedX: 10,
    y: 300,
    speedY: 15,
    name: 'e',
    id: 'E2'
  }

  enemyList['E2'] = enemy2

  // enemy 3

  let enemy3 = {
    x: 290,
    speedX: 10,
    y: 320,
    speedY: 15,
    name: 'e',
    id: 'E3'
  }

  enemyList['E3'] = enemy3

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
    ctx.clearRect(0, 0, WIDTH, HEIGHT) // clears canvas each time
    updateEntity(player)

    for (let key in enemyList) { // E1 , E2
      updateEntity(enemyList[key])
    }
  }

  setInterval(update, 40) // 25 frames per sec
})
