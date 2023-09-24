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
}

// Center the fish initially
betaFish.style.left = (window.innerWidth / 2 - betaFish.width / 2) + 'px';
betaFish.style.top = (window.innerHeight / 2 - betaFish.height / 2) + 'px';

// Start the fish movement
moveFish();

// Check if Web3 is injected by MetaMask or another wallet
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

// Event listener for the "Connect Wallet" button
document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.enable();

            const contractAddress = '0x1468fdac6c7a8ec9faffaf65c3bfb0b8e4a3f2fe.'; // Replace with your contract address
            const tokenId = '1'; // The ID of the token you want to check for
            const contractABI = [[{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]]; // Replace with your contract ABI

            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const userAddress = await web3.eth.getAccounts().then(accounts => accounts[0]);

            // Check the ownership of the NFT
            contract.methods.ownerOf(tokenId).call().then(owner => {
                if (owner === userAddress) {
                    // User owns the NFT, display the main content
                    document.getElementById('main-content').style.display = 'block';
                } else {
                    // User does not own the NFT, display a message
                    alert('You do not own the required NFT to access this content.');
                }
            });
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});


