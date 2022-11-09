'use strict';
const formEl = document.getElementById('form-item');
const itemEl = document.getElementById('item');
const itemContainerEl = document.getElementById('item-container');
let btnSubmit = document.getElementById('submit');

let items = [];
let isEditing = false;
let editId = 0;
const displayUI = function () {
  itemContainerEl.innerHTML = '';
    if (items.length > 0) {    
    items.forEach((item) => {
const listEl = document.createElement('li');
    listEl.classList.add('list-item');
    listEl.innerHTML = `${item.value} 
    <button class ="itbn" onclick='editItem(${item.id})'>Edit</button>
    <button class ="itbn"onclick='deleteItem(${item.id})'>Delete</button>`;
    itemContainerEl.appendChild(listEl);
        });
    }
};

const deleteItem = function (id) {
    items = items.filter((item) => item.id !== id);
    displayUI();
}

const editItem = function (id) {
    const itemToEdit = items.find((item) => item.id === id);
    itemEl.value = itemToEdit.value;
    editId = id;
    isEditing = true;
    displayUI();
    btnSubmit.value = 'Update';
}

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (itemEl.value) {
        if (isEditing) {
         items = items.map((item) => {
        if (item.id === editId) {
         return {...item, value: itemEl.value};
        } 
        else {
         return item;
                }
            });
    editId = null;
    isEditing = false;
    itemEl.value = null;
    displayUI();
    btnSubmit.value = 'Add';
        } 
    else {
        const item = {
            id: new Date().valueOf(),
            value: itemEl.value
            }
            items.push(item);
            itemEl.value = null;
            displayUI();
        }
    } 
    else {
        alert('Enter the valid input');
    }
});