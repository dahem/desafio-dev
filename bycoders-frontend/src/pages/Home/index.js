import React, { useState } from 'react';
import FileUploader from '../../components/FileUploader';
import NavBar from '../../components/NavBar';
import TransactionList from '../../components/TransactionList';

function Home() {
  const [wasUploadSuccessful, setWasUploadSuccessful] = useState(false);
  return (
    <div>
      <NavBar />
      <div className="center" style={{ marginTop: '5rem', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }}><h2><strong>Subir o arquivo CNAB</strong></h2></div>
        <FileUploader onSuccessUpload={(val) => setWasUploadSuccessful(val)} />
        {<TransactionList />}
      </div>
    </div>
  );
};

export default Home;