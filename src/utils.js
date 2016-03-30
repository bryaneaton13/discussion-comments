import { CompositeDecorator, ContentState, convertFromRaw, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';

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

export function editorStateToHtmlString(es) {
  let lines = convertToRaw(es.getCurrentContent());
  let overallOffset = 0;
  let text = lines.blocks.map(line => {
    let styles = line.inlineStyleRanges;
    let t = line.text;
    console.log('styles', styles);
    if (styles && styles.length > 0) {
      // do something
      styles.forEach(style => {
        if (style.style === 'BOLD') {
          let offset = style.offset + overallOffset;
          t = `${t.substr(0, style.length)}
            <strong>${t.substr(offset, style.length)}</strong>
            ${t.substr(style.length + offset)}`;
          overallOffset += style.offset;
        }
      });
    }
    return t;
  }).join(' ');
  return text;
}