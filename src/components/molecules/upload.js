import React from 'react';
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { fileName: this.props.fileName };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const fileReader = new FileReader();
      fileReader.onload = data => {
        this.setState({ fileName: acceptedFiles[0].name });
        this.props.changeFile(data.currentTarget.result);
        toast('Sucess to load the file!', {
          autoClose: 5000,
          pauseOnFocusLoss: true,
          type: toast.TYPE.SUCCESS
        });
      };
      fileReader.readAsDataURL(acceptedFiles[0]);
    } else {
      toast('Oops something wrong happened on the upload, please try again!', {
        autoClose: 5000,
        pauseOnFocusLoss: true,
        type: toast.TYPE.ERROR
      });
    }
  };

  render() {
    const textStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return (
      <div>
        <Dropzone onDrop={this.onDrop} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                style={{
                  width: '100%',
                  height: '30px',
                  borderWidth: 2,
                  borderColor: '#666',
                  marginBottom: '10px',
                  borderStyle: 'dashed',
                  borderRadius: 5
                }}
                {...getRootProps()}
                className={
                  ('dropzone',
                  {
                    'dropzone--isActive': isDragActive
                  })
                }>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div style={textStyle}>Arraste os arquivos aqui...</div>
                ) : (
                  <div style={textStyle}>
                    {this.state.fileName
                      ? this.state.fileName
                      : 'Drop here the preview image for the post.'}
                  </div>
                )}
              </div>
            );
          }}
        </Dropzone>
        <ToastContainer autoClose={8000} />
      </div>
    );
  }
}
