import React, {StyleSheet, Dimensions} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "italic": {
        "fontStyle": "italic"
    },
    "strong": {
        "fontWeight": "bold"
    },
    "light": {
        "fontSize": 13
    },
    "text-right": {
        "textAlign": "right"
    },
    "color-light-grey": {
        "color": "#B0BEC5"
    },
    "discussion": {
        "marginTop": 15,
        "marginRight": 20,
        "marginBottom": 15,
        "marginLeft": 20
    },
    "comment-header": {
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 0,
        "fontSize": 17,
        "color": "#78909C"
    },
    "comment-header > *": {
        "marginRight": 15
    },
    "comment-group": {
        "marginBottom": 15
    },
    "comment-group > *": {
        "marginBottom": 10
    },
    "child-comment": {
        "paddingLeft": 10,
        "marginLeft": 20
    },
    "edit-buttons": {
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "edit-buttons > *": {
        "marginLeft": 10
    },
    "RichEditor-root": {
        "background": "#fff",
        "border": "1px solid #ddd",
        "fontFamily": "'Georgia', serif",
        "fontSize": 14,
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15
    },
    "RichEditor-editor": {
        "borderTop": "1px solid #ddd",
        "cursor": "text",
        "fontSize": 14,
        "marginTop": 10
    },
    "RichEditor-editor public-DraftEditorPlaceholder-root": {
        "marginTop": 0,
        "marginRight": "-15px",
        "marginBottom": "-15px",
        "marginLeft": "-15px",
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15
    },
    "RichEditor-editor public-DraftEditor-content": {
        "marginTop": 0,
        "marginRight": "-15px",
        "marginBottom": "-15px",
        "marginLeft": "-15px",
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "minHeight": 100
    },
    "RichEditor-hidePlaceholder public-DraftEditorPlaceholder-root": {
        "display": "none"
    },
    "RichEditor-controls": {
        "fontFamily": "'Helvetica', sans-serif",
        "fontSize": 14,
        "marginBottom": 5,
        "userSelect": "none"
    },
    "RichEditor-styleButton": {
        "color": "#999",
        "cursor": "pointer",
        "marginRight": 16,
        "paddingTop": 2,
        "paddingRight": 0,
        "paddingBottom": 2,
        "paddingLeft": 0
    },
    "RichEditor-activeButton": {
        "color": "#5890ff"
    }
});