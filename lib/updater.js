export default class Updater {
  constructor(updateEntity, testCollisionEntity) {
    this.updateEntity = updateEntity
    this.testCollisionEntity = testCollisionEntity
  }
  updateEnemies(enemyList, player) {
    for (let key in enemyList) {
      this.updateEntity(enemyList[key])
      const isColliding = this.testCollisionEntity(player, enemyList[key])
      if (isColliding) {
        console.log('Hit!')
        player.hp = player.hp - 1
      }
    }
  }
}
