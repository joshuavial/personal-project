export default class Router {
  listenForKeyDown(player) {
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
  }
  
}
