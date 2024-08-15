import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; // Change this line

const appSettings = {
    databaseURL: "https://shopping-list-39a23-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", () => {
    const input = inputFieldEl.value;

    push(shoppingListInDB, input);

    inputFieldEl.value = ""
    
    shoppingListEl.innerHTML += `<li>${input}</li>`
});

