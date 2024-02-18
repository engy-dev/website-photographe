import { Media } from "./Media.js";

/**
  * @class ImageMedia
  * @description Create Image element html
  * @param name - The photographer name string
  * @param data - The photographer media object
  **********************************/
export default class ImageMedia extends Media {
  constructor(name, data) {
    super(name, data)
    this.image = data.image
  }

  createImage() {
    return `
      <div id="card-${this.id}" class="card" aria-label="titre ${this.title}, nombre de like ${this.likes}">
        <div class="card-media">
          <img class="media" tabindex="0" role="button" src="assets/images/${this.name.replace(' ', '_')}/${this.image}" alt="${this.title}" />
        </div>
        <div class="legend">
          <h2>${this.title}</h2>
          <div class="likes-container">
            <span class="likes-${this.id}">${this.likes} </span>
            <i class="fa-solid fa-heart add-like" aria-label="like this image" tabindex="0" role="button"></i>
          </div>
        </div>
      </div>
      `;
    }


  createSliderItem(currentId) {
    return `
      <li class="slide" ${currentId === `card-${this.id}` ? 'data-active' : ''}>
        <img src="assets/images/${this.name.replace(' ', '_')}/${this.image}" alt="${this.title}" />
        <p class="slide-title">${this.title}</p>
      </li>
    `;
  }
}

