import React, { useState } from "react";

const HealthForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    diseases: "",
  });

  const YOUR_API_KEY_HERE = "AIzaSyBtWZH2HJDkhlA2hNltShDcjs2VWczzz9g";
  const [errors, setErrors] = useState({});
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.age.trim()) newErrors.age = "Age is required.";
    else if (isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Age must be a positive number.";
    if (!formData.diseases.trim())
      newErrors.diseases = "Diseases field is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoading(true);

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${YOUR_API_KEY_HERE}`;

        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: `Based on my health details, please analyze my situation and provide insights. My name is ${formData.fullName}, I am ${formData.age} years old, and I am experiencing the following issues: ${formData.diseases}.  

Please provide the information in a structured format with proper headings and bullet points for clarity:  

1. **Possible Health Risks and Conditions:**  
   - List the potential diseases or conditions I might face.  
   - Provide percentage probabilities for each condition, if possible.  

2. **Precautions to Take:**  
   - Suggest practical steps to prevent or manage these conditions.  
   - Include tips for general health and well-being.  

3. **Recommended Foods and Dietary Advice:**  
   - Provide a list of specific foods or nutrients that can help alleviate or manage these issues.  
   - Include a few sample meal suggestions, if applicable.  

Please ensure the response is structured, clear, and actionable. Avoid vague answers or unnecessary disclaimers. Thank you!

Note:-if user send the person age greater then 90, then, send error that it is invalid age of people and if people send less 0 and less then it then send error
`,
                },
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

        const extractedText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No content available.";
        setResponseText(extractedText);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-black mb-8">
        Health Information Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg w-full max-w-lg p-6 space-y-6"
      >
        {/* Full Name Field */}
        <div>
          <label className="block text-lg font-semibold text-black mb-2">
            Full Name:
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Age Field */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Age:
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>
        


        {/* Diseases Field */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Symptoms you are Facing
          </label>
          <input
            type="text"
            name="diseases"
            value={formData.diseases}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.diseases && (
            <p className="text-red-500 text-sm mt-1">{errors.diseases}</p>
          )}
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black"
          } transition duration-300`}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {/* Response Section */}
      {responseText && (
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg mt-8 p-6">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            AI responses towards your problem
          </h2>
          <p className="text-black whitespace-pre-line">{responseText}</p>
        </div>
      )}

      {apiError && (
        <p className="text-red-500 mt-4">
          Error while generating content: {apiError}
        </p>
      )}
    </div>
  );
};

export default HealthForm;
