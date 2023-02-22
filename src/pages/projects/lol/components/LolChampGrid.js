import React from 'react'
import { ImageListItem, ImageList } from '@mui/material';

export const LolChampGrid = (props) => {
  const championData = props?.championData
  const version = props?.version
  const champClickHandler = props?.champClickHandler
  

  return (
    <div>
      <ImageList cols={ 10 }>
          {
            Object.entries(championData).map((obj) => {
              const data = obj[1]
              if (data?.image?.full) {
                return (
                  <ImageListItem onClick={ () => champClickHandler(data?.id) }>
                    <img
                      src={ `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${data?.image?.full}` }
                      loading='lazy'
                    />
                  </ImageListItem>
                )
              }
            })
          }
      </ImageList>
    </div>
  )

}