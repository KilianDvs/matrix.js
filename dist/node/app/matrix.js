"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(input, asColumns = false) {
        this.asColumns = asColumns;
        this._input = [];
        if (input.length === 0)
            return;
        if (asColumns)
            this.addCols(input);
        else
            this.addRows(input);
    }
    get width() {
        return Math.max(...this.rows.map((row) => row.length));
    }
    get height() {
        return Math.max(...this.cols.map((col) => col.length));
    }
    get rows() {
        return this._input;
    }
    get cols() {
        const cols = [];
        for (let x = 0; x < this.rows.length; x++)
            cols.push(this.getCol(x));
        return cols;
    }
    get values() {
        return this.rows.map((row) => {
            return row.map((cell) => cell.data);
        });
    }
    getRow(y) {
        return this._input[y];
    }
    getCol(x) {
        return this._input.map((row) => row[x]);
    }
    forRows(fn) {
        this.rows.forEach(fn);
        return this;
    }
    forCols(fn) {
        this.cols.forEach(fn);
        return this;
    }
    removeRow(at) {
        if (at === undefined)
            this.rows.pop();
        else
            this.rows.splice(at, 1);
        return this;
    }
    removeCol(at) {
        this.forRows((row) => {
            if (at === undefined)
                row.pop();
            else
                row.splice(at, 1);
        });
        return this;
    }
    addRow(input, at) {
        const row = input.map((data) => ({ data }));
        if (at === undefined)
            this._input.push(row);
        else
            this._input.splice(at, 0, row);
        return this;
    }
    addCol(input, at) {
        const col = input.map((data) => ({ data }));
        this._input.forEach((row, i) => {
            if (at === undefined)
                row.push(col[i]);
            else
                row.splice(at, 0, col[i]);
        });
        return this;
    }
    addRows(input, at) {
        if (at || at === 0)
            for (const col of input)
                this.addRow(col, at++);
        else
            for (const col of input)
                this.addRow(col);
        return this;
    }
    addCols(input, at) {
        if (at || at === 0)
            for (const col of input)
                this.addCol(col, at++);
        else
            for (const col of input)
                this.addCol(col);
        return this;
    }
    clone() {
        return new Matrix(this.toJSON(), this.asColumns);
    }
    toJSON() {
        return JSON.parse(this.toString());
    }
    toString() {
        return JSON.stringify(this.values);
    }
    forZone(start, end, callback) {
        const cells = [];
        for (let x = start[0]; x < end[0] + 1; x++) {
            for (let y = start[1]; y < end[1] + 1; y++) {
                if (!this._input[y] || !this._input[y][x])
                    throw new Error(`No cell found at position : ${x} ${y}`);
                cells.push(this._input[y][x]);
            }
        }
        cells.forEach((cell, i) => {
            callback(cell, i, cells);
        });
    }
}
exports.Matrix = Matrix;
