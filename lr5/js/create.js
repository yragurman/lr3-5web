import {
    postFilm
} from "./api.js";
import {
    validateCreate
} from "./validation.js";
const TitleInput = document.getElementById("Title");
const DescriptionInput = document.getElementById("Description");
const TimeInput = document.getElementById("Time");
const ReviewsInput = document.getElementById("Reviews");
const submitButton = document.getElementById("Button__Submit");



export const getInputValues = () => {
    if (TitleInput.value === "") {
        alert("Write title");
        TitleInput.focus();
    } else if (DescriptionInput.value === "") {
        alert("Write description");
        DescriptionInput.focus();
    } else if (TimeInput.value === "") {
        alert("Write time");
        TimeInput.focus();
    } else if (ReviewsInput.value === "") {
        alert("Write review");
        ReviewsInput.focus();
    } else if (TitleInput.value.length > 50) {
        alert("Invalid input");
        TitleInput.focus();
    } else if (TimeInput.value > 400) {
        alert("Time too long");
        TimeInput.focus();
    } else if (ReviewsInput.value > 100000) {
        alert("Invalid input");
        ReviewsInput.focus();
    } else if (DescriptionInput.value.length > 100) {
        alert("Your description too long make shorter");
        DescriptionInput.focus();

    } else if (TimeInput.value < 1) {
        alert("Time cannot be less than one");
        TitleInput.focus();
    } else {
        return {
            title: TitleInput.value,
            description: DescriptionInput.value,
            duration: TimeInput.value,
            review: ReviewsInput.value,
        };
    }
};
// clear input when clickung submit button
export const clearInputs = () => {
    TitleInput.value = "";
    DescriptionInput.value = "";
    TimeInput.value = "";
    ReviewsInput.value = "";
};
//submit button send data to rest api
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const { title, description, duration, review } = getInputValues();
    clearInputs();
    postFilm({
        title,
        description,
        duration,
        review,
    });
});