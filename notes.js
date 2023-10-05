const btnAdd = document.getElementById("btn-add");
const btnClear = document.getElementById("btn-clear");
const divContainer = document.getElementById("div-container");
const newDivs = [];
const settingMenu = document.getElementById("setting-menu");
const scope =document.querySelector("body");

btnAdd.addEventListener("click", addNew);
btnClear.addEventListener("click", clearAll);

dragElement(divContainer);

function addNew() {
    const newDiv = document.createElement("div");
    newDiv.id = "new-note";
    newDivs.push(newDiv);
    let theNote = document.getElementById('the-note');
    newDiv.appendChild(document.createTextNode(theNote.value));
    if(theNote.value.length > 162){
        newDiv.classList.add("big-note")
    } else {
        newDiv.classList.add("small-note")
    }
    newDiv.draggable = true;
    divContainer.appendChild(newDiv);
    theNote.value = "";
}

function clearAll() {
    for (i = 0; i < newDivs.length; i++) {
        newDivs[i].remove();
    }
}



//i have to separate the elements that moves because now it all moves together(the element id is "div-container")
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            element.onmousedown = dragMouseDown;
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

scope.addEventListener(("contextmenu"), (event) => {
    event.preventDefault();
    const {offsetX: mouseX, offsetY: mouseY} = event;
    settingMenu.style.top = `${mouseY}px`;
    settingMenu.style.left = `${mouseX}px`;
    settingMenu.classList.add("visible");
});

scope.addEventListener("click", (e) => {
    if(e.target.offsetParent != settingMenu){
        settingMenu.classList.remove("visible");
    }
});