import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const MtgForm = ({ handleSubmit }) => {
  const [inputs, setInputs] = React.useState({ 
    cmc: null,
    whiteCheck: false,
    blackCheck: false,
    blueCheck: false,
    greenCheck: false,
    redCheck: false,
    andor: 'and'
  })

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

  return (
    <form onSubmit={ (e) => {
      handleSubmit(e, inputs) 
    }}>
      <Box>
        <FormControl sx={ { flexDirection: "row" } }>
          <FormControlLabel control={ <Checkbox name='whiteCheck' checked={inputs.whiteCheck} onChange={handleCheck}/> } label="White" />
          <FormControlLabel control={ <Checkbox name='blackCheck' checked={inputs.blackCheck} onChange={handleCheck}/> } label="Black" />
          <FormControlLabel control={ <Checkbox name='greenCheck' checked={inputs.greenCheck} onChange={handleCheck}/> } label="Green" />
          <FormControlLabel control={ <Checkbox name='redCheck' checked={inputs.redCheck} onChange={handleCheck}/> } label="Red" />
          <FormControlLabel control={ <Checkbox name='blueCheck' checked={inputs.blueCheck} onChange={handleCheck}/> } label="Blue" />
          <TextField 
            value={inputs.andor}
            onChange={handleChange}
            select // tell TextField to render select
            label="AND/OR"
            name="andor"
          >
            <MenuItem value={'and'}>AND</MenuItem>
            <MenuItem value={'or'}>OR</MenuItem>
          </TextField>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <TextField
            name="cmc"
            type="text"
            label="CMC"
            onChange={ handleChange }
          />
        </FormControl>
      </Box>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>

    </form>
  )
}

export default MtgForm

{/* <Form onSubmit={handleSubmit}>
          <Form.Input label='Color' placeholder='Red' name='color' onChange={handleChange}/>
          <Form.Input label='CMC' placeholder='1' name='cmc' onChange={handleChange}/>
        <Form.Button>SUBMIT</Form.Button>
      </Form> */}