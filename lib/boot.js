'use strict'

import $ from 'jquery'

$(() => {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  // mouse listener and positioning relative to canvas

  canvas.addEventListener('mousemove', function (mouse) {
    const rect = canvas.getBoundingClientRect()
    let mouseX = mouse.clientX - rect.left
    let mouseY = mouse.clientY - rect.top

    // ensure player move stays within the canvas

    if (mouseX < player.width / 2) {
      mouseX = player.width / 2
    }
    if (mouseX > WIDTH - player.width / 2) {
      mouseX = WIDTH - player.width / 2
    }
    if (mouseY < player.height / 2) {
      mouseY = player.height / 2
    }
    if (mouseY > HEIGHT - player.height / 2) {
      mouseY = HEIGHT - player.height / 2
    }

    player.x = mouseX
    player.y = mouseY
  })

  // canvas draw space height and width

  const HEIGHT = 500
  const WIDTH = 500
  let timeWhenGameStarted = Date.now() // return time in ms

  // canvas element styling

  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'

  // create player

  let player = {
    x: 50,
    speedX: 30,
    y: 40,
    speedY: 5,
    name: 'x',
    hp: 10,
    width: 20,
    height: 20,
    color: 'green'
  }

  // create enemies

  let enemyList = {}

  const Enemy = (id, x, y, speedX, speedY, width, height) => {
    let enemy = {
      x: x,
      speedX: speedX,
      y: y,
      speedY: speedY,
      name: 'e',
      id: id,
      width: width,
      height: height,
      color: 'red'
    }
    enemyList[id] = enemy
  }

  // collision detection between two rectangles

  const testCollisionEntity = (entity1, entity2) => {
    let rect1 = {
      x: entity1.x - entity1.width / 2,
      y: entity1.y - entity1.height / 2,
      width: entity1.width,
      height: entity1.height
    }

    let rect2 = {
      x: entity2.x - entity2.width / 2,
      y: entity2.y - entity2.height / 2,
      width: entity2.width,
      height: entity2.height
    }
    return testCollisionRectRect(rect1, rect2)
  }

  // collision detection between two rectangles

  const testCollisionRectRect = (rect1, rect2) => {
    return rect1.x <= rect2.x + rect2.width &&
    rect2.x <= rect1.x + rect1.width &&
    rect1.y <= rect2.y + rect2.height &&
    rect2.y <= rect1.y + rect1.height
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

  // draw entities

  const drawEntity = (entity) => {
    ctx.save()
    ctx.fillStyle = entity.color
    ctx.fillRect(entity.x - entity.width / 2,
                 entity.y - entity.height / 2,
                 entity.width,
                 entity.height)
    ctx.restore()
  }

  // update entities

  const update = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT) // clears canvas each time

    for (let key in enemyList) { // E1 , E2
      updateEntity(enemyList[key])
      const isColliding = testCollisionEntity(player, enemyList[key])
      if (isColliding) {
        console.log('Hit!')
        player.hp = player.hp - 1
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

  // randomly generate enemy
  const randomlyGenerateEnemy = () => {
    const x = Math.random() * WIDTH
    const y = Math.random() * HEIGHT
    const height = 10 + Math.random() * 30 // between 10 and 40
    const width = 10 + Math.random() * 30 // between 10 and 40
    const id = Math.random()
    const speedX = 5 + Math.random() * 5
    const speedY = 5 + Math.random() * 5

    Enemy(id, x, y, speedX, speedY, width, height)
  }

  randomlyGenerateEnemy()
  randomlyGenerateEnemy()
  randomlyGenerateEnemy()

  setInterval(update, 40) // 25 frames per sec
})
