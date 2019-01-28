let frame = document.querySelector(".frame");
let clickToDraw = document.querySelector("#click");
let resolution = 48;
let drawing = false;

document.querySelector("#cls").addEventListener("click", () => {
    document.querySelectorAll(".pixel_fill").forEach(p => {
        p.classList.remove("pixel_fill");
        p.classList.add("pixel");
    });
});

document.querySelector("#chres").addEventListener("click", () => {
    do {
        resolution = prompt("Enter a new resolution\n(1-100):");
    } while( isNaN(resolution) || resolution <= 0 || 100 < resolution );

    reset(resolution);
});

window.addEventListener("mousedown", () => { setDrawing(true); });
window.addEventListener("mouseup", () => { setDrawing(false); });


function init(res) {
    let cell = frame.getBoundingClientRect().width / res;
    let frag = document.createDocumentFragment();

    for(i=0; i<res; i++) {
        for(j=0; j<res; j++) {
            let div = document.createElement("div");
            div.style = `
                width: ${cell}px;
                height: ${cell}px;
                `;
            div.classList.add("pixel");
            div.addEventListener("mouseenter", () => {
                if(clickToDraw.checked && !drawing) return;

                div.classList.remove("pixel");
                div.classList.add("pixel_fill");
            });
            frag.appendChild(div);
        }
    }

    frame.appendChild(frag);
}

function reset(res) {
    Array.from(frame.children).forEach(n => {
        frame.removeChild(n);
    });

    init(res);
}

function setDrawing(b) {
    drawing = clickToDraw.checked ? b : true;
}


init(resolution);