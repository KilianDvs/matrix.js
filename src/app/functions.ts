var toArrProt = function (mx) {
    let colKeys = mx.cols.keys,
      rowKeys = mx.rows.keys,
      valArr = []
    for (i in mx.rows.vals) {
      valArr.push(mx.rows.vals[i])
    }

    return [colKeys, rowKeys, valArr]
  },
  toObjProt = function (mx) {
    //returns an object with the columns and rows' keys assigned to their respective values

    let finalObj = {},
      count = 0
    for (i in mx.rows.keys) {
      if (typeof mx.rows.keys[i] === "undefined") {
        count++
        mx.rows.keys[i] = mx.rows.keys[i] + count.toString()
      } else {
        mx.rows.keys[i] = mx.rows.keys[i]
      }
      finalObj[mx.rows.keys[i]] = {}
      for (j in mx.rows.vals[i]) {
        finalObj[mx.rows.keys[i]][mx.cols.keys[j]] = mx.rows.vals[i][j]
      }
    }

    return finalObj
  },
  insertRowsProt = function (value, index, key, mx) {
    if (!value) {
      err("You need to provide a value to insert.")
    } else {
      value = checkValue(value, mx, "row")
    }
    index = typeof index === "undefined" ? mx.rows.keys.length : index
    if (typeof index === "string") {
      mx.rows.keys.includes(index)
        ? (index = mx.rows.keys.indexOf(index) + 1)
        : err(`Couldn't find "${index}" in the array's keys.`)
    } else if (typeof (index === "number")) {
      if (index < 0 || index > mx.rows.keys.length) {
        err("Couldn't find this index in the array.")
      }
    }

    key = checkKey(key, value, mx, "row")

    if (mx.type === "Object" || mx.type === "Array") {
      //1D objects or arrays

      if (isArr(value)) {
        //multiple values insertion

        for (i in value) {
          mx.cols.vals.splice(index + Number(i), 0, value[i])
          mx.rows.vals.splice(index + Number(i), 0, [value[i]])
          mx.type === "Object"
            ? mx.rows.keys.splice(index + Number(i), 0, key[i])
            : (mx.rows.keys = key)
        }
        mx.rows.count = mx.rows.keys.length
      } else {
        //single value insertion

        mx.cols.vals.splice(index, 0, value)
        mx.rows.vals.splice(index, 0, [value])
        mx.type === "Object"
          ? mx.rows.keys.splice(index, 0, value)
          : mx.rows.keys.push(mx.rows.keys.length.toString())
        mx.rows.count = mx.rows.keys.length
      }
    } else {
      //2D objects or arrays

      if (isArr(value[0])) {
        //multiple rows insertion

        for (i in value) {
          for (j in mx.cols.vals) {
            mx.cols.vals[j].splice(index + Number(i), 0, value[i][j])
          }
          mx.rows.vals.splice(index + Number(i), 0, value[i])
          mx.type.startsWith("Array")
            ? (mx.rows.keys = key)
            : mx.rows.keys.splice(index + Number(i), 0, key[i])
        }
        mx.rows.count = mx.rows.keys.length
      } else {
        //single row insertion

        for (i in value) {
          mx.cols.vals[i].splice(index, 0, value[i])
        }
        mx.type.startsWith("Array")
          ? (mx.rows.keys = key)
          : mx.rows.keys.splice(index, 0, key)
        mx.rows.count = mx.rows.keys.length
        mx.rows.vals.splice(index, 0, value)
      }
    }

    return mx
  }

insertColumnsProt = function (value, index, key, mx) {
  if (!value) {
    err("You need to provide a value to insert.")
  } else {
    value = checkValue(value, mx, "col")
  }
  index = typeof index === "undefined" ? mx.cols.keys.length : index
  if (typeof index === "string") {
    mx.cols.keys.includes(index)
      ? (index = mx.cols.keys.indexOf(index) + 1)
      : err(`Couldn't find "${index}" in the array's keys.`)
  } else if (typeof (index === "number")) {
    if (index < 0 || index > mx.cols.keys.length) {
      err("Couldn't find this index in the array.")
    }
  }

  key = checkKey(key, value, mx, "col")
  cl(value)
  cl(index)
  cl(key)

  if (mx.type === "Object" || mx.type === "Array") {
    //1D objects or arrays

    index = index === 0 ? index : 1

    if (isArr(value[0])) {
      //multiple columns insertion
    } else {
      //single column insertion

      for (i in mx.rows.vals) {
        mx.rows.vals[i].splice(index, 0, value[i])
      }
    }
  } else {
    //2D objects or arrays

    if (isArr(value[0])) {
      //multiple columns insertion
    } else {
      //single column insertion
    }
  }

  return mx
}
