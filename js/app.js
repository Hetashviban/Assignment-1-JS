/* Variables */
var synth = window.speechSynthesis;
var textToSpeak = '';
var speakTextButton = document.querySelector('#speak-text-button');
var speakArrayButtons = document.querySelectorAll('.speak-array-button');
var generateStoryButton = document.querySelector('#generate-story-button');
var resetStoryButton = document.querySelector('#reset-story-button');
var storyText = document.getElementById('story-text');
var storyTextTwo = document.getElementById('story-text-two'); // Added this line

/* Arrays for Random Phrases */
var nouns = ['turkey', 'Mom', 'Dad', 'The dog', 'My teacher', 'The elephant', 'The cat'];
var verbs = ['sat on', 'ate', 'danced with', 'saw', 'do not like', 'kissed'];
var adjectives = ['a funny', 'a scary', 'a goofy', 'a slimy', 'a barking', 'a fat'];
var nouns2 = ['goat', 'monkey', 'fish', 'cow', 'frog', 'bug', 'worm'];
var places = ['on the moon', 'on the chair', 'in my spaghetti', 'in my soup', 'on the grass', 'in my shoes'];

/* Functions */
function generateRandomPhrase(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomStory() {
  var randomChoice = Math.floor(Math.random() * 3);
  var phrase1 = generateRandomPhrase(nouns) + ' ' + generateRandomPhrase(verbs) + ' ' + generateRandomPhrase(adjectives) + ' ' + generateRandomPhrase(places);
  var phrase2 = generateRandomPhrase(nouns) + ' ' + generateRandomPhrase(verbs) + ' ' + generateRandomPhrase(adjectives) + ' ' + generateRandomPhrase(places);

  if (randomChoice === 0) {
    return `${phrase1} and ${phrase2}. It was a comical mishap, creating laughter and unforgettable memories in our backyard.`;
  } else if (randomChoice === 1) {
    return `${phrase1}, while ${phrase2}. It was a surreal dinner experience, filled with unexpected twists and turns under the starry night.`;
  } else {
    return `${phrase1} and ${phrase2}. It was the strangest picnic ever, full of unexpected surprises and laughter, turning an ordinary day into an extraordinary memory.`;
  }
}

function speakNow() {
  var utterThis = new SpeechSynthesisUtterance(textToSpeak);
  synth.speak(utterThis);
  storyText.textContent = textToSpeak;
  storyTextTwo.textContent = textToSpeak; // Set the story to storyTextTwo
}

/* Event Listeners */
speakTextButton.addEventListener('click', function () {
  textToSpeak = generateRandomPhrase(nouns) + ' ' + generateRandomPhrase(verbs) + ' ' + generateRandomPhrase(adjectives) + ' ' + generateRandomPhrase(nouns2) + ' ' + generateRandomPhrase(places);
  speakNow();
});

speakArrayButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var arrayName = button.getAttribute('data-array');
    var array = window[arrayName];
    speakArray(array);
  });
});

generateStoryButton.addEventListener('click', function () {
  textToSpeak = generateRandomStory();
  speakNow();
});

resetStoryButton.addEventListener('click', function () {
  synth.cancel();
  textToSpeak = '';
  storyText.textContent = '';
  storyTextTwo.textContent = ''; // Clear storyTextTwo
});

function speakArray(array) {
  for (var i = 0; i < array.length; i++) {
    var utterThis = new SpeechSynthesisUtterance(array[i]);
    synth.speak(utterThis);
  }
}
