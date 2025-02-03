import React from 'react';

interface ExplanationViewProps {
  explanation: string;
}

export function ExplanationView({ explanation }: ExplanationViewProps) {
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([explanation], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'homework-explanation.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReadAloud = () => {
    const utterance = new SpeechSynthesisUtterance(explanation);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Explanation
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleReadAloud}
            className="p-2 rounded-full bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 transition-all duration-200"
            title="Read aloud"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-full bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 transition-all duration-200"
            title="Download explanation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
      <div className="prose max-w-none">
        {explanation.split('\n').map((line, index) => (
          <p 
            key={index} 
            className="mb-4 text-gray-700 whitespace-pre-wrap"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}