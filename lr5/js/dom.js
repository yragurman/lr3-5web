import { deleteFilm } from "./api.js";
import { refetchFilms } from "./main.js";
const itemsContainer = document.getElementById("items_container");
// local functions
const getItemID = (id) => `item-${id}`;

export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const DELETE_BUTTON_PREFIX = 'delete-button-';


const itemTemplate = ({ id, title, description, duration, review }) => `
<li id="${getItemID(id)}" class="card mb-3 item-card">
                <img src="image/Films_Image.jpg" class="item-container__image" alt="card">
                <div class="items_container__card-body">
                    <h5 class="items_container__card-title"> ${title}</h5>
                    <p class="items_container__card-text"> ${description}</p>
                    <p class="items_container__time">Duration: ${duration}min.</p>
                    <p class="items_container__reviews">Reviews: ${review}</p>
                    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">Edit</button>
                    <button id="${DELETE_BUTTON_PREFIX}${id}" class="Remove_button" type="button">Delete</button>
                </div>
            </li>`;


export const addItemToPage = ({ _id: id, title, description, duration, review }, onEditItem) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, title, description, duration, review })
    );
    const element = document.getElementById(id);
    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
    editButton.addEventListener("click", onEditItem);

    const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);
    deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteFilm(id).then(refetchFilms);
    });
};
export const renderItemsList = (items, onEditItem) => {
    itemsContainer.innerHTML = "";

    for (const item of items) {
        addItemToPage(item, onEditItem);
    }
};