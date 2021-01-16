// AudioContext - API obslugiwane przez nowsze przegladarki, IE NIE
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
const audioContext = new window.AudioContext

let oscillators = []
let masterGainNode = null;

const keyboard = document.querySelector('.keyboard')
const wave = document.querySelector('select[name="wave"]')
const volume = document.querySelector('input[name="volume"]')

// Ustawienie calego syntezatora:
// * podlaczenie listenera do suwaka zmiany glosnosci,
// * przypisanie glosnosci do interface GainNode,
// * wywolanie funkcji tworzacej klawisze
function synthSetup() {
  // ...
}

// Przejscie po ustawionej na sztywno tablicy czestotliwosci dzwiekow
// oraz utworzenie dla kazdej klawisza
function createKeyboard() {
  // ...
}

// Utworzenie pojedynczego klawisza reprezentujacego kolejny dzwiek
function createKey(key) {
  // ...
}

// Modyfikacja wartosci dla GainNode - callback dla listenera zmiany glosnosci
function changeVolume(e) {
  // ...
}

// Ustawianie odpowiedniej czestotliwosci dla oscylatora,
// typu fali, a nastepnie odtworzenie dzwieku
function playTone(frequency) {
  // ...
}

// Callback na nacisniecie klawisza
function keyPressed(e) {
  // ...
}

// Callback na zwolnienie klawisza,
function keyReleased(e) {
  // ...
}

documentReady(function() {
  // ...
})

function documentReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 100)
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

const frequency = [
  ['C4', 261.625565300598634],
  ['D4', 293.664767917407560],
  ['E4', 329.627556912869929],
  ['F4', 349.228231433003884],
  ['G4', 391.995435981749294],
  ['A4', 440.000000000000000],
  ['H4', 493.883301256124111],
  ['C5', 523.251130601197269]
]
