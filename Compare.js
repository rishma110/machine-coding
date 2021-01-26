const getData = () => {
    return {"products": [{
        "pid": "1",
        "name": "mobile 1",
        "price": 299,
        "MRP": 899,
        "offer": "30%",
        "image": "https://images.app.goo.gl/5rhrCCswo6AbWbUK8",
        "features": {
          "display": {
            "size": "100",
            "screenType": "large",
            "resolution": "good",
            "HDType": "HD",
            "3D": "awesome"
          },
          "generalFeatures": {
            "Smart TV": "there",
            "curve TV": "yes",
            "touch screen": "true",
            "Motion sensor": "also there",
            "Launch": "super",
            "additional": "duper"
          },
          "Internet Features": {
            "Built in wifi": "yes",
            "wireless": "hello",
            "3G": "better",
            "4G": "best"
          }
        }
      },
      {
        "pid": "2",
        "name": "mobile 2",
        "price": 789,
        "MRP": 1899,
        "offer": "27%",
        "image": "https://images.app.goo.gl/5rhrCCswo6AbWbUK8",
        "features": {
          "display": {
            "size": "678",
            "screenType": "small",
            "resolution": "ok",
            "HDType": "HD",
            "3D": "wow"
          },
          "generalFeatures": {
            "Smart TV": "yo",
            "curve TV": "no",
            "touch screen": "false",
            "Motion sensor": "what",
            "Launch": "well",
            "additional": "be"
          },
          "Internet Features": {
            "Built in wifi": "happy",
            "wireless": "that",
            "3G": "you",
            "4G": "are"
          }
        }
      },
      {
        "pid": "3",
        "name": "mobile 3",
        "price": 9999,
        "MRP": 20000,
        "offer": "49%",
        "image": "https://images.app.goo.gl/5rhrCCswo6AbWbUK8",
        "features": {
          "display": {
            "size": "89",
            "screenType": "always",
            "resolution": "stay",
            "HDType": "grounded",
            "3D": "abd"
          },
          "generalFeatures": {
            "Smart TV": "happy",
            "curve TV": "that",
            "touch screen": "you have",
            "Motion sensor": "loving",
            "Launch": "people",
            "additional": "around"
          },
          "Internet Features": {
            "Built in wifi": "ypu",
            "wireless": "practice",
            "3G": "gratitude",
            "4G": "everyday"
          }
        }
      },
      {
        "pid": "4",
        "name": "mobile 4",
        "price": 1000000,
        "MRP": 1000000,
        "offer": "10%",
        "image": "https://images.app.goo.gl/5rhrCCswo6AbWbUK8",
        "features": {
          "display": {
            "size": "hello",
            "screenType": "its ",
            "resolution": "always",
            "HDType": "better",
            "3D": "to"
          },
          "generalFeatures": {
            "Smart TV": "count",
            "curve TV": "your",
            "touch screen": "blessings",
            "Motion sensor": "and",
            "Launch": "not ",
            "additional": "crib"
          },
          "Internet Features": {
            "Built in wifi": "about",
            "wireless": "whats",
            "3G": "not in",
            "4G": "control"
          }
        }
      },
      {
        "pid": "5",
        "name": "mobile 5",
        "price": 789,
        "MRP": 1899,
        "offer": "27%",
        "image": "https://images.app.goo.gl/5rhrCCswo6AbWbUK8",
        "features": {
          "display": {
            "size": "life",
            "screenType": "gives",
            "resolution": "you",
            "HDType": "a lot of",
            "3D": "things"
          },
          "generalFeatures": {
            "Smart TV": "keep ",
            "curve TV": "believing",
            "touch screen": "in yourself",
            "Motion sensor": "and never",
            "Launch": "lose",
            "additional": "faith"
          },
          "Internet Features": {
            "Built in wifi": "in your",
            "wireless": "ability",
            "3G": "to achieve",
            "4G": "success"
          }
        }
      }
      ]};
}

const firstChange = (e) => {
    let compareData = JSON.parse(localStorage.getItem("getCompareData"));
    let firstind = Number(JSON.parse(localStorage.getItem('firstind')));
    firstind = Number(e.target.selectedIndex) ;
    localStorage.setItem('firstind', JSON.stringify(firstind));
    createHeader(compareData);
    createContent(compareData);
}

const secondChange = (e) => {
    let secondInd = Number(JSON.parse(localStorage.getItem('secondInd')));
    let compareData = JSON.parse(localStorage.getItem("getCompareData"));
    secondInd = Number(e.target.selectedIndex) ;
    localStorage.setItem('secondInd', JSON.stringify(secondInd));
    createHeader(compareData);
    createContent(compareData);
}

const onremove = (e) => {
    let firstind = Number(JSON.parse(localStorage.getItem('firstind')));
    let secondInd = Number(JSON.parse(localStorage.getItem('secondInd')));
    let compareData = JSON.parse(localStorage.getItem("getCompareData"));
    const ftdEL = document.getElementById('headertd1');
    const stdEl =  document.getElementById('headertd2');
    const fEl  = document.getElementById("header1");
        const sEl = document.getElementById("header2");
    if(e.target.id === "fcross"){
        if(secondInd > -1){
            fEl.remove();
        ftdEL.appendChild(sEl);
        firstind = secondInd;
        secondInd = -1; 
        
        }
        else {
            fEl.remove();
            firstind = -1;
        }
            
    }
    else {
        if(sEl){
            sEl.remove();
            if(secondInd === -1){
                firstind = -1;
            }
        }
        secondInd = -1;
    }
    localStorage.setItem('firstind', JSON.stringify(firstind));
    localStorage.setItem('secondInd', JSON.stringify(secondInd));
    createHeader(compareData);
    createContent(compareData);

}

const createHeader = (pdata) => {
    let firstind = Number(JSON.parse(localStorage.getItem('firstind')));
    let secondInd = Number(JSON.parse(localStorage.getItem('secondInd')));
    const fEl  = document.getElementById("header1");
    const sEl  = document.getElementById("header2");
    if(fEl){
        fEl.remove();
    }
    if(sEl){
        sEl.remove();
    }
    const ftdEL = document.getElementById('headertd1');
    const stdEl =  document.getElementById('headertd2');
    const fcross = document.createElement('div');
    fcross.setAttribute("class", "cross");
    fcross.addEventListener("click", onremove);
    fcross.innerText = 'x'
    fcross.setAttribute("id", "fcross");
    const scross = document.createElement('div');
    scross.setAttribute("class", "cross");
    scross.setAttribute("id", "scross");
    scross.addEventListener("click", onremove);
    scross.innerText = 'x'
    const fdivEL = document.createElement('div');
    fdivEL.setAttribute("id", "header1");
    const sdivEL = document.createElement('div');
    ftdEL.appendChild(fdivEL);
    sdivEL.setAttribute("id", "header2");
    stdEl.appendChild(sdivEL);
    if(firstind >=0){
        const data = pdata.products[firstind];
        const {name, price, image, offer, MPR} = data;
        const fdivEL1 = document.createElement('div');
        const fdivEL2 = document.createElement('span');
        const fdivEL3 = document.createElement('span');
        const fdivimg = document.createElement('img');
        fdivimg.src = image;
        fdivEL1.innerText = name;
        fdivEL2.innerText = price;
        fdivEL3.innerText = MPR + offer;
        fdivEL.appendChild(fcross);
        fdivEL.appendChild(fdivimg);
        fdivEL.appendChild(fdivEL1);
        fdivEL.appendChild(fdivEL2);
        fdivEL.appendChild(fdivEL3);
    }
    else{
        const selEl = document.createElement('select');
        fdivEL.appendChild(selEl)
        selEl.addEventListener('change', firstChange);
        // const optEl = document.createElement('option');
        pdata.products.map(key=> {
            let optEl = document.createElement('option');
            optEl.innerText = key.name;
            optEl.setAttribute("id", key.pid);
            selEl.appendChild(optEl);
        });
    }
    if(secondInd > -1){
        const data = pdata.products[secondInd];
        const {name, price, image, offer, MPR} = data;
        const sdivEL1 = document.createElement('div');
        const sdivEL2 = document.createElement('span');
        const sdivEL3 = document.createElement('span');
        const sdivimg = document.createElement('img');
        sdivimg.src = image;
        sdivEL1.innerText = name;
        sdivEL2.innerText = price;
        sdivEL3.innerText = MPR + offer;
        sdivEL.appendChild(scross);
        sdivEL.appendChild(sdivimg);
        sdivEL.appendChild(sdivEL1);
        sdivEL.appendChild(sdivEL2);
        sdivEL.appendChild(sdivEL3);
    }
    else{
        const selEl = document.createElement('select');
        sdivEL.appendChild(selEl);
        selEl.addEventListener('change', secondChange);
        // const optEl = document.createElement('option');
        pdata.products.map(key=> {
            let optEl = document.createElement('option');
            optEl.innerText = key.name;
            optEl.setAttribute("id", key.pid);
            selEl.appendChild(optEl);
        });
    }
}

const createContent = (pdata) => {
    const firstind = Number(JSON.parse(localStorage.getItem('firstind')));
    const secondInd = Number(JSON.parse(localStorage.getItem('secondInd')));
   const ptbodyEl = document.querySelector("tbody");
   const tableEl = document.getElementById("table");
   if(ptbodyEl){
       ptbodyEl.remove();
   }
   const tbodyEl = document.createElement("tbody");
   tbodyEl.setAttribute("id", "tbodyEl");
   tableEl.appendChild(tbodyEl);

   const data = pdata.products[0].features;


   const headings = Object.keys(data);
   headings.map(heading => {
    const trEl = document.createElement('tr');
    trEl.setAttribute("id", heading);
    
    trEl.setAttribute("class", "heading");
    trEl.innerText = heading.toUpperCase();
    tbodyEl.appendChild(trEl);
    const objKeys = Object.keys(data[heading]);
    objKeys.map((key)=>{
        const itrEl = document.createElement('tr');
        itrEl.setAttribute("id", key);
        const tdEl = document.createElement('td');
        tdEl.innerText = key ;
        itrEl.appendChild(tdEl);

        if(firstind > -1) {
        const fdata = pdata.products[firstind].features;
        const tdEl2 = document.createElement('td');
        tdEl2.innerText = fdata[heading][key];
        itrEl.appendChild(tdEl2);
        }

        if(secondInd > -1){
            const sdata = pdata.products[secondInd].features;
            const tdEl3 = document.createElement('td');
        tdEl3.innerText = sdata[heading][key];  
        itrEl.appendChild(tdEl3);
        }

        
        tbodyEl.appendChild(itrEl);
    })
  })

}

const main = () => {
    const findex = JSON.parse(localStorage.getItem('firstind'));
    const sindex = JSON.parse(localStorage.getItem('secondInd'));

    if(!findex && !sindex){
        localStorage.setItem('firstind', '0');
        localStorage.setItem('secondInd', '1');
    }

    let compareData = JSON.parse(localStorage.getItem("getCompareData"));
    if(!compareData){
        compareData = getData();
        localStorage.setItem("getCompareData", JSON.stringify(compareData));
    }
    createHeader(compareData);
    createContent(compareData);
}

document.addEventListener('DOMContentLoaded', main);
