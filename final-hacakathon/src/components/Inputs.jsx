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
                  text: `You are an AI health assistant. Please analyze the following details:

- **Full Name:** ${formData.fullName}
- **Age:** ${formData.age} years old
- **Current Health Issues:** ${formData.diseases}

Please follow these instructions:

1. **Age Validation:**
   - If the user's age is less than 0 or greater than 90, please provide an error message: "Invalid age. Age must be between 1 and 90 years old."
   - If the user provides a valid age, proceed with the analysis.

2. **Health Analysis (If valid age):**  
   Please structure the response in the following format:
   
   **Possible Health Risks and Conditions:**  
   - List the potential diseases or conditions the user might face based on the provided health issues.  
   - Provide probabilities for each condition if available, or mention if it's not possible to estimate probabilities.

   **Precautions to Take:**  
   - Suggest practical steps to prevent or manage these conditions.  
   - Provide tips for general health and well-being.  

   **Recommended Foods and Dietary Advice:**  
   - Suggest specific foods or nutrients that can help alleviate or manage the health issues.  
   - Include a few sample meal suggestions based on the condition.  

3. **Invalid Input:**  
   - If the user's input does not match the expected format and does not provide symtoms that he/she facing , return an error message: "Invalid input. Please provide valid health information including full name, age, and current health issues."

⚠️ **Guidelines:**  
- Ensure the response is structured, clear, and actionable.  
- Avoid vague or speculative answers, and only provide data-backed information.

If the input is valid (age between 1 and 90, proper health issues format), proceed with the analysis. Otherwise, return an error message.`,
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
