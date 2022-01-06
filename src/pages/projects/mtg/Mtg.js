import React from 'react'
import MtgForm from './components/MtgForm'
import { ImageList, ImageListItem, inputUnstyledClasses } from '@mui/material'


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
    function getScryfallCards (nextPage) {
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

      if (input.name !== '') {
        lookup.push(`${input.name}`)
      }

      if (input.text !== '') {
        lookup.push(encodeURIComponent(`oracle=${input.text}`))
      }

      if (input.type !== '') {
        lookup.push(encodeURIComponent(`t=${input.type}`))
      }

      if (colorString !== '') {
        if (input.andor === 'and') {
          lookup.push(encodeURIComponent(`c=${colorString}`))
        } else {
          lookup.push(encodeURIComponent(`c<=${colorString}`))
        }
      }

      if(input.cmc !== '') {
        lookup.push(encodeURIComponent(`cmc=${input.cmc}`))
      }

      if(input.power !== '') {
        lookup.push(encodeURIComponent(`pow=${input.power}`))
      }

      if(input.toughness !== '') {
        lookup.push(encodeURIComponent(`tou=${input.toughness}`))
      }

      if(input.format !== '') {
        if(input.legal === 'legal') {
          lookup.push(encodeURIComponent(`f=${input.format}`))
        } else if (input.legal === 'restricted') {
          lookup.push(encodeURIComponent(`restricted=${input.format}`))
        } else {
          lookup.push(encodeURIComponent(`banned=${input.format}`))
        }
      }

      if(input.set !== '') {
        lookup.push(encodeURIComponent(`e=${input.set}`))
      }

      let rarities=[]
      
      if (input.commonCheck) {
        rarities.push('rarity%3Dc')
      }
      if (input.uncommonCheck) {
        rarities.push('rarity%3Du')
      }
      if (input.rareCheck) {
        rarities.push('rarity%3Dr')
      }
      if (input.mythicRareCheck) {
        rarities.push('rarity%3Dm')
      }

      let rarityString = ''

      rarityString = rarities.join('+OR+')

      if(rarityString !== '') {
        lookup.push(`%28${rarityString}%29`)
      }

      if (input.price !== '') {
        let priceString = ''

        console.log(`input.price: ${input.price}`)

        console.log(`priceString1: ${priceString}`)

        if (input.currency === 'usd') {
          priceString = priceString.concat('usd')
        } else if (input.currency === 'euro') {
          priceString = priceString.concat('euro')
        } else {
          priceString = priceString.concat('tix')
        }

        console.log(`priceString2: ${priceString}`)

        if (input.currencyCompare === 'lessThan') {
          priceString = priceString.concat(`<${input.price}`)
        } else if (input.currencyCompare === 'greaterThan') {
          priceString = priceString.concat(`>${input.price}`)
        } else if (input.currencyCompare === 'lessThanOrEqual') {
          priceString = priceString.concat(`<=${input.price}`)
        } else {
          priceString = priceString.concat(`>=${input.price}`)
        }

        console.log(`priceString3: ${priceString}`)

        lookup.push(encodeURIComponent(`${priceString}`))
      }

      let lookupString = lookup.join('+')

      if (lookupString !== '') {
        try {
          if (nextPage) {
            fetch(nextPage)
              .then(response => response.json())
              .then(data => {
                setCards( cards => {
                  return [...cards, ...data.data]
                })
                if (data.has_more) {
                  setTimeout(function(){getScryfallCards(data.next_page)}, 100)
                } else {
                  setIsFetching(false)
                }
              })
          } else {
            setIsFetching(true)
            fetch(`https://api.scryfall.com/cards/search?q=${lookupString}`)
              .then(response => response.json())
              .then(data => {
                setCards(data.data)
                if (data.has_more) {
                  setTimeout(function(){getScryfallCards(data.next_page)}, 100)
                } else {
                  setIsFetching(false)
                }
              })
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
    getScryfallCards()
  }

  if (cards && cards.length > 0) {
    return(
      <div>
        <MtgForm 
          handleSubmit={(e, input) => {
            e.preventDefault()
            handleSubmit(input)
          }}
          isFetching={isFetching}
        />
        <div>
          <ImageList cols={8}>
          {cards.map(card => (
            card?.image_uris?.normal ?
                <ImageListItem>
                  <img
                    src={card?.image_uris?.normal}
                    loading="lazy"
                  />
                </ImageListItem> :

                card?.card_faces[0]?.image_uris.normal ?
                  <ImageListItem>
                  <img
                    src={card?.card_faces[0]?.image_uris.normal}
                    loading="lazy"
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
        <MtgForm
          handleSubmit={(e, input) => {
            e.preventDefault()
            handleSubmit(input)
          }}
          isFetching={isFetching}
        />
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
