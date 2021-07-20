function checkValue(value, context, type) {
  if (type === "row") {
    //case of rows insertion

    if (context.Type === "Object" || context.Type === "Array") {
      //row insertion to 1D object/array

      if (isArr(value)) {
        //multiple values insertion

        return isArr(value[0])
          ? err("You can't insert a 2D array in a 1D array/object.")
          : value
      } else {
        //single value insertion

        return value
      }
    } else {
      //row insertion to 2D object/array

      !isArr(value) &&
        err("You can't insert a single value in a 2D array/object")

      if (isArr(value[0])) {
        //multiple rows insertion

        let count = 0
        for (i in value) {
          value[i].length !== context.Columns.Values.length && count++
        }

        return count === 0
          ? value
          : err(
              "At least one of the rows you're trying to add doesn't have the same length as the target array's rows."
            )
      } else {
        //single row insertion

        return value.length === context.Columns.Values.length
          ? value
          : err(
              "The row you're trying to add doesn't have the same length as the target array's rows."
            )
      }
    }
  } else {
    //case of columns insertion

    if (isArr(value)) {
      if (isArr(value[0])) {
        //multiple columns insertion

        let count = 0
        for (i in value) {
          value[i].length !== context.Rows.Values.length && count++
        }

        return count === 0
          ? value
          : err(
              "At least one of the columns you're trying to add doesn't have the same length as the target array's columns."
            )
      } else {
        //single column insertion

        return value.length === context.Rows.Values.length
          ? value
          : err(
              "The column you're trying to add doesn't have the same length as the target array's columns"
            )
      }
    } else {
      //single value insertion (only for 1D objects/arrays)

      return context.Type === "Object" || context.Type === "Array"
        ? value
        : err("You can't insert a single value in a 2D array/object")
    }
  }
}

function checkKey(key, value, context, type) {
  if (context.Type.startsWith("Object")) {
    //Objects

    if (context.Type === "Object") {
      //1D objects

      if (type === "row") {
        //Case of values insertion

        if (isArr(value)) {
          //multiple values insertion

          !key &&
            err("You need to provide keys to name the values you are adding.")
          !isArr(key) &&
            err(
              "You didn't provide enough keys to name all the values you are adding."
            )
          return key.length === value.length
            ? key
            : err(
                "You provided either not enough or too many keys in comparison to the values you are adding."
              )
        } else {
          //single value insertion

          !key &&
            err("You need to provide a key to name the value you are adding.")
          isArr(key) &&
            err(
              "You are providing too many keys to name the value you are adding."
            )
          return key
        }
      } else {
        //Case of columns insertion

        if (isArr(value)) {
          if (isArr(value[0])) {
            !key &&
              err(
                "You need to provide keys to name the columns you are adding."
              )
            !isArr(key) &&
              err(
                "You didn't provide enough keys to name all the columns you are adding."
              )
            return key.length === value.length
              ? key
              : err(
                  "You provided either not enough or too many keys in comparison to the values you are adding."
                )
          } else {
            !key &&
              err(
                "You need to provide a key to name the column you are adding."
              )
            isArr(key) &&
              err(
                "You provided too many keys to name the column you are adding."
              )
            return key
          }
        } else {
          !key &&
            err("You need to provide a key to name the value you are adding.")
          isArr(key) &&
            err("You provided too many keys to name the value you are adding.")
          return key
        }
      }
    } else {
      //2D objects

      if (type === "row") {
        //Case of rows insertion

        if (isArr(value[0])) {
          //multiple rows insertion
          !key &&
            err("You need to provide keys to name the rows you are adding.")
          !isArr(key) &&
            err(
              "You didn't provide enough keys to name all the columns you are adding."
            )
          return key.length === value.length
            ? key
            : err(
                "You provided either not enough or too many keys in comparison to the rows you are adding."
              )
        } else {
          //single row insertion

          !key &&
            err("You need to provide a key to name the row you are adding.")
          isArr(key) &&
            err("You provided too many keys to name the row you are adding.")
          return key
        }
      } else {
        //case of columns insertion

        if (context.Type.includes("Arrays")) {
          if (isArr(value[0])) {
            //multiple columns insertion

            key = []
            for (i = 0; i < context.Columns.Keys.length + value.length; i++) {
              key.push(i.toString())
            }
            return key
          } else {
            //single colummn insertion

            key = []
            for (i = 0; i < context.Rows.Keys.length + 1; i++) {
              key.push(i.toString())
            }
            return key
          }
        } else {
          if (isArr(value[0])) {
            //multiple columns insertion

            !key &&
              err(
                "You need to provide keys to name the columns you are adding."
              )
            !isArr(key) &&
              err(
                "You didn't provide enough keys to name all the columns you are adding."
              )
            return key.length === value.length
              ? key
              : err(
                  "You provided either not enough or too many keys in comparison to the values you are adding."
                )
          } else {
            //single colummn insertion

            !key &&
              err(
                "You need to provide a key to name the column you are adding."
              )
            isArr(key) &&
              err(
                "You provided too many keys to name the column you are adding."
              )
            return key
          }
        }
      }
    }
  } else {
    if (context.Type === "Array") {
      //1D Arrays

      if (type === "row") {
        //values insertion

        if (isArr(value)) {
          //multiple values insertion

          key = []
          for (i = 0; i < context.Rows.Keys.length + value.length; i++) {
            key.push(i.toString())
          }
          return key
        } else {
          //single value insertion

          key = []
          for (i = 0; i < context.Rows.Keys.length + 1; i++) {
            key.push(i.toString())
          }
          return key
        }
      } else {
        //columns insertion

        if (isArr(value[0])) {
          //multiple columns insertion

          key = []
          for (i = 0; i < context.Columns.Keys.length + value.length; i++) {
            key.push(i.toString())
          }
          return key
        } else {
          //single column insertion

          key = []
          for (i = 0; i < context.Rows.Keys.length + 1; i++) {
            key.push(i.toString())
          }
          return key
        }
      }
    } else {
      //2D Arrays

      if (type === "row") {
        //rows insertion

        if (isArr(value[0])) {
          //multiple rows insertion

          key = []
          for (i = 0; i < context.Rows.Keys.length + value.length; i++) {
            key.push(i.toString())
          }
          return key
        } else {
          //single value insertion

          key = []
          for (i = 0; i < context.Rows.Keys.length + 1; i++) {
            key.push(i.toString())
          }
          return key
        }
      } else {
        //columns insertion

        if (context.Type.includes("Objects")) {
          //Array of objects

          if (isArr(value[0])) {
            //multiple columns insertion

            !key &&
              err(
                "You need to provide keys to name the columns you are adding."
              )
            !isArr(key) &&
              err(
                "You didn't enough keys to name all the columns you are adding."
              )
            return key.length === value.length
              ? key
              : err(
                  "You provided either not enough or too many keys in comparison to the values you are adding."
                )
          } else {
            //single column insertion

            !key &&
              err(
                "You need to provide a key to name the column you are adding."
              )
            isArr(key) &&
              err(
                "You provided too many keys to name the column you are adding."
              )
            return key
          }
        } else {
          //2D Arrays

          if (isArr(value[0])) {
            key = []
            for (
              i = context.Columns.Keys.length;
              i < context.Columns.Keys.length + value.length;
              i++
            ) {
              key.push(i.toString())
            }
            return key
          } else {
            return context.Columns.Keys.length.toString()
          }
        }
      }
    }
  }
}
