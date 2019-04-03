import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostPreview from '../../molecules/PostPreview';
import './postList.css';

import { fetchPosts } from '../../../actions';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = { isAdmin: props.isAdmin };

    this.renderAddButton = this.renderAddButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  static getDerivedStateFromProps(props, state) {
    state.isAdmin = props.isAdmin;
    return state;
  }

  renderAddButton() {
    if (this.state.isAdmin) {
      return (
        <div className="text-sm-left form-group">
          <Link className="btn btn-primary" to="/posts/new">
            Add a post
          </Link>
        </div>
      );
    }
  }

  render() {
    if (!this.props.posts) return null;

    return (
      <div className="col-11 mx-auto">
        <h3 className="page-title">Posts</h3>
        {this.renderAddButton()}
        <div className="row">{this.renderPosts()}</div>
      </div>
    );
  }

  renderPosts() {
    const { posts } = this.props;
    return Object.values(posts).map(post => (
      <PostPreview
        key={post.id}
        post={post}
        history={this.props.history}
        isAdmin={this.state.isAdmin}
      />
    ));
  }
}

function mapStateToProps({ posts }) {
  if (posts && Array.isArray(posts.list)) return { posts: posts.list };
  return { posts: [] };
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
