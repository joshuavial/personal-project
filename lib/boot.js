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

    if (x > 500) {
      console.log('Out Of Bounds')
    }
  }

    setInterval(update, 500)

})