

const apikey = 'assafdfeqg4356546';
let itemList = [];

const apiUrl = 'localhost:5500';

export default function createItem (data) { 
    const item = document.createElement('li');
    item.innerHTML = `Date: ${data}`;
    return item;
}