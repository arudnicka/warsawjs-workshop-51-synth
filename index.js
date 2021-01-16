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
  volume.addEventListener('change', changeVolume, false)

  masterGainNode = audioContext.createGain()
  masterGainNode.connect(audioContext.destination)
  masterGainNode.gain.value = volume.value

  createKeyboard()
}

// Przejscie po ustawionej na sztywno tablicy czestotliwosci dzwiekow
// oraz utworzenie dla kazdej klawisza
function createKeyboard() {
  frequency.forEach((key, _) => {
    keyboard.appendChild(createKey(key))
  })
}

// Utworzenie pojedynczego klawisza reprezentujacego kolejny dzwiek
function createKey(key) {
  let keyElement = document.createElement('div')
  let labelElement = document.createElement('div')

  const note = key[0]
  const frequency = key[1]

  keyElement.className = 'keyboard__key'
  keyElement.dataset['note'] = note
  keyElement.dataset['frequency'] = frequency

  labelElement.innerHTML = note
  keyElement.appendChild(labelElement)

  keyElement.addEventListener('mousedown', keyPressed, false)
  keyElement.addEventListener('mouseup', keyReleased, false)
  keyElement.addEventListener('mouseover', keyPressed, false)
  keyElement.addEventListener('mouseleave', keyReleased, false)

  return keyElement
}

// Modyfikacja wartosci dla GainNode - callback dla listenera zmiany glosnosci
function changeVolume(e) {
  masterGainNode.gain.value = volume.value
}

// Ustawianie odpowiedniej czestotliwosci dla oscylatora,
// typu fali, a nastepnie odtworzenie dzwieku
function playTone(frequency) {
  const oscillator = audioContext.createOscillator()

  oscillator.connect(masterGainNode)
  oscillator.type = wave.options[wave.selectedIndex].value
  oscillator.frequency.value = frequency
  oscillator.start()

  return oscillator
}

// Callback na nacisniecie klawisza
function keyPressed(e) {
  if (e.buttons & 1) {
    const dataset = e.target.dataset

    if (!dataset['pressed']) {
      oscillators[dataset['note']] = playTone(dataset['frequency'])
      dataset['pressed'] = true
    }
  }
}

// Callback na zwolnienie klawisza,
function keyReleased(e) {
  const dataset = e.target.dataset

  if (dataset && dataset['pressed']) {
    oscillators[dataset['note']].stop()

    delete oscillators[dataset['note']]
    delete dataset['pressed']
  }
}

documentReady(function() {
  synthSetup()
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
