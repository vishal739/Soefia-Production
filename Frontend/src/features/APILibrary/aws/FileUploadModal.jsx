import React, { useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import {uploadAndCreateLessonAsync} from '../../APILibrary/LessonAPI/lessonSlice';
import { useDispatch, useSelector } from 'react-redux';
const S3_BUCKET = 'soefias3';
const REGION = 'us-east-1';

// Initialize S3 client
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_REACT_APP_AWS_SECRET_KEY,
  },
});

const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    console.log('Success', data);
  } catch (err) {
    console.error('Error', err);
  }
};



const FileUploadModal = ({ open, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const isLessonLoading= useSelector((state) => state.lesson.uploading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const uploadFileToBackend = async (file) => {
  //   // const formData = new FormData();
  //   // formData.append('pdf', file); // Ensure field name matches 'pdf'
  
  //   // try {
  //   //   await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/upload`, formData, {
  //   //     headers: {
  //   //       'Content-Type': 'multipart/form-data',
  //   //     },
  //   //   });
  //   // } catch (error) {
  //   //   console.error('Error uploading and extracting PDFs:', error);
  //   // }
  //   dispatch(uploadAndCreateLessonAsync(file))
  // };
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      console.error('Only one file is allowed');
      return;
    }

    const file = acceptedFiles[0];
    if (file.type !== 'application/pdf') {
      console.error('Only PDF files are allowed');
      return;
    }

    // Store the selected file in state
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    // Upload to S3
    // await uploadFileToS3(selectedFile);

    // Upload to Backend
    await dispatch(uploadAndCreateLessonAsync(selectedFile)).then((response) => {
      const lessonId = response.payload._id; // Adjust this based on your response structure
      navigate(`/teacher/lesson?lessonId=${lessonId}&upload=true`);
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
    });

    // Clear the selected file after upload
    setSelectedFile(null);
    handleClose();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    maxFiles: 1,
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          margin: 'auto',
          marginTop: '100px',
          maxWidth: '500px',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload PDF File
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #3f51b5',
            borderRadius: '8px',
            padding: '20px',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: '#1a73e8',
            },
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1">
            Drag &apos;n&apos; drop a PDF file here, or click to select a file
          </Typography>
        </Box>

        {/* Display the selected file name */}
        {selectedFile && (
          <Typography variant="body2" sx={{ marginTop: '10px' }}>
            Selected File: {selectedFile.name}
          </Typography>
        )}

        {/* Upload File button */}
        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          sx={{ margin: '10px' }}
          disabled={!selectedFile} // Disable button if no file is selected
        >
          {isLessonLoading? 'Loading' : 'Upload File'}
        </Button>

        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ margin: '10px' }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FileUploadModal;
