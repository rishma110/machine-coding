const mockProductJson = () => {
    return {
        products: [{
            "name": "shoe 1",
            "image": "",
            "price": 500,
            "brand": "nike",
            "color": ['red', 'green']
        },
        {
            "name": "shoe 2",
            "image": "",
            "price": 600,
            "brand": "adidas",
            "color": ['white']
        },
        {
            "name": "shoe 3",
            "image": "",
            "price":  700,
            "brand": "random",
            "color": ['blue']
        },
        {
            "name": "shoe 4",
            "image": "",
            "price":  550,
            "brand": "nike",
            "color": ['blue', 'black']
        },
        {
            "name": "shoe 5",
            "image": "",
            "price": 500,
            "brand": "adidas",
            "color": ['black']
        },
        {
            "name": "shoe 6",
            "image": "",
            "price": 600,
            "brand": "random",
            "color": ['green']
        },
        {
            "name": "shoe 7",
            "image": "",
            "price": 200,
            "brand": "adidas",
            "color": ['red']
        },
        {
            "name": "shoe 8",
            "image": "",
            "price": 100,
            "brand": "random",
            "color": ['white', 'green']
        },
        {
            "name": "shoe 9",
            "image": "",
            "price": 800,
            "brand": "random",
            "color": ['blue', 'green']
        }, {
            "name": "shoe 10",
            "image": "",
            "price": 400,
            "brand": "nike",
            "color": ['red', 'white']
        }],
       filters: {
           priceRange: [{
               min: 0,
               max: 300
           },
           {
               min: 300,
               max: 500
           },
           {
               min:500,
               max:1000
           },
        ],
           brand: ['random', 'nike', 'adidas'],
           color: ['red', 'green', 'blue', 'black', 'white']
       } 
    } 
}

const onKeyUp = (e) => {
    let enteredText = e.target.value.toLowerCase();
    let data = localStorage.getItem('productData');
    let parseddata = JSON.parse(data);
    parseddata = parseddata.filter((data)=> {
        return (data.brand.indexOf(enteredText)>-1)
    })
    localStorage.setItem('modifiedData',JSON.stringify(parseddata));
    createNewCont();
}

const createNewCont = () => {
    let parEl = document.getElementById('prods');
    parEl.remove();
    let cont = document.getElementById('product-container');
    let el = document.createElement('div');
    el.setAttribute("class", "prods");
    el.setAttribute("id", "prods");
    cont.appendChild(el);
    let newData = localStorage.getItem("modifiedData");
    let data = JSON.parse(newData);
    createContent(data);
}
const sortByLow = () => {
    let resp = mockProductJson().products;
    resp = resp.sort((a,b)=> {
        return a.price - b.price
    });
    localStorage.setItem("modifiedData", JSON.stringify(resp));
    createNewCont();
}

const sortByHigh = () => {
    let resp = mockProductJson().products;
    resp = resp.sort((a,b)=> {
        return b.price - a.price
    });
    localStorage.setItem("modifiedData", JSON.stringify(resp));
    createNewCont();
}

const sortByRel = () => {
    let resp = mockProductJson().products;
    localStorage.setItem("modifiedData", JSON.stringify(resp));
    createNewCont();
}

const createContent = (resp) => {
    let response = resp;
    let prodEl = document.getElementById('prods');
    response.map((resp) => {
         let divEl = document.createElement('div');
         divEl.setAttribute("class", "prod-cob")

         let nameEl = document.createElement('p');
         nameEl.innerText = resp.name;
         divEl.appendChild(nameEl);

         let brandEl = document.createElement('p');
         brandEl.innerText = resp.brand;
         divEl.appendChild(brandEl);

         let prEl = document.createElement('p');
         prEl.innerText = resp.price;
         divEl.appendChild(prEl);
         prodEl.appendChild(divEl);
    })
}

const onPriceFilter = (e) => {
    let resp = mockProductJson().products;
    let targetIndex = e.target.selectedIndex;
    let target = e.target[targetIndex].id;
    let arr = target.split(' -- ' );
    let min = Number(arr[0]); let max = Number(arr[1]);
    let modiResp = resp.filter((prod)=>{
        return (prod.price >= min && prod.price < max);
    });
    localStorage.setItem("modifiedData", JSON.stringify(modiResp));
    createNewCont();
}

const oncolorChange = (e) => {
    let resp = mockProductJson().products;
    let color = e.target.id;
    let checked = e.target.checked;
    if(checked){
        colors.push(color);
    }
    else{
        let ind = colors.indexOf(color);
        colors.splice(ind, 1);
    }
    // let newresp = resp.map(data=> {
    //     data.color.map(
    //         eachcol=>{
    //             if(colors.indexOf(eachcol)>-1){
    //                 return true;
    //             }
    //         }
    //     )
    // });
    let newresp = resp.filter(data=>{
        let prodColors = data.color;
        let bool = true;
        prodColors.forEach(col => {
           if(color.indexOf(col)>-1){
               bool = true;
           }
           else {
               bool=false;
               return;
           }
        });
        return bool;
    })
    localStorage.setItem("modifiedData", JSON.stringify(newresp));
    createNewCont();
}

const createFilterContent = (resp) => {
    //creating price drop down
    let priceEl = document.getElementById("price");
    resp.priceRange.map((range) => {
        let optEl = document.createElement("option");
        optEl.innerText = range.min + ' -- ' + range.max;
        optEl.setAttribute("id", range.min + ' -- ' + range.max);
        priceEl.append(optEl);
    });

    //creating color checkbox
    let colorEll = document.getElementById('color-cont');
    resp.color.map(col=> {
        let inpEl = document.createElement("input");
        inpEl.setAttribute("type", "checkbox");
        inpEl.setAttribute("id", col);
        inpEl.addEventListener('change', oncolorChange)
        let spaEl = document.createElement('span');
        spaEl.innerText = col;
        colorEll.appendChild(inpEl);
        colorEll.appendChild(spaEl);
    });
}


const getProductData = () => {
    let resp = localStorage.getItem("productData");
    if(resp){
        console.log("Fetching products from local storage ...");
        let jsonResp = JSON.parse(resp);
        createContent(jsonResp);
    }
    else {
        console.log("Fetching products from network ...");
        let data = mockProductJson().products;
        localStorage.setItem("productData", JSON.stringify(data));
    }
}

const getFilterData = () => {
    let resp = localStorage.getItem("FilterData");
    if(resp){
        console.log("Fetching filters from local storage ...");
        let jsonResp = JSON.parse(resp);
        createFilterContent(jsonResp);
    }
    else {
        console.log("Fetching filters from network ...");
        let data = mockProductJson().filters;
        localStorage.setItem("FilterData", JSON.stringify(data));
    }
}

const main = () => {
    getProductData();
    getFilterData();
}

document.addEventListener('DOMContentLoaded', main);
let relEl = document.getElementById('rel');
relEl.addEventListener('click', sortByRel)
let lowEl = document.getElementById('low');
lowEl.addEventListener('click', sortByLow);
let highEl = document.getElementById('high');
highEl.addEventListener('click', sortByHigh)
let brandEl = document.getElementById('input');
brandEl.addEventListener('keyup', onKeyUp);
let priceEl = document.getElementById("price");
priceEl.addEventListener('change', onPriceFilter);
let colors=[];