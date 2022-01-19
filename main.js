const productsPrice = document.querySelector("[data-id='products']")


function setInputFilter(textbox, inputFilter,itemText) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
        if(this.value > 0){
          itemText.style.display = "block"
          itemText.children.item(1).innerText = `${this.value} * $0.5`
          itemText.children.item(2).innerText = `$${this.value * 0.5}`
        }
        else{
          itemText.style.display = "none"
        }
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(document.querySelector('#products'), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
},document.querySelector("[data-id='products']"));

setInputFilter(document.querySelector('#orders'), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
},document.querySelector("[data-id='orders']"));