/* Variables */
var synth = window.speechSynthesis; // Initialize the Web Speech API's speech synthesis
var textToSpeak = ''; // Store the text to be spoken
var speakTextButton = document.querySelector('#speak-text-button'); // Get the button to speak a text
var speakArrayButtons = document.querySelectorAll('.speak-array-button'); // Get buttons to speak arrays
var generateStoryButton = document.querySelector('#generate-story-button'); // Get the button to generate a random story
var resetStoryButton = document.querySelector('#reset-story-button'); // Get the button to reset the story
var storyText = document.getElementById('story-text'); // Get the story text element
var storyTextTwo = document.getElementById('story-text-two'); // Get an additional story text element (if it exists)

/* Arrays for Random Phrases */
var nouns = ['turkey', 'Mom', 'Dad', 'The dog', 'My teacher', 'The elephant', 'The cat']; // Array of nouns
var verbs = ['sat on', 'ate', 'danced with', 'saw', 'do not like', 'kissed']; // Array of verbs
var adjectives = ['a funny', 'a scary', 'a goofy', 'a slimy', 'a barking', 'a fat']; // Array of adjectives
var nouns2 = ['goat', 'monkey', 'fish', 'cow', 'frog', 'bug', 'worm']; // Another array of nouns
var places = ['on the moon', 'on the chair', 'in my spaghetti', 'in my soup', 'on the grass', 'in my shoes']; // Array of places

/* Functions */
function generateRandomPhrase(array) {
  return array[Math.floor(Math.random() * array.length)]; // Generate a random phrase by picking elements from an array
}

function generateRandomStory() {
  var randomChoice = Math.floor(Math.random() * 3); // Choose a random number to decide the story structure
  var phrase1 = generateRandomPhrase(nouns) + ' ' + generateRandomPhrase(verbs) + ' ' + generateRandomPhrase(adjectives) + ' ' + generateRandomPhrase(places); // Generate the first phrase
  var phrase2 = generateRandomPhrase(nouns) + ' ' + generateRandomPhrase(verbs) + ' ' + generateRandomPhrase(adjectives) + ' ' + generateRandomPhrase(places); // Generate the second phrase

  if (randomChoice === 0) {
    return `${phrase1} and ${phrase2}. It was a comical mishap, creating laughter and unforgettable memories in our backyard.`; // Generate a random story structure and combine phrases
  } else if (randomChoice === 1) {
    return `${phrase1}, while ${phrase2}. It was a surreal dinner experience, filled with unexpected twists and turns under the starry night.`; // Generate another random story structure
  } else {
    return `${phrase1} and ${phrase2}. It was the strangest picnic ever, full of unexpected surprises and laughter, turning an ordinary day into an extraordinary memory.`; // Generate yet another random story structure
  }
}

function speakNow() {
  var utterThis = new SpeechSynthesisUtterance(textToSpeak); // Create a speech synthesis utterance
  synth.speak(utterThis); // Make the browser speak the text
  storyText.textContent = textToSpeak; // Display the spoken text in the storyText element
  if (storyTextTwo) { // Check if storyTextTwo element exists
    storyTextTwo.textContent = textToSpeak; // Display the spoken text in storyTextTwo (if it exists)
  }
}

/* Event Listeners */
speakTextButton.addEventListener('click', function () {
  textToSpeak = generateRandomPhrase(nouns) + ' ' + generateRandomPhrase(verbs) + ' ' + generateRandomPhrase(adjectives) + ' ' + generateRandomPhrase(nouns2) + ' ' + generateRandomPhrase(places); // Generate a random text
  speakNow(); // Speak the generated text
});

speakArrayButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var arrayName = button.getAttribute('data-array'); // Get the array name from the button's data attribute
    var array = window[arrayName]; // Access the array based on its name
    speakArray(array); // Speak the elements in the array
  });
});

generateStoryButton.addEventListener('click', function () {
  textToSpeak = generateRandomStory(); // Generate a random story
  speakNow(); // Speak the generated story
});

resetStoryButton.addEventListener('click', function () {
  synth.cancel(); // Cancel any ongoing speech
  textToSpeak = ''; // Clear the text to be spoken
  storyText.textContent = ''; // Clear the story text
  if (storyTextTwo) { // Check if storyTextTwo element exists
    storyTextTwo.textContent = ''; // Clear storyTextTwo (if it exists)
  }
});

function speakArray(array) {
  for (var i = 0; i < array.length; i++) {
    var utterThis = new SpeechSynthesisUtterance(array[i]); // Create a speech synthesis utterance for each element in the array
    synth.speak(utterThis); // Make the browser speak each element
  }
}
