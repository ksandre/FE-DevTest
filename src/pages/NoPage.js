import React from 'react';
import Header from "../components/header";

const NoPage = () => {
  return (
    <div>
      <Header title={'Error'} icon={'error'} />
      <h1 style={{textAlign: 'center'}}>404 Page Not Found</h1>
    </div>
  )
};

export default NoPage;