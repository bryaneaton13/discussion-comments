import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/lib/snackbar';

class Undo extends Component {
  render() {
    // let { open, message, onUndo, onCloseSnackbar } = this.props;
    let { open, message, onCloseSnackbar } = this.props;
    // action="undo"
    // onActionTouchTap={onUndo}
    return (
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={4000}
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
    onUndo: () => {
      dispatch(ownProps.undo);
      dispatch({type: 'CLOSE_SNACKBAR'});
    }
  };
})(Undo);
