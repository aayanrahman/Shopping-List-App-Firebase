import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; // Change this line

const appSettings = {
    databaseURL: "https://shopping-list-39a23-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list"); 

addButtonEl.addEventListener("click", () => {
    const input = inputFieldEl.value;
    push(shoppingListInDB, input);
    clearInputFieldEl();
});

onValue(shoppingListInDB, function(snapshot){
    // turn items into an array 
    let itemsArray = Object.values(snapshot.val()); 
    clearShoppingListEl(); 
    for (let i = 0; i < itemsArray.length; i++) {
        appendItemToShoppingListEl(itemsArray[i]); 
    }
    
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}