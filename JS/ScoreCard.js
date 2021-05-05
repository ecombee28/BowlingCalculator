class ScoreCard {
  constructor(player, frame) {
    this.currentFrameScore;
    this.framesScoreArray = [];
    this.totalScore = 0;
    this.strikeIndex = [];
    this.spareIndex = [];
    this.player = player;
    this.frame = frame;
  }

  addScore(pins) {
    this.arrLength = this.framesScoreArray.length - 1;

    if (pins === "X") {
      this.framesScoreArray.push(10);
      !frame.checkIfLastFrame() && this.strikeIndex.push(player.getTurns());
      player.addPlayersTurns();
      player.setNumberOfRolls(0);
    } else if (pins === "/") {
      this.framesScoreArray[this.arrLength] = 0;
      this.framesScoreArray.push(10);
      !frame.checkIfLastFrame() && this.spareIndex.push(player.getTurns());
      player.addPlayersTurns();
    } else if (pins === "-") {
      this.framesScoreArray.push(0);
      frame.increaseFramesBowled();
      player.addPlayersTurns();
    } else {
      this.framesScoreArray.push(parseInt(pins));
      frame.increaseFramesBowled();
      player.addPlayersTurns();
    }

    if (this.framesScoreArray.length - 1 >= 1) {
      this.calculateTotalScore();
      console.log(this.framesScoreArray);
    }
  }

  calculateTotalScore() {
    this.arrLength = this.framesScoreArray.length - 1;
    let strikeTtl = 0;
    let spareTtl = 0;

    //strike
    if (
      this.strikeIndex.length > 0 &&
      this.strikeIndex[0] + 2 === this.arrLength
    ) {
      for (let i = this.strikeIndex[0]; i <= this.arrLength; i++) {
        strikeTtl += this.framesScoreArray[i];
      }

      this.framesScoreArray[this.strikeIndex[0]] = strikeTtl;

      this.totalScore += strikeTtl;
      strikeTtl = 0;

      frame.setScoreForCurrentFrame(this.totalScore);
      frame.nextScoreFrame();
      player.setNumberOfRolls(2);
      this.strikeIndex.shift();
    } else if (
      frame.checkIfLastFrame() &&
      this.strikeIndex[0] === this.arrLength
    ) {
      this.framesScoreArray[this.strikeIndex[0]] = 10;
      this.totalScore += strikeTtl;
      frame.setScoreForCurrentFrame(this.totalScore);
      player.setNumberOfRolls(2);

      this.strikeIndex.shift();
    }
    //spare
    if (
      this.spareIndex.length > 0 &&
      this.spareIndex[0] + 1 === this.arrLength
    ) {
      this.totalScore = this.framesScoreArray.reduce(
        (currentTtl, frame) => frame + currentTtl
      );

      for (let i = this.spareIndex[0]; i <= this.arrLength; i++) {
        spareTtl += this.framesScoreArray[i];
      }

      this.framesScoreArray[this.spareIndex[0]] = spareTtl;

      spareTtl = 0;
      frame.checkIfLastFrame() && console.log("last");

      frame.setScoreForCurrentFrame(this.totalScore);
      frame.nextScoreFrame();
      frame.checkIfLastFrame()
        ? player.setNumberOfRolls(2)
        : player.setNumberOfRolls(1);

      this.spareIndex.shift();
    }
    if (
      this.strikeIndex.length === 0 &&
      this.spareIndex.length === 0 &&
      player.getRollCount() === 2
    ) {
      this.totalScore = this.framesScoreArray.reduce(
        (currentTtl, frame) => frame + currentTtl
      );

      frame.checkIfLastFrame() && frame.setCurrentFrame(9);
      frame.setScoreForCurrentFrame(this.totalScore);
      frame.nextScoreFrame();
      player.setNumberOfRolls(0);
    }
  }

  getTotalScore() {
    return this.totalScore;
  }

  getLastRole() {
    return this.framesScoreArray[this.framesScoreArray.length - 1];
  }
  getArrayLength() {
    return this.framesScoreArray.length - 1;
  }
}
