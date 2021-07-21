export declare type Row<Data> = Cell<Data>[];
export declare type Col<Data> = Row<Data>;
export declare type Table<Data> = Row<Data>[];
export declare type Values<Data> = Data[][];
export declare type Cell<Data> = {
    data: Data;
    [k: string]: any;
};
export declare class Matrix<Data> {
    private asColumns;
    private _input;
    constructor(input: Values<Data>, asColumns?: boolean);
    get width(): number;
    get height(): number;
    get rows(): Table<Data>;
    get cols(): Table<Data>;
    get values(): Values<Data>;
    getRow(y: number): Row<Data>;
    getCol(x: number): Col<Data>;
    forRows(fn: (row: Row<Data>, y: number, rows: Table<Data>) => unknown): this;
    forCols(fn: (col: Col<Data>, x: number, cols: Table<Data>) => unknown): this;
    removeRow(at?: number): this;
    removeCol(at?: number): this;
    addRow(input: Data[], at?: number): this;
    addCol(input: Data[], at?: number): this;
    addRows(...input: Data[][]): this;
    addCols(...input: Data[][]): this;
    clone(): Matrix<Data>;
    toJSON(): Values<Data>;
    toString(): string;
}
