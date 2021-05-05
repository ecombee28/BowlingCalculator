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
          ${i > 0 && `disabled`}
          
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
          class="input ${i == 9 && `last__frame`}"
        />
  
        ${
          i == 9
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

const player = new Player();
const frame = new Frame(player);
const score = new ScoreCard(player, frame);
const errorMsg = new Warnings();

const inputValidation = (event) => {
  let input = event.target.value.toUpperCase();
  let inputId = event.target.id;
  let targetFrame = event.target.name;
  let digitalTester = /\d/;
  let inputValueCheck = score.getLastRole() + parseInt(input);

  if (
    (input === "X" ||
      input === "/" ||
      input === "-" ||
      digitalTester.test(parseInt(input))) &&
    input.length > 0
  ) {
    if (input === "X") {
      if (targetFrame === "second_frame_score") {
        if (inputId !== "second_framescore__9") {
          errorMsg.invalidStrike(event, warning);
        } else if (
          inputId === "second_framescore__9" &&
          score.getLastRole() !== 10
        ) {
          errorMsg.invalidStrike(event, warning);
        } else {
          Main(input, inputId, targetFrame);
        }
      } else {
        Main(input, inputId, targetFrame);
      }
    } else if (input === "/") {
      if (targetFrame === "first_frame_score") {
        errorMsg.invalidSpare(event);
      } else if (inputId === "second_framescore__9") {
        if (score.getLastRole() === 10) {
          errorMsg.invalidSpare(event);
        } else {
          Main(input, inputId, targetFrame);
        }
      } else {
        Main(input, inputId, targetFrame);
      }
    } else {
      if (player.getRollCount() === 1) {
        if (inputValueCheck === 10) {
          event.target.value = "/"; // change the current input to a spare sign
          input = "/";
          Main(input, inputId, targetFrame);
        } else if (inputValueCheck > 10) {
          if (inputId === "second_framescore__9") {
            score.getLastRole() === 10 && Main(input, inputId, targetFrame);
          } else {
            errorMsg.invalidScore(event);
          }
        } else {
          Main(input, inputId, targetFrame);
        }
      } else {
        Main(input, inputId, targetFrame);
      }
    }
  } else {
    input.length !== 0 && errorMsg.invalidInput(event);
  }
};

// Start a new game
const newGame = () => {
  location.reload();
};

const Main = (input, inputId, targetFrame) => {
  if (inputId === "extra_framescore__9") {
    player.setNumberOfRolls(2);
    frame.setLastFrame();
  } else {
    player.roll();
  }

  score.addScore(input);

  frame.disableCurrentFrame(inputId);
  inputId !== "extra_framescore__9" &&
    frame.enableNextFrame(targetFrame, input, inputId, score);
};
