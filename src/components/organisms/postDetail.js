import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MegadraftEditor,
  editorStateFromRaw,
  Toolbar,
  editorStateToJSON
} from 'megadraft';

import { fetchPost } from '../../actions';
import { deletePost } from '../../actions';
import Spinner from '../atoms/Spinner';
import ListOfDetailActionsToAdmin from '../atoms/ListOfDetailActionsToAdmin';
import ListOfDetailActionsToUser from '../atoms/ListOfDetailActionsToUser';
import PostNew from './postNew';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        ...this.props.post,
        post: editorStateFromRaw(this.props.post ? this.props.post.post : null)
      },
      editorState: editorStateFromRaw(null),
      editing: false
    };

    this.onDeletePost = this.onDeletePost.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showActionButtons = this.showActionButtons.bind(this);
    this.onEditPost = this.onEditPost.bind(this);
    this.setChangesOnPost = this.setChangesOnPost.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  onChange(editorState) {
    const content = editorStateToJSON(editorState);
    this.setState({ post: { ...this.state.post, post: content } });
  }

  componentDidMount() {
    const {
      fetchPost,
      match: { params }
    } = this.props;
    fetchPost(params.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.post) {
      const postContent = JSON.parse(props.post.post);
      state.post = props.post;
      state.editorState = editorStateFromRaw(postContent);
    }
    state.isAdmin = props.isAdmin;
    return state;
  }

  setChangesOnPost(post) {
    editorStateFromRaw(JSON.parse(post.post));
    this.setState({ post });
  }

  closeEdit() {
    this.setState({ editing: false });
  }

  onEditPost() {
    this.setState({ editing: true });
  }

  onDeletePost() {
    const { deletePost, history, match } = this.props;

    deletePost(match.params.id);
    history.push('/admin');
  }

  showActionButtons() {
    if (this.props.isAdmin) {
      return (
        <ListOfDetailActionsToAdmin
          onEditPost={this.onEditPost}
          onDeletePost={this.onDeletePost}
        />
      );
    } else {
      return <ListOfDetailActionsToUser />;
    }
  }

  showEdit() {
    if (this.state.editing) {
      return (
        <PostNew
          post={this.state.post}
          onChangePost={this.setChangesOnPost}
          closeEdit={this.closeEdit}
        />
      );
    }
  }

  render() {
    const { post } = this.props;

    if (!post) return <Spinner message="Loading" />;

    return (
      <div className="col-11 mx-auto">
        <h3 className="page-title">{post.title}</h3>
        <h6>Resumo: {post.resume}</h6>
        <MegadraftEditor
          readOnly={true}
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Type here your text..."
          modalOptions={this.modalOptions}
          Toolbar={Toolbar}
        />
        {this.showActionButtons()}
        <div style={{ marginTop: '15px' }}>{this.showEdit()}</div>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { post: posts.post };
}

export default connect(
  mapStateToProps,
  { fetchPost, deletePost }
)(PostDetail);

PostDetail.propTypes = {
  post: PropTypes.object,
  fetchPost: PropTypes.func,
  deletePost: PropTypes.func,
  match: PropTypes.any,
  history: PropTypes.any
};
