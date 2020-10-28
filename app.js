document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const img2 = document.createElement('img');

    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;


function createButton() {
    grid.appendChild(button);
    button.type = 'button';
    button.innerHTML = 'START';
    button.className = 'btn-styled';
    button.onclick = function() {
        start()
    };
}  
        
function createImg() {


    grid.appendChild(img);
    img.src="background2.png"
    img.width = "50";
    img.height = "50";
    img.className = 'img1'
    img.onclick = function() {
        grid.style.backgroundImage = "url('background2.png')"}
   

    grid.appendChild(img2);
    img2.src="background4.png"
    img2.width = "50";
    img2.height = "50";
    img2.className = 'img2'
    img2.onclick = function() {
        grid.style.backgroundImage = "url('background4.png')"}
        
 
}  
    

function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
}

class Platform{
    constructor(newPlatBottom) {
        this.bottom = newPlatBottom;
        this.left = Math.random() * 315;
        this.visual = document.createElement('div');
        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual);
    }
}

function createPlatforms() {

    for (let i=0; i<platformCount; i++) {
        let platGap = 600 / platformCount - 5;
        let newPlatBottom = 100 + i * platGap - 120;
        let newPlatform = new Platform(newPlatBottom);
        platforms.push(newPlatform); 
        console.log(platforms);

    }
}


function movePlatforms() {
   movePlatTimerId = setInterval (function () {

    if (doodlerBottomSpace > 200) {
        platforms.forEach(platform => {
            platform.bottom -= 4;
            let visual = platform.visual;
            visual.style.bottom = platform.bottom + 'px';

            if (platform.bottom < 10) {
                let firstPlatform = platforms[0].visual;
                firstPlatform.classList.remove('platform');
                platforms.shift();
                score ++
                console.log('platforms');
                let newPlatform = new Platform(600);
                platforms.push(newPlatform);
            }
        })
    }},30);

}

function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
        doodlerBottomSpace += 20;
        doodler.style.bottom = doodlerBottomSpace + 'px';
        if (doodlerBottomSpace > startPoint + 200) {
            fall();
        }
    },30)
}

function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
        doodlerBottomSpace -= 5;
        doodler.style.bottom = doodlerBottomSpace + 'px';
        if (doodlerBottomSpace <=0) {
                gameOver();
        } 
        platforms.forEach(platform => {
            if (
            (doodlerBottomSpace >= platform.bottom) && 
            (doodlerBottomSpace <= platform.bottom + 15) &&
            ((doodlerLeftSpace + 90) >= platform.left) &&
            (doodlerLeftSpace <= (platform.left + 85)) &&
            !isJumping
            ) {
                console.log('landed');
                startPoint = doodlerBottomSpace;
                jump();
            }
        })

    },30);
}

function gameOver() {
  
    console.log('game over');
    isGameOver = true;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    clearInterval(movePlatTimerId);
    createButton();
    createImg();


}

function control(e) {
    if (e.key === "ArrowLeft") {
        moveLeft();
    } else if (e.key === "ArrowRight") {
        moveRight();
    } else if (e.key === "ArrowUp") {
        moveStraight();
    }
}

function moveLeft() {
    clearInterval(leftTimerId)

    if (isGoingRight) {
        clearInterval(rightTimerId)
        isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(function () {
        if (doodlerLeftSpace >= 0) {
          console.log('going left')
          doodlerLeftSpace -=5
           doodler.style.left = doodlerLeftSpace + 'px'
        } else moveRight()
    },20)
  }

  function moveRight() {

    clearInterval(rightTimerId)
    if (isGoingLeft) {
        clearInterval(leftTimerId)
        isGoingLeft = false
    }
    isGoingRight = true


    rightTimerId = setInterval(function () {
      //changed to 313 to fit doodle image
      if (doodlerLeftSpace <= 313) {
        console.log('going right')
        doodlerLeftSpace +=5
        doodler.style.left = doodlerLeftSpace + 'px'
      } else moveLeft()
    },20)
  }

  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }


function start() {
        
        grid.removeChild(button);
        grid.removeChild(img);
        grid.removeChild(img2);
        
        score = 0;
       
        if (platforms.length > 0) {
            grid.innerHTML = "";
            
        doodlerLeftSpace = 50;
        startPoint = 150;
        doodlerBottomSpace = startPoint;
        isGameOver = false;
        platformCount = 5;
        platforms.length = 0;
        isJumping = true;
        isGoingLeft = false;
        isGoingRight = false;
        score = 0;
        newPlatBottom = 0;
        doodlerLeftSpace = 0;

    }
        createPlatforms();
        createDoodler();
       movePlatforms();
        jump();
       
        document.addEventListener('keyup', control)


}

createButton();
createImg();

})