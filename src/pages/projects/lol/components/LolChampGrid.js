import React from 'react'
import { ImageListItem, ImageList } from '@mui/material';

export const LolChampGrid = (props) => {
  const championData = props?.championData
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
                      src={ `http://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${data?.image?.full}` }
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