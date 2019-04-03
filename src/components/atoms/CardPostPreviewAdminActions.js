import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions';
import { connect } from 'react-redux';

const CardPostPreviewAdminActions = props => {
  const onDeletePost = () => {
    props.deletePost(props.postId);
  };

  return (
    <div>
      <Link to={`/edit/${props.postId}`} className="btn btn-primary">
        See Post
      </Link>
      <button type="button" className="btn btn-danger" onClick={onDeletePost}>
        Delete post
      </button>
    </div>
  );
};

function mapStateToProps({ posts }) {
  return { post: posts.post };
}

export default connect(
  mapStateToProps,
  { deletePost }
)(CardPostPreviewAdminActions);
