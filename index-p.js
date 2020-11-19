
const main = () => {
    console.log("started");
}

const onItemClick = (e) => {
let nextEl = window.innerHeight;
window.scrollTo(0,nextEl);
}

document.addEventListener('DOMContentLoaded', main);
let listEl = document.querySelector('.list-item');
listEl.addEventListener('click', onItemClick)