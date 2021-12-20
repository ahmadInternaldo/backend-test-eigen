const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

const validation = (input) => {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].length !== matrix.length) {
      return false
    }
  }
  return true
}

// main function
const result = (input) => {
  //make sure it is really NxN
  const isValid = validation(input)
  if (!isValid){
    return 'matrix invalid'
  } else {
    let output = [0,0]
    for (let i = 0; i < input.length; i++) {
      output[0] += input[i][i]
      output[1] += input[i][input.length - (i+1)]
    }
    return output[0] - output[1]
  }
}

console.log(result(matrix))