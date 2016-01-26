export default class Router {
  listenForKeyDown(player) {
    // listen for key press downs and set key state
    document.addEventListener('keydown', (event) => {
      const keys = {
        68: 'pressingRight',
        83: 'pressingDown',
        65: 'pressingLeft',
        87: 'pressingUp',
      }
      if (keys[event.keyCode]) {
        player[keys[event.keyCode]] = true
      } else {
        console.log('invalid key press')
      }
    })
  }
}
