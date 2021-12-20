let input = "NEGIE1";

const reverseFunction = (word) => {
	let outputString = "";
	let outputNumber = "";
	for (let i of word) {
		if (!+i) {
			outputString += i;
		} else {
			outputNumber += i;
		}
	}
	return outputString.split("").reverse().join("") + outputNumber

}

console.log(reverseFunction(input))
