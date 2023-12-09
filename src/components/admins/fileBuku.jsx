// import { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [bukuId, setBukuId] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleBukuIdChange = (e) => {
//     setBukuId(e.target.value);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('bukuId', bukuId);
//       formData.append('urlFile', file);

//       const response = await axios.post('http://localhost:3000/api-docs/file-buku', formData);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>File Upload</h1>
//       <div>
//         <label htmlFor="bukuId">Buku ID:</label>
//         <input type="text" id="bukuId" value={bukuId} onChange={handleBukuIdChange} />
//       </div>
//       <div>
//         <label htmlFor="urlFile">File:</label>
//         <input type="file" id="urlFile" className="border rounded w-full py-2 px-3" onChange={handleFileChange} />
//       </div>
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default FileUpload;


import { useState } from 'react';
import { updateFileBuku, createFileBuku } from '../../modules/fetch/admins/fileBuku';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [bukuId, setBukuId] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBukuIdChange = (e) => {
    setBukuId(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('bukuId', bukuId);
      formData.append('urlFile', file);

      // Add a condition to check if there's a file ID for update
      if (bukuId) {
        // If bukuId exists, perform update
        await updateFileBuku(bukuId, formData);
      } else {
        // If bukuId doesn't exist, perform create
        await createFileBuku(formData);
      }

      // You can also add logic here to handle success or navigate to another page
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <div>
        <label htmlFor="bukuId">Buku ID:</label>
        <input type="text" id="bukuId" value={bukuId} onChange={handleBukuIdChange} />
      </div>
      <div>
        <label htmlFor="urlFile">File:</label>
        <input type="file" id="urlFile" className="border rounded w-full py-2 px-3" onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
