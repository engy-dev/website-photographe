import { Media } from "./Media.js";

/**
  * @class VideoMedia
  * @description creates vid elements
  * @param name - photographer name
  * @param data - photographer's media
  **********************************/
export default class VideoMedia extends Media {
  constructor(name, data) {
    super(name, data)
    this.video = data.video
  }

  createVideo() {
    return `
      <div id="card-${this.id}" class="card" aria-label="titre ${this.title}, nombre de like ${this.likes}">
        <div class="card-media">
          <video tabindex="0" class="media">
          <source type="video/mp4" src="assets/images/${this.name.replace(' ', '_')}/${this.video}" alt="${this.title}">
        </div>
        <div class="legend">
          <h2 tabindex="0">${this.title}</h2>
          <div class="likes-content">
            <span class="likes-${this.id}">${this.likes} </span>
            <i class="fa-solid fa-heart add-like" aria-label="like this video" tabindex="0" role="button"></i>
          </div>
        </div>
      </div>
      `
  }


  createSliderItem(currentId) {
    return `
      <li class="slide" ${currentId === `card-${this.id}` ? 'data-active' : ''}>
        <video tabindex="0" src="assets/images/${this.name.replace(' ', '_')}/${this.video}" controls></video>
        <p class="slide-title" tabindex="0">${this.title}</p>
      </li>
    `;
  }
}
