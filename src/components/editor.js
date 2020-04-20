import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Box from '@material-ui/core/Box';
import {
  Editor, 
  EditorState,
  RichUtils,
  convertToRaw,
} from 'draft-js';
import { green } from '@material-ui/core/colors';
import '../styles/feed-editor.css';

const MAX_LENGTH = 10;

 class FeedEditor extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            editorState: EditorState.createEmpty(),
            alignment: 'left'
          };

          this.onChange = this.onChange.bind(this);
          this._getLengthOfSelectedText = this._getLengthOfSelectedText.bind(this);
          this._handleBeforeInput = this._handleBeforeInput.bind(this);

          this.focus = () => this.refs.editor.focus();
         
          this.handleKeyCommand = (command) => this._handleKeyCommand(command);
          this.onTab = (e) => this._onTab(e);
          this.toggleBlockType = (type) => this._toggleBlockType(type);
          this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        }

        onChange = (editorState) => {
          const contentState = editorState.getCurrentContent();
          //console.log('content state', convertToRaw(contentState));
           this.saveContent(contentState);
          
          this.setState({editorState});
        }



        saveContent = debounce((content) => {
          this.props.data.changeDesc(JSON.stringify((convertToRaw(content))));
window.localStorage.setItem('content',JSON.stringify((convertToRaw(content))));
        }, 1000);

        // saveContent = (content) => {
        //   window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
        // }


      _getLengthOfSelectedText = () => {

        console.log('say');
  	const currentSelection = this.state.editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();
   
    let length = 0;
    
    if (!isCollapsed) {
      const currentContent = this.state.editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const isBackward = currentSelection.getIsBackward();
    	const blockMap = currentContent.getBlockMap();
      const startBlock = currentContent.getBlockForKey(startKey);
      const endBlock = currentContent.getBlockForKey(endKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const endBlockTextLength = endBlock.getLength();
      const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);
      
      if (isStartAndEndBlockAreTheSame) {
      	length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
      	let currentKey = startKey;
        while (currentKey && currentKey !== keyAfterEnd) {
 					if (currentKey === startKey) {
          	length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
          	length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        };
      }
    }
    
    return length;
  }

  _handleBeforeInput = () => {
  	const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length

  	if (currentContentLength > MAX_LENGTH - 1) {
    	console.log('you can type max ten characters');

    	return 'handled';
    }
  }
  
  _handlePastedText = (pastedText) => {
  	const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = this._getLengthOfSelectedText();

  	if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
    	console.log('you can type max ten characters');

    	return 'handled';
    }
  } 

        _handleKeyCommand(command) {
          const {editorState} = this.state;
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return true;
          }
          return false;
        }

        _onTab(e) {
          const maxDepth = 4;
          this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
        }

        _toggleBlockType(blockType) {
          this.onChange(
            RichUtils.toggleBlockType(
              this.state.editorState,
              blockType
            )
          );
        }

        _toggleInlineStyle(inlineStyle) {
          this.onChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
          );
        }

        render() {
          const {editorState} = this.state;
          let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }


if (!this.state.editorState) {
      return (
        <h3 className="loading">Loading...</h3>
      );
    }
    return (
      <div style={styles.root}>
 
            <Grid>
                <Box
                display = "flex"
                justifyContent = "space-even"
                >
        <ToggleButtonGroup size="small"  exclusive >              
        <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
             
              
               <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              /> 
             </ToggleButtonGroup>
              </Box>
              <div style={styles.editor} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  onTab={this.onTab}
                  placeholder="Start here.."
                  ref="editor"
                  spellCheck={true}
                />
              </div>
              </Grid>
            
      </div>
    );

        }
      }

      const styles = {
        root: {
          fontFamily: '\'Georgia\', serif',
          fontSize: 14,
          padding: 20,
          width: 600,
        },
        editor: {
          borderTop: '1px solid #ddd',
          cursor: 'text',
          fontSize: 16,
          marginTop: 20,
          minHeight: 400,
          paddingTop: 20,
        },
        controls: {
          fontFamily: '\'Helvetica\', sans-serif',
          fontSize: 14,
          marginBottom: 10,
          userSelect: 'none',
        },
        styleButton: {
          color: '#999',
          cursor: 'pointer',
          marginRight: 16,
          padding: '2px 0',
        },
        styleButtonActive: {
          color: '#999',
          backgroundColor: green,
          cursor: 'pointer',
          marginRight: 16,
          padding: '2px 0',
        },
      };

      function getBlockStyle(block) {
        switch (block.getType()) {
          case 'blockquote': return 'RichEditor-blockquote';
          default: return null;
        }
      }



class StyleButton extends React.Component {
        constructor() {
          super();
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
          };
        }

        render() {
          let className = 'RichEditor-styleButton ui button';
          if (this.props.active) {
            className += 'RichEditor-activeButton';
          }

          return (
            <ToggleButton key={this.props.label} className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </ToggleButton>
          );
        }
      }

 const BLOCK_TYPES = [
        {label: 'H1', style: 'header-one'},
        {label: 'H2', style: 'header-two'},
        {label: 'H3', style: 'header-three'},
        {label: 'H4', style: 'header-four'},
        {label: 'H5', style: 'header-five'},
        {label: 'H6', style: 'header-six'},
        {label: 'Blockquote', style: 'blockquote'},
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'},
        {label: 'CodeBlock', style: 'code-block'},
      ];



 const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        return (
          <div className="controls">
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
        );
      };


 var INLINE_STYLES = [
        {label: 'Bold', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'},
        {label: 'Monospace', style: 'CODE'},
      ];



const InlineStyleControls = (props) => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className="controls">
            {INLINE_STYLES.map(type =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
        );
      };



      export default FeedEditor;