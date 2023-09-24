const betaFish = document.getElementById('beta-fish');
const fishFood = document.getElementById('fish-food');

let speed = 1; // Adjust the speed as needed

// Define the sequence of movements
const movements = [
    { angle: 0, distance: 500 }, // Move right
    { angle: 110, distance: 300 }, // Move up at a 110-degree angle
    { angle: 210, distance: 200 }, // Move down at a 210-degree angle
    { angle: 270, distance: 250 } // Move down at a 270-degree angle
];

let currentMovement = 0;
let distanceMoved = 0;

function moveFish() {
    const movement = movements[currentMovement];
    const radianAngle = movement.angle * (Math.PI / 180);
    
    const deltaX = speed * Math.cos(radianAngle);
    const deltaY = -speed * Math.sin(radianAngle);
    
    betaFish.style.left = (betaFish.offsetLeft + deltaX) + 'px';
    betaFish.style.top = (betaFish.offsetTop + deltaY) + 'px';
    
    distanceMoved += speed;
    if (distanceMoved >= movement.distance) {
        distanceMoved = 0;
        currentMovement = (currentMovement + 1) % movements.length;
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

// Center the fish initially
betaFish.style.left = (window.innerWidth / 2 - betaFish.width / 2) + 'px';
betaFish.style.top = (window.innerHeight / 2 - betaFish.height / 2) + 'px';

// Start the fish movement
moveFish();


