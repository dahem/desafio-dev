import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2'
import axios from 'axios';
import Button from "../Button";
import './style.css';

function FileUploader(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer.files || !e.dataTransfer.files[0]) return;
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.files || !e.target.files[0]) return;

    setSelectedFile(e.target.files[0]);
  };

  const openUploader = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const uploadFile = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const data = new FormData() 
    data.append('file', selectedFile);
    try {
      const token = await getAccessTokenSilently();
      await axios.post('/cnab/upload', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Subido correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Algo deu errado, verifique os dados do arquivo',
        showConfirmButton: false,
        timer: 5000
      });
    } finally {
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <div
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="file-uploader"
      >
        {!selectedFile ?
          <>
            <span>Solte seu arquivo aqui ou</span>
            <input onChange={handleChange} id="file-input" style={{ display: 'none' }} type="file" />
            <Button onClick={openUploader} style={{ marginTop: '1rem' }} label="Clique aqui" />
          </>:
          <>
            <div>{selectedFile.name}</div>
          </>
        }
      </div>
      {selectedFile && <div style={{ marginTop: '1rem' }} className="center">
        <Button label="Subir" loading={loading} onClick={uploadFile} />
      </div>}
    </div>
  );
}

export default FileUploader;