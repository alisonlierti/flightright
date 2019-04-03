import React from 'react';
import { Link } from 'react-router-dom';

const CardPostPreviewUserActions = props => {
  return (
    <Link to={`/posts/${props.postId}`} className="btn btn-primary">
      See Post
    </Link>
  );
};

export default CardPostPreviewUserActions;
