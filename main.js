const totalPrice = document.querySelector("#total-price")

let values = [
  {
    name:"products",
    quantity:0
  },
  {
    name:"orders",
    quantity:0
  },
]

function setInputFilter(textbox, inputFilter,itemText) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
        if(this.value > 0){
          getNewValues(this)
          updateTotalPrice()
          itemText.style.display = "block"
          itemText.children.item(1).innerText = `${this.value} * $0.5`
          itemText.children.item(2).innerText = `$${this.value * 0.5}`
        }
        else{
          resetValue(this);
          updateTotalPrice();
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


function getNewValues(item){
  const newValues = values.filter(x => x.name != item.id)
  values = [...newValues,{name:`${item.id}`,quantity:item.value * 0.5}]
}

function resetValue(item){
  const newValues = values.filter(x => x.name != item.id)
  values = [...newValues,{name:`${item.id}`,quantity:0}]
}


function updateTotalPrice(){
  let total = values.map(x => {return x.quantity}).reduce((a,b) => a + b)
  if (total > 0){
    totalPrice.style.display = "block"
    totalPrice.children.item(1).innerText = `$${total}`
  }
  else{
    totalPrice.style.display = "none"
  }
}


setInputFilter(document.querySelector('#products'), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
},document.querySelector("[data-id='products']"));

setInputFilter(document.querySelector('#orders'), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
},document.querySelector("[data-id='orders']"));


