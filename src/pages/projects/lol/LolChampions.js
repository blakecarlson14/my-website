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
          cache:"no-store"
        })
        if (versionResponse.ok) {
          const versionResponseJson = await versionResponse.json()
          const curVersion = versionResponseJson[0]
        const champDataResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${curVersion}/data/en_US/champion/${champId}.json`)
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
      <Grid container>
      {
        state?.championData?.name ?
        state?.championData?.name
        :
        <>
        </>
      }   
      </Grid>   
      <Grid container>
          {
            state?.championData?.image?.full ?

              <img
                src={ `http://ddragon.leagueoflegends.com/cdn/${state?.version}/img/champion/${state?.championData?.image?.full}` }
              />
              :
              <>
              </>
          }
          </Grid>
      <Grid container spacing={1}>
        {
          state?.championData?.spells ?
          state?.championData?.spells.map((spell) => {
            return(
              <Grid item>
              <Tooltip describeChild title={spell?.description}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/${state?.version}/img/spell/${spell?.image?.full}`}
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