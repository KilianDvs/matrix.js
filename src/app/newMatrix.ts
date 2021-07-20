export class Matrix<Data> {
  private input: Data[][] = []
  private width: number = null
  private height: number = null

  constructor(input: Data[][], asColumns = false) {
    if (input.length === 0) return

    if (asColumns) this.addCols(...input)
    else this.addRows(...input)
  }

  addRow(row: Data[]) {
    const width = row.length

    if (this.width !== null && this.width !== width)
      throw new Error("Invalid row length, expected width: " + this.width)

    this.width = width

    this.input.push(row)
    
    this.height = this.input.length
  }

  addCol(col: Data[]) {
    const height = col.length

    if (this.height !== null && this.height !== height)
      throw new Error("Invalid col length, expected height: " + this.width)

    this.height = height

    this.input.forEach((row, i) => row.push(col[i]))
    
    this.width = this.input[0].length
  }

  addRows(...rows: Data[][]) {
    for (const row of rows) this.addRow(row)
  }

  addCols(...cols: Data[][]) {
    for (const col of cols) this.addCol(col)
  }
}
