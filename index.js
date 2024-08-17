import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import { getDatabase, ref, push, onValue , remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const appsettings = {
    databaseURL: "https://to-do-b40dd-default-rtdb.asia-southeast1.firebasedatabase.app/",
    
  };
const app = initializeApp(appsettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database , "shoppingList")




const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl=document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue)
  console.log(inputValue); 

  clearInputFieldEL(); 
});


onValue(shoppingListInDB, function(snapshot) {
 
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();
  
    for (let i = 0; i < itemsArray.length; i++){
      let currentItem = itemsArray[i]
  
      let currentItemId = currentItem[0]
      let currentItemValue = currentItem[1]
  
      appendItemTOShoppingList(currentItem)
    }
   
  } else {
    shoppingListEl.innerHTML = "No items here.... yet";
}



});


function clearShoppingListEl() {
  shoppingListEl.innerHTMl = "";
 
};
  function clearInputFieldEL() {
    inputFieldEl.value = "";
};

function appendItemTOShoppingList(item) {
  // shoppingListEl.innerHTML += `<li>${L}</li>`

  let itemId = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;
  
  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDb = ref(database, `/shoppingList/${itemId}`);
    console.log(exactLocationOfItemInDb)
    remove(exactLocationOfItemInDb)

  });

  shoppingListEl.append(newEl);

}; 


