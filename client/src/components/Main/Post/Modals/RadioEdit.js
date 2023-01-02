import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function RadioEdit() {
  return (
    <FormControl>
      <RadioGroup row name="radio-buttons-post" id="post_option">
        <FormControlLabel value="edit" control={<Radio />} label="Edit this post" />
        <FormControlLabel value="add_new" control={<Radio />} label="Add new post" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioEdit