import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
const msInput = document.querySelector("input[name=delay]");
const fullfieldRadio = document.querySelector("input[value=fulfilled]");

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    createPromise(Number(msInput.value));
});

function createPromise(delay) {
    if (delay > 0) {
        const promise = new Promise((res, rej) => {
            if (fullfieldRadio.checked) setTimeout(() => { res(`✅ Fulfilled promise in ${delay}ms`) }, delay);
            else setTimeout(() => { rej(`❌ Rejected promise in ${delay}ms`) }, delay);
        });
        promise
            .then(value => {
                iziToast.show({
                    message: value,
                    backgroundColor: "rgba(82, 223, 79, 0.3)",
                    position: "topRight"
                })
            }) 
            .catch(value => {
                iziToast.show({
                    message: value,
                    backgroundColor: "rgba(223, 79, 79, 0.3)",
                    position: "topRight"
                })
            })
    } else {
        iziToast.show({
            message: "Value must be more than 0",
            backgroundColor: "yellow",
            position: "topRight"
        })
    }
}
