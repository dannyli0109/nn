function f(x) {
    // y = mx + b
    return 0.3 * x + 0.2
}


class Point {
    constructor(x, y) {
        this.x = x || random(-1, 1)
        this.y = y || random(-1, 1)
        this.bias = 1

        if (this.y > f(this.x)) {
            this.label = 1
        } else {
            this.label = -1
        }
    }

    getPixelX() {
        return map(this.x, -1, 1, 0, width)
    }

    getPixelY() {
        return map(this.y, -1, 1, height, 0)
    }

    show() {
        stroke(0)
        if (this.label === 1) {
            fill(255)
        } else {
            fill(0)
        }
        ellipse(this.getPixelX(), this.getPixelY(), 8, 8)
    }
}