const publicKey = '762b8b2b4f1b7b490d510df0f917b6db';
// let url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=20ba6ef5ad5fd1dcf1e034f14ad74167`;
let characters = []; // stores api response

/* fetch api details from marvel api */
async function fetchApi() {
    let apiResponse = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=20ba6ef5ad5fd1dcf1e034f14ad74167`);
    characters = await apiResponse.json();
    characters = characters.data.results;
    displayCharacters(characters); // function to display the characters in frontend
}

// Stores the superhero details with their respective id and stores that in object format 
let data = [];
// get favourite list from the localstorage
let favSuperheroList = JSON.parse(localStorage.getItem('superheroList')) || [];

const cardContainer = document.getElementById("cardContainer");
function displayCharacters(characters) {
    if (cardContainer == null) {
        return;
    }
    cardContainer.innerHTML = ``;
    characters.forEach(element => {
        let { comics, description, events, id, name, series, stories, thumbnail } = element;
        const details = [comics, description, events, name, series, stories, thumbnail, id];
        description = description === "" ? "Description not available!" : description;
        data.push({ id, details });
        let card = `
                    <div class="card text-bg-dark" style="width: 21rem" data-id="${id}">
                        <img src="${thumbnail.path}.${thumbnail.extension}" class="card-img-top" id="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${description}</p>
                            <a href='superhero.html' type="button" class="btn btn-outline-success activity" id="moreDetails" data-value="${id}">More info</a>
                            <button type="button" class="btn btn-outline-danger activity" id="favouriteBtn">${checkList(id) ? 'Remove from favourite' : 'Add to favourite'}</button>
                        </div>
                    </div>`;
        cardContainer.insertAdjacentHTML("beforeend", card);
    });
    localStorage.setItem('data', JSON.stringify(data)); //store the filtered data from the actual response
    saveDetails(); //save the information in the local storage
}

// Check if the card is already present in the list
export function checkList(id) {
    console.log(id)
    const favSuperheroList = JSON.parse(localStorage.getItem('superheroList')) || [];
    return favSuperheroList.includes(id);
}

//save the information in the local storage
function saveDetails() {
    const moreDetailsBTN = document.querySelectorAll('#moreDetails');
    moreDetailsBTN.forEach(btn => {
        //saving data in localstorage based on their respective button id
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

    const favouriteBtn = document.querySelectorAll("#favouriteBtn");
    favouriteBtn.forEach(btn => {

        btn.addEventListener("click", (event) => {
            let card = event.target.closest('.card');
            let cardId = card.dataset.id;
            updateBtn(btn, cardId); //add or remove the button from the favourite list
        });

        updateBtnProperties(btn);
    });
}

//function to update btn properties
export function updateBtnProperties(btn) {
    // Set the button text based on local storage data will be perform without event listner
    let card = btn.closest('.card');
    console.log(card)
    if (favSuperheroList.includes(card.dataset.id)) {
        btn.textContent = "Remove from favourite";
        btn.classList.remove("btn-outline-danger");
        btn.classList.add("btn-danger")
    } else {
        btn.textContent = "Add to favourite";
        btn.classList.add("btn-outline-danger");
        btn.classList.remove("btn-danger");
    }
}

//function to add data in favourite list
export function updateBtn(btn, cardId) {
    if (!favSuperheroList.includes(cardId)) {
        favSuperheroList.push(cardId);
        btn.textContent = "Remove from favourite";
        btn.classList.remove("btn-outline-danger");
        btn.classList.add("btn-danger")
    } else {
        let index = favSuperheroList.indexOf(cardId);
        favSuperheroList.splice(index, 1);
        btn.textContent = "Add to favourite";
        btn.classList.add("btn-outline-danger");
        btn.classList.remove("btn-danger")
    }
    localStorage.setItem('superheroList', JSON.stringify(favSuperheroList));
}

fetchApi();

/* ------------FOR THE SEARCH----------------- */
const search = document.getElementById('search');
search.addEventListener("input", (e) => {
    let searchCharacters = [];
    characters.forEach((item) => {
        let searchKey = e.target.value.toLowerCase();
        let searchResult = item.name.toLowerCase();
        if (searchResult.includes(searchKey)) {

            searchCharacters.push(item);
            console.log(searchCharacters)
        }
    });
    displayCharacters(searchCharacters); //show characters based on the search result
})
