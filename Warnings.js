class Warnings {
  constructor() {
    this.warning = document.getElementById("warning");
  }

  invalidStrike(event) {
    this.warning.innerHTML = "Invalid input.You cant have a strike here.";
    event.target.value = "";
    setTimeout(function () {
      this.warning.innerHTML = "";
    }, 2500);
  }

  invalidSpare(event) {
    this.warning.innerHTML = "Invalid input.You cant have a spare here.";
    event.target.value = "";
    setTimeout(function () {
      this.warning.innerHTML = "";
    }, 2500);
  }

  invalidInput(event) {
    this.warning.innerHTML =
      "Invalid input.Enter in only X or / or - or digits";
    event.target.value = "";
    setTimeout(function () {
      this.warning.innerHTML = "";
    }, 2500);
  }

  invalidScore() {
    this.warning.innerHTML =
      "Invalid input. You can not knock down more then 10 pins";
    event.target.value = "";
    setTimeout(function () {
      this.warning.innerHTML = "";
    }, 2500);
  }
}
