import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  MegadraftEditor,
  editorStateFromRaw,
  Toolbar,
  editorStateToJSON
} from 'megadraft';
import { createPost, updatePost } from '../../actions';
import Upload from '../molecules/upload';

class PostNew extends Component {
  constructor(props) {
    super(props);

    if (this.props.post) {
      this.state = {
        editorState: editorStateFromRaw(JSON.parse(props.post.post))
      };
      this.props.initialize(props.post);
    } else {
      this.state = { editorState: editorStateFromRaw(null) };
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
    if (this.props.post) {
      this.props.post.post = editorStateToJSON(editorState);
      this.props.onChangePost(this.props.post);
    }
  }

  changeFile(file) {
    this.file = file;
  }

  onFormSubmit(values) {
    const { createPost, history } = this.props;
    values.post = editorStateToJSON(this.state.editorState);
    if (!this.props.post) {
      values.previewImage = this.file;
      createPost(values);
      history.push('/admin');
    } else {
      if (this.file) {
        values.previewImage = this.file;
      }
      updatePost(values);
      this.props.closeEdit();
    }
  }

  changeTitle(event, newValue) {
    if (this.props.post) {
      this.props.post.title = newValue;
      this.props.onChangePost(this.props.post);
    }
  }

  changeDescription(event, newValue) {
    if (this.props.post) {
      this.props.post.description = newValue;
      this.props.onChangePost(this.props.post);
    }
  }

  onCancel() {
    if (this.props.post) {
      this.props.closeEdit();
    } else {
      this.props.history.push('/admin');
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="col-10 mx-auto">
        <h3 className="page-title">
          {this.props.post ? 'Edit Post' : 'New Post'}
        </h3>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <Field
            label="Title"
            name="title"
            onChange={this.changeTitle}
            component={this.renderField}
          />
          <Field
            label="Description"
            name="description"
            onChange={this.changeDescription}
            component={this.renderField}
          />
          <Upload changeFile={this.changeFile} />
          <div style={{ marginTop: '20px' }}>
            <MegadraftEditor
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder="Type here your text..."
              Toolbar={Toolbar}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button className="btn btn-secondary" onClick={this.onCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  renderField(field) {
    const hasError = field.meta.touched && field.meta.error;
    const inputClassName = `form-control ${hasError ? 'is-invalid' : ''}`;

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input className={inputClassName} type="text" {...field.input} />
        {hasError ? (
          <small className="form-text text-danger">{field.meta.error}</small>
        ) : (
          ''
        )}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) errors.title = 'Title is required';
  if (!values.description) errors.description = 'Description is required';

  return errors;
}

export default reduxForm({ form: 'PostNewForm', validate })(
  connect(
    null,
    { createPost }
  )(PostNew)
);

PostNew.propTypes = {
  createPost: PropTypes.func,
  handleSubmit: PropTypes.func,
  history: PropTypes.any
};
