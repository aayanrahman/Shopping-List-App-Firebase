import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; // Change this line

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
    let itemsArray = Object.entries(snapshot.val()); 


    clearShoppingListEl(); 
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i];
        let currentItemId =  currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem); 
    }
    
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue; 
    shoppingListEl.append(newEl);

    newEl.addEventListener("dblclick", function() {
        let locationOfItemsInDB = ref(database, `shoppingList/${itemID}`)
        remove(locationOfItemsInDB)
    })
}