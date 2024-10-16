import React from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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

const uploadFile = async (file) => {
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
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      uploadFile(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
          Upload Files
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
            Drag &apos;n&apos; drop some files here, or click to select files
          </Typography>
        </Box>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FileUploadModal;
