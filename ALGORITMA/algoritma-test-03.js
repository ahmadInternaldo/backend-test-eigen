const INPUT = ['xc', 'dz', 'bbb', 'dz']
const QUERY = ['bbb', 'ac', 'dz']

const count = (query, input) => {
  let output = []
  for (let i of query) {
    const sameString = input.filter(j => j === i)
    output.push(sameString.length)
  }
  return output
}

console.log(count(QUERY, INPUT))