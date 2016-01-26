document.addEventListener('DOMContentLoaded', (event) => {
  'use strict'

  // set up canvas env
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const HEIGHT = 500
  const WIDTH = 500
  ctx.font = '30px Verdana'

  // set up game state
  let timeWhenGameStarted = Date.now() // time in ms
  let frameCount = 0
  let score = 0

  // listen for key press downs and set key state
  document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case 68:
        player.pressingRight = true
        break
      case 83:
        player.pressingDown = true
        break
      case 65:
        player.pressingLeft = true
        break
      case 87:
        player.pressingUp = true
        break
      default:
        console.log('invalid key press')
        break
    }
  })

  // listen for key press ups and set key state
  document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
      case 68:
        player.pressingRight = false
        break
      case 83:
        player.pressingDown = false
        break
      case 65:
        player.pressingLeft = false
        break
      case 87:
        player.pressingUp = false
        break
      default:
        console.log('invalid key press')
        break
    }
  })

  // listen for mouse clicks on canvas and fire bullet
  canvas.addEventListener('click', (mouse) => {
    if (player.attackCounter > 25) {
      randomlyGenerateBullet()
      player.attackCounter = 0
    }
  })

  // update player position on canvas
  const updatePlayerPosition = () => {
    if (player.pressingRight) {
      player.x += 10
    }
    if (player.pressingLeft) {
      player.x -= 10
    }
    if (player.pressingDown) {
      player.y += 10
    }
    if (player.pressingUp) {
      player.y -= 10
    }

    // check next player position is a valid move
    if (player.x < player.width / 2) {
      player.x = player.width / 2
    }
    if (player.x > WIDTH - player.width / 2) {
      player.x = WIDTH - player.width / 2
    }
    if (player.y < player.height / 2) {
      player.y = player.height / 2
    }
    if (player.y > HEIGHT - player.height / 2) {
      player.y = HEIGHT - player.height / 2
    }
  }

  // create player
  const player = {
    x: 50,
    speedX: 30,
    y: 40,
    speedY: 5,
    name: 'x',
    hp: 10,
    width: 20,
    height: 20,
    color: 'green',
    attackSpeed: 1,
    attackCounter: 0,
    pressingDown: false,
    pressingUp: false,
    pressingLeft: false,
    pressingRight: false
  }

  // create enemy
  let enemyList = {}

  const Enemy = (id, x, y, speedX, speedY, width, height) => {
    const enemy = {
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

  // create upgrade
  let upgradeList = {}

  const Upgrade = (id, x, y, speedX, speedY, width, height, color, category) => {
    const upgrade = {
      x: x,
      speedX: speedX,
      y: y,
      speedY: speedY,
      name: 'e',
      id: id,
      width: width,
      height: height,
      color: color,
      category: category
    }
    upgradeList[id] = upgrade
  }

  // create bullet
  let bulletList = {}

  const Bullet = (id, x, y, speedX, speedY, width, height) => {
    const bullet = {
      x: x,
      speedX: speedX,
      y: y,
      speedY: speedY,
      name: 'e',
      id: id,
      width: width,
      height: height,
      color: 'black',
      timer: 0 // bullet lifespan
    }
    bulletList[id] = bullet
  }

  // randomly generate an enemy
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

  // randomly generate an upgrade
  const randomlyGenerateUpgrade = () => {
    const x = Math.random() * WIDTH
    const y = Math.random() * HEIGHT
    const height = 10 // between 10 and 40
    const width = 10 // between 10 and 40
    const id = Math.random()
    const speedX = 0
    const speedY = 0
    let color = Upgrade.color
    let category = Upgrade.category

    if (Math.random() < 0.5) {
      category = 'score'
      color = 'orange'
    } else {
      category = 'attackSpeed'
      color = 'purple'
    }

    Upgrade(id, x, y, speedX, speedY, width, height, color, category)
  }

  // randomly generate a bullet
  const randomlyGenerateBullet = () => {
    const x = player.x
    const y = player.y
    const height = 10 // between 10 and 40
    const width = 10 // between 10 and 40
    const id = Math.random()
    const angle = Math.random() * 360 // random angle from 0 to 360
    const speedX = Math.cos(angle / 180 * Math.PI) * 5
    const speedY = Math.sin(angle / 180 * Math.PI) * 5

    Bullet(id, x, y, speedX, speedY, width, height)
  }

  // define collision detection between two entities (rectangles)
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

  // check if there is collision between two entities (rectangles)
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

  // set entity position
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

  // draw entities on canvas
  const drawEntity = (entity) => {
    ctx.save()
    ctx.fillStyle = entity.color
    ctx.fillRect(entity.x - entity.width / 2,
                 entity.y - entity.height / 2,
                 entity.width,
                 entity.height)
    ctx.restore()
  }

  // start a new game and reset properties
  const startNewGame = () => {
    player.hp = 10
    timeWhenGameStarted = Date.now()
    frameCount = 0
    score = 0
    enemyList = {}
    upgradeList = {}
    bulletList = {}
    randomlyGenerateEnemy()
    randomlyGenerateEnemy()
    randomlyGenerateEnemy()
  }

  // update entities
  const update = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT) // clears canvas each time
    frameCount++ // each update increase the framecount by one
    score++ // each update increase the score by one

    if (frameCount % 100 === 0) { // trigger every 4 seconds
      randomlyGenerateEnemy()
    }

    if (frameCount % 75 === 0) { // trigger every 3 seconds
      randomlyGenerateUpgrade()
    }

    player.attackCounter += player.attackSpeed

    // draw enemies
    for (let key in enemyList) {
      updateEntity(enemyList[key])
      const isColliding = testCollisionEntity(player, enemyList[key])
      if (isColliding) {
        console.log('Hit!')
        player.hp = player.hp - 1
      }
    }

    // draw bullets
    for (let key in bulletList) {
      updateEntity(bulletList[key])
      let toRemove = false
      bulletList[key].timer++ // increase timer by one

      if (bulletList[key].timer > 75) {
        console.log('remove')
        toRemove = true
      }

      for (let key2 in enemyList) {
        const isColliding = testCollisionEntity(bulletList[key], enemyList[key2])
        if (isColliding) {
          delete enemyList[key2]
          toRemove = true
          break
        }
      }
      if (toRemove) {
        delete bulletList[key]
      }
    }

    // draw upgrades
    for (let key in upgradeList) {
      updateEntity(upgradeList[key])
      const isColliding = testCollisionEntity(player, upgradeList[key])
      if (isColliding) {
        if (upgradeList[key].category === 'score') {
          score += 1000 // increase score by 1000
        }
        if (upgradeList[key].category === 'attackSpeed') {
          player.attackSpeed += 3 // increase players attack speed (bullet fire) by 3
        }
        delete upgradeList[key] // delete one key
      }
    }

    // when player hp is 0 reset game
    if (player.hp <= 0) {
      const timeSurvived = Date.now() - timeWhenGameStarted
      console.log('You died! You survived for ' + timeSurvived + ' ms.')
      startNewGame()
    }
    updatePlayerPosition()
    drawEntity(player)
    ctx.fillText(player.hp + 'hp', 0, 30)
    ctx.fillText('Score: ' + score, 200, 30)
  }

  startNewGame()
  setInterval(update, 40) // 25 frames per sec
})
