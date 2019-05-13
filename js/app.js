/*
// Designing the Game
- Create a web page with an image (the treasure map) and a
place to display messages to the player.

- Pick a random spot on the map pictureto hide treasure.

- Create a click handler. Each time player clicks the map, the
click handler will do the following:
    * Add 1 to a click counter.
    * Calcutate how far the click location  is from the treasure location.
    * Display a message on the web page to tell the player whether they're hot or cold.
    * Congratulate the player if they click on the treasure or very close to it, and say how many clicks it took to find the treasure.
*/
// Set up our variables
let width = 400,
    height = 400,
    clicks = 0,
    clickLimit = 20;

// Get DOM elements
const declareWin = document.getElementById('win-announce');
const fullMap = document.getElementById('map');
const dstanse = document.getElementById('distance');
const playAgain = document.querySelector('.primary');

// Get a random number from 0 to size
function getRandomNumber(size) {
    return Math.floor(Math.random() * size);
};

// Calculate distance between click and target;
function getDistance(event, target) {
    const diffX = event.offsetX - target.x;
    const diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffY) + (diffX * diffY));
};

// Get a string representing the distance
function getDistanceHint(distance) {
    if (distance < 10) {
        return "Boiling hot!";
    } else if (distance < 20) {
        return "Really hot";
    } else if (distance < 40) {
        return "Hot";
    } else if (distance < 80) {
        return "Warm";
    } else if (distance < 160) {
        return "Cold";
    } else if (distance < 320) {
        return "Really Cold";
    } else if (distance < 640) {
        return "Really really cold!";
    } else {
        return "Freezing!";
    }
}

// Cerate a random target location
const target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
}

// Add a click handler to the img element
fullMap.addEventListener('click', function (event) {
    clicks++;
    // Check if click limit over the clicks gets game over
    if (clicks === clickLimit) {
        dstanse.remove();
        // styling the game over announce text
        setMessage(`Game over! you lost the game with ${clicks} clicks!`, 'red', '2rem');
    }
    // Get distance between click event and target
    let distance = getDistance(event, target);
    // Convert distance to a hint
    let distanceHint = getDistanceHint(distance);
    // Update the #distance element with the new hint
    dstanse.textContent = distanceHint;

    // Id the click was close enough, tell them they won
    if (distance < 8) {
        dstanse.remove();
        // styling the announce text
        setMessage(`Yee! You found the treasure in ${clicks} clicks!`, 'red', '2rem');
    }
    event.preventDefault();
})
// play again event listner
playAgain.addEventListener('click', function (e) {
    window.location.reload();
    e.preventDefault();
})


function setMessage(msg, color, fontSize) {
    declareWin.style.fontSize = fontSize;
    declareWin.style.color = color;
    declareWin.textContent = msg;
}