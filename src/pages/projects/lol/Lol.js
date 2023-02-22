import React, { useEffect, useState } from 'react'
import { LolChampGrid } from './components/LolChampGrid';
import { useNavigate } from 'react-router-dom';

export const Lol = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    championData: {}
  })

  useEffect(() => {
    const fetchChampData = async () => {
      try {
        const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
        if (versionResponse.ok) {
          const versionResponseJson = await versionResponse.json()
          const curVersion = versionResponseJson[0]
          const champResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${curVersion}/data/en_US/champion.json`)
          if(champResponse.ok) {
            const champResponseJson = await champResponse.json()
            setState(state => ({ ...state, championData: champResponseJson?.data }))
          }
        }
      } catch (error) {

      }
    }

    const champData = fetchChampData()
    setState(state => ({ ...state, championData: champData }))
  }, [])

  const champClickHandler = (champId) => {
    console.log(`champion: ${champId}`)
    navigate(`/projects/lol/champions/${champId}`)
  }

  return (
    <LolChampGrid
      championData={ state?.championData }
      champClickHandler={champClickHandler}
    />
  )
}