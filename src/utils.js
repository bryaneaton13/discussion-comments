import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';


export function getAuthors(data, depth = 1) {
  if (!data) return [];
  let { author, author_id, comments } = data;
  let users = [{author: author, id: author_id}];

  if (comments && comments.length > 0) {
    comments.forEach((c) => {
      users = users.concat(getAuthors(c, depth + 1));
    });
  }
  // Only do this for the final result
  if (depth === 1) {
    // sort by id, then filter out all duplicates
    users = users.sort((u1, u2) => u1.id < u2.id ? -1 : 1).reduce((p, n) => {
      // don't include and duplicates in the array
      if (p[p.length-1] && p[p.length-1].id === n.id) {
        p[p.length-1].count++;
        return p;
      }
      n.count = 1;
      return p.concat(n);
    }, []);
  }
  return users;
}

// Draft.js functionality
const TAGS = ['<br>','<strong>'];
function hasTag(comment) {
  return TAGS.find((t) => comment.includes(t));
}

export function htmlStringToEditorState(str) {
  // DraftJS is strange with html
  // Custom logic for stripping out tags and rendering them as needed
  if (hasTag(str)) {
    // Split up each break tag to its own element
    let comment = str.split('<br>');
    // Loop over the comment lines and get them as an array of ContentBlocks for draftjs
    let blocks = comment.map((c) => stateFromHTML(c).getBlocksAsArray())
      .reduce((p, n) => p.concat(...n), []);
    let contentState = ContentState.createFromBlockArray(blocks);
    return EditorState.createWithContent(contentState);
  }
  let content = ContentState.createFromText(str);
  return EditorState.createWithContent(content);
}

function formatText(text, offset, length, startTag, endTag) {
  return text.substr(0, offset) +
    `${startTag}${text.substr(offset, length)}${endTag}` +
    text.substr(length + offset);
}

export function editorStateToHtmlString(es) {
  let lines = convertToRaw(es.getCurrentContent());
  let text = lines.blocks.map(line => {
    let styles = line.inlineStyleRanges;
    let t = line.text;
    let overallOffset = 0;
    if (styles && styles.length > 0) {
      // Find out if there are any fields with both BOLD and ITALIC
      styles.forEach(style => {
        if (style.style === 'BOLD') {
          t = formatText(t, style.offset + overallOffset, style.length, '<strong>', '</strong>');
          overallOffset += 17;
        // } else if (style.style === 'ITALIC') {
        //   t = formatText(t, style.offset + overallOffset, style.length, '<i>', '</i>');
        //   overallOffset += 7;
        }
      });
    }
    return t;
  }).join('<br>');
  return text;
}
