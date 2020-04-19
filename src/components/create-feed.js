import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'draft-js/dist/Draft.css';
import FeedEditor from './editor';
import {Divider} from 'rsuite';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default class LayoutTextFields extends React.Component {
  constructor(props){
      super();
      this.state={

      }
  }
  render() {
      return (
        <div className={useStyles.root}>
          <Typography variant="h6" color="">Create Feed</Typography>
          <Divider />
            <TextField
              id="standard-full-width"
              label="Title"
              style={{ margin: 5 }}
              placeholder="feed title"
              helperText="Main title"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FeedEditor 
             editorState={this.state.editorState}
             onChange={this.onChange}
             handleBeforeInput={this._handleBeforeInput}
             handlePastedText={this._handlePastedText}
            />
        <Button variant="contained">submit</Button>
          </div>
      );
  } 
}
