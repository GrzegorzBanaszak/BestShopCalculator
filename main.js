//Uchwyty
const totalPrice = document.querySelector("#total-price")
const packageInput = document.querySelector('#package').children.item(0);
const packageList = document.querySelector('#package').children.item(1);
const accounting = document.querySelector('#accounting')
const accountingDisplay = document.querySelector("[data-id='accounting']")
const terminal = document.querySelector('#terminal');
const terminalDisplay = document.querySelector("[data-id='terminal']")
const packageDisplay = document.querySelector("[data-id='package']")


//Tablica wartości sumy
let values = [
  {
    name:"products",
    type:"input",
    price:0
  },
  {
    name:"orders",
    type:"input",
    price:0
  },
  {
    name:"orders",
    type:"package",
    price:0
  },
  {
    name:"accounting",
    type:"checkbox",
    price:0
  },
  {
    name:"terminal",
    type:"checkbox",
    price:0
  },
]

//Funkcja obsługi inputów
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

//Zmiana wartości w tablicy sumy
function getNewValues(item){
  const newValues = values.filter(x => x.name != item.id)
  values = [...newValues,{name:`${item.id}`,price:item.value * 0.5}]
}

//Resetowanie wartości w tablicy sumy
function resetValue(item){
  const newValues = values.filter(x => x.name != item.id)
  values = [...newValues,{name:`${item.id}`,price:0}]
}

//Zliczenie wartości z tablicy sumy i wyświetlanie 
function updateTotalPrice(){
  let total = values.map(x => {return x.price}).reduce((a,b) => a + b)
  if (total > 0){
    totalPrice.style.display = "block"
    totalPrice.children.item(1).innerText = `$${total}`
  }
  else{
    totalPrice.style.display = "none"
  }
}

//Uchwyty dla inputow
setInputFilter(document.querySelector('#products'), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
},document.querySelector("[data-id='products']"));

setInputFilter(document.querySelector('#orders'), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
},document.querySelector("[data-id='orders']"));


//Pokazywanie listy package
packageInput.addEventListener('click',() =>{
  if(packageList.style.display == "block"){
    packageList.style.display = "none"
  }else{
    packageList.style.display = "block"
  }
})

//lista pakietów
const packageTypeList = [
  {
    name:'basic',
    price:0
  },
  {
    name:'professional',
    price:25
  },
  {
    name:'premium',
    price:60
  },
]

//Wybranie pakietu
Array.from(packageList.children).forEach(item =>{
  item.addEventListener('click',(e) => {
    let select = packageTypeList.find(x => x.name == e.target.dataset.value)
    updatePackage(select)
    const packageName = select.name.charAt(0).toUpperCase() + select.name.slice(1);
    packageInput.innerText = packageName;
    packageDisplay.children.item(1).innerText = packageName
    packageDisplay.children.item(2).innerText = `$${select.price}`
    packageDisplay.style.display = "block"
    packageList.style.display = "none";
    updateTotalPrice() 
  })
})

//Aktualizacja pakietu w liscie sumy
function updatePackage({name,price}){
  const newList = values.filter(x => x.type !== "package")
  values = [...newList,{
    name,
    type:"package",
    price
  },]
}

//Obsługa checkboxow 
accounting.addEventListener('click',(e)=>{
  if(e.target.checked){
    setCheckbox(e.target.id,10)
    accountingDisplay.style.display = "block"
    updateTotalPrice()
  }else{
    setCheckbox(e.target.id,0)
    accountingDisplay.style.display = "none"
    updateTotalPrice()
  }
})

terminal.addEventListener('click',(e)=>{
  if(e.target.checked){
    setCheckbox(e.target.id,10)
    terminalDisplay.style.display = "block"
    updateTotalPrice()
  }else{
    setCheckbox(e.target.id,0)
    terminalDisplay.style.display = "none"
    updateTotalPrice()
  }
})


//Zmiana wartości checkbox w values
function setCheckbox(name,price){
  const newValues = values.filter(x => x.name != name)
    values = [...newValues,{
    name,
    type:"checkbox",
    price
  }]
}