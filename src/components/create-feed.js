import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'draft-js/dist/Draft.css';
import FeedEditor from './editor';
import {Divider} from 'rsuite';
import {convertFromRaw
} from 'draft-js';

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
        tilte:'',
        description: ''

      }
  }

  _onTitleChange = (e)=>{
   // console.log('title is',e.target.value);
      this.setState({title:e.target.value});
  }
  _onDescriptionChange= (desc)=>{
    this.setState({description:desc});
  }

  async getData() {
    console.log();
    let final_dataset=[];
    let desc = this.state.description;
    let temp =await JSON.parse(desc);
     temp.blocks.forEach(function(data){
      final_dataset.push({'text':data.text,'style':data.type});
      //console.log(data)
     });
    //console.log(temp.blocks);
    let payload = await {
      'feed_title':this.state.title,
      'feed_desc':final_dataset
    }
    console.log(payload);
    return await payload;
  }

   handleFormSubmit = ()=>{
   
    let data = this.getData();
  
  }
  componentDidUpdate() {
  }
  render() {
      return (
        <div className={useStyles.root}>
          <Typography variant="h6" color="">Create Feed</Typography>
          <Divider />
            <TextField
              onChange={e => this._onTitleChange(e)}
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
            <Divider />
            <Typography variant="h6" color="">Feed Description</Typography>
            <FeedEditor 
              data={{changeDesc:this._onDescriptionChange.bind(this)}}
             editorState={this.state.editorState}
             onChange={this.onChange}
             handleBeforeInput={this._handleBeforeInput}
             handlePastedText={this._handlePastedText}
            />
        <Button variant="contained" onClick={this.handleFormSubmit}>submit</Button>
          </div>
      );
  } 
}
