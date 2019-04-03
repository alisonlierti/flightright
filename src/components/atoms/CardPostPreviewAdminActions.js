import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const CardPostPreviewAdminActions = props => {
  const onDeletePost = () => {
    toast('Sucess to delete the post!', {
      autoClose: 5000,
      pauseOnFocusLoss: true,
      type: toast.TYPE.SUCCESS
    });

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
      <ToastContainer autoClose={8000} />
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
