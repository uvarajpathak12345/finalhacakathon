import React, { useState } from "react";

const HealthChatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null); // Store Base64 image data
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const YOUR_API_KEY_HERE = "AIzaSyBtWZH2HJDkhlA2hNltShDcjs2VWczzz9g";

  // Handle Send Message
  const handleSendMessage = async () => {
    if (!input.trim() && !image) return;

    const userMessage = image
      ? { role: "user", text: "Uploaded an image", image }
      : { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setImage(null);
    setLoading(true);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${YOUR_API_KEY_HERE}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are an AI health assistant specialized in analyzing and providing reliable health-related information. You can handle the following:

1. **General Health Topics:**  
   - Symptoms, treatments, health tips, and preventive care.

2. **Genetic Information:**  
   - DNA analysis, hereditary diseases, genetic mutations, and genetic testing insights.

3. **Rare Diseases:**  
   - Information on rare medical conditions, symptoms, treatments, and research updates.

4. **Blood Test Analysis:**  
   - Analyze blood test results provided by the user.  
   - Identify deficiencies, abnormalities, or concerning levels (e.g., iron, hemoglobin, vitamin D, cholesterol).  
   - Provide actionable recommendations for improvement.  
   - Present the findings in a clear, structured format with headings and bullet points.

5. **Skin Problem Identification (via Image):**  
   - If the user provides a Base64-encoded image of their skin problem, analyze it.  
   - Suggest possible skin conditions (e.g., eczema, psoriasis, acne, fungal infection).  
   - Recommend over-the-counter treatments or suggest consulting a dermatologist if necessary.  
   - Provide a structured analysis of the image findings.

⚠️ **Guidelines:**  
- Stay focused on health, genetic, rare diseases, blood tests, and skin problem topics.  
- If a question is unrelated, politely remind the user of your specialization.  
- Ensure all responses are clear, actionable, and structured with proper headings and bullet points.  
- Avoid vague or speculative answers.  
- Use evidence-based data and mention NIH as a reliable reference when applicable.

User Question: ${input}`,
              },
              ...(image
                ? [
                    {
                      inline_data: {
                        mime_type: "image/jpeg",
                        data: image.split(",")[1],
                      },
                    },
                  ]
                : []),
            ],
          },
        ],
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const botResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process your request.";

      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result); // Store Base64 image
      setMessages((prev) => [
        ...prev,
        { role: "user", text: "Uploaded an image", image: reader.result },
      ]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Health Chat Assistant
      </h1>
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl flex flex-col h-[600px] border border-gray-200">
        {/* Chat Display */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 max-w-[80%] rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="mt-2 rounded-md max-w-[200px]"
                />
              )}
            </div>
          ))}
          {loading && (
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
              Generating response...
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask health-related questions..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload"
          />
          <label
            htmlFor="upload"
            className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
          >
            Upload
          </label>
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {apiError && <p className="text-red-500 mt-4">Error: {apiError}</p>}
    </div>
  );
};

export default HealthChatbox;
