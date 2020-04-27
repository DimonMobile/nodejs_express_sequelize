let contentElement = document.getElementById('content');
let sourceElement = document.getElementById('source');

contentElement.innerHTML = markdown.toHTML(sourceElement.value);

let elements = contentElement.getElementsByTagName('img');
for (let el of elements) {
    el.classList.add('responsive-img');
}