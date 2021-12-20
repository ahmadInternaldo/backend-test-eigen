const input = "Saya sangat senang mengerjakan soal algoritma"

const longestSentence = (sentence) => {
  let output = [Number.NEGATIVE_INFINITY, ""]
  const word = sentence.split(" ")
  for (let i = 0; i < word.length; i++) {
    if (word[i].length > output[0]) {
      output[0] = word[i].length
      output[1] = word[i]
    }
  }
  return `${output[1]}: ${output[0]} character`
}

console.log(longestSentence(input))