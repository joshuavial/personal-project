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

  // enemies

  let enemyList = {}

  const Enemy = (id, x, y, speedX, speedY) => {
    let enemy = {
      x: x,
      speedX: speedX,
      y: y,
      speedY: speedY,
      name: 'e',
      id: id
    }
    enemyList[id] = enemy
  }

  Enemy('E1', 150, 350, 10, 15)
  Enemy('E2', 430, 200, 10, -20)
  Enemy('E3', 250, 150, 10, -8)

  // collision detection between two points

  const getDistanceBetweenEntity = (entity1, entity2) => { // returns the distance (number)
    let vx = entity1.x - entity2.x
    let vy = entity1.y - entity2.y
    return Math.sqrt(vx * vx + vy * vy)
  }

  const testCollisionEntity = (entity1, entity2) => { // returns if colliding true or false
    const distance = getDistanceBetweenEntity(entity1, entity2)
    return distance < 30
  }

  const HEIGHT = 500
  const WIDTH = 500
  // const message = 'Bouncing'

  const updateEntity = (entity) => {
    entity.x += entity.speedX
    entity.y += entity.speedY
    ctx.fillText(entity.name, entity.x, entity.y)

    if (entity.x < 0 || entity.x > WIDTH) {
      entity.speedX = -entity.speedX
    }
    if (entity.y < 0 || entity.y > HEIGHT) {
      entity.speedY = -entity.speedY
    }
  }

  const update = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT) // clears canvas each time
    updateEntity(player)

    for (let key in enemyList) { // E1 , E2
      updateEntity(enemyList[key])
      const isColliding = testCollisionEntity(player, enemyList[key])
      if (isColliding) {
        console.log('Colliding')
      }
    }
  }

  setInterval(update, 40) // 25 frames per sec
})
