import PhotographersApi from "../../data/data.js";
import ImageMedia from "../models/Image.js";
import VideoMedia from "../models/Video.js";
import Modal from "../utils/Modal.js";
import ContactModel from "../models/contact.js";
import SliderModel from "../utils/slider.js";
import FocusTrap from "../utils/focusTrap.js";


/**
 * Get id from url
 * @returns {string} id - The id of the photographer
 */
function getIdQuery() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}


/**
 * @class PhotographerPage
 * @param {string} url - The url of the API
 * @param {object} document - The DOM elements
 */
export default class PhotographerPage {
  constructor() {
    // Create new instance of PhotographersApi and pass the url for the API
    this.$photographersApi = new PhotographersApi('https://engy-dev.github.io/website-photographe/data/photographers.json');
    
    this.$photographerInfos = document.querySelector('#photographer_infos_banner');
    this.$imageBanner = document.querySelector('#image_banner');
    this.$contactBtn = document.querySelector('.contact_btn_banner');
    this.$openContactModal = document.querySelector('.contact_btn');
    this.$gallery = document.querySelector('.gallery');
    this.$totals_likes = document.querySelector('.likes');
    this.$price = document.querySelector('.price');
    this.$filter = document.querySelector('#filter-select');
  }


  async main() {
    /*
    * Get photographer data from API
    * @returns {object} photographerWithMedias - The photographer with medias
    * */
    const photographerWithMedias = await this.$photographersApi.getPhotographerWithMedias(getIdQuery())

    /*
    * Create Photographer Instance
    * @returns {object} photographerEvents - The photographer instance
    * */
    const photographerEvents = new PhotographerManage(photographerWithMedias)
    photographerEvents.getBanner()
    photographerEvents.getTotals()
    photographerEvents.getFilter('likes')
    photographerEvents.getCardsMedias()

    /*
    * Add event listener on filter
    * @returns {string} photographerEvents.getFilter - The photographer instance
    * */
    this.$filter.addEventListener('change', () => {
      // console.log(this.$filter.value);
      photographerEvents.getFilter(this.$filter.value)
      photographerEvents.getCardsMedias()
    })

    /*
    * Create Contact Instance
    * @returns {object} contact - The contact instance
    * */
    const contact = new ContactManage(photographerWithMedias.name)
    contact.getFormContact()
  }
}





/**
 * @class PhotographerManage
 * @extends PhotographerPage 
 * @description Call all methods to manage the photographer page
 * @param {object} photographer - The photographer data
 * @returns {object} photographer - The photographer instance
 */
class PhotographerManage extends PhotographerPage {
  constructor(photographer) {
    super(photographer)
    this.photographer = photographer
  }

  getBanner() {
    const { $_banner, $_contactBtn, $_image } = this.photographer.createPhotographerBanner()
    this.$photographerInfos.innerHTML = $_banner
    this.$contactBtn.innerHTML = $_contactBtn
    this.$imageBanner.innerHTML = $_image
  }

  /**
   * @method getFilter
   * @param {string} sortBy - The sortBy value
   * @returns {object} photographer.medias - The photographer medias sorted
   */
  getFilter(sortBy) {
    this.photographer.medias = this.photographer.medias.sort(
      // Compare two elements of the array
      (firstElement, secondElement) =>
        // If the first element is greater than the second, return 1 (true)
        secondElement[sortBy] > firstElement[sortBy] ? 1 : -1
    )
    // Reverse the array if sortBy === "title"
    sortBy === "title" && this.photographer.medias.reverse()
    // console.log(this.photographer.medias);
  }

  /**
   * @method getCardsMedias
   * @description Create all cards for the photographer page
   * @returns {object} cardElement - The card element
   * */
  getCardsMedias() {
    this.$gallery.innerHTML = null;

    this.photographer.medias.forEach(mediaElement => {
      let cardHTML = '';

      if (mediaElement instanceof ImageMedia) {
        cardHTML = mediaElement.createImage();
      } else if (mediaElement instanceof VideoMedia) {
        cardHTML = mediaElement.createVideo();
      }

      const cardElement = document.createElement('div');
      cardElement.classList.add('card-container')
      cardElement.innerHTML = cardHTML;

      this.addLike(cardElement, mediaElement)
      this.$gallery.appendChild(cardElement);
    });

    /**
     * Create slider instance
     * @description Represents an instance of a Slider
     * @param {object} photographer - The photographer data
     * @returns {object} slider - The slider instance
     */
    const slider = new SliderManage(this.photographer)
    slider.getSlider()
  }

  /**
   * Adds a like to a media element (photo or video) displayed on the photographer's page.
   * @param {HTMLElement} cardElement - The card element containing the media element.
   * @param {Object} mediaElement - The media element to add a like to.
   * */
  addLike(cardElement, mediaElement) {
    const totalLikeCounter = document.querySelector('.total-likes');

    // Set the initial like counter to the number of likes the media element has.
    let cardLikeCounter = mediaElement.likes;
    let likedToogle = true;
    const addLikeButton = cardElement.querySelector('.add-like');
    const addLikeToCard = cardElement.querySelector(`.likes-${mediaElement.id}`)

    const addLikeEvent = () => {
      if (likedToogle) {
        cardLikeCounter++;
        totalLikeCounter.textContent++;
        addLikeButton.classList.add('liked');
      } else {
        cardLikeCounter--;
        totalLikeCounter.textContent--;
        addLikeButton.classList.remove('liked');
      }
      // Update the string like counter
      addLikeToCard.textContent = cardLikeCounter;
      // Toggle the like
      likedToogle = !likedToogle;
    }
    addLikeButton.addEventListener('click', () => addLikeEvent());
    addLikeButton.addEventListener('keydown', (event) => {
      if (event.key === "Enter") addLikeEvent()
    })
  }


  getTotals() {
    const counterLikes = this.photographer.totalLikes()

    this.$totals_likes.innerHTML = `
    <span class="total-likes">${parseInt(counterLikes)}</span>
    <i class="fa-solid fa-heart"></i>
    `;
    this.$price.innerHTML = `
    <span>${this.photographer.price}€ / jour</span>
    `;
  }

}





/**
 * @class SliderManage
 * @param {object} data - The data of the slider
 * @param {string} name - The name of the photographer
 * @param {array} medias - The medias of the photographer
 * @returns {HTMLElement} - The slider
 * */
class SliderManage {
  constructor(data) {
    this.data = data
    this.id = ''
  }

  /**
   * @method getSlider
   * @description Create slider instance in modal
   * @returns {object} slider - The slider instance
   * */
  getSlider() {
    const cards = document.querySelectorAll('.card');


    const handleSlider = () => {
      const sliderModel = new SliderModel(this.data)
      const modal = new Modal(sliderModel.createSlider(this.id))
      modal.createModal()
      sliderModel.getNavigation(this.id)
      FocusTrap(document.querySelector('.modal-container'))
    };

    cards.forEach(card => {
      const cardMedia = card.querySelector('.media');
      const cardEvent = () => {
        this.id = card.id;
        handleSlider();
      }

      cardMedia.addEventListener('click', () => cardEvent());
      cardMedia.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
          event.preventDefault()
          this.id = card.id;
          cardEvent()
        }
      })
    })
  }

}





/**
  * @class ContactManage
  * @description Create
  * @param {string} name - The Photographer name
  **********************************/
class ContactManage extends PhotographerPage {
  constructor(name) {
    super(name)
    this.name = name
  }

  getFormContact() {
    const handleSlider = () => {
      const getContactModel = new ContactModel(this.name);
      const modal = new Modal(getContactModel.createContact())
      modal.createModal()
      getContactModel.checkForm()
      FocusTrap(document.querySelector('.modal-container'))
    }

    this.$openContactModal.addEventListener("click", () => {
      handleSlider()
    })
    this.$openContactModal.addEventListener("keydown", (e) => {
      if (e.key === "e") {
        handleSlider()
      }
    })

  }
}


const app = new PhotographerPage()
app.main().then()
