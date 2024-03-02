import checkContactForm from "../utils/checkContactForm.js";

/**
  * @class ContactModel
  * @description Create contact modal
  * @param {string} name - The photographer name
  **********************************/
export class ContactModel extends checkContactForm {
  constructor(name) {
    super()
    this.name = name
  }

  /**
   * @method createContact
   * @description Check and submit form
   * @returns {methode} checkForm
   * */
  checkForm() {
    const contact_submit = document.querySelector('.submit_btn');
    contact_submit.addEventListener('click', () => {
      const checkContactInstance = new checkContactForm(this.name)
      return checkContactInstance.onSubmitForm()
    })
  }

  createContact() {
    return `
      <div class="contact-container" aria-hidden="true" aria-label="Contact Form" role="dialog">
        <div class="form-header">
          <h2>Contactez-moi <br /> <span class="contact_name" tabindex="0">${this.name}</span></h2>
          <button class="close-modal" aria-label="Close dialog"><img src="assets/icons/close.svg" alt="close" /></button>
        </div>
        <form id="myForm" action="" method="POST">
          <div class="form-group">

            <div class="formData" id="firstData" data-error="Deux lettre min - Pas de caractères spéciaux">
              <label id="firstNameLabel" for="fistName">Prénom</label>
              <input id="fistName" name="firstName" type="text" placeholder="fistName" aria-labelledby="firstNameLabel" required />
            </div>

            <div class="formData" id="lastData" data-error="Deux lettre min - Pas de caractères spéciaux">
              <label id="lastNameLabel" for="lastName" for="lastName">Nom</label>
              <input id="lastName" name="lastName" type="text" placeholder="lastName" aria-labelledby="lastNameLabel" required />
            </div>

            <div class="formData" id="emailData" data-error="Email invalide">
              <label id="emailLabel" for="email">Email</label>
              <input id="email" name="email" type="email" placeholder="email" aria-labelledby="emailLabel" required />
            </div>

            <div class="formData" id="areaData" data-error="Deux lettre min - Pas de caractères spéciaux">
              <label id="messageLabel" for="message">Votre message:</label>
              <textarea id="message" name="message" placeholder="Message..." aria-labelledby="messageLabel" rows="5" cols="33"></textarea>
            </div>

          </div>
        </form>
        <div class="form-footer">
          <button class="submit_btn" type=submit aria-label="Send">Envoyer</button>
        </div>
      </div>
    `
  }

}

