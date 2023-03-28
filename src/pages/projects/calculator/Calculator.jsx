import React, { useState, useEffect } from 'react'

export const Calculator = () => {

  const [screen, setScreen] = useState('0')
  const [numBuf, setNumBuf] = useState(null)
  // const [mathBuf, setMathBuf] = useState([])
  const [pendingMath, setPendingMath] = useState(false)
  const [mathOp, setMathOp] = useState(null)
  const [initial, setInitial] = useState(true)

  useEffect(() => {
    console.log(`numBuf: ${numBuf}`)
  }, [numBuf])

  // useEffect(() => {
  //   console.log(`mathBuf: ${mathBuf}`)
  // }, [mathBuf])

  const doMath = (operator) => {
    // let val = screen
    // console.log(`val: ${val}`)

    switch (operator) {
      case '/':
        // val = numBuf / screen
        // setScreen(val)
        // setMathBuf(mathBuf => [...mathBuf, operator])
        setMathOp(operator)
        break
      case 'x':
        // val = numBuf * screen
        // setScreen(val)
        // setMathBuf(mathBuf => [...mathBuf, operator])
        setMathOp(operator)
        break
      case '-':
        // val = numBuf - screen
        // setScreen(val)
        // setMathBuf(mathBuf => [...mathBuf, operator])
        setMathOp(operator)
        break
      case '+':
        // val = numBuf + screen
        // setScreen(val)
        // setMathBuf(mathBuf => [...mathBuf, operator])
        setMathOp(operator)
        break
      default:
        break
    }

    setNumBuf(screen)
    setPendingMath(true)
  }

  const doEquals = () => {
    let screenNum = null

    if (mathOp !== null) {
      switch (mathOp) {
        case '/':
          screenNum = Number(numBuf) / Number(screen)
          break
        case 'x':
          screenNum = Number(numBuf) * Number(screen)
          break
        case '-':
          screenNum = Number(numBuf) - Number(screen)
          break
        case '+':
          screenNum = Number(numBuf) + Number(screen)
          break
        default:
          break
      }
    }

    if (screenNum !== null) {
      setScreen(screenNum)
      setPendingMath(false)
      setMathOp(null)
      setInitial(true)
    }

  }

  const handleClick = (val) => {
    if (isNaN(val)) {
      switch (val) {
        case 'AC':
          setScreen('0')
          setNumBuf(null)
          setPendingMath(false)
          setMathOp(null)
          setInitial(true)
          break
        case '=':
          doEquals()
          break
        case '+':
        case '-':
        case 'x':
        case '/':
          doMath(val)
          break
        case '.':
          // check if screen already contains a decimal
          if (!screen.includes('.')) {
            setScreen(screen => (screen.concat('.')))
          }
          break
        default:
          break
      }
    } else {
      if(initial) {
        setInitial(false)
        setScreen(val)
      } else if(pendingMath) {
        setPendingMath(false)
        setScreen(val)
      } else {
        if (screen.length < 8 && screen != '0') {
          setScreen(screen => (screen.concat(val)))
        }
      }
    }
  }

  return (
    <div class='calculator'>
      <div>
        <header class='calcScreen'>
          {screen}
        </header>
      </div>
      <div>
        <button class='calcButton light' value='AC' onClick={(e) => handleClick(e.target.value)}>
          {"AC"}
        </button>
        <button class='calcButton light' value='+/-' onClick={(e) => handleClick(e.target.value)}>
          {'+/-'}
        </button>
        <button class='calcButton light' value='%' onClick={(e) => handleClick(e.target.value)}>
          {'%'}
        </button>
        <button class='calcButton orange' value='/' onClick={(e) => handleClick(e.target.value)}>
          {'/'}
        </button>
      </div>
      <div>
        <button class='calcButton dark' value='7' onClick={(e) => handleClick(e.target.value)}>
          {'7'}
        </button>
        <button class='calcButton dark' value='8' onClick={(e) => handleClick(e.target.value)}>
          {'8'}
        </button>
        <button class='calcButton dark' value='9' onClick={(e) => handleClick(e.target.value)}>
          {'9'}
        </button>
        <button class='calcButton orange' value='x' onClick={(e) => handleClick(e.target.value)}>
          {'x'}
        </button>
      </div>
      <div>
        <button class='calcButton dark' value='4' onClick={(e) => handleClick(e.target.value)}>
          {'4'}
        </button>
        <button class='calcButton dark' value='5' onClick={(e) => handleClick(e.target.value)}>
          {'5'}
        </button>
        <button class='calcButton dark' value='6' onClick={(e) => handleClick(e.target.value)}>
          {'6'}
        </button>
        <button class='calcButton orange' value='-' onClick={(e) => handleClick(e.target.value)}>
          {'-'}
        </button>
      </div>
      <div>
        <button class='calcButton dark' value='1' onClick={(e) => handleClick(e.target.value)}>
          {'1'}
        </button>
        <button class='calcButton dark' value='2' onClick={(e) => handleClick(e.target.value)}>
          {'2'}
        </button>
        <button class='calcButton dark' value='3' onClick={(e) => handleClick(e.target.value)}>
          {'3'}
        </button>
        <button class='calcButton orange' value='+' onClick={(e) => handleClick(e.target.value)}>
          {'+'}
        </button>
      </div>
      <div>
        <button class='calcButton dark double zero' value='0' onClick={(e) => handleClick(e.target.value)}>
          {'0'}
        </button>
        <button class='calcButton dark' value='.' onClick={(e) => handleClick(e.target.value)}>
          {'.'}
        </button>
        <button class='calcButton orange' value='=' onClick={(e) => handleClick(e.target.value)}>
          {'='}
        </button>
      </div>
    </div>
  )
}