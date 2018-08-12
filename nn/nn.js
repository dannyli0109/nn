const sigmoid = x => {
    return 1 / (1 + Math.exp(-x))
}

class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes
        this.hiddenNodes = hiddenNodes
        this.outputNodes = outputNodes

        this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes)
        this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes)
        this.weightsIH.randomize()
        this.weightsHO.randomize()
        this.biasH = new Matrix(this.hiddenNodes, 1)
        this.biasO = new Matrix(this.outputNodes, 1)
        this.biasH.randomize()
        this.biasO.randomize()
    }

    feedForward(inputArray) {
        let inputs = Matrix.fromArray(inputArray)
        let hidden = Matrix.multiply(this.weightsIH, inputs)
        hidden.add(this.biasH)
        hidden.map(sigmoid)
        let output = Matrix.multiply(this.weightsHO, hidden)
        output.add(this.biasO)
        output.map(sigmoid)
        return output.toArray()
    }
}