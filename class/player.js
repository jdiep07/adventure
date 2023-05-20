const { Food } = require("./food")

class Player {
  constructor(name, startingRoom) {
    this.name = name
    this.currentRoom = startingRoom
    this.items = []
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction)

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom

      nextRoom.printRoom(this)
    } else {
      console.log("You cannot move in that direction")
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`)
    } else {
      console.log(`${this.name} is carrying:`)
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`)
      }
    }
  }

  takeItem(itemName) {
    const newItem = this.currentRoom.getItemByName(itemName)

    if (newItem) {
      const leftovers = this.currentRoom.items.filter(
        (eachItem) => eachItem !== newItem
      )
      this.currentRoom.items = leftovers

      this.items.push(newItem)
    }
  }

  dropItem(itemName) {
    const newItem = this.getItemByName(itemName)

    if (newItem) {
      const leftovers = this.items.filter((eachItem) => eachItem !== newItem)
      this.items = leftovers

      this.currentRoom.items.push(newItem)
    }
  }

  eatItem(itemName) {
    // Allow the player to eat food items, but not non-food items

    const newItem = this.getItemByName(itemName)

    if (newItem instanceof Food) {
      this.items.splice(this.items.indexOf(newItem), 1)
    }
  }

  getItemByName(name) {
    const newItem = this.items.find((eachItem) => eachItem.name === name)
    return newItem
  }
}

module.exports = {
  Player,
}
