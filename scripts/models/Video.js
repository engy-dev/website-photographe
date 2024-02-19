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
