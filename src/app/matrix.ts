export class Matrix {
  constructor(arr) {
    this.rows = {}
    this.cols = {}
    this.table = {}
    this.rows.keys = {}
    this.cols.keys = {}
    this.rows.vals = []
    this.cols.vals = []

    if (isArr(arr) && arr[0] !== undefined) {
      //Handling Arrays

      if (isArr(arr[0])) {
        //Handling 2D arrays

        this.type = "Array 2D"
        this.rows.count = arr.length
        this.cols.count = arr[0].length
        let rowKeys = [],
          colKeys = []
        for (let i in arr) {
          rowKeys.push(i)

          this.rows.vals[i] = []
          for (let j in arr[i]) {
            this.rows.vals[i].push(arr[i][j])
          }
        }

        for (let i in arr[0]) {
          colKeys.push(i)
          this.cols.vals[i] = []
          for (let j in arr) {
            this.cols.vals[i].push(arr[j][i])
          }
        }
        this.rows.keys = rowKeys
        this.cols.keys = colKeys

        return this
      } else if (typeof arr[0] === "object" && typeof arr[0] !== null) {
        //Handling arrays containing an object

        this.type = "Array of Objects"
        this.rows.count = arr.length
        this.cols.count = objToArr(arr[0]).length
        let rowKeys = [],
          colKeys = []

        for (let i in arr) {
          arr[i] = objToArr(arr[i])
          rowKeys.push(i)
          this.rows.vals[i] = []
          for (let j in arr[0]) {
            this.rows.vals[i].push(arr[i][j][1])
          }
        }

        for (let i in arr[0]) {
          colKeys.push(arr[0][i][0])
          this.cols.vals[i] = []
          for (let j in arr) {
            this.cols.vals[i].push(arr[j][i][1])
          }
        }
        this.rows.keys = rowKeys
        this.cols.keys = colKeys

        return this
      } else {
        //Handling 1D arrays

        this.type = "Array"
        this.rows.count = arr.length
        this.cols.count = 1
        this.cols.keys = [0]
        let rowKeys = [],
          colValues = []
        for (let i in arr) {
          rowKeys.push(i)
          this.rows.vals[i] = [arr[i]]
          colValues.push(arr[i])
        }
        this.rows.keys = rowKeys
        this.cols.vals = colValues
      }
    } else if (typeof arr === "object" && typeof arr !== null) {
      //Handling objects

      if (isArr(v(arr)[0])) {
        //Handling objects containing an array

        this.type = "Object of Arrays"
        arr = objToArr(arr)
        this.rows.count = arr.length
        this.cols.count = arr[0][1].length
        let rowKeys = [],
          colKeys = [],
          rowValues = []
        for (let i in arr) {
          rowKeys.push(arr[i][0])
          this.rows.vals[i] = arr[i][1]
        }
        for (let i in arr[0][1]) {
          this.cols.vals[i] = []
          colKeys.push(i)
          for (let j in arr) {
            this.cols.vals[i].push(arr[j][1][i])
          }
        }

        this.rows.keys = rowKeys
        this.cols.keys = colKeys
      } else if (typeof v(arr)[0] === "object" && typeof v(arr)[0] !== null) {
        //Handling 2D objects

        this.type = "Object 2D"
        let colKeys = [],
          rowKeys = []
        arr = objToArr(arr)
        for (let i in arr) {
          rowValues = []
          arr[i][1] = objToArr(arr[i][1])
          rowKeys.push(arr[i][0])
          for (let j in arr[i][1]) {
            rowValues.push(arr[i][1][j][1])
          }
          this.rows.vals[i] = rowValues
        }
        for (let i in arr[0][1]) {
          colValues = []
          colKeys.push(arr[0][1][i][0])
          for (let j in arr) {
            colValues.push(arr[j][1][i][1])
          }
          this.cols.vals[i] = colValues
        }
        this.rows.count = arr.length
        this.cols.count = arr[0][1].length
        this.cols.keys = colKeys
        this.rows.keys = rowKeys
      } else {
        //Handling 1D objects

        this.type = "Object"
        arr = objToArr(arr)
        this.cols.count = 1
        this.cols.keys = [0]
        this.rows.count = arr.length
        let rowKeys = [],
          colValues = []
        for (let i in arr) {
          rowKeys.push(arr[i][0])
          this.rows.vals[i] = [arr[i][1]]
          colValues.push(arr[i][1])
        }
        this.rows.keys = rowKeys
        this.cols.vals = colValues
      }
    }
  }

  insertrows(value, index = undefined, key) {
    return insertrowsProt(value, index, key, this)
  }
}
