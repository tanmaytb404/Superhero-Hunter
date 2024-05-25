import { updateBtn, updateBtnProperties } from "./script.js"; //import function to add to properties and effects on the buttons
const favSuperheroContainer = document.getElementById("favSuperheroContainer");
const placeholderTextEl = document.getElementById("placeholderText");
let favouriteList = JSON.parse(localStorage.getItem("superheroList")) || [];
let data = JSON.parse(localStorage.getItem("data")) || [];

//add placeholder is no character in favourite list
function addPlaceholder() {
    if (favSuperheroContainer.innerHTML.trim() == '') {
        placeholderTextEl.style.display = 'block';
    }
}

//if the list contains elements add to the container
favouriteList.forEach((id) => {
    const result = data.find((item) => item.id == id);
    let details = result.details;
    let card = `
                  <div class="card text-bg-dark" style="width: 21rem" data-id="${id}">
                      <img src="${details[6].path}.${details[6].extension}" class="card-img-top" id="card-img-top" alt="..." />
                      <div class="card-body">
                          <h5 class="card-title">${details[3]}</h5>
                          <p class="card-text">${details[1] == '' ? 'No description found' : details[1]}</p>
                          <a href='superhero.html' type="button" class="btn btn-outline-success" id="moreDetails" data-value="${id}">More info</a>
                          <button type="button" class="btn btn-outline-danger activity" id="favouriteBtn" data-value="${id}">Remove from favourite</button>
                      </div>
                  </div>`;
    favSuperheroContainer.insertAdjacentHTML("beforeend", card);
});

//remove from favourite list
const favouriteBtn = document.querySelectorAll('#favouriteBtn');
favouriteBtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
        // console.log(btn.dataset.value);
        updateBtn(btn, btn.dataset.value);
        let card = event.target.closest('.card');
        favSuperheroContainer.removeChild(card);
        console.log('triggered from favourite page')
        addPlaceholder();
    });
    updateBtnProperties(btn);
});

//to set localstorage values for more details section
const moreDetailsBTN = document.querySelectorAll('#moreDetails');
moreDetailsBTN.forEach(btn => {
    btn.addEventListener("click", () => {
        const superHeroData = data.find(value => value.id == btn.dataset.value);
        localStorage.setItem('comics', superHeroData.details[0].available);
        localStorage.setItem('description', superHeroData.details[1]);
        localStorage.setItem('events', superHeroData.details[2].available);
        localStorage.setItem('name', superHeroData.details[3]);
        localStorage.setItem('series', superHeroData.details[4].available);
        localStorage.setItem('stories', superHeroData.details[5].available);
        localStorage.setItem('thumbnail', `${superHeroData.details[6].path}.${superHeroData.details[6].extension}`);
        localStorage.setItem('id', superHeroData.details[7]);
    });
});

addPlaceholder();