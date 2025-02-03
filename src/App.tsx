import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ExplanationView } from './components/ExplanationView';
import { analyzeHomework } from './lib/gemini';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) {
      toast.error('Please select a valid image file.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPEG, PNG).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB.');
      return;
    }

    try {
      setIsLoading(true);
      setExplanation(null);

      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          if (!reader.result) {
            throw new Error('Failed to read file');
          }

          const imageUrl = reader.result as string;
          setUploadedImage(imageUrl);
          
          const base64Data = imageUrl.split(',')[1];
          
          if (!base64Data) {
            throw new Error('Invalid image data');
          }

          const result = await analyzeHomework(base64Data);
          
          if (!result) {
            throw new Error('No explanation generated');
          }

          setExplanation(result);
          toast.success('Analysis complete!');
        } catch (error) {
          console.error('Error:', error);
          toast.error(error instanceof Error ? error.message : 'Failed to analyze homework. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        console.error('FileReader error:', reader.error);
        toast.error('Error reading file. Please try again.');
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(error instanceof Error ? error.message : 'Error processing file. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/src/public/logo.png" 
              alt="H.W Helper Logo" 
              className="h-16 object-contain"
            />
          </div>
        </header>

        <main className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
          <div className="w-full">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          )}

          {uploadedImage && !isLoading && (
            <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
              <img 
                src={uploadedImage} 
                alt="Uploaded homework"
                className="w-full h-auto object-contain max-h-[400px]"
              />
            </div>
          )}

          {explanation && !isLoading && (
            <ExplanationView explanation={explanation} />
          )}
        </main>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;