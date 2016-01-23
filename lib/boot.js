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

  // move positioning

  const update = () => {
    x += speedX
    y += speedY
    ctx.fillText('X', x, y)
    console.log('move', x)

    // x movement

    if (x > 500) {
      console.log('Out Of Bounds')
      speedX = -30
    }

    if (x < 0) {
      console.log('Out Of Bounds')
      speedX = 30
    }

    // y movement

    if (y > 500) {
      console.log('Out Of Bounds')
      speedY = -5
    }

    if (y < 0) {
      console.log('Out Of Bounds')
      speedY = 5
    }    
  }

    setInterval(update, 40) // 25 frames per sec

})