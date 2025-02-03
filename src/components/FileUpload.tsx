import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
        ${isDragActive 
          ? 'border-black bg-gray-50/50 backdrop-blur-sm' 
          : 'border-gray-300 hover:border-black bg-white/50 backdrop-blur-sm'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-center space-y-4">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700">
            Drop your homework image here
          </p>
          <p className="text-sm text-gray-500">
            or click to select a file
          </p>
        </div>
        <p className="text-xs text-gray-400">
          Supports JPG, JPEG, PNG
        </p>
      </div>
    </div>
  );
}