const { v4: uuidv4 } = require('uuid'); // add UUID library

class RoboDogBuilder {
  constructor(name) {
    this.name = name;
    this.intelligence = 0;
    this.aggression = 0;
    this.strength = 0;
    this.endurance = 0;
    this.commands = {};
    this.uuid = null;
  }

  setIntelligence(value) {
    this.intelligence = this.validateCharacteristic(value);
    return this;
  }

  setAggression(value) {
    this.aggression = this.validateCharacteristic(value);
    return this;
  }

  setStrength(value) {
    this.strength = this.validateCharacteristic(value);
    return this;
  }

  setEndurance(value) {
    this.endurance = this.validateCharacteristic(value);
    return this;
  }

  addCommand(commandName, action) {
    this.commands[commandName] = action;
    return this;
  }

  validate() {
    const totalPoints = this.intelligence + this.aggression + this.strength + this.endurance;
    if (totalPoints !== 30) {
      throw new Error("Total points must be exactly 30.");
    }
    this.uuid = this.generateUUID();
    return this;
  }

  build() {
    if (!this.uuid) {
      throw new Error("UUID is required before building.");
    }
    return {
      name: this.name,
      intelligence: this.intelligence,
      aggression: this.aggression,
      strength: this.strength,
      endurance: this.endurance,
      uuid: this.uuid,
      attackEnemy: () => {
        const attackSuccess = (this.strength + this.aggression) / 2;
        if (this.strength < 4 && this.aggression < 4) {
          console.log(`${this.name} attacks the enemy but is seriously injured.`);
        } else if (attackSuccess >= 7) {
          console.log(`${this.name} attacks the enemy successfully!`);
        } else {
          console.log(`${this.name} attacks the enemy but gets beaten.`);
        }
      },
      ...this.commands
    };
  }

  generateUUID() {
    // Generate UUID using uuidv4
    return uuidv4();
  }

  validateCharacteristic(value) {
    if (value < 0 || value > 10) {
      throw new Error("Characteristic value must be between 0 and 10.");
    }
    return value;
  }
}

// Example:
const alf = new RoboDogBuilder('Alf')
  .setIntelligence(10)
  .setAggression(5)
  .setStrength(5)
  .setEndurance(10)
  .addCommand('bark', () => console.log('Alf is barking'))
  .validate()
  .build();

alf.bark();
alf.attackEnemy();
