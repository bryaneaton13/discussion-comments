import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import { Editor } from 'draft-js';
import { htmlStringToEditorState } from '../utils.js';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: htmlStringToEditorState(props.comment)
    };
  }

  render() {
    const { editorState } = this.state;

    return (
      <Editor
        editorState={editorState}
        ref="editor"
        readOnly={true}
      />
    );
  }
}

export default Comment;