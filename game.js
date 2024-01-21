let score=0;



function getSadInterval(){
    return Date.now() + 1000;
}

function getGoneInterval() {
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval(){
    return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}


const moles = [
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-0')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-1')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-2')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-3')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-4')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-5')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-6')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-7')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-8')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-9')
    }
];

function getNextStatus (mole) {
    switch (mole.status){
        case "sad":
        case "fed":    
            mole.next = getSadInterval();
            mole.status = "leaving";
            mole.node.children[0].src = 'mole-leaving.png'
            break;
        case "leaving":
            mole.next = getGoneInterval();
            mole.status = 'gone';
            mole.node.children[0].classList.add('gone');
            break;
        case "gone":
            mole.status = 'hungry';
            mole.next = getHungryInterval();
            mole.node.children[0].classList.add("hungry");
            mole.node.children[0].classList.remove("gone");
            mole.node.children[0].src = 'mole-hungry.png';
            break;
        case "hungry":
            mole.status = 'sad';
            mole.next = getSadInterval();
            mole.node.children[0].classList.remove("hungry");
            mole.node.children[0].src = 'mole-sad.png';
            break;





    }
}

function feed(event){
    if(event.target.tagName !== 'IMG' || !event.target.classList.contains('hungry')){
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)]

    mole.status = 'fed';
    mole.next = getSadInterval();
    mole.node.children[0].src = 'mole-fed.png';
    mole.node.children[0].classList.remove('hungry');

    score++;

    if(score>= 10){
        window();
    }
}

function win(){
    document.querySelector('bg').classList.add("hide");
    document.querySelector('bg').classList.remove("hide");
}



let runAgainAt = Date.now() + 100;
function nextFrame () {
    const now = Date.now();


    if(runAgainAt <= now){

        for(let i = 0; i<moles.length;i++){
            if (moles[i].next <= now){
                getNextStatus(moles[i]);
            }

        }
        runAgainAt = now + 100;


    }
    requestAnimationFrame(nextFrame);

    
}

document.querySelector('.bg').addEventListener('click', feed);
nextFrame();