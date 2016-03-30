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
      comments[i].deleted = false;
      return;
    }
  }
  return editComment(id, comment, comments.comments);
}

export default function discussion(state, action) {
  switch (action.type) {
    case 'EDIT_COMMENT':
      let newEditState = cloneDeep(state);
      editComment(action.id, action.comment, newEditState.comments);
      return newEditState;
    case 'DELETE_COMMENT':
      let newDeleteState = cloneDeep(state);
      let deletedComment = deleteComment(action.id, newDeleteState.comments);
      // Action to fire off when undo
      newDeleteState.undo = {
        type: 'EDIT_COMMENT',
        id: action.id,
        comment: deletedComment
      };
      newDeleteState.snackbar = {
        open: true,
        message: 'Deleted'
      };
      return newDeleteState;
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
