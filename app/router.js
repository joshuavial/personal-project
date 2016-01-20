import $ from 'jquery'
import {Controller} from './controller'

export class Router {
  constructor () {
    this.controller = new Controller()
  }

  listen () {
    console.log('listening in the router')
    // this is where you put your event listeners which call controller actions
    $(() => {
      $(document).on('keydown', (event) => {
        // wasd keys moves

        const LEFT = 65
        const RIGHT = 68
        const DOWN = 83
        const UP = 87

        switch (event.keyCode) {
          case LEFT:
            console.log('Move Left')
            break

          case RIGHT:
            console.log('Move Right')
            break

          case DOWN:
            console.log('Move Down')
            break

          case UP:
            console.log('Move Up')
            break

          default:
            console.log('Unknown Movement', event.keyCode)
        }
      })
    })
  }
}

