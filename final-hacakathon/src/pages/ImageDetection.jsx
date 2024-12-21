import React, { useState } from 'react';
import axios from 'axios';

function ImageDetection() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    const apiKey = 'AIzaSyCf1qFsFjVDXImsNTEBH4PEJ-dI3zVjcB0'; // Replace with your actual API key
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestPayload = {
      requests: [
        {
          image: {
            content: image.split(',')[1],
          },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 5 },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(visionApiUrl, requestPayload);
      setResult(response.data.responses[0]);
      console.log(result)
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };

  return (
    <div>
      <h1>Google Vision API with React</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={analyzeImage}>Analyze Image</button>
      {result && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageDetection;