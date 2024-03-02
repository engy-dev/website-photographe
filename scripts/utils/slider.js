
/**
 * @class SliderModel
 * @description Represents a Slider Model
 * @param {object} data - The data of the slider
 * @param {string} name - The name of the photographer
 * @param {array} medias - The medias of the photographer
 * @returns {HTMLElement} - The slider
 */
export class SliderModel {
    constructor(data) {
      this.name = data.name
      this.medias = data.medias
    }
  
    getNavigation(id) {
      const buttons = document.querySelectorAll('.carousel-nav');
      const closeModal = document.querySelector('.close-modal')
      const lastFocus = document.querySelector(`#${id} .media`)
  
      if (closeModal) {
        closeModal.addEventListener('click', () => lastFocus.focus())
        closeModal.addEventListener('keydown', (event) => {
          if (event.key === "Enter" || event.keyCode === 13) lastFocus.focus()
        })
      }
  
      // Add event listener on each btn
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // return offset value 1 or -1 -- if carouselBtn not equal to next, offset = -1
          const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1
          // return parent element of btn > ul
          const slides = document.querySelector('[data-slides]')
          // return element with data-active attr > li
          const activeSlide = slides.querySelector('[data-active]')
          // return index of activeSlide and attribute data-active to newIndex
          let newIndex = [...slides.children].indexOf(activeSlide) + offset
          
          // Case for infinite loop
          // target last element index
          if (newIndex < 0) newIndex = slides.children.length - 1
          // if newIndex > last element index, newIndex = 0
          if (newIndex >= slides.children.length) newIndex = 0
  
          // add for li element data-active attr
          slides.children[newIndex].dataset.active = "display"
          // remove data-active attr to old element
          delete activeSlide.dataset.active
        })
      })
    }
  
    createSlider(currentId) {
      return `
        <div class="slider-container" aria-label="Slider Medias">
          <div class="slider-content">
      
            <div class="slider-header">
              <button class="close-modal" aria-label="Close dialog"><img src="assets/icons/close.svg" alt="close" /></button>
            </div>
      
            <div class="slider-body">
              <button class="carousel-nav prev" data-carousel-btn="prev" aria-label="Previous image">&lt;</button>
              
              <div id="image-carousel" class="carousel" data-carousel>
                <ul data-slides>
                   ${this.medias.map((media) => media.createSliderItem(currentId))}
                </ul>
              </div>
              
              <button class="carousel-nav next" data-carousel-btn="next" aria-label="Next image">&gt;</button>
            </div>
          </div>
        </div>
      `;
    }
  }
  