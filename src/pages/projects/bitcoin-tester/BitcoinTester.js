import React from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import moment from 'moment'
import dayjs from 'dayjs'
import { Dropdown, Loader, Segment, Dimmer } from 'semantic-ui-react'
import TopCoinFetcher from './components/TopCoinFetcher';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';
import {curveCatmullRom} from 'd3-shape';

export default function BitcoinTester() {

  // const lookupTable  = [
  //   {symbol: 'btc', id: 'bitcoin'},
  //   {symbol: 'eth', id: 'ethereum'},
  //   {symbol: 'ada', id: 'cardano'},
  //   {symbol: 'dot', id: 'polkadot'},
  //   {symbol: 'ltc', id: 'litecoin'},
  // ]

  const [coinPrices, setCoinPrices] = React.useState([])
  const [yScale, setYScale] = React.useState('linear')
  const [coin, setCoin] = React.useState([])
  const [topCoins, setTopCoins] = React.useState([])

  React.useEffect(() => {
    async function getTopCoins() {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
      const data = await res.json()

      setTopCoins(data)
      setCoin(data[0])
    }

    getTopCoins()
  }, [])

  React.useEffect(() => {
    async function getPrices() {
      const time = Math.floor(Date.now() / 1000)

      // const coinId = lookupTable.filter(item => item.symbol === coin).map(item => item.id)

      console.log(`coin.id = ${coin.id}`)

      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range/?vs_currency=usd&from=946733027&to=${time}`)
      const data = await res.json()
      
      setCoinPrices(data.prices)
    }

    if (coin.symbol !== undefined) {
      getPrices()
    }
  }, [coin])

  if (coinPrices !== undefined && coin.symbol !== undefined) {
    let result = [];
    coinPrices.map(entry => {
      let newDate = dayjs(entry[0]).format("MM/DD/YYYY");
      let obj = {date: newDate, price: entry[1]}
      result.push(obj)
    })

  //  const options = {
  //     responsive: true
  //   };

  
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'dataset 1',
        data: result
      }
    ]
  }

    return (
      <div>
<Dropdown text={coin.symbol.toUpperCase()} pointing className='link item'>
  <Dropdown.Menu>
    {topCoins.slice(0, 20).map(topCoin => (
      <Dropdown.Item onClick={() => setCoin(topCoin)}>{topCoin.symbol.toUpperCase()}</Dropdown.Item>
      ))}
  </Dropdown.Menu>
</Dropdown>
<Dropdown text={yScale === 'linear' ? 'Linear' : 'Log'} pointing className='link item'>
  <Dropdown.Menu>
      <Dropdown.Item onClick={() => setYScale('linear')}>Linear</Dropdown.Item>
      <Dropdown.Item onClick={() => setYScale('log')}>Log</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
<XYPlot width={300} height={300}>
      <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
      <VerticalGridLines style={{stroke: '#B7E9ED'}} />
      <XAxis
        title="X Axis"
        style={{
          line: {stroke: '#ADDDE1'},
          ticks: {stroke: '#ADDDE1'},
          text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
        }}
      />
      <YAxis title="Y Axis" />
      <LineSeries
        className="first-series"
        data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
        style={{
          strokeLinejoin: 'round',
          strokeWidth: 4
        }}
      />
      <LineSeries className="second-series" data={null} />
      <LineSeries
        className="third-series"
        curve={'curveMonotoneX'}
        data={[{x: 1, y: 10}, {x: 2, y: 4}, {x: 3, y: 2}, {x: 4, y: 15}]}
        strokeDasharray="7, 3"
      />
      <LineSeries
        className="fourth-series"
        curve={curveCatmullRom.alpha(0.5)}
        data={[{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]}
      />
    </XYPlot>

</div>
    )
  } else {
    return (
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>
    )
  }
}

{/* <ResponsiveContainer height={600}>
  <LineChart 
    data={result} 
    margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
    >
    <XAxis 
      dataKey="date"
      />
    <YAxis
      scale={yScale === 'linear' ? 'linear' : 'log'}
      domain={['auto', 'auto']}
      />
    <Line  
      dataKey="price"
      stroke="#8884d8"
      dot={false}
      />
    <Tooltip 
      formatter={value => `$${value.toFixed(2)}`}
      />
  </LineChart>
</ResponsiveContainer> */}