function displayHeader(id) {
    const header = document.createElement('div');
    header.classList.add('header');
    header.setAttribute('id', id);
    const titlePage = document.createElement('div');
    const titleheader = document.createTextNode("BATTLESHIP 🚢");
    titlePage.appendChild(titleheader);
    titlePage.classList.add('titlePage');
    header.appendChild(titlePage);
    return header;
}
function loadPage() {
    const content = document.getElementById('content');
    const header = displayHeader('header');
    content.appendChild(header);
}
export default loadPage;