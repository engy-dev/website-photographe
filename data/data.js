import Photographer from "../scripts/models/Photographer.js";
import ImageMedia from "../scripts/models/Image.js";
import VideoMedia from "../scripts/models/Video.js";

/*
  * @class Api
  * @description Fetch data from API
  * @param {string} url - The url of the new instance of PhotographersApi
  * @returns {object} response - The response of the API
  * */
class Api {
  constructor(url) {
    this._url = url;
  }
  async get() {
    try {
      return fetch(this._url)
      .then((res) => res.json())
      .catch((err) => console.log("ERROR => ", err));
    } catch (error) {
      return error
    }
  }
}

 /*
  * Get photographer data from API
  * @returns {instance} photographers - The photographer instance
  * */
export class PhotographersApi extends Api {
  async getPhotographers() {
    const response = await this.get();
    return response.photographers.map(photographer => new Photographer(photographer));
  }

  /*
    * Find photographer by id
    * @returns {instance} photographer - The photographer instance
    * */
  async getPhotographerWithMedias(id) {
    const data = await this.get();
    const photographer = data.photographers.find(photographer => photographer.id === parseInt(id));
    
    const mediasJson = data.media.filter(media => media.photographerId === parseInt(id));
    const medias = mediasJson.map(media => this.createMediaFactory(photographer.name, media));

    return new Photographer(photographer, medias)
  }

  /**
   * @method createMediaFactory
   * @description Create media factory for Image or Video
   * @returns {InstanceType} ImageMedia or VideoMedia
   */
  createMediaFactory(photographerName, media) {
    if (media.image)  return new ImageMedia(photographerName, media)
    else if (media.video) return new VideoMedia(photographerName, media)
    else throw 'Unknown media type';
  }

}
