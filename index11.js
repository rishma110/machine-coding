const addUpvoteToData = (cdata, cId, count) => {
    cdata.map(data => {
        if(data.cId === cId){
            return data.upvote = count;
        }
        else{
            addUpvoteToData(data.comments, cId, count);
        }
    });
    localStorage.setItem('cdata', JSON.stringify(cdata));
}

const addDownvoteToData = (cdata, cId, count) => {
    cdata.map(data => {
        if(data.cId === cId){
            return data.downvote = count;
        }
        else{
            addUpvoteToData(data.comments, cId, count);
        }
    });
    localStorage.setItem('cdata', JSON.stringify(cdata));
}

const onUpvote = (e) => {
    const cdata = JSON.parse(localStorage.getItem('cdata')); 
    const id = e.target.id.split('up-')[1];
    const val = e.target.textContent;
    const value = val.split('up ')[1];
    const count = Number(value) + 1;
    e.target.textContent = 'up ' + count;
    addUpvoteToData(cdata, id, count);
}

const onDownvote = (e) => {
    const cdata = JSON.parse(localStorage.getItem('cdata')); 
    const id = e.target.id.split('down-')[1];
    const val = e.target.textContent;
    const value = val.split('down ')[1];
    const count = Number(value) + 1;
    e.target.textContent = 'down ' + count;
    addDownvoteToData(cdata, id, count);
}

const getContainer = (pId) => {
    return document.getElementById(`ul-${pId}`);
}

const getCId = (pId) => {
    let ulEl = document.getElementById(`ul-${pId}`);
    let container = document.getElementById("container");
    if(pId!=='0'){
        container = document.getElementById(`li-${pId}`);
    }
    if(!ulEl){
        ulEl = document.createElement('ul');
        ulEl.setAttribute("id", `ul-${pId}`);
        ulEl.setAttribute("class", "ulEl");
        container.appendChild(ulEl);
    }
    let cId = `${pId}.0`;
    if(ulEl.lastChild){
        const currId = Number(ulEl.lastChild.id) + 1
        cId = `${pId}.${currId}`;
    }
    return cId;
}

const addCommentsToData = (cdata, comData) => {
    cdata.map(data => {
        if(data.cId === comData.pId){
            return data.comments.push(comData);
        }
        else{
            addCommentsToData(data.comments, comData);
        }
    });
    localStorage.setItem('cdata', JSON.stringify(cdata));
}

const onReplyClick = (e) => {
    const cdata = JSON.parse(localStorage.getItem('cdata')); 
    const ccId = e.target.id;
    const cId = ccId.split('replyBtn-')[1];
    const inpEl = document.getElementById(`inp-${cId}`);

    const comData = {
        cId: getCId(cId),
        pId: cId,
        msg: inpEl.value,
        upvote: 0,
        downvote: 0,
        comments: [],
        date: Date.now()
    }

    addCommentsToData(cdata, comData); 
    addNestComment(comData);
}

    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        if(hrs) {
            return hrs + ' hours ';
        }
        else if(mins){
            return mins + ' minutes ';
        }
        else{
            return secs + ' seconds ';
        }
      }

const createList = (data) => {
    
    const {msg, cId, pId, upvote, downvote, date} = data;
    const container = getContainer(pId);

const liEl = document.createElement('li');
liEl.setAttribute("id", `li-${cId}`);
container.appendChild(liEl);

const liDiv = document.createElement('div');
liDiv.setAttribute("class","lidiv");
liEl.appendChild(liDiv);

const pEl = document.createElement('p');
pEl.innerText = msg;
liDiv.appendChild(pEl);

const p1El = document.createElement('span');
p1El.innerText = msToTime(Date.now() - date) + 'ago';
liDiv.appendChild(p1El);

const repDiv = document.createElement('div');
repDiv.setAttribute("class","repDiv");

const upBtn = document.createElement('button');
upBtn.addEventListener('click', onUpvote);
upBtn.innerText = `up ${upvote}`;
upBtn.setAttribute("id", `up-${cId}`);
repDiv.appendChild(upBtn);

const downBtn = document.createElement('button');
downBtn.addEventListener('click', onDownvote);
downBtn.innerText = `down ${downvote}`;
downBtn.setAttribute("id", `down-${cId}`);
repDiv.appendChild(downBtn);

const inputEl = document.createElement('input');
inputEl.setAttribute("id", `inp-${cId}`);
repDiv.appendChild(inputEl);

const replyBtn = document.createElement('button');
replyBtn.innerText = 'post';
replyBtn.addEventListener('click', onReplyClick);
replyBtn.setAttribute("id", `replyBtn-${cId}`);
repDiv.appendChild(replyBtn);
liDiv.appendChild(repDiv);
}

const addNestComment = (data) => {
    const {pId, message} = data;
    let container = document.getElementById(`li-${pId}`); 
    if(!container){
        if(pId === '0'){
            container = document.getElementById("container");
        }
        else {
            container = document.getElementById(`li-${pId}`);
        }
        
    }
    let ulEl = document.getElementById(`ul-${pId}`);
    let cId = `${pId}.0`;
    if(!ulEl){
        ulEl = document.createElement('ul');
        ulEl.setAttribute("id", `ul-${pId}`);
        ulEl.setAttribute("class", 'ulEl');
        container.appendChild(ulEl);
    }
    if(ulEl.lastChild){
        const currId = Number(ulEl.lastChild.id) + 1
        cId = `${pId}.${currId}`;
    }
    createList(data);
}

const addComment = () => {
    const cdata = localStorage.getItem('cdata'); 
    let ulEl = document.getElementById(`ul-0`);
    if(!ulEl){
        ulEl = document.createElement('ul');
        ulEl.setAttribute("id", `ul-0`);
        ulEl.setAttribute("class", 'ulEl');
        divC.appendChild(ulEl);
    }
    let liEl = ulEl.lastChild; let currId = 0;
    if(liEl){
         currId = Number(ulEl.lastChild.id) + 1
    }
    const inpEl = document.getElementById("inp");
    const value = inpEl.value;
    const comdata = {
        'cId': `0.${currId}`,
        'upvote': 0,
        'downvote': 0,
        'msg': value,
        'comments': [],
        'pId': '0',
        'date': Date.now()
    }
    if(cdata){
        const ccdata = JSON.parse(cdata);
        ccdata.push(comdata);
    }
    else{
        localStorage.setItem('cdata', JSON.stringify([comdata]))
    }
    addNestComment(comdata);
}

const createDataFromLs = (data) => {
    data.map(comment=> {
        addNestComment(comment);
        if(comment.comments.length){
            createDataFromLs(comment.comments);
        }
    });
}

const main = () => {
    const cdata = localStorage.getItem('cdata');
    if(cdata){
        const data = JSON.parse(cdata);
        createDataFromLs(data);
    }
}


document.addEventListener('DOMContentLoaded', main);
const replyBtn = document.getElementById("mainComment");
const divC = document.getElementById("container");

replyBtn.addEventListener('click', addComment)