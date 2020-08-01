import { get } from "./utils/communication.js";
import constants from './constants.js';

class ClickManager {

  constructor() {
    this.noOfButtonStyles = 5;
    this.buttonElts = []
    this.getButtonsElts();
    this.addEvents();
  }

  getButtonsElts() {
    for (let i = 1; i <= this.noOfButtonStyles; i++) {
      this.buttonElts.push(
        document.getElementById(`btnStyle${i}`)
      )
    }
  }

  addEvents() {
    this.buttonElts.forEach((btnElt) => {
      btnElt.addEventListener('click', this.handleButtonClicked.bind(this))
    })
  }

  /**
   * 
   * @param {Event} event 
   */
  handleButtonClicked(event) {
    get(
      constants.defaultApiHost + constants.endPoints.pixel,
      this.getDataForButtonClick(event.target.id)
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.log('Error getting response status: ', res.status);
        }
      })
      .then(result => {
        console.log('Response from worker:', result.msg)
      })

  }

  /**
   * 
   * @param {String} btnId 
   */
  getDataForButtonClick(btnId) {
    return {
      interaction: 'UserClick',
      client: 'ad_media',
      os_name: navigator.platform,
      x1: navigator.vendor,
      x2: 'web',
      x3: btnId,
      landing_url: window.location.host,
    }
  }

}

export default ClickManager;
