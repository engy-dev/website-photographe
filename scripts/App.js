import PhotographersApi from "../data/data.js"

/**
 * @description Represents each app
 * @returns {object} the response of the API
 */
class App {
  constructor() {
    this.$_photographerSection = document.querySelector('.photographer_section')
    
    this.$_photographersApi = new PhotographersApi("https://engy-dev.github.io/website-photographe/data/photographers.json")
  }

  async main() {
    const $_photographers = await this.$_photographersApi.getPhotographers();
    let photographerCardsHTML = '';

    $_photographers.forEach(photographer => {
      const $_photographerCard = photographer.createPhotographerCard();
      photographerCardsHTML += $_photographerCard;
      this.$_photographerSection.innerHTML = photographerCardsHTML;
    });
  }
}

const app = new App()
app.main().then()
