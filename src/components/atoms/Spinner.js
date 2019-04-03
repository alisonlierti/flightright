import React from 'react';

const Spinner = props => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        backgroundColor: 'white'
      }}>
      <div
        className="spinner-grow"
        style={{ marginTop: '40vh', marginLeft: '50vw' }}
        role="status">
        <span className="sr-only">{props.message}</span>
      </div>
    </div>
  );
};

Spinner.defaultProps = {
  message: 'Loading...'
};

export default Spinner;
