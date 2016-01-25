'use strict'

import $ from 'jquery'

$(() => {

  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  // mouse listener and positioning relative to canvas

  canvas.addEventListener('mousemove', function(mouse) {
    const rect = canvas.getBoundingClientRect()
    let mouseX = event.clientX - rect.left
    let mouseY = event.clientY - rect.top

    player.x = mouseX
    player.y = mouseY

    console.log('y', mouseX, 'x', mouseY)

  })

  // canvas draw space height and width

  const HEIGHT = 500
  const WIDTH = 500
  let timeWhenGameStarted = Date.now() // return time in ms

  // canvas element styling

  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'
  ctx.globalAlpha = 0.5

  // create player

  let player = {
    x: 50,
    speedX: 30,
    y: 40,
    speedY: 5,
    name: 'x',
    hp: 10
  }

  // create enemies

  let enemyList = {}

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

  // update entity

  const updateEntity = (entity) => {
    updateEntityPosition(entity)
    drawEntity(entity)
  }

  const updateEntityPosition = (entity) => {
    entity.x += entity.speedX
    entity.y += entity.speedY

    if (entity.x < 0 || entity.x > WIDTH) {
      entity.speedX = -entity.speedX
    }
    if (entity.y < 0 || entity.y > HEIGHT) {
      entity.speedY = -entity.speedY
    }
  }

  const drawEntity = (entity) => {
    ctx.fillText(entity.name, entity.x, entity.y)    
  }

  const update = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT) // clears canvas each time

    for (let key in enemyList) { // E1 , E2
      updateEntity(enemyList[key])
      const isColliding = testCollisionEntity(player, enemyList[key])
      if (isColliding) {
        player.hp = player.hp -1
        if (player.hp <= 0) {
          const timeSurvived = Date.now() - timeWhenGameStarted
          console.log('You lost! You survived for ' + timeSurvived + ' ms.')
          timeWhenGameStarted = Date.now()
          player.hp = 10
        }
      }
    }
    drawEntity(player)
    ctx.fillText(player.hp + 'hp', 0, 30)
  }

  setInterval(update, 40) // 25 frames per sec
  Enemy('E1', 150, 350, 10, 15)
  Enemy('E2', 430, 200, 10, -20)
  Enemy('E3', 250, 150, 10, -8)

})
