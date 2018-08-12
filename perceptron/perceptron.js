const sign = n => n >= 0 ? 1 : -1

class Perceptron {
    constructor(n) {
        this.weights = new Array(n)
        this.lr = 0.01
        // Initialize the weights randomly
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = random(-1, 1)
        }
    }
    guess(inputs) {
        let sum = 0
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i]
        }
        let output = sign(sum)
        return output
    }

    train(inputs, target) {
        let guess = this.guess(inputs)
        let error = target - guess

        this.weights = this.weights.map((weight, index) => {
            return weight + error * inputs[index] * this.lr
        })
    }

    guessY(x) {
        // w0 * x + w1 * y + w2 * b = 0
        let m = -this.weights[0] / this.weights[1]
        let b = -this.weights[2] / this.weights[1]
        return m * x + b
    }
}