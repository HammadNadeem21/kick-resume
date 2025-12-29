const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // There isn't a direct listModels method on the client instance in some SDK versions exposed easily this way without iterating
    // But we can try to hit the REST API directly or just try a standard model like gemini-pro to see if it works.
    
    // Actually, the error message said "Call ListModels". In this SDK, it might be via the model manager if exposed.
    // Let's rely on a simple curl to list models to be dependency-free regarding SDK versions.
    
    console.log("Use curl script instead.");
  } catch (e) {
    console.error(e);
  }
}

listModels();
