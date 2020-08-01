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

  handleButtonClicked(event) {
    console.log(this)
    console.log('Button click event for ', event.target.id);
  }

}

export default ClickManager;
