import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { LoadingButton } from '@mui/lab'
import React from 'react'

const initialState = {
  name: '',
  text: '',
  type: '',
  whiteCheck: false,
  blackCheck: false,
  blueCheck: false,
  greenCheck: false,
  redCheck: false,
  andor: 'and',
  cmc: '',
  power: '',
  toughness: '',
  format: '',
  legal: 'legal',
  set: '',
  commonCheck: false,
  uncommonCheck: false,
  rareCheck: false,
  mythicRareCheck: false,
  currency: 'usd',
  currencyCompare: 'lessThan',
  price: '',
}

const MtgForm = ({ handleSubmit, isFetching }) => {
  const [inputs, setInputs] = React.useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    console.log(`name: ${name} value: ${value}`)
  }

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: checked,
    });

    console.log(`name: ${name} value: ${checked}`)
  }

  const resetForm = () => {
    setInputs(initialState)
  }

  return (
    <form onSubmit={ (e) => {
      handleSubmit(e, inputs) 
    }}>
      <Grid>
        <Grid item>
          <FormControl>
            <TextField
              name="name"
              value={inputs.name}
              onChange={handleChange}
              label="Name"
              style = {{ margin: 10 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              name="text"
              value={inputs.text}
              onChange={handleChange}
              label="Text"
              style = {{ margin: 10 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              name="type"
              value={inputs.type}
              onChange={handleChange}
              label="Type"
              style = {{ margin: 10 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={ { flexDirection: "row" } }>
            <FormControlLabel control={ <Checkbox name='whiteCheck' checked={inputs.whiteCheck} onChange={handleCheck}/> } label="White" style = {{ marginLeft: 10 }}/>
            <FormControlLabel control={ <Checkbox name='blueCheck' checked={inputs.blueCheck} onChange={handleCheck}/> } label="Blue" />
            <FormControlLabel control={ <Checkbox name='blackCheck' checked={inputs.blackCheck} onChange={handleCheck}/> } label="Black" />
            <FormControlLabel control={ <Checkbox name='redCheck' checked={inputs.redCheck} onChange={handleCheck}/> } label="Red" />
            <FormControlLabel control={ <Checkbox name='greenCheck' checked={inputs.greenCheck} onChange={handleCheck}/> } label="Green" />
            <TextField 
              value={inputs.andor}
              onChange={handleChange}
              select
              label="AND/OR"
              name="andor"
              style = {{ margin: 10 }}
            >
              <MenuItem value={'and'}>AND</MenuItem>
              <MenuItem value={'or'}>OR</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl>
            <TextField
              type="number"
              name="cmc"
              value={inputs.cmc}
              onChange={ handleChange }
              label="CMC"
              style = {{ margin: 10 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              type="number"
              name="power"
              value={inputs.power}
              onChange={handleChange}
              label="Power"
              style = {{ margin: 10 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              type="number"
              name="toughness"
              value={inputs.toughness}
              onChange={handleChange}
              label="Toughness"
              style = {{ margin: 10 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={ { flexDirection: "row" } } >
            <TextField
              select
              name="format"
              value={inputs.format}
              onChange={handleChange}
              label="Format"
              style = {{ width: 150, marginLeft: 10, marginTop: 10, marginBottom: 10 }}
            >
              <MenuItem value={''}>&nbsp;</MenuItem>
              <MenuItem value={'standard'}>Standard</MenuItem>
              <MenuItem value={'historic'}>Historic</MenuItem>
              <MenuItem value={'pioneer'}>Pioneer</MenuItem>
              <MenuItem value={'modern'}>Modern</MenuItem>
              <MenuItem value={'legacy'}>Legacy</MenuItem>
              <MenuItem value={'pauper'}>Pauper</MenuItem>
              <MenuItem value={'vintage'}>Vintage</MenuItem>
            </TextField>
            <TextField 
              select
              fullWidth
              name="legal"
              value={inputs.legal}
              onChange={handleChange}
              style = {{ width: 150, marginTop: 10, marginBottom: 10 }}
            >
              <MenuItem value={'legal'}>Legal</MenuItem>
              <MenuItem value={'restricted'}>Restricted</MenuItem>
              <MenuItem value={'banned'}>Banned</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              name="set"
              value={inputs.set}
              onChange={handleChange}
              label="Set"
              style = {{ margin: 10 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={ { flexDirection: "row" } }>
            <FormControlLabel control={ <Checkbox name='commonCheck' checked={inputs.commonCheck} onChange={handleCheck}/> } label="Common" style = {{ marginLeft: 10 }} />
            <FormControlLabel control={ <Checkbox name='uncommonCheck' checked={inputs.uncommonCheck} onChange={handleCheck}/> } label="Uncommon" />
            <FormControlLabel control={ <Checkbox name='rareCheck' checked={inputs.rareCheck} onChange={handleCheck}/> } label="Rare" />
            <FormControlLabel control={ <Checkbox name='mythicRareCheck' checked={inputs.mythicRareCheck} onChange={handleCheck}/> } label="Mythic Rare" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={ { flexDirection: "row" } } >
            <TextField
              select
              name="currency"
              value={inputs.currency}
              onChange={handleChange}
              style = {{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}
            >
              <MenuItem value={'usd'}>USD</MenuItem>
              <MenuItem value={'euro'}>Euros</MenuItem>
              <MenuItem value={'tickets'}>MTGO Tickets</MenuItem>
            </TextField>
            <TextField 
              select
              name="currencyCompare"
              value={inputs.currencyCompare}
              onChange={handleChange}
              style = {{ marginTop: 10, marginBottom: 10 }}
            >
              <MenuItem value={'lessThan'}>less than</MenuItem>
              <MenuItem value={'greaterThan'}>greater than</MenuItem>
              <MenuItem value={'lessThanOrEqual'}>less than or eqal</MenuItem>
              <MenuItem value={'greaterThanOrEqual'}>greater than or eqal</MenuItem>
            </TextField>
            {inputs.currency === 'usd' ? 
              <TextField
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              style = {{ marginTop: 10, marginBottom: 10 }}
            /> : inputs.currency === 'euro' ? 
            <TextField
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              style = {{ marginTop: 10, marginBottom: 10 }}
            /> :
            <TextField
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">TIX</InputAdornment>
                ),
              }}
              style = {{ marginTop: 10, marginBottom: 10 }}
            />
            }
          </FormControl>
        </Grid>
      </Grid>
      {isFetching ? <LoadingButton loading variant="contained" style = {{ margin: 10 }}>Submit</LoadingButton> : <Button variant="contained" color="primary" type="submit" style = {{ margin: 10 }}>Submit</Button>}
      <Button variant="contained" color="secondary" name="reset" style = {{ margin: 10 }} onClick={resetForm}>Reset</Button>
    </form>
  )
}

export default MtgForm

{/* <Form onSubmit={handleSubmit}>
          <Form.Input label='Color' placeholder='Red' name='color' onChange={handleChange}/>
          <Form.Input label='CMC' placeholder='1' name='cmc' onChange={handleChange}/>
        <Form.Button>SUBMIT</Form.Button>
      </Form> */}