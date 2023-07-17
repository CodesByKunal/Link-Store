let linkStore = document.getElementById("links-store");
let localdata = JSON.parse(localStorage.getItem("tabs"));
let data = [];
let textDesc = document.getElementById("text-desc");
let urlInput = document.getElementById("url-input");
let getLink = document.getElementById("getlink");
let removeBtn = document.querySelectorAll(".remove");

if (localdata) {
  data = localdata;
  render();
}

getLink.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    urlInput.value = tabs[0].url;
  });
});

let saveLink = document.getElementById("savelink");
saveLink.addEventListener("click", function () {
  if (urlInput.value && textDesc.value) {
    data.push({
      url: urlInput.value,
      txt: textDesc.value,
    });
    localStorage.setItem("tabs", JSON.stringify(data));
    render();
  }
}); 

function render() {
  linkStore.innerHTML = "";
  data.map((x, y) => {
    linkStore.innerHTML += `<div class="links-div"><a href="${x.url}" target="_blank">${x.txt}</a><i class="fa fa-trash remove" id="${y}"aria-hidden="true"></i></div>`;
  });
  urlInput.value = "";
  textDesc.value = "";
  bugfix();
}

function bugfix() {
  removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((element) => {
    element.addEventListener("click", function (event) {
      let id = event.target.id;
      data.splice(id, 1);
      localStorage.setItem("tabs", JSON.stringify(data));
      render();
    });
  });
}