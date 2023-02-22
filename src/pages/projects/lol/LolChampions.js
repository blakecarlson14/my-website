import { Divider, Grid, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LolChampions = () => {

  const navigate = useNavigate();
  const champId = window.location.hash.split('/').pop()

  const [state, setState] = useState({
    championData: {}
  })

  useEffect(() => {
    const getChampionData = async () => {
      try {
        const champDataResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion/${champId}.json`)
        if (champDataResponse.ok) {
          const champDataResponseJson = await champDataResponse.json()
          const champKey = Object.keys(champDataResponseJson?.data)[0]
          const champData = champDataResponseJson?.data[champKey]
          setState(state => ({ ...state, championData: champData }))
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
                src={ `http://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${state?.championData?.image?.full}` }
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
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/spell/${spell?.image?.full}`}
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