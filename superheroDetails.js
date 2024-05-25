import { updateBtn, checkList, updateBtnProperties } from "./script.js"; //making the code modular

//once the dom is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const superheroContainerEl = document.getElementById("superheroContainer");
  let id = localStorage.getItem('id');
  let description = localStorage.getItem('description');
  description = description == "" ? "Description not available!" : description;
  let superheroCard = `    <div class="card superheroCard text-bg-dark" data-id="${id}">
        <img src="${localStorage.getItem('thumbnail')}" class="card-img-top" id="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title text-success">${localStorage.getItem('name')}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text">Total comics: ${localStorage.getItem('comics')}</p>
          <p class="card-text">Total events: ${localStorage.getItem('events')}</p>
          <p class="card-text">Total series: ${localStorage.getItem('series')}</p>
          <p class="card-text">Total stories: ${localStorage.getItem('stories')}</p>
          <button type="button" class="btn btn-outline-danger" id="favouriteBtn">${checkList(id) ? 'Remove from favourite' : 'Add to favourite'}</button>
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>`;
  superheroContainerEl.insertAdjacentHTML("beforeend", superheroCard);

  const favouriteBtn = document.querySelectorAll('#favouriteBtn');
  favouriteBtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
      updateBtn(btn, id);
      console.log('triggered from superhero details page')
    });
    updateBtnProperties(btn);
  });

})

