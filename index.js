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
    "color-light-grey": {
        "color": "#B0BEC5"
    },
    "discussion": {
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 10
    },
    "author-link:link": {
        "textDecoration": "none"
    },
    "child-comment": {
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "marginLeft": 20
    }
});