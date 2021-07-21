"use strict";
exports.__esModule = true;
exports.Matrix = void 0;
var Matrix = /** @class */ (function () {
    function Matrix(input, asColumns) {
        if (asColumns === void 0) { asColumns = false; }
        this.asColumns = asColumns;
        this._input = [];
        if (input.length === 0)
            return;
        if (asColumns)
            this.addCols(input);
        else
            this.addRows(input);
    }
    Object.defineProperty(Matrix.prototype, "width", {
        get: function () {
            return Math.max.apply(Math, this.rows.map(function (row) { return row.length; }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "height", {
        get: function () {
            return Math.max.apply(Math, this.cols.map(function (col) { return col.length; }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "rows", {
        get: function () {
            return this._input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "cols", {
        get: function () {
            var cols = [];
            for (var x = 0; x < this.rows.length; x++)
                cols.push(this.getCol(x));
            return cols;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "values", {
        get: function () {
            return this.rows.map(function (row) {
                return row.map(function (cell) { return cell.data; });
            });
        },
        enumerable: false,
        configurable: true
    });
    Matrix.prototype.getRow = function (y) {
        return this._input[y];
    };
    Matrix.prototype.getCol = function (x) {
        return this._input.map(function (row) { return row[x]; });
    };
    Matrix.prototype.forRows = function (fn) {
        this.rows.forEach(fn);
        return this;
    };
    Matrix.prototype.forCols = function (fn) {
        this.cols.forEach(fn);
        return this;
    };
    Matrix.prototype.removeRow = function (at) {
        if (at === undefined)
            this.rows.pop();
        else
            this.rows.splice(at, 1);
        return this;
    };
    Matrix.prototype.removeCol = function (at) {
        this.forRows(function (row) {
            if (at === undefined)
                row.pop();
            else
                row.splice(at, 1);
        });
        return this;
    };
    Matrix.prototype.addRow = function (input, at) {
        var row = input.map(function (data) { return ({ data: data }); });
        if (at === undefined)
            this._input.push(row);
        else
            this._input.splice(at, 0, row);
        return this;
    };
    Matrix.prototype.addCol = function (input, at) {
        var col = input.map(function (data) { return ({ data: data }); });
        this._input.forEach(function (row, i) {
            if (at === undefined)
                row.push(col[i]);
            else
                row.splice(at, 0, col[i]);
        });
        return this;
    };
    Matrix.prototype.addRows = function (input, at) {
        if (at || at === 0)
            for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
                var col = input_1[_i];
                this.addRow(col, at++);
            }
        else
            for (var _a = 0, input_2 = input; _a < input_2.length; _a++) {
                var col = input_2[_a];
                this.addRow(col);
            }
        return this;
    };
    Matrix.prototype.addCols = function (input, at) {
        if (at || at === 0)
            for (var _i = 0, input_3 = input; _i < input_3.length; _i++) {
                var col = input_3[_i];
                this.addCol(col, at++);
            }
        else
            for (var _a = 0, input_4 = input; _a < input_4.length; _a++) {
                var col = input_4[_a];
                this.addCol(col);
            }
        return this;
    };
    Matrix.prototype.clone = function () {
        return new Matrix(this.toJSON(), this.asColumns);
    };
    Matrix.prototype.toJSON = function () {
        return JSON.parse(this.toString());
    };
    Matrix.prototype.toString = function () {
        return JSON.stringify(this.values);
    };
    Matrix.prototype.forZone = function (start, end, callback) {
        var cells = [];
        for (var x = start[0]; x < end[0] + 1; x++) {
            for (var y = start[1]; y < end[1] + 1; y++) {
                if (!this._input[y] || !this._input[y][x])
                    throw new Error("No cell found at position : " + x + " " + y);
                cells.push(this._input[y][x]);
            }
        }
        cells.forEach(function (cell, i) {
            callback(cell, i, cells);
        });
    };
    return Matrix;
}());
exports.Matrix = Matrix;
