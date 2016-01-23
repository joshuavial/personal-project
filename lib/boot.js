'use strict'

import $ from 'jquery'

$( () => {

  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  // styling

  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'
  ctx.globalAlpha = 0.5

  // positioning

  let x = 50
  let speedX = 30
  let y = 40
  let speedY = 5

  let name = 'x'

  const HEIGHT = 500
  const WIDTH = 500
  const MESSAGE = 'Bouncing'

  // move positioning

  const update = () => {
    x += speedX
    y += speedY
    ctx.fillText(name, x, y)
    console.log('move', x)

    // x movement

    if (x < 0 || x > WIDTH) {
      console.log(message)
      speedX = -speedX
    }

    // y movement

    if (y < 0 || y > HEIGHT) {
      console.log(message)
      speedY = -speedY
    }   
  }

    setInterval(update, 40) // 25 frames per sec

})