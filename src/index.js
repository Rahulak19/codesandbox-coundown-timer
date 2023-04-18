import "./styles.css";
(function () {
  var hour = document.querySelector(".timer_input_hours");
  var min = document.querySelector(".timer_input_min");
  var sec = document.querySelector(".timer_input_sec");

  var startBtn = document.querySelector(".timer_btn_start");
  var stopBtn = document.querySelector(".timer_btn_stop");
  var resetBtn = document.querySelector(".timer_btn_reset");

  var coutdownTimer = null;

  startBtn.addEventListener("click", () => {
    if (hour.value == 0 && min.value == 0 && sec.value == 0) return;

    function setTimer() {
      startBtn.style.display = "none";
      stopBtn.style.display = "initial";
      coutdownTimer = setInterval(() => {
        timer();
      }, 1000);
    }
    setTimer();
    function stopTimer(state) {
      startBtn.innerHTML = state === "pause" ? "Continue" : "Start";
      startBtn.style.display = "initial";
      stopBtn.style.display = "none";
      clearInterval(coutdownTimer);
    }
    function timer() {
      if (sec.value > 60) {
        min.value++;
        sec.value = +sec.value - 60;
      }
      if (min.value > 60) {
        hour.value++;
        min.value = +min.value - 60;
      }
      if (hour.value == 0 && min.value == 0 && sec.value == 0) {
        hour.value = "";
        min.value = "";
        sec.value = "";
        stopTimer();
      } else if (sec.value != 0) {
        sec.value = `${sec.value > 10 ? "" : "0"}${sec.value - 1}`;
      } else if (min.value != 0 && sec.value == 0) {
        sec.value = 59;
        min.value = `${min.value > 10 ? "" : "0"}${min.value - 1}`;
      } else if (hour.value != 0 && min.value == 0) {
        min.value = 60;
        hour.value = `${hour.value > 10 ? "" : "0"}${hour.value - 1}`;
      }
    }
    stopBtn.addEventListener("click", () => {
      stopTimer("pause");
    });
    resetBtn.addEventListener("click", () => {
      sec.value = "";
      min.value = "";
      hour.value = "";
      stopTimer();
    });
  });
})();
