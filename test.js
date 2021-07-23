const { Matrix } = require(".")

let matrixOne = new Matrix([
  ["John", "Doe", 34, false, false],
  ["Lisa", "Simpson", 10, true, false],
  ["Sherlock", "Holmes", 42, false, true],
  ["Kilian", "Davies", 21, false, true]
])

test("Matrix#cols", () => {
  expect(matrixOne.cols).toStrictEqual([
    [
      { data: "John" },
      { data: "Lisa" },
      { data: "Sherlock" },
      { data: "Kilian" }
    ],
    [
      { data: "Doe" },
      { data: "Simpson" },
      { data: "Holmes" },
      { data: "Davies" }
    ],
    [{ data: 34 }, { data: 10 }, { data: 42 }, { data: 21 }],
    [{ data: false }, { data: true }, { data: false }, { data: false }],
    [{ data: false }, { data: false }, { data: true }, { data: true }]
  ])
})

test("Matrix#rows", () => {
  expect(matrixOne.rows).toStrictEqual([
      [
        { data: "John" },
        { data: "Doe" },
        { data: 34 },
        { data: false },
        { data: false }
      ],
      [
        { data: "Lisa" },
        { data: "Simpson" },
        { data: 10 },
        { data: true },
        { data: false }
      ],
      [
        { data: "Sherlock" },
        { data: "Holmes" },
        { data: 42 },
        { data: false },
        { data: true }
      ],
      [
        { data: "Kilian" },
        { data: "Davies" },
        { data: 21 },
        { data: false },
        { data: true }
      ]
    ]
  )
})

test("Matrix#width", () => {
  expect(matrixOne.width).toBe(5)
})

test("Matrix#height", () => {
  expect(matrixOne.height).toBe(4)
})

test("Matrix#removeCol", () => {
  matrixOne.removeCol(0)
  expect(matrixOne.cols).toStrictEqual([
      [
        { data: "Doe" },
        { data: "Simpson" },
        { data: "Holmes" },
        { data: "Davies" }
      ],
      [{ data: 34 }, { data: 10 }, { data: 42 }, { data: 21 }],
      [{ data: false }, { data: true }, { data: false }, { data: false }],
      [{ data: false }, { data: false }, { data: true }, { data: true }]
    ]
  )
})

test("Matrix#addCol", () => {
  matrixOne.addCol(["John", "Lisa", "Sherlock", "Kilian"], 0)
  expect(matrixOne.cols).toStrictEqual([[
      { data: "John" },
      { data: "Lisa" },
      { data: "Sherlock" },
      { data: "Kilian" }
    ],
    [
      { data: "Doe" },
      { data: "Simpson" },
      { data: "Holmes" },
      { data: "Davies" }
    ],
    [{ data: 34 }, { data: 10 }, { data: 42 }, { data: 21 }],
    [{ data: false }, { data: true }, { data: false }, { data: false }],
    [{ data: false }, { data: false }, { data: true }, { data: true }]])
})

test("Matrix#removeRow", ()=>{
  matrixOne.removeRow(0)
  expect(matrixOne.rows).toStrictEqual([
      [
        { data: 'Lisa' },
        { data: 'Simpson' },
        { data: 10 },
        { data: true },
        { data: false }
      ],
      [
        { data: 'Sherlock' },
        { data: 'Holmes' },
        { data: 42 },
        { data: false },
        { data: true }
      ],
      [
        { data: 'Kilian' },
        { data: 'Davies' },
        { data: 21 },
        { data: false },
        { data: true }
      ]
    ]
  )
})

test("Matrix#addRow", ()=>{
  matrixOne.addRow(["John", "Doe", 34, false, false],0)
  expect(matrixOne.rows).toStrictEqual([
    [
      { data: "John" },
      { data: "Doe" },
      { data: 34 },
      { data: false },
      { data: false }
    ],
    [
      { data: "Lisa" },
      { data: "Simpson" },
      { data: 10 },
      { data: true },
      { data: false }
    ],
    [
      { data: "Sherlock" },
      { data: "Holmes" },
      { data: 42 },
      { data: false },
      { data: true }
    ],
    [
      { data: "Kilian" },
      { data: "Davies" },
      { data: 21 },
      { data: false },
      { data: true }
    ]
  ])
})