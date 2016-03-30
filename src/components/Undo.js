import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/lib/snackbar';

class Undo extends Component {
  render() {
    let { open, message, undo, onUndo, onCloseSnackbar } = this.props;
    return (
      <Snackbar
        open={open}
        action="undo"
        onActionTouchTap={() => onUndo(undo)}
        message={message}
        autoHideDuration={5000}
        onRequestClose={onCloseSnackbar}
      />
    );
  }
}

export default connect((state) => {
  return {
    open: state.snackbar.open || false,
    message: state.snackbar.message || '',
    undo: state.undo
  };
}, (dispatch, ownProps) => {
  return {
    onCloseSnackbar: () => dispatch({
      type: 'CLOSE_SNACKBAR'
    }),
    onUndo: (undo) => {
      console.log('undo', undo);
      dispatch(undo);
      dispatch({type: 'CLOSE_SNACKBAR'});
    }
  };
})(Undo);
