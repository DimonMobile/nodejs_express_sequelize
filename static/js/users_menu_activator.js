let element = document.getElementById('users_menu');
let elementCaption = document.getElementById('users_menu_caption');
for (let it of element.children) {
    if (it.innerText === elementCaption.value) {
        it.classList.add('active');
    }
}