import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import 'modern-normalize/modern-normalize.css';

const startBtn = document.querySelector("button");
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      console.log(options.defaultDate);
      if (selectedDates[0] < options.defaultDate) {
          startBtn.setAttribute("disabled", "");
          alert("Please choose a date in the future");
      } else {
          startBtn.removeAttribute("disabled");
          selectedDate = selectedDates[0];
          console.log(selectedDate);
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
