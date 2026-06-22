function timerefresh() {
    var timeElement = document.querySelector("#timecheck");
    if (timeElement) {
        timeElement.innerHTML = new Date().toLocaleString();
    }
}
setInterval(timerefresh, 1000);
timerefresh(); 

var welcomescreen = document.querySelector("#welcome");
var linksscreen = document.querySelector("#links")

var windowcontent = document.querySelector("#welcome .window-content");
var welcomeScreenClose = document.querySelector("#welcome .dot.close");
var welcomeScreenMinimize = document.querySelector("#welcome .dot.minimize");
var welcomeScreenMaximize = document.querySelector("#welcome .dot.maximize");

var linkscontent = document.querySelector("#links .window-content");
var linksClose = document.querySelector("#links .dot.close");
var linksMinimize = document.querySelector("#links .dot.minimize");
var linksMaximize = document.querySelector("#links .dot.maximize");

var app1 = document.querySelector("#app1");

var trackStatus = document.querySelector(".audio-track-info span:last-child");
var osAudio = document.getElementById("os-audio");
var audioBtn = document.getElementById("audio-control-btn");


function Closewindow(element) {
    element.style.display = "none";
}

function Openwindow(element) {
    element.style.display = "block"; 
    if (windowcontent) {
        windowcontent.style.display = ""; 
    }
}
// for welcome screen
if (welcomeScreenClose) {
    welcomeScreenClose.addEventListener("click", function() {
        Closewindow(welcomescreen);
    });
}

if (welcomeScreenMinimize && windowcontent) {
    welcomeScreenMinimize.addEventListener("click", function() {
        windowcontent.style.display = "none";
    });
}

if (welcomeScreenMaximize && windowcontent) {
    welcomeScreenMaximize.addEventListener("click", function() {
        windowcontent.style.display = "";
    });
}

if (app1 && welcomescreen) {
    app1.addEventListener("click", function() {
        if (welcomescreen.style.display === "none") {
            welcomescreen.style.display = "block"; 
        } else {
            welcomescreen.style.display = "none";
        }
    });
}     

// for links

if (linksClose) {
    linksClose.addEventListener("click", function() {
        Closewindow(linksscreen);
    });
}

if (linksMinimize && linkscontent) {
    linksMinimize.addEventListener("click", function() {
        linkscontent.style.display = "none";
    });
}

if (linksMaximize && linkscontent) {
    linksMaximize.addEventListener("click", function() {
        linkscontent.style.display = "";
    });
}

if (app2 && linksscreen) {
    app2.addEventListener("click", function() {
        var currentDisplay = window.getComputedStyle(linksscreen).display;
        if (currentDisplay === "none") {
            linksscreen.style.display = "block"; 
        } else {
            linksscreen.style.display = "none";
        }
    });
}

function dragElement(element) {
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;
    element.onmousedown = startDragging;
    
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag; 
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
dragElement(welcomescreen);
dragElement(linksscreen)


if (audioBtn && osAudio) {
    audioBtn.addEventListener("click", function() {
        if (osAudio.paused) {
            osAudio.play();
            audioBtn.innerText = "\u23F8"; // ⏸
            if (trackStatus) {
                trackStatus.innerHTML = "Music playing ( lovely )";
                trackStatus.style.color = "#888888";
            }
        } else {
            osAudio.pause();
            audioBtn.innerText = "\u25B6"; // ▶
            if (trackStatus) {
                trackStatus.innerHTML = "Music Paused";
                trackStatus.style.color = "#ff5f56";
            }
        }
    });
}