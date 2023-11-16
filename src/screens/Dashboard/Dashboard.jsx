import React, { useState } from 'react';

import './dashboard.scss'

export default function Dashboard(props) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (file) {
      // Crea un objeto FormData para enviar la imagen
      const formData = new FormData()
      formData.append('filename', file);

      try {
        // Realiza la solicitud POST al servidor
        const response = await fetch(`${props.stateurl}/upload-profile-photo`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json()
          console.log('URL:', data.downloadURL)
          setFile(data.downloadURL)
          console.log("file", file)
        } else {
          console.error('Image Upload error:', response.statusText)
        }
      } catch (error) {
        console.error('Image Upload error:', error.message)
      }
    } else {
      console.error('No file has been selected');
    }
  }

  return (
    <section>
      <label htmlFor="fileInput">Seleccionar archivo</label>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <button onClick={uploadFile}>Subir archivo</button>
    </section>
  );
}
