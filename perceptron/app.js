let brain
let points

let trainingIndex = 0

function setup() {
    createCanvas(400, 400)
    brain = new Perceptron(3)
    points = Array(100)
    for (let i = 0; i < points.length; i++) {
        points[i] = new Point()
    }
}

function draw() {
    background(255)
    stroke(0)
    // line(0, height, width, 0)
    let x1 = -1
    let y1 = f(x1)
    let x2 = 1
    let y2 = f(x2)

    let p1 = new Point(x1, y1)
    let p2 = new Point(x2, y2)
    // let pixelX = map(x1, -1, 1, 0, width)
    line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY())

    let pointPredict1 = new Point(-1, brain.guessY(-1), 1)
    let pointPredict2 = new Point(1, brain.guessY(1), 1)
    line(pointPredict1.getPixelX(), pointPredict1.getPixelY(), pointPredict2.getPixelX(), pointPredict2.getPixelY())


    points.forEach(point => {
        point.show()
        let inputs = [point.x, point.y, point.bias]
        let guess = brain.guess(inputs)
        let target = point.label
        if (guess === target) {
            fill(0, 255, 0)
        } else {
            fill(255, 0, 0)
        }
        ellipse(point.getPixelX(), point.getPixelY(), 4, 4)
    })

    training = points[trainingIndex]
    let inputs = [training.x, training.y, training.bias]
    brain.train(inputs, training.label)
    // console.log(brain.weights)
    stroke(0)

    noStroke()
    trainingIndex++
    if (trainingIndex == points.length) {
        trainingIndex = 0
    }
}
