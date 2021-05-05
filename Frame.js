"use strict";

class Frame {
  constructor(player) {
    this.player = player;
    this.framesArray = [];
    this.numberOfRolls = 0;
    this.currentFrame = 0;
    this.spare = false;
    this.strike = false;
    this.framesBowled = 0;
    this.nextFrameToBeEnabled = 0;
    this.lastFrame = false;
  }

  increaseFramesBowled() {
    this.framesBowled++;
  }

  getFramesBowled() {
    return this.framesBowled;
  }

  setCurrentFrame(num) {
    this.currentFrame = num;
  }

  getCurrentScoreFrame() {
    return this.currentFrame;
  }

  nextScoreFrame() {
    this.currentFrame++;
  }

  getCurrentEnabledFrame() {
    return this.nextFrameToBeEnabled;
  }

  nextEnabledFrame() {
    this.nextFrameToBeEnabled++;
  }

  setScoreForCurrentFrame(score) {
    document.getElementById(`score_${this.currentFrame}`).innerHTML = score;
  }

  disableCurrentFrame(frame) {
    document.getElementById(frame).disabled = true;
  }

  enableNextFrame(frameName, pinKnockDown, frameId, score) {
    if (frameName === "first_frame_score") {
      if (pinKnockDown === "X" && frameId !== "first_framescore__9") {
        this.nextEnabledFrame();
        document.getElementById(
          `first_framescore__${this.nextFrameToBeEnabled}`
        ).disabled = false;
      } else {
        document.getElementById(
          `second_framescore__${this.nextFrameToBeEnabled}`
        ).disabled = false;
      }
    } else if (
      frameName === "second_frame_score" &&
      frameId !== "second_framescore__9"
    ) {
      this.nextEnabledFrame();
      document.getElementById(
        `first_framescore__${this.nextFrameToBeEnabled}`
      ).disabled = false;
    } else {
      if (score.strikeIndex.length > 0 || score.spareIndex.length > 0) {
        this.nextEnabledFrame();
        document.getElementById(`extra_framescore__9`).disabled = false;
      }
    }
  }

  setLastFrame() {
    this.lastFrame = true;
  }
  checkIfLastFrame() {
    return this.lastFrame;
  }
}
