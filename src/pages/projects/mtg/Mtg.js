import React from 'react'
import MtgForm from './components/MtgForm'
import { ImageList, ImageListItem } from '@mui/material'


const Mtg = () => {
  const [inputs, setInputs] = React.useState([])
  const [cards, setCards] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (input) => {
    async function getScryfallCards (nextPage) {
      let colors=[]
      if (input.whiteCheck) {
        colors.push('w')
      }
      if (input.blackCheck) {
        colors.push('b')
      }
      if (input.greenCheck) {
        colors.push('g')
      }
      if (input.redCheck) {
        colors.push('r')
      }
      if (input.blueCheck) {
        colors.push('u')
      }

      let colorString = ''

      colorString = colors.join('')

      let lookup = []

      if (colorString !== '') {
        if (input.andor === 'and') {
          lookup.push(`c%3D${colorString}`)
        } else {
          lookup.push(`c%3C%3D${colorString}`)
        }
      }

      if(input.cmc) {
        lookup.push(`cmc%3D${input.cmc}`)
      }

      let lookupString = lookup.join('+')

      if (lookupString !== '') {
        try {
          if (nextPage) {
            const res = await fetch(nextPage)
            const data = await res.json()
            setCards( cards => {
              return [...cards, ...data.data]
            })
            if (data.has_more) {
              setTimeout(function(){getScryfallCards(data.next_page)}, 100)
            }
          } else {
            const res = await fetch(`https://api.scryfall.com/cards/search?q=${lookupString}`)
            const data = await res.json()
            setCards(data.data)
            if (data.has_more) {
              setTimeout(function(){getScryfallCards(data.next_page)}, 100)
            }
          }
        }
        catch (error) {
          console.log(`error: ${error}`)
        }
      }
      else {
        console.log('error')
      }
    }

    async function getCards () {
      let colors=[]
      if (input.whiteCheck) {
        colors.push('white')
      }
      if (input.blackCheck) {
        colors.push('black')
      }
      if (input.greenCheck) {
        colors.push('green')
      }
      if (input.redCheck) {
        colors.push('red')
      }
      if (input.blueCheck) {
        colors.push('blue')
      }

      let colorString = ''

      if (input.andor === 'and') {
        colorString = colors.join(',')
      } else {
        colorString = colors.join('|')
      }

      let lookup = []

      if (colorString !== '') {
        lookup.push(`colors=${colorString}`)
      }

      if(input.cmc) {
        lookup.push(`cmc=${input.cmc}`)
      }

      let lookupString = lookup.join('+')

      console.log(`lookupString: ${lookupString}`)

      if (lookupString !== '') {
        try {
          const res = await fetch(`https://api.magicthegathering.io/v1/cards?${lookupString}`)
          // const res = await fetch(`https://api.scryfall.com/cards/search?${lookupString}`)
          const data = await res.json()

          setCards(data.cards)
        }
        catch (error) {
          console.log(`error: ${error}`)
        }
      }
      else {
        console.log('error')
      }
    }
    setIsFetching(true)
    getScryfallCards()
    setIsFetching(false)
  }

  if (cards && cards.length > 0) {
    return(
      <div>
        <MtgForm handleSubmit={(e, input) => {
          e.preventDefault()
          handleSubmit(input)
        }}/>
        <div>
          <ImageList cols={8}>
          {console.log(`cards3: ${cards.length}`)}
          {cards.map(card => (
            card?.image_uris?.normal ?
                <ImageListItem>
                  <img
                    src={card?.image_uris?.normal}
                  />
                </ImageListItem> :
                null
            ))}
          </ImageList>
        </div> 
      </div>
    )
  }
  else {
    return(
      <div>
        <MtgForm handleSubmit={(e, input) => {
          e.preventDefault()
          handleSubmit(input)
        }}/>
        </div>)
  }
}
export default Mtg

{/* <ImageList cols={8}>
            {cards.map(card => (
              card['image_uris']['normal'] ?
                <ImageListItem>
                  <img
                    src={card['image_uris']['normal']}
                  />
                </ImageListItem> :
                null
            ))}
            </ImageList> */}
