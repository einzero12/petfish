const betaFish = document.getElementById('beta-fish');
const fishFood = document.getElementById('fish-food');
const fishbowl = document.getElementById('fishbowl');

let directionX = 'right';
let directionY = 'down';
let speed = 1; // Adjust the speed as needed

function moveFish() {
    const fishPositionX = betaFish.offsetLeft;
    const fishPositionY = betaFish.offsetTop;
    const fishbowlPositionX = fishbowl.offsetLeft;
    const fishbowlPositionY = fishbowl.offsetTop;
    
    if (directionX === 'right') {
        betaFish.style.left = (fishPositionX + speed) + 'px';
        if (fishPositionX >= fishbowlPositionX + 900) directionX = 'left';
    } else {
        betaFish.style.left = (fishPositionX - speed) + 'px';
        if (fishPositionX <= fishbowlPositionX) directionX = 'right';
    }
    
    if (directionY === 'down') {
        betaFish.style.top = (fishPositionY + speed) + 'px';
        if (fishPositionY >= fishbowlPositionY + 900) directionY = 'up';
    } else {
        betaFish.style.top = (fishPositionY - speed) + 'px';
        if (fishPositionY <= fishbowlPositionY) directionY = 'down';
    }
    
    requestAnimationFrame(moveFish);
}

fishFood.addEventListener('click', function() {
    const flake = document.createElement('img');
    flake.src = 'https://github.com/einzero12/petfish/blob/main/flake.png?raw=true';
    flake.className = 'flake';
    
    // Position the flake in the middle of the screen and 300px down
    flake.style.left = (window.innerWidth / 2 - flake.width / 2) + 'px';
    flake.style.top = '300px';
    
    document.body.appendChild(flake);
    
    function fall() {
        flake.style.top = (flake.offsetTop + 1) + 'px';
        requestAnimationFrame(fall);
    }
    
    fall();
});

moveFish();
