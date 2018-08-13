const sigmoid = x => {
    return 1 / (1 + Math.exp(-x))
}

const dsigmoid = (y) => {
    return y * (1 - y)
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
        // console.log(this.weightsIH)
        // console.log(this.weightsHO)
        this.biasH = new Matrix(this.hiddenNodes, 1)
        this.biasO = new Matrix(this.outputNodes, 1)
        this.biasH.randomize()
        this.biasO.randomize()
        this.learningRate = 0.1
    }

    feedForward(inputArray) {
        let inputs = Matrix.fromArray(inputArray)
        let hidden = Matrix.multiply(this.weightsIH, inputs)
        console.log(this.weightsIH)
        hidden.add(this.biasH)
        hidden.map(sigmoid)
        let output = Matrix.multiply(this.weightsHO, hidden)
        output.add(this.biasO)
        output.map(sigmoid)
        return output.toArray()
    }

    train(inputsArray, targetsArray) {

        let inputs = Matrix.fromArray(inputsArray)
        let hidden = Matrix.multiply(this.weightsIH, inputs)

        hidden.add(this.biasH)
        hidden.map(sigmoid)
        let outputs = Matrix.multiply(this.weightsHO, hidden)
        outputs.add(this.biasO)
        outputs.map(sigmoid)



        // let outputsArray = this.feedForward(inputsArray)

        // convert array to matrix object
        // outputs = Matrix.fromArray(outputsArray)
        let targets = Matrix.fromArray(targetsArray)

        // calculate the error
        // error = targets - outputs
        let outputErrors = Matrix.subtract(targets, outputs)

        // calculate the hidden layer errors
        // let whoT = Matrix.transpose(this.weightsHO)
        // let hiddenErrors = Matrix.multiply(whoT, outputErrors)

        // let gradient = outputs * (1 - outputs)
        let gradients = Matrix.map(outputs, dsigmoid)
        gradients.multiply(outputErrors)
        gradients.multiply(this.learningRate)

        // calculate deltas
        let hiddenT = Matrix.transpose(hidden)
        let weightHODeltas = Matrix.multiply(gradients, hiddenT)

        // Adjust the weights by deltas
        this.weightsHO.add(weightHODeltas)
        // Adjust the bias by its deltas
        this.biasO.add(gradients)

        let whoT = Matrix.transpose(this.weightsHO)
        let hiddenErrors = Matrix.multiply(whoT, outputErrors)

        let hiddenGradient = Matrix.map(hidden, dsigmoid)
        hiddenGradient.multiply(hiddenErrors)
        hiddenGradient.multiply(this.learningRate)

        let inputsT = Matrix.transpose(inputs)
        let weightIHDeltas = Matrix.multiply(hiddenGradient, inputsT)

        this.weightsIH.add(weightIHDeltas)
        this.biasH.add(hiddenGradient)



        // outputs.print()
        // targets.print()
        // error.print()
    }
}