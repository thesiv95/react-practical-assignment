import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function CommentEdit() {
  return (
    <FormControl>
      <RadioGroup row name="radio-buttons-comment" id="comment_option">
        <FormControlLabel value="edit" control={<Radio />} label="Edit this comment" />
        <FormControlLabel value="add_new" control={<Radio />} label="Add new comment" />
      </RadioGroup>
    </FormControl>
  );
}

export default CommentEdit