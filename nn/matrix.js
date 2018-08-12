class Matrix {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.data = []

        for (let i = 0; i < this.rows; i++) {
            this.data[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    print() {
        console.table(this.data)
    }

    static fromArray(arr) {
        let m = new Matrix(arr.length, 1)
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i]
        }
        return m
    }

    toArray() {
        let arr = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j])
            }
        }
        return arr
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1
            }
        }
    }

    add(n) {
        if (n instanceof Matrix) {

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j]
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n
                }
            }
        }
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            console.error('Columns of a must equals to rows of b')
            return undefined
        }
        let result = new Matrix(a.rows, b.cols)
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j]
                }
                result.data[i][j] = sum
            }
        }
        return result
    }

    multiply(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n
            }
        }
    }


    static transpose(m) {
        let result = new Matrix(m.cols, m.rows)
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                result.data[j][i] = m.data[i][j]
            }
        }
        return result
    }

    transpose() {
        let result = new Matrix(this.cols, this.rows)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[j][i] = this.data[i][j]
            }
        }
        this.data = result.data
    }

    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = func(this.data[i][j], i, j)
            }
        }
    }
}