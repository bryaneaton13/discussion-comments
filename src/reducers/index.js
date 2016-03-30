import cloneDeep from 'lodash.cloneDeep';

function deleteComment(id, comments = []) {
  let len = comments.length;
  if (len === 0) return false;
  for (let i=0; i<len; i++) {
    if (comments[i].id === id) {
      let deletedComment = comments[i].comment;
      comments[i].comment = '';
      comments[i].deleted = true;
      return deletedComment;
    }
  }
  return deleteComment(id, comments.comments);
}

function editComment(id, comment, comments = []) {
  let len = comments.length;
  if (len === 0) return;
  for (let i=0; i<len; i++) {
    if (comments[i].id === id) {
      comments[i].comment = comment;
      return;
    }
  }
  return editComment(id, comment, comments.comments);
}

export default function discussion(state, action) {
  switch (action.type) {
    case 'EDIT_COMMENT':
      let newState2 = cloneDeep(state);
      editComment(action.id, newState2.comments);
      return newState2;
    case 'DELETE_COMMENT':
      let newState = cloneDeep(state);
      let deletedComment = deleteComment(action.id, newState.comments);
      // Action to fire off when undo
      newState.undo = {
        type: 'EDIT_COMMENT',
        id: action.id,
        comment: deletedComment
      };
      newState.snackbar = {
        open: true,
        message: 'Deleted'
      };
      return newState;
    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        snackbar: {
          open: false
        }
      };
    default:
      return state;
  }
}
