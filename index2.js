
const getData = () => {
    fetch('https://extendsclass.com/api/json-storage/bin/daaecaf')
    .then(resp=>resp.json()).then(
        resp => {
            localStorage.setItem("CreditCardData", JSON.stringify(resp));
            cardData = resp;  
        }
    )
}

const onEditButton = (mycardDetails, e) => {
    e.stopPropagation();
    container.style.display = "visible";
    listContainer.style.display= "none";
    cardNumber.value = mycardDetails.cardNumber;
}

const onDeleteButton = ( mycardDetails) => {
    const cardlist = localStorage.getItem("cardlist"); 
    let list = JSON.parse(cardlist);
    delete list[mycardDetails.cardNumber];
    localStorage.setItem("cardlist", JSON.stringify(list));
}

const showList = (mycardDetails) => {
    const listJ = localStorage.getItem('cardlist');
    let list = JSON.parse(listJ) || {};
    list[mycardDetails.cardNumber] = mycardDetails;
    localStorage.setItem("cardlist", JSON.stringify(list));
    let keys = Object.keys(list);
    keys.map(eachkey => {
       container.style.display = "none";
       listContainer.style.display= "visible";

    const listItem = document.createElement("li");
    listItem.setAttribute("class", "liclass")
    const text = document.createTextNode(list[eachkey].cardType + " credit card ");
    
    const editButton = document.createElement('button');
    // editButton.setAttribute('id', )
    editButton.addEventListener('click', onEditButton.bind(this, list[eachkey]));
    editButton.innerText = "edit";
   
    const deleteButton =  document.createElement('button');
    deleteButton.addEventListener('click', onDeleteButton.bind(this, list[eachkey]));
    deleteButton.innerText = "delete";

    const cardNumEl = document.createTextNode(list[eachkey].cardNumber);

    const divEl = document.createElement("div")
    divEl.setAttribute("class", "list-div");
    divEl.appendChild(text);
    divEl.appendChild(editButton);
    divEl.appendChild(deleteButton);
    divEl.appendChild(cardNumEl);
    listItem.appendChild(divEl);
    ulEl.appendChild(listItem);
    })
    

}

const cardNumberValidate = () => {
const cardNum = cardNumber.value;
let regex, validator;
console.log(cardData);
const keys = Object.keys(cardData);
keys.map(key => {
    const card = cardData[key];
    validator = card.validator;
    regex = new RegExp(validator);
    if(regex.test(cardNum)) {
        console.log('hi');
        console.log(key, regex.test(cardNum));
        currentCardDetails = Object.assign(card, {'key':key});
        localStorage.setItem("currentCard", JSON.stringify(card));
        return;
    }
});

}

const submitClick = (e) => {
    e.stopPropagation();
    // cardNumberValidate();
    const details = localStorage.getItem("currentCard"); 
    const cardDetails = JSON.parse(details);

   
    if(!cardDetails){
        alert("Please fill the details")
    }
    else {
        const myCard = {
            'cardNumber': cardNumber.value,
            'cardType': cardDetails.key
        }
        // check expiry
       if(cardNumber.value.length === Number(cardDetails.cardLength)){
           if(cardDetails.cvv === 'optional') {
               showList(myCard);
           }
           else if(cardDetails.cvv === 'required'){
            if(cvvInput.value.length === Number(cardDetails.cvvlength)){
                showList(myCard);
            }
            else {
                alert("Please fill the right CVV number");
            }
           }
       }
       else {
        alert("Please fill the right card number");
       }
    }
}

const main = () => {
    const resp = localStorage.getItem("CreditCardData");
    let jsonResp;
    if(resp){
        jsonResp = JSON.parse(resp);
        cardData = jsonResp;
    }
    else {
        getData();
    }
}

const listContainer = document.getElementById("list-container");
const container = document.getElementById("container");
const ulEl = document.getElementById("ul");
document.addEventListener("DOMContentLoaded", main);
const cardNumber = document.getElementById("cardNumber");
cardNumber.addEventListener("change", cardNumberValidate)
const cvvInput = document.getElementById("cvv");
// cvv.addEventListener("change", cvvValidate)
const submit = document.getElementById("submit");
submit.addEventListener("click", submitClick)
let cardData= {}; let currentCardDetails={};
let cardlist={};