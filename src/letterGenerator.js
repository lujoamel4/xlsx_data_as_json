function nextLetter (letter) {
  if (!letter || letter === '' || letter === 'Z') {
    return 'A'
  }
  return String.fromCharCode(letter.charCodeAt() + 1)
}

function nextLetterString (letterString) {
  if (letterString.length === 0) {
    return 'A'
  }

  if (letterString.slice(-1) === 'Z') {
    return nextLetterString(letterString.slice(0, -1)) + nextLetter(letterString.slice(-1))
  }

  return letterString.slice(0, -1) + nextLetter(letterString.slice(-1))
}

module.exports = { nextLetterString }
