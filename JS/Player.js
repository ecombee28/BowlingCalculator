class Player {
  constructor() {
    this.numberOfRolls = 0;
    this.turns = 0;
  }

  addPlayersTurns() {
    this.turns++;
  }

  getTurns() {
    return this.turns;
  }

  setNumberOfRolls(num) {
    this.numberOfRolls = num;
  }

  roll() {
    this.numberOfRolls++;
  }

  getRollCount() {
    return this.numberOfRolls;
  }
}
