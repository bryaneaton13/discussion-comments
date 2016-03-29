import React, { Component, Children } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import moment from 'moment';

export default class Comment extends Component {
  render() {
    let { author, author_id, comment, children, datetime } = this.props;
    let fromNow = moment(datetime).fromNow();
    let childrenDiv = (Children.count(children) > 0) ? (
      <div className="child-comment">
        {children}
      </div>
    ) : null;
    return (
      <div className="comment-group">
        <Card>
          <CardHeader
            title={author}
            subtitle={fromNow}
            avatar={`http://lorempixel.com/100/100/cats/${author_id}`}
          />
          <CardText>
            {comment}
          </CardText>
          <CardActions>
            <FlatButton label="Edit" />
            <FlatButton label="Delete" />
          </CardActions>
        </Card>
        <br />
        {childrenDiv}
      </div>
    );
  }
}
