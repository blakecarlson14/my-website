import React, { useState } from 'react'

export const Calculator = () => {

  const [screen, setScreen] = useState('0')

  const doMath = (operator) => {
    switch (operator) {

    }
  }

  const handleClick = (val) => {
    if (isNaN(val)) {
      switch (val) {
        case 'AC':
          setScreen('0')
          break
        case '=':
          break
        case '+' || '-' || 'x' || '/':
          doMath(val)
          break
        case '.':
          break
      }
    } else {
      if (screen === '0') {
        setScreen(val)
      } else {
        if (screen.length < 8) {
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