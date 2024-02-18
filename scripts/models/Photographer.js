/**
 * @class Photographer
 * @description creates photographer portion
 * @param {object} photographer - The photographer
 * @param {array} medias - The medias of said photographer
 * @returns {HTMLElements} - The photographer
 * */
export default class Photographer {
  constructor(photographer, medias) {
    this.id = photographer.id
    this.name = photographer.name
    this.city = photographer.city
    this.country = photographer.country
    this.tagline = photographer.tagline
    this.price = photographer.price
    this.portrait = photographer.portrait
    this.medias = medias
  }
