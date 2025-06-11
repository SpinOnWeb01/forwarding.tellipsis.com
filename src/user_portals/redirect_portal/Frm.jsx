import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { FormControl, InputLabel, Select } from '@mui/material';

 function Frm() {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      style={{flexWrap:"wrap",textAlign:"center"}}
    >
      <TextField className='form_flied_box' id="outlined-basic" label="Caller Number" variant="outlined" style={{ width: "48%",}} />
      <TextField className='form_flied_box' id="outlined-basic" label="Forwarding Number" variant="outlined" style={{ width: "48%", }} />
      <TextField className='form_flied_box' id="outlined-basic" label="DID Number" variant="outlined" style={{ width: "48%", }} />

      <TextField className='form_flied_box' id="outlined-basic" label="Start Range" variant="outlined" style={{ width: "23.5%", }} />
      <TextField className='form_flied_box' id="outlined-basic" label="To" variant="outlined" style={{ width: "23.5%", }} />
      <FormControl className='form_flied_box' fullWidth style={{ width: "48%", }}>
        <InputLabel id="demo-simple-select-label">TimeZone</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
     
      <TextField className='form_flied_box' id="outlined-basic" label="Buyer Name" variant="outlined" style={{ width: "48%", }} />
      
      
    </Box>
  )
};

export default Frm;