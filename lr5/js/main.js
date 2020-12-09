import {
    renderItemsList,
    EDIT_BUTTON_PREFIX,
} from "./dom.js";
import {
    getAllFilms,
    editFilm
} from "./api.js";
const findButton = document.getElementById("find_button");
const findInput = document.getElementById("find_input");
const cancelFindButton = document.getElementById("Clear_button");
const countButton = document.getElementById("Count__button");
const sortButton = document.getElementById("sort_button");
const sumOut = document.getElementById("Total__reviews");
const empty = document.getElementById("items_container");
const TitleInput = document.getElementById("Title");
const DescriptionInput = document.getElementById("Description");
const TimeInput = document.getElementById("Time");
const ReviewsInput = document.getElementById("Reviews");



let films = [];
//edit
const onEditItem = async(element) => {
    const id = element.target.id.replace(EDIT_BUTTON_PREFIX, "");
    const { title, description, duration, review } = getInputValues();
    clearInputs();
    editFilm(id, {
        title,
        description,
        duration,
        review
    }).then(refetchFilms);
};
//get Film from rest API
export const refetchFilms = async() => {
    const Films = await getAllFilms();
    films = Films;
    renderItemsList(films, onEditItem);
};


findButton.addEventListener("click", () => {
    const foundFilms = films.filter(film => film.title.search(findInput.value) !== -1);
    if (foundFilms.length != 0) {
        renderItemsList(foundFilms, onEditItem);
    } else {
        empty.innerHTML = ("Not found! You need add this film first in create page");
    }
});

cancelFindButton.addEventListener("click", () => {
    renderItemsList(films, onEditItem);
    findInput.value = "";
});
// function sorting descending
function compareFromDescending(a, b) {
    if (a.review < b.review) {
        return -1;
    }
    if (a.review > b.review) {
        return 1;
    }
    return 0;
}

// function sorting ascending
function compareAscending(a, b) {
    if (a.review > b.review) {
        return -1;
    }
    if (a.review < b.review) {
        return 1;
    }
    return 0;
}
sortButton.addEventListener("change", function() {
    if (this.checked) {
        const sortedFilms = films.sort(compareFromDescending);
        renderItemsList(sortedFilms, onEditItem);
    } else {
        const sortedFilms = films.sort(compareAscending);
        renderItemsList(sortedFilms, onEditItem);
    }
});
//sum function
function duration(item) {
    return item.duration;
}

function sum(prev, next) {
    return prev + next;
}
countButton.addEventListener("click", () => {
    const SumReview = films.map(duration).reduce(sum);
    sumOut.innerHTML = `${SumReview} minutes`;
});

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
export const clearInputs = () => {
    TitleInput.value = "";
    DescriptionInput.value = "";
    TimeInput.value = "";
    ReviewsInput.value = "";
};

renderItemsList(films, onEditItem);
refetchFilms();