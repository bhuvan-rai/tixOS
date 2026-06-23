function timerefresh() {
    var timeElement = document.querySelector("#timecheck");
    if (timeElement) {
        timeElement.innerHTML = new Date().toLocaleString();
    }
}

setInterval(timerefresh, 1000);
timerefresh();

var welcomescreen = document.querySelector("#welcome");
var linksscreen = document.querySelector("#links");

var windowcontent = document.querySelector("#welcome .window-content");
var welcomeScreenClose = document.querySelector("#welcome .dot.close");
var welcomeScreenMinimize = document.querySelector("#welcome .dot.minimize");
var welcomeScreenMaximize = document.querySelector("#welcome .dot.maximize");

var linkscontent = document.querySelector("#links .window-content");
var linksClose = document.querySelector("#links .dot.close");
var linksMinimize = document.querySelector("#links .dot.minimize");
var linksMaximize = document.querySelector("#links .dot.maximize");

var notepadScreen = document.querySelector("#notepad");
var notepadContent = document.querySelector("#notepad .window-content");
var notepadClose = document.querySelector("#notepad .dot.close");
var notepadMinimize = document.querySelector("#notepad .dot.minimize");
var notepadMaximize = document.querySelector("#notepad .dot.maximize");

var desktopApps = document.querySelectorAll(".desktop-app");

var trackStatus = document.querySelector(".audio-track-info span:last-child");
var osAudio = document.getElementById("os-audio");
var audioBtn = document.getElementById("audio-control-btn");
var notepadText = document.querySelector("#notepad-text");
var saveNoteBtn = document.querySelector("#save-note-btn");
var topZIndex = 20;

function bringToFront(element) {
    if (!element) {
        return;
    }
    topZIndex += 1;
    element.style.zIndex = topZIndex;
}

function closeWindow(element) {
    if (element) {
        element.style.display = "none";
    }
}

function openWindow(element, content) {
    if (!element) {
        return;
    }

    element.style.display = "block";
    if (content) {
        content.style.display = "";
    }
    bringToFront(element);
}

function toggleWindow(element, content) {
    if (!element) {
        return;
    }

    var currentDisplay = window.getComputedStyle(element).display;
    var contentDisplay = content ? window.getComputedStyle(content).display : "";
    if (currentDisplay === "none" || contentDisplay === "none") {
        openWindow(element, content);
    } else {
        closeWindow(element);
    }
}

function windowFromName(name) {
    if (name === "welcome") {
        return {
            element: welcomescreen,
            content: windowcontent
        };
    }

    if (name === "links") {
        return {
            element: linksscreen,
            content: linkscontent
        };
    }

    if (name === "notepad") {
        return {
            element: notepadScreen,
            content: notepadContent
        };
    }

    return null;
}

if (welcomeScreenClose) {
    welcomeScreenClose.addEventListener("click", function(event) {
        event.stopPropagation();
        closeWindow(welcomescreen);
    });
}

if (welcomeScreenMinimize && windowcontent) {
    welcomeScreenMinimize.addEventListener("click", function(event) {
        event.stopPropagation();
        windowcontent.style.display = "none";
    });
}

if (welcomeScreenMaximize && windowcontent) {
    welcomeScreenMaximize.addEventListener("click", function(event) {
        event.stopPropagation();
        openWindow(welcomescreen, windowcontent);
    });
}

if (linksClose) {
    linksClose.addEventListener("click", function(event) {
        event.stopPropagation();
        closeWindow(linksscreen);
    });
}

if (linksMinimize && linkscontent) {
    linksMinimize.addEventListener("click", function(event) {
        event.stopPropagation();
        linkscontent.style.display = "none";
    });
}

if (linksMaximize && linkscontent) {
    linksMaximize.addEventListener("click", function(event) {
        event.stopPropagation();
        openWindow(linksscreen, linkscontent);
    });
}

if (notepadClose) {
    notepadClose.addEventListener("click", function(event) {
        event.stopPropagation();
        closeWindow(notepadScreen);
    });
}

if (notepadMinimize && notepadContent) {
    notepadMinimize.addEventListener("click", function(event) {
        event.stopPropagation();
        notepadContent.style.display = "none";
    });
}

if (notepadMaximize && notepadContent) {
    notepadMaximize.addEventListener("click", function(event) {
        event.stopPropagation();
        openWindow(notepadScreen, notepadContent);
    });
}

desktopApps.forEach(function(button) {
    button.addEventListener("click", function() {
        var target = windowFromName(button.dataset.window);
        if (target) {
            toggleWindow(target.element, target.content);
        }
    });
});

function dragElement(element) {
    if (!element) {
        return;
    }

    var header = element.querySelector(".header");
    if (!header) {
        return;
    }

    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
    header.onmousedown = startDragging;

    function startDragging(e) {
        e = e || window.event;
        if (e.target.classList.contains("dot")) {
            return;
        }
        e.preventDefault();

        var rect = element.getBoundingClientRect();
        element.style.transform = "none";
        element.style.top = rect.top + "px";
        element.style.left = rect.left + "px";
        bringToFront(element);

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
dragElement(linksscreen);
dragElement(notepadScreen);

if (welcomescreen) {
    welcomescreen.addEventListener("mousedown", function() {
        bringToFront(welcomescreen);
    });
}

if (linksscreen) {
    linksscreen.addEventListener("mousedown", function() {
        bringToFront(linksscreen);
    });
}

if (notepadScreen) {
    notepadScreen.addEventListener("mousedown", function() {
        bringToFront(notepadScreen);
    });
}

if (audioBtn && osAudio) {
    audioBtn.addEventListener("click", function() {
        if (osAudio.paused) {
            osAudio.play();
            audioBtn.innerText = "\u23F8";
            if (trackStatus) {
                trackStatus.innerHTML = "Music playing ( lovely )";
                trackStatus.style.color = "#888888";
            }
        } else {
            osAudio.pause();
            audioBtn.innerText = "\u25B6";
            if (trackStatus) {
                trackStatus.innerHTML = "Music Paused";
                trackStatus.style.color = "#cfcfcf";
            }
        }
    });
}

if (saveNoteBtn && notepadText) {
    saveNoteBtn.addEventListener("click", function() {
        var file = new Blob([notepadText.value], { type: "text/plain" });
        var downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = "tixOS-note.txt";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        setTimeout(function() {
            URL.revokeObjectURL(downloadLink.href);
        }, 0);
    });
}
