
const mocks = () => {
    return {
        products: [{
            pid: '1',
            rating: 3.5,
            reviewCount: 3,
            price: 600,
            title: 'prod 1'
        },
        {
            pid: '2',
            rating: 1,
            reviewCount: 1,
            price: 200,
            title: 'prod 2'
        },
        {
            pid: '3',
            rating: 5,
            reviewCount: 2,
            price: 400,
            title: 'prod 3'
        },
        {
            pid: '4',
            rating: 4.5,
            reviewCount: 1,
            price: 100,
            title: 'prod 4'
        },
        {
            pid: '4',
            rating: 4.5,
            reviewCount: 1,
            price: 100,
            title: 'prod 4'
        }
    ],
    reviews: {
        '1': [{
            rating: 3.5,
            reviewTitle: "Average Product",
            reviewtext: "I bought this when i was 12 I am 19 now it still works well",
            date: '2 may',
            user: 'Nitin'
        },{
            rating: 3,
            reviewTitle: "Too good",
            reviewtext: "Go for it",
            date: '',
            user: 'Uday'
        },
        {
            rating: 3,
            reviewTitle: "Amazing",
            reviewtext: "Well I am just typing random text so that I end up creating a really long text so that will help me in testing. I bought this when i was 12 I am 19 now it still works well!",
            date: '3 aug',
            user: 'Tarun'
        },
    ],
    '2':[{
        rating: 1,
        reviewTitle: "Worst",
        reviewtext: "I bought this beacuse I can",
        date: '21 june',
        user: 'Nani'
        }
    ],
    '3': [{
        rating: 5,
        reviewTitle: "Excellent",
        reviewtext: "Must buy",
        date: '4 july',
        user: 'Tarak'
    },
    {
        rating: 5,
        reviewTitle: "Too good",
        reviewtext: "Just Take it",
        date: '16 July',
        user: 'Ram'
    }],
    '4': [{
        rating: 4.5,
        reviewTitle: "",
        reviewtext: "I loved it",
        date: '12 May',
        user: 'Arjun'
    }]       
    }
    }
}
const onSubmitClick = () => {
    let review = reviewInpEl.value;
    let title = revTitleEl.value;
    console.log('review-- ' + title + review)
}

const getRatingColor = (rating) => {
    if(rating > 0 && rating < 3){
        return '#D32F2F';
    }
    else if(rating >= 3 &&  rating < 4){
        return '#FFCA28';
    }
    else {
        return '#00C853';
    }
}

const createReviewData = (pid) => {
    let reviewlist = document.getElementById("reviewlist");
    let parentLi = document.getElementById("ul");
    parentLi.remove();
    let newParLi = document.createElement("ul");
    newParLi.setAttribute("id", "ul");
    reviewlist.appendChild(newParLi);

    let reviews = mocks().reviews;
    let pidReviews = reviews[pid];

    // style.backgroundColor

    pidReviews.map((review)=>{
        let liEl = document.createElement('li');

        let dElR = document.createElement("div");
        dElR.innerText = review.rating ; 
        dElR.setAttribute("class", 'radiv');
        dElR.style.backgroundColor = getRatingColor(review.rating);

        let dEl = document.createElement("div");
        dEl.innerText = review.reviewTitle || ""; 

        let dElRR = document.createElement("div");
        dElRR.innerText = review.reviewtext; 

        let dElU = document.createElement("div");
        dElU.innerText = review.user + " - " + review.date; 

        liEl.appendChild(dElR);
        liEl.appendChild(dEl);
        liEl.appendChild(dElRR);
        liEl.appendChild(dElU);
        newParLi.append(liEl);
    })
}

const productClicked = (e) => {
    e.preventDefault();
    let pid = e.currentTarget.id;
    createReviewData(pid);
}

const createProductData = (data) => {
    let pData = data;
    let prEl = document.getElementById('pul')
    pData.map(dt=>{
        let liEl = document.createElement("li");
        liEl.setAttribute("class", 'liprod');
        liEl.setAttribute("id", dt.pid);
        liEl.addEventListener('click', productClicked, false);
        let dEl = document.createElement("div");
        dEl.innerText = dt.title ;
        let dElR = document.createElement("div");
        dElR.innerText = "rating: " + dt.rating;
        let dElRC = document.createElement("div");
        dElRC.innerText = "review count: " + dt.reviewCount;
        let dElP = document.createElement("div");
        dElP.innerText = "price: " + dt.price;
        liEl.appendChild(dEl);
        liEl.appendChild(dElR);
        liEl.appendChild(dElRC);
        liEl.appendChild(dElP);
        prEl.appendChild(liEl);
    })
}
const main = () => {
    let data = mocks().products;
    createProductData(data);
    createReviewData(data[0].pid);
}
document.addEventListener('DOMContentLoaded', main);
let submitEl = document.getElementById("submit");
submitEl.addEventListener('click', onSubmitClick)
let reviewInpEl = document.getElementById("reviewInp");
let revTitleEl = document.getElementById('titleInp')
