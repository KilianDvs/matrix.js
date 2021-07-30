"use strict"

export type Row<Data> = Cell<Data>[]
export type Col<Data> = Row<Data>
export type Table<Data> = Row<Data>[]
export type Values<Data> = Data[][]
export type Cell<Data> = {
  data: Data
  [k: string]: any
}
export type Vector = [number, number]

export class Matrix<Data> {
  private _input: Table<Data> = []
  defaultData: Data
  
  constructor(input: Values<Data>, defaultData: Data, private asColumns = false) {
    this.defaultData = defaultData
    if (input.length === 0) return
    
    if (asColumns) this.addCols(input)
    else this.addRows(input)
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

    for (let x = 0; x < this.width; x++) cols.push(this.getCol(x))

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

  removeRows(arg1: Array<number> | number, end?: number) {
    if(typeof arg1 === "object" && typeof end === "undefined") {
      let count = 0
      arg1 = arg1.sort((a,b) => a-b)
      for (const x of arg1) {
        this.removeRow(x-count)
        count++
      }
    }
    else if(typeof arg1 === "number" && typeof end === "number") {
      for (let x = arg1; x <= end; x++) {
        this.removeRow(arg1)
      }
    }
    else if(typeof arg1 === "number" && typeof end === "undefined") {
      for(let x = 0; x < arg1; x++)
        this.removeRow(this.height-1)
    }
    else {
      throw new Error(`Given arguments are incorrect`)
    }

    return this
  }

  removeCol(at?: number) {
    this.forRows((row) => {
      if (at === undefined) row.pop()
      else row.splice(at, 1)
    })

    return this
  }

  removeCols(arg1: Array<number> | number, end?: number) {
    if(typeof arg1 === "object" && typeof end === "undefined") {
      let count = 0
      arg1 = arg1.sort((a,b) => a-b)
      for (const x of arg1) {
        this.removeCol(x-count)
        count++
      }
    }
    else if(typeof arg1 === "number" && typeof end === "number") {
      for (let x = arg1; x <= end; x++) {
        this.removeCol(arg1)
      }
    }
    else if(typeof arg1 === "number" && typeof end === "undefined") {
      for(let x = 0; x < arg1; x++)
        this.removeCol(this.width-1)
    }
    else {
      throw new Error(`Given arguments are incorrect`)
    }
  
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
    if(at === undefined) at = this.width | 0
    
    input.forEach((_,i)=>{
      if(!this._input[i]) this._input[i] = []
    })
    
    this._input.forEach((row, i) => {
      if (at === undefined) row.push(col[i])
      else {
        while(this.width - 1 > row.length) row.push({data: this.defaultData })
        row.splice(at, 0, col[i])
      }
    })

    return this
  }

  addRows(input: Data[][], at?: number) {
    if(at || at === 0) for (const col of input) this.addRow(col, at++)
    else for (const col of input) this.addRow(col)

    return this
  }

  addCols(input: Data[][], at?: number) {
    if(at || at === 0) for (const col of input) this.addCol(col, at++)
    else for (const col of input) this.addCol(col)
    
    return this
  }

  clone() {
    return new Matrix(this.toJSON(),this.defaultData, this.asColumns)
  }

  toJSON(): Values<Data> {
    return JSON.parse(this.toString())
  }

  toString() {
    return JSON.stringify(this.values)
  }
  
  forZone(start: Vector, end: Vector, callback : ((cell: Cell<Data>, i:number, cells:Cell<Data>[]) => void)){
    const cells: Cell<Data>[] = []
    for (let x = start[0]; x < end[0]+1; x++) {
      for (let y = start[1]; y < end[1]+1; y++) {
        if(!this._input[y] || !this._input[y][x])
          throw new Error(`No cell found at position : ${x} ${y}`)
        cells.push(this._input[y][x])
      }
    }
    cells.forEach(callback)
    
    return this
  }
  
  positionOf(value: Data): Vector[] {
    const out: Vector[] = []
    this._input.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.data === value) out.push([x, y])
      })
    })
    return out
  }
  
  groupBy(type: "row" | "col", pos: number) {
    const data: Row<Data>[] = type === "row" ? this.rows : this.cols
    const dataTwo: Row<Data>[] = type === "row" ? this.cols : this.rows
    const possibilities: Set<Data> = new Set(data[pos].map(c => c.data))
    let out: Map<Data, Row<Data>[]> = new Map()
    possibilities.forEach(possibility => {
      out.set(possibility, dataTwo.filter(row => row[pos].data === possibility))
    })
    return out
  }
}
