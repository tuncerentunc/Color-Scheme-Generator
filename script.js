const colorList = document.getElementById("color-list");  // colors from API are rendered in this container
const button = document.getElementById("get-btn");
const nav = document.getElementById('nav-bar');


// GET API
button.addEventListener("click", () => {
    const colorValue = document.getElementById("color-picker").value;  // color wheel value
    const mode = document.getElementById("modes").value;               // mode value 

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue.slice(1)}&mode=${mode}`)
        .then(response => response.json())
        .then(colorsData => {
            renderColorList(colorsData.colors);
        })
})

// copy the hex code to clipboard 
document.addEventListener("click", e => {
    // copy when clicked on the color
    if (e.target.dataset.hex) {
        copyToClipboardHex(e.target.id);
    }
    
    //copy when clicked on the hexcode 
    if (e.target.dataset.hexText) {
        copyToClipboardHex(document.querySelector(`[data-hex-text = "${e.target.dataset.hexText}"]`).innerHTML);
    }
})

window.addEventListener("resize", () => {
    setHeight();
})

// resizes the color boxes if window is resized
function setHeight() {
    colorList.style.height = `${window.innerHeight - nav.offsetHeight}px`
}

// renders the data from API on DOM
function renderColorList(colors) {
    colorList.innerHTML = '';
    for (let color of colors) {
        colorList.innerHTML += `
            <div class="color-box" id="${color.hex.value}" data-hex="${color.hex.value}">
                <p class="color-name-mobile">${color.hex.value}</p>
            </div>
            <p class="color-name" id="color-name" data-hex-text="${color.hex.value}">${color.hex.value}</p>
            `
        document.getElementById(color.hex.value).style.backgroundColor = color.hex.value;
    }
}

// copy clipboard function
function copyToClipboardHex(string) {
    navigator.clipboard.writeText(string)
}

setHeight();