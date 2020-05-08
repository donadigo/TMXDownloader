function createElement(html) {
    let element = document.createElement("template");
    html = html.trim();
    element.innerHTML = html;
    return element.content.firstChild;
}

let elements = document.getElementsByTagName("a");

function onPageLoaded(responseText) {
    let e = $('<div></div>');
    e.html(responseText);

    let anchors = $('a', e);
    for (let a of anchors) {
        if (a.href.includes("get.aspx?action=recordgbx&")) {
            chrome.runtime.sendMessage({
                download: a.href
            });

            break;
        }
    }
}

function downloadAll(e) {
    e.preventDefault();
    let tracks = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.href.includes("main.aspx?action=trackshow")) {
            if (tracks.indexOf(element.href) == -1) {
                tracks.push(element.href);
            }
        }
    }

    for (let url of tracks) {
        const http = new XMLHttpRequest()
        http.open("GET", url)
        http.onload = () => onPageLoaded(http.responseText);
        http.send()
    }
}

let e = $(".ContentTable");
let downloadDiv = createElement("<p align='right'><button>Download All</button></p>");
downloadDiv.onclick = downloadAll;
e.after(downloadDiv);