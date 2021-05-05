/**************
 Author: Eric Combee
 Date: 3/20/21
 Project Name: Bowling Calculator
 Summary: Allow users to input bowling scores and calculate the score accordingly.
****************/

var frameScore = []; // main array that keeps track of the pins knocked down per frame
var strikeIndex = [];
var spareIndex = 0;
var index = 0;
var totalScore = 0;
var currentFrame = 0;
var strike = false;
var spare = false;
var rolls = 0;
var inputPassed = false;
var disabledFrames = 0;
var numberOfStrikes = 0;

/**
 * Called on load. This creates the bowling frame in the HTML page
 */

const createFrame = () => {
  let container = document.getElementById("frame__wrapper");

  for (let i = 0; i < 10; i++) {
    container.innerHTML += `<div class="frame">
    <div class="label">Frame ${i + 1}</div>
    <div class="shot__1">
      <input
        type="text"
        onblur="inputValidation(event)"
        id="first_framescore__${i}"
        name="first_frame_score"
        autocomplete="off"
        maxlength="1"
        class="input"
      />
    </div>
    <div class="shot__2">
      <input
        type="text"
        onblur="inputValidation(event)"
        id="second_framescore__${i}"
        autocomplete="off"
        maxlength="1"
        disabled
        name="second_frame_score"
        class="input ${i === 9 && `last__frame`}"
      />

      ${
        i === 9
          ? ` <input
      type="text"
      onblur="inputValidation(event)"
      id="extra_framescore__9"
      autocomplete="off"
      maxlength="1"
      disabled
      name="extra_frame_score"
      class="input extra__input"
    />`
          : ``
      }
      
    </div>
    <div class="frame__score ">
      <p id="score_${i}">0</p>
    </div>
  </div>`;
  }
};
/**
 * Checks the user input to make sure that it is a valid
 * input and that strikes can only go in the first frame
 * and spares in the second except for the 10th frame.
 *
 * Once the input has been validated addFrame() is called
 *
 * @param {event} event
 */

const inputValidation = (event) => {
  let input = event.target.value;
  let inputId = event.target.id;
  let targetFrame = event.target.name;
  let warning = document.getElementById("warning");

  if (
    input === "x" ||
    input === "X" ||
    input === "/" ||
    input === "-" ||
    (parseInt(input) >= 0 && parseInt(input) <= 9)
  ) {
    if (inputId === "extra_framescore__9") {
      if (input === "/" && frameScore[frameScore.length - 1] <= 9) {
        disableCurrentFrame(inputId);
        addFrame(input);
      } else if (
        parseInt(input) + frameScore[frameScore.length - 1] <= 10 ||
        input === "-"
      ) {
        disableCurrentFrame(inputId);
        addFrame(input);
      } else {
        disableCurrentFrame(inputId);
        addFrame(input);
      }
    } else if (inputId === "second_framescore__9") {
      if (input === "x" || input === "X" || input === "/") {
        if (input === "/") {
          if (frameScore[frameScore.length - 1] === 10) {
            warning.innerHTML =
              "Invalid input.You cant have a spare after a strike";
            event.target.value = "";
            setTimeout(function () {
              warning.innerHTML = "";
            }, 2000);
          } else {
            disableCurrentFrame(inputId);
            enableNextFrame(input, "extra_framescore__9", targetFrame);
            addFrame(input);
          }
        } else if (frameScore[frameScore.length - 1] === 10) {
          disableCurrentFrame(inputId);
          enableNextFrame(input, "extra_framescore__9", targetFrame);
          addFrame(input);
        }
      } else if (spare || strike) {
        disableCurrentFrame(inputId);
        enableNextFrame(input, "extra_framescore__9", targetFrame);
        addFrame(input);
      } else {
        disableCurrentFrame(inputId);
        addFrame(input);
      }
    } else {
      if (targetFrame === "first_frame_score") {
        if (input === "/") {
          warning.innerHTML =
            "Invalid input.Only strikes and pins less then 10";
          event.target.value = "";
          setTimeout(function () {
            warning.innerHTML = "";
          }, 2000);
        } else {
          disableCurrentFrame(inputId);
          enableNextFrame(input, inputId, targetFrame);
          addFrame(input);
        }
      } else if (targetFrame === "second_frame_score") {
        if (input === "x" || input === "X") {
          warning.innerHTML = "Invalid input.Only spares and pins less then 10";
          event.target.value = "";
          setTimeout(function () {
            warning.innerHTML = "";
          }, 2000);
        } else if (
          parseInt(input) + frameScore[frameScore.length - 1] <= 9 ||
          input === "-"
        ) {
          disableCurrentFrame(inputId);
          enableNextFrame(input, inputId, targetFrame);
          addFrame(input);
        } else if (input === "/" && frameScore[frameScore.length - 1] <= 9) {
          disableCurrentFrame(inputId);
          enableNextFrame(input, inputId, targetFrame);
          addFrame(input);
        } else if (parseInt(input) + frameScore[frameScore.length - 1] > 9) {
          if (parseInt(input) + frameScore[frameScore.length - 1] === 10) {
            event.target.value = "/";
            disableCurrentFrame(inputId);
            enableNextFrame(input, inputId, targetFrame);
            addFrame("/");
          } else {
            warning.innerHTML =
              "Invalid input.Enter in a value of " +
              (10 - frameScore[frameScore.length - 1] + " or a /");
            event.target.value = "";
            setTimeout(function () {
              warning.innerHTML = "";
            }, 2000);
          }
        }
      }
    }
  } else {
    if (input !== "") {
      warning.innerHTML =
        "Invalid input. Only X, /, -, or numbers from 0-9 are allowed.";
      event.target.value = "";
      setTimeout(function () {
        warning.innerHTML = "";
      }, 2000);
    }
  }
};
/**
 * Handles the input to determine how to score it.
 * This is where the individual scores per frame are added to
 * the frameScore[]
 *
 * @param {string} input
 */

const addFrame = (input) => {
  rolls++;

  if (input === "x" || input === "X") {
    frameScore.push(10);

    strike = true;
    strikeIndex.push(Math.floor(index / 2));
    skipFrame = Math.floor(index / 2);
    numberOfStrikes++;
    index++;
  } else if (input === "/") {
    frameScore[frameScore.length - 1] = 0;
    frameScore.push(10);

    spareIndex = index;
    spare = true;
    if (!strike) {
      rolls = 1;
    }
  } else if (input === "-") {
    frameScore.push(0);
  } else {
    frameScore.push(parseInt(input));
  }

  setScore();

  index++;
};

/**
 * Determines what was rolled and which function to
 * call to handle the score properly.
 */

const setScore = () => {
  if (strike && rolls === 3) {
    addStrikes();

    if (spare) {
      rolls = 1;
    }
  } else if (spare && rolls === 2) {
    addSpares();

    if (spare) {
      rolls = 2;

      setScore();
    } else {
      rolls = 1;
      spareIndex = 0;
      console.log(frameScore);
    }
  } else if (rolls === 2 && !spare && !strike) {
    addPins();
    rolls = 0;
  }
};

/**
 * Add Strikes
 */

const addStrikes = () => {
  let ttl = 0;

  for (let i = frameScore.length - 3; i < frameScore.length; i++) {
    ttl += frameScore[i];
  }

  frameScore[frameScore.length - 3] = ttl;
  strikeIndex.shift();
  totalScore += ttl;
  document.getElementById("score_" + currentFrame).innerHTML = totalScore;
  currentFrame++;
  ttl = 0;
  numberOfStrikes--;

  //strike
  if (numberOfStrikes > 0) {
    rolls = 2;
    strike = true;
  } else {
    if (!spare) {
      for (let i = 0; i < frameScore.length; i++) {
        ttl += frameScore[i];
      }
      totalScore = ttl;
      document.getElementById("score_" + currentFrame).innerHTML = totalScore;

      strike = false;
      strikeFrameCrt = 0;
      rolls = 0;
      currentFrame++;
    } else {
      strike = false;
    }
  }
};

/**
 * Add Spares
 */

const addSpares = () => {
  let ttl = 0;

  frameScore[frameScore.length - 2] += frameScore[frameScore.length - 1];

  for (let i = 0; i < frameScore.length - 1; i++) {
    ttl += frameScore[i];
  }

  totalScore = ttl;

  document.getElementById("score_" + currentFrame).innerHTML = totalScore;

  currentFrame++;
  spare = false;
};
/**
 * Add non-spares and strikes
 */

const addPins = () => {
  let ttl = 0;

  for (let i = 0; i < frameScore.length; i++) {
    ttl += frameScore[i];
  }

  totalScore = ttl;

  document.getElementById("score_" + currentFrame).innerHTML = totalScore;
  currentFrame++;
};

/**
 * disables the current frame after input
 * @param {string} frame
 */
const disableCurrentFrame = (frame) => {
  document.getElementById(frame).disabled = true;
};

/**
 * Take disable off of the next input if appropriate.
 * If the user rolls a strike the next frame stays
 * disabled.
 * Also determines if the player gets the extra 10th frame shot
 *
 * @param {String} value
 * @param {String} frameId
 * @param {String} frameName
 */

const enableNextFrame = (value, frameId, frameName) => {
  if (frameName === "first_frame_score") {
    if (value === "X" || value === "x") {
      if (frameId === "first_framescore__9") {
        document.getElementById("second_framescore__9").disabled = false;
      } else {
        document.getElementById(
          "first_framescore__" + ++disabledFrames
        ).disabled = false;
      }
    } else {
      document.getElementById(
        "second_framescore__" + disabledFrames
      ).disabled = false;
    }
  } else if (
    frameName === "second_frame_score" &&
    frameId !== "extra_framescore__9"
  ) {
    document.getElementById(
      "first_framescore__" + ++disabledFrames
    ).disabled = false;
  } else {
    if (
      frameScore[frameScore.length - 1] === 10 ||
      value === "x" ||
      value === "X" ||
      value === "/"
    ) {
      document.getElementById("extra_framescore__9").disabled = false;
    }
  }
};
const newGame = () => {
  location.reload();
};
