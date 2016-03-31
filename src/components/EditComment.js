import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import { Editor, RichUtils } from 'draft-js';
import { htmlStringToEditorState, editorStateToHtmlString } from '../utils.js';

class EditComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: htmlStringToEditorState(props.comment)
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.handleSubmit = () => this._handleSubmit();
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleSubmit() {
    let text = editorStateToHtmlString(this.state.editorState);
    this.props.onEdit(this.props.id, text);
    this.props.onCancel();
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

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div>
        <div className="RichEditor-root">
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        <div className="text-right edit-buttons">
          <FlatButton
            label="Cancel"
            secondary={true}
            onClick={this.props.onCancel}
            />
          <RaisedButton
            label="Save"
            primary={true}
            onClick={this.handleSubmit}
            />
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), (dispatch) => {
  return {
    onEdit: (id, comment) => {
      dispatch({
        type: 'EDIT_COMMENT',
        id,
        comment
      });
    }
  };
})(EditComment);


var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'}
  // {label: 'Italic', style: 'ITALIC'}
];

// Stateless component
function InlineStyleControls(props) {
  let currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type, i) => {
        let className = 'RichEditor-styleButton';
        if (currentStyle.has(type.style)) {
          className += ' RichEditor-activeButton';
        }
        return (
          <span key={`style_${i}`} className={className} onMouseDown={() => {
            props.onToggle(type.style);
          }}>
            {type.label}
          </span>
        );
      })}
    </div>
  );
}
