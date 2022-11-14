// select 'speechSynthesis' 
const synth = window.speechSynthesis;
// console.log(synth);

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// voice array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

// get voices
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// speak(arrow-function)
const Speak = () => {

    if (synth.speaking) {
        // console.error('wait. Already speaking');
        return;
    }

    if (textInput.value !== '') {
        // add background gif
        body.style.background = '#141414   url(Images/soundwave01.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        const speakText = new SpeechSynthesisUtterance(textInput.value);
        speakText.onend = (e) => {
            body.style.background ='#01011f'
            // console.log('Done', e);
        }
        speakText.onerror = (e) => {
            console.error('error-occured', e);
        }

        const voiceChoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        // console.log(voiceChoice);

        // looping-voices
        voices.forEach(voice => {
            if (voice.name === voiceChoice) {
                speakText.voice = voice;
            }
        });

        // pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // grab the text and run speak()
        synth.speak(speakText);
    }
};

// Event-Listner
textForm.addEventListener('submit', (e) => {
    e.preventDefault();
    Speak();
    textInput.blur()
})


// change rate-value
rate.addEventListener('change', (e) => {
    rateValue.textContent = rate.value;
})


// change pitch-value
pitch.addEventListener('change', (e) => {
    pitchValue.textContent = pitch.value;
})

// select voice
voiceSelect.addEventListener('change', (e) => {
    Speak();
})

// @mondalcodehub | NOV-2022