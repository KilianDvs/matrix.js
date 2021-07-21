export type Row<Data> = Cell<Data>[]
export type Col<Data> = Row<Data>
export type Table<Data> = Row<Data>[]
export type Values<Data> = Data[][]
export interface Cell<Data> {
  data: Data
  [k: string]: any
}

export class Matrix<Data> {
  private input: Table<Data> = []
  private width: number = null
  private height: number = null

  constructor(input: Values<Data>, private asColumns = false) {
    if (input.length === 0) return

    if (asColumns) this.addCols(...input)
    else this.addRows(...input)
  }

  get rows(): Table<Data> {
    return this.input.slice()
  }

  get cols(): Table<Data> {
    const cols: Table<Data> = []

    for (let x = 0; x < this.width; x++) cols.push(this.getCol(x))

    return cols
  }

  get values(): Values<Data> {
    return this.input.map((row) => {
      return row.map((cell) => cell.data)
    })
  }

  getRow(y: number): Row<Data> {
    return this.input[y]
  }

  getCol(x: number): Col<Data> {
    return this.input.map((row) => row[x])
  }

  forRows(fn: (row: Row<Data>, y: number, rows: Table<Data>) => unknown) {
    this.input.forEach(fn)
  }

  forCols(fn: (col: Col<Data>, y: number, rows: Table<Data>) => unknown) {
    this.input.forEach(fn)
  }

  addRow(input: Data[], at?: number) {
    const width = input.length

    if (this.width !== null && this.width !== width)
      throw new Error("Invalid row length, expected width: " + this.width)

    this.width = width
    this.height++

    const row: Row<Data> = input.map((data) => ({ data }))

    if (at === undefined) this.input.push(row)
    else this.input.splice(at, 0, row)
  }

  addCol(input: Data[], at?: number) {
    const height = input.length

    if (this.height !== null && this.height !== height)
      throw new Error("Invalid col length, expected height: " + this.width)

    this.height = height
    this.width++

    const col: Col<Data> = input.map((data) => ({ data }))

    this.input.forEach((row, i) => {
      if (at === undefined) row.push(col[i])
      else row.splice(at, 0, col[i])
    })
  }

  addRows(...input: Data[][]) {
    for (const row of input) this.addRow(row)
  }

  addCols(...input: Data[][]) {
    for (const col of input) this.addCol(col)
  }

  clone() {
    return new Matrix(this.toJSON(), this.asColumns)
  }

  toJSON(): Values<Data> {
    return JSON.parse(this.toString())
  }

  toString() {
    return JSON.stringify(this.values)
  }
}
