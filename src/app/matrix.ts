"use strict"

export type Row<Data> = Cell<Data>[]
export type Col<Data> = Row<Data>
export type Table<Data> = Row<Data>[]
export type Values<Data> = Data[][]
export type Cell<Data> = {
  data: Data
  [k: string]: any
}

export class Matrix<Data> {
  private _input: Table<Data> = []

  constructor(input: Values<Data>, private asColumns = false) {
    if (input.length === 0) return

    if (asColumns) this.addCols(...input)
    else this.addRows(...input)
  }

  get width() {
    return Math.max(...this.rows.map((row) => row.length))
  }

  get height() {
    return Math.max(...this.cols.map((col) => col.length))
  }

  get rows(): Table<Data> {
    return this._input
  }

  get cols(): Table<Data> {
    const cols: Table<Data> = []

    for (let x = 0; x < this.rows.length; x++) cols.push(this.getCol(x))

    return cols
  }

  get values(): Values<Data> {
    return this.rows.map((row) => {
      return row.map((cell) => cell.data)
    })
  }

  getRow(y: number): Row<Data> {
    return this._input[y]
  }

  getCol(x: number): Col<Data> {
    return this._input.map((row) => row[x])
  }

  forRows(fn: (row: Row<Data>, y: number, rows: Table<Data>) => unknown) {
    this.rows.forEach(fn)

    return this
  }

  forCols(fn: (col: Col<Data>, x: number, cols: Table<Data>) => unknown) {
    this.cols.forEach(fn)

    return this
  }

  removeRow(at?: number) {
    if (at === undefined) this.rows.pop()
    else this.rows.splice(at, 1)

    return this
  }

  removeCol(at?: number) {
    this.forRows((row) => {
      if (at === undefined) row.pop()
      else row.splice(at, 1)
    })

    return this
  }

  addRow(input: Data[], at?: number) {
    const row: Row<Data> = input.map((data) => ({ data }))

    if (at === undefined) this._input.push(row)
    else this._input.splice(at, 0, row)

    return this
  }

  addCol(input: Data[], at?: number) {
    const col: Col<Data> = input.map((data) => ({ data }))

    this._input.forEach((row, i) => {
      if (at === undefined) row.push(col[i])
      else row.splice(at, 0, col[i])
    })

    return this
  }

  addRows(...input: Data[][]) {
    for (const row of input) this.addRow(row)

    return this
  }

  addCols(...input: Data[][]) {
    for (const col of input) this.addCol(col)

    return this
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
