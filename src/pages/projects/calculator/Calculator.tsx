import React, { useState, useEffect } from 'react'

export const Calculator = () => {
  const operators = ['+', '-', 'x', '/'];

  const [screen, setScreen] = useState<string>('0')
  const [numBuf, setNumBuf] = useState<string | null>(null)
  // const [mathBuf, setMathBuf] = useState([])
  const [pendingMath, setPendingMath] = useState(false)
  const [mathOp, setMathOp] = useState<string | null>(null)
  const [initial, setInitial] = useState(true)

  useEffect(() => {
    console.log(`numBuf: ${numBuf}`)
  }, [numBuf])

  // useEffect(() => {
  //   console.log(`mathBuf: ${mathBuf}`)
  // }, [mathBuf])

  const doMath = (operator: string) => {
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
    let screenNum: number | null = null;

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
      setScreen(screenNum.toString())
      setPendingMath(false)
      setMathOp(null)
      setInitial(true)
    }

  }

  const handleClick = (val: string) => {
    if (operators.includes(val)) {
      doMath(val);
    }
    else if (!isNaN(Number(val))) {
      if (screen === '0' && val.toString() === '0') {

      } else {
        if (initial) {
          setInitial(false)
          setScreen(val.toString())
        } else if (pendingMath) {
          setPendingMath(false)
          setScreen(val.toString())
        } else {
          if (screen.length < 8 && screen != '0') {
            setScreen(screen => (screen.concat(val.toString())))
          }
        }
      }
    } else {
      switch (val) {
        case 'AC':
          setScreen('0');
          setNumBuf(null);
          setPendingMath(false);
          setMathOp(null);
          setInitial(true);
          break;
        case '=':
          doEquals();
          break;
        case '.':
          if (!screen.includes('.')) {
            setScreen((screen) => screen.concat('.'));
          }
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className='calculator'>
      <div>
        <header className='calcScreen'>
          {screen}
        </header>
      </div>
      <div>
        <button className='calcButton light' value='AC' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {"AC"}
        </button>
        <button className='calcButton light' value='+/-' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'+/-'}
        </button>
        <button className='calcButton light' value='%' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'%'}
        </button>
        <button className='calcButton orange' value='/' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'/'}
        </button>
      </div>
      <div>
        <button className='calcButton dark' value='7' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'7'}
        </button>
        <button className='calcButton dark' value='8' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'8'}
        </button>
        <button className='calcButton dark' value='9' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'9'}
        </button>
        <button className='calcButton orange' value='x' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'x'}
        </button>
      </div>
      <div>
        <button className='calcButton dark' value='4' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'4'}
        </button>
        <button className='calcButton dark' value='5' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'5'}
        </button>
        <button className='calcButton dark' value='6' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'6'}
        </button>
        <button className='calcButton orange' value='-' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'-'}
        </button>
      </div>
      <div>
        <button className='calcButton dark' value='1' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'1'}
        </button>
        <button className='calcButton dark' value='2' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'2'}
        </button>
        <button className='calcButton dark' value='3' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'3'}
        </button>
        <button className='calcButton orange' value='+' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'+'}
        </button>
      </div>
      <div>
        <button className='calcButton dark double zero' value='0' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'0'}
        </button>
        <button className='calcButton dark' value='.' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'.'}
        </button>
        <button className='calcButton orange' value='=' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e.currentTarget.value)}>
          {'='}
        </button>
      </div>
    </div>
  )
}