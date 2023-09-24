const betaFish = document.getElementById('beta-fish');
const fishFood = document.getElementById('fish-food');
let direction = 'up';
let distanceMoved = 0;

function moveFish() {
  const currentPosition = betaFish.offsetTop;
  
  if (direction === 'up') {
    betaFish.style.top = (currentPosition - 1) + 'px';
    distanceMoved += 1;
    if (distanceMoved >= 100) {
      distanceMoved = 0;
      direction = 'down';
    }
  } else if (direction === 'down') {
    betaFish.style.top = (currentPosition + 1) + 'px';
    distanceMoved += 1;
    if (distanceMoved >= 100) {
      distanceMoved = 0;
      direction = 'up';
    }
  }
  
  requestAnimationFrame(moveFish);
}

fishFood.addEventListener('click', function() {
  const flake = document.createElement('img');
  flake.src = 'https://github.com/einzero12/petfish/blob/main/flake.png?raw=true';
  flake.className = 'flake';
  flake.style.top = (fishFood.offsetTop + 10) + 'px';
  flake.style.left = fishFood.offsetLeft + 'px';
  document.body.appendChild(flake);
  
  function fall() {
    flake.style.top = (flake.offsetTop + 1) + 'px';
    requestAnimationFrame(fall);
  }
  
  fall();
});

moveFish();
