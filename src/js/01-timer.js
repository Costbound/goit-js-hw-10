import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dayOut = document.querySelector("[data-days]");
const hourOut = document.querySelector("[data-hours]");
const minOut = document.querySelector("[data-minutes]");
const secOut = document.querySelector("[data-seconds]");

const startBtn = document.querySelector("button");
let selectedDate;
startBtn.setAttribute("disabled", "");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
        startBtn.setAttribute("disabled", "");
        iziToast.show({
          message: "Please choose a date in the future",
          backgroundColor: "rgb(236, 56, 56)",
          messageColor: "#FFF",
          position: "center"
        });
      } else {
          startBtn.removeAttribute("disabled");
          selectedDate = selectedDates[0];
       }
  },
};
flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
let timerID;
startBtn.onclick = () => {
  if (selectedDate.getTime() > Date.now()) {
    calcTimer();
    const timer = setInterval(calcTimer, 1000);
    timerID = timer;
    startBtn.setAttribute("disabled", "");
  } else { 
    iziToast.show({ // To prevent negative timer if slected time rich present time before button push
          message: "Please choose a date in the future",
          backgroundColor: "rgb(236, 56, 56)",
          messageColor: "#FFF",
          position: "center"
    });
    startBtn.setAttribute("disabled", "");
  }
}

const calcTimer = () => {
  const selDateMs = selectedDate.getTime();
  const remain = convertMs(selDateMs - Date.now());
  dayOut.textContent = remain.days.toString().padStart(2, "0");
  hourOut.textContent = remain.hours.toString().padStart(2, "0");
  minOut.textContent = remain.minutes.toString().padStart(2, "0");
  secOut.textContent = remain.seconds.toString().padStart(2, "0");
  if (((selDateMs - 1000) < Date.now()) && secOut.textContent == "00") clearInterval(timerID);
}