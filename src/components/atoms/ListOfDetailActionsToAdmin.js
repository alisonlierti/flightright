import React from 'react';
import { Link } from 'react-router-dom';

const ListOfDetailActionsToAdmin = props => {
  return (
    <div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={props.onDeletePost}>
          Delete post
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={props.onEditPost}>
          Edit post
        </button>
        <Link className="btn btn-secondary" to="/admin">
          Go back
        </Link>
    </div>
  );
};

export default ListOfDetailActionsToAdmin;
