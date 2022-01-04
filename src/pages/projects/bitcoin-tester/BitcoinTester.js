import React, { useState } from 'react'
import { DropdownMenu, Dropdown, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { LineChart, ResponsiveContainer, XAxis, Label, Line, Tooltip, YAxis } from 'recharts';
import moment from 'moment';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';

export default function BitcoinTester() {
  const [topCoins, setTopCoins] = React.useState([])
  const [coinPrices, setCoinPrices] = React.useState([])
  const [coin, setCoin] = React.useState([])
  const [inputs, setInputs] = useState([])

  React.useEffect(() => {
    async function getTopCoins () {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
      const data = await res.json()

      setTopCoins(data)
    }

    getTopCoins()
  }, [])

  React.useEffect(() => {
    async function getPrices () {
      const time = Math.floor(Date.now() / 1000)

      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range/?vs_currency=usd&from=946733027&to=${time}`)
      const data = await res.json()

      setCoinPrices(data.prices)
    }

    getPrices()
  }, [coin])

  function handleSubmit(inputs) {
    inputs.preventDefault();
    console.log(inputs.coin)
  }

  let dropdownOptions = []
    
    topCoins.map(entry => {
      let obj = {text: entry.symbol.toUpperCase(), value: entry.symbol}
      dropdownOptions.push(obj)
    })

  if (coinPrices !== undefined && coin.symbol !== undefined) {
    let result = [];
    let NUM_YEARS = 1;
    for(let i = 0; i < coinPrices.length; i++) {
      let day = new Date(coinPrices[i][0])
      let futureDate = new Date(day.getFullYear() + NUM_YEARS, day.getMonth(), day.getDate())
      let diffDays = moment(futureDate).diff(day, "days")
      let futureDays = i + diffDays
      let currentPrice = coinPrices[i][1]

      if( futureDays < coinPrices.length) {
        let futurePrice = coinPrices[futureDays][1]
        let change = ((futurePrice / currentPrice) - 1) * 100


        let obj = { date: coinPrices[i][0], change: change}
        result.push(obj)
      }
      // if (futureDate.getMonth() === 1 && futureDate.getDate() === 29) {
      //   console.log(`day = ${day}, futureDate=${futureDate}`)
      // }
    }

    let yScale = 'linear'

    return (
      <div>
        <Form widths='equal' size='small' onSubmit={handleSubmit}>
            <Form.Select
              label='Coin to HODL?'
              id='coin'
              options={dropdownOptions}
              placeholder=''
            />
            <Form.Input fluid label='How many years to HODL?' placeholder='1' id='time'/>
          <Form.Button>Submit</Form.Button>
        </Form>
        <ResponsiveContainer height={ 600 }>
            <LineChart
              data={ result }
              margin={ { top: 50, right: 80, left: 80, bottom: 50 } }
            >
            <XAxis
                dataKey="date"
                type="number"
                tickFormatter={ timeStr => moment(timeStr).format('MM/DD/YYYY') }
                domain={ ['auto', 'auto'] }
                scale={ 'time' }
              ></XAxis>
            <YAxis
                scale={ yScale === 'linear' ? 'linear' : 'log' }
                domain={ ['auto', 'auto'] }
              >
                <Label value="Percentage Change" position="left" angle={ -90 } />
              </YAxis>
            <Line dataKey="change" dot={false}/>
            <Tooltip
                formatter={ (value) => `${value.toFixed(2)}%` }
                labelFormatter={ timeStr => moment(timeStr).format('MM/DD/YYYY') }
                cursor={ true }
              />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
  else {
    return (
      <div>
        <Form widths='equal' size='small' onSubmit={handleSubmit}>
            <Form.Select
              label='Coin to HODL?'
              options={dropdownOptions}
              placeholder=''
            />
            <Form.Input fluid label='How many years to HODL?' placeholder='1' />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}