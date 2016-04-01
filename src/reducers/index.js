import cloneDeep from 'lodash.cloneDeep';
import moment from 'moment';

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
    let val = deleteComment(id, comments[i].comments);
    if (val) return val;
  }
  return deleteComment(id, comments.comments);
}

function editComment(id, comment, comments = []) {
  let len = comments.length;
  if (len === 0) return false;
  for (let i=0; i<len; i++) {
    if (comments[i].id === id) {
      comments[i].comment = comment;
      comments[i].deleted = false;
      return true;
    }
    let val = editComment(id, comment, comments[i].comments);
    if (val) return;
  }
  return editComment(id, comment, comments.comments);
}

// Only does a single level sort
function sortComments(comments = [], late = false) {
  let newComments = comments;
  newComments.sort((c1, c2) => {
    let d1 = moment(c1.datetime);
    let d2 = moment(c2.datetime);
    let comparison = (late) ? d1 > d2 : d1 < d2;
    return comparison ? -1 : 1;
  });
  return newComments;
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
    case 'SORT_OLD':
      let sortOldState = cloneDeep(state);
      sortOldState.comments = sortComments(sortOldState.comments);
      sortOldState.sort = 'old';
      return sortOldState;
    case 'SORT_NEW':
      let sortNewState = cloneDeep(state);
      sortNewState.comments = sortComments(sortNewState.comments, true);
      sortNewState.sort = 'new';
      return sortNewState;
    default:
      return state;
  }
}
