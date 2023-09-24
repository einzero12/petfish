// Check if Web3 is injected by MetaMask or another wallet
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

// Check if Web3 is injected by MetaMask or another wallet
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
} else {
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

// Event listener for the "Connect Wallet" button
document.getElementById('connect-wallet').addEventListener('click', async () => {
    try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const contractAddress = '0x1468fdac6c7a8ec9faffaf65c3bfb0b8e4a3f2fe'; 
        const tokenId = '1'; 
        const contractABI = [{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]; // Replace with your actual contract ABI

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const userAddress = (await web3.eth.getAccounts())[0];

        // Check the ownership of the NFT
        const owner = await contract.methods.ownerOf(tokenId).call();
        if (owner === userAddress) {
            // User owns the NFT, display the main content
            document.getElementById('main-content').style.display = 'block';
        } else {
            // User does not own the NFT, display a message
            alert('You do not own the required NFT to access this content.');
        }
    } catch (error) {
        console.error('User denied account access or other error occurred:', error);
    }
});

// Additional JavaScript for animating the fish, fish food, and flakes can be added here

// Fish Animation
const fish = document.getElementById('beta-fish');
let fishDirection = 110;
let fishPositionX = window.innerWidth / 2;
let fishPositionY = window.innerHeight / 2;

function moveFish() {
    fishPositionX += Math.cos(fishDirection * (Math.PI / 180)) * 3;
    fishPositionY -= Math.sin(fishDirection * (Math.PI / 180)) * 3;
    
    // Check boundaries and change direction
    if (fishPositionX < 0 || fishPositionX > window.innerWidth || fishPositionY < 0 || fishPositionY > window.innerHeight) {
        fishDirection = (fishDirection + 135) % 360;
    }

    fish.style.left = fishPositionX + 'px';
    fish.style.top = fishPositionY + 'px';
}

setInterval(moveFish, 1000 / 60);

// Fish Food Rotation and Flake Falling
const fishFood = document.getElementById('fish-food');

fishFood.addEventListener('mouseover', () => {
    fishFood.style.transform = 'rotate(120deg)';
});

fishFood.addEventListener('click', () => {
    const flake = document.createElement('img');
    flake.src = 'https://github.com/einzero12/petfish/blob/main/flake.png?raw=true';
    flake.style.position = 'absolute';
    flake.style.left = fishFood.getBoundingClientRect().left + 'px';
    flake.style.top = fishFood.getBoundingClientRect().bottom + 10 + 'px';
    flake.style.width = '50px';
    document.body.appendChild(flake);

    function fallFlake() {
        const flakeRect = flake.getBoundingClientRect();
        if (flakeRect.top < window.innerHeight) {
            flake.style.top = flakeRect.top + 5 + 'px';
        } else {
            document.body.removeChild(flake);
            clearInterval(falling);
        }
    }

    const falling = setInterval(fallFlake, 1000 / 60);
});




