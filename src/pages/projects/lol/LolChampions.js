import { Divider, Grid, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LolChampions = () => {

  const navigate = useNavigate();
  const champId = window.location.hash.split('/').pop()

  const [state, setState] = useState({
    championData: {},
    version: ''
  })

  useEffect(() => {
    const getChampionData = async () => {
      try {
        const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
          cache: "no-store"
        })
        if (versionResponse.ok) {
          const versionResponseJson = await versionResponse.json()
          const curVersion = versionResponseJson[0]
          const champDataResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${curVersion}/data/en_US/champion/${champId}.json`)
          if (champDataResponse.ok) {
            const champDataResponseJson = await champDataResponse.json()
            const champKey = Object.keys(champDataResponseJson?.data)[0]
            const champData = champDataResponseJson?.data[champKey]
            setState(state => ({ ...state, version: curVersion, championData: champData }))
          }
        }
      } catch (error) {

      }
    }

    getChampionData()
  }, [])

  return (
    <div>
      <Grid container style={ { padding: "0 0 0 0.5em" } }>
        {
          state?.championData?.name ?
            <h1>
              {
                state?.championData?.name
              }
            </h1>
            :
            <>
            </>
        }
      </Grid>
      <Grid container style={ { padding: "0 0 0 0.5em" } }>
        {
          state?.championData?.image?.full ?

            <img
              src={ `https://ddragon.leagueoflegends.com/cdn/${state?.version}/img/champion/${state?.championData?.image?.full}` }
            />
            :
            <>
            </>
        }
      </Grid>
      <Grid container spacing={ 1 } style={ { padding: "0 0 0 0.5em" } }>
        {
          state?.championData?.spells ?
            state?.championData?.spells.map((spell) => {
              return (
                <Grid item>
                  <Tooltip enterTouchDelay={ 0 } leaveTouchDelay={ 0 } title={ spell?.description }>
                    <img
                      src={ `https://ddragon.leagueoflegends.com/cdn/${state?.version}/img/spell/${spell?.image?.full}` }
                    />
                  </Tooltip>
                </Grid>
              )
            })
            :
            <>
            </>
        }
      </Grid>
    </div>
  )
}