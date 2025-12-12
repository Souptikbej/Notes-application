import axios from "axios";

export async function checkToxicity(text) {
  try {
    const apiKey = process.env.PERSPECTIVE_API_KEY;

    const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;

    const body = {
      comment: { text },
      languages: ["en"],
      requestedAttributes: { TOXICITY: {} }
    };

    const response = await axios.post(url, body);

    const score =
      response.data.attributeScores.TOXICITY.summaryScore.value;

    return score; // 0 to 1
  } catch (error) {
    console.error("Perspective API Error:", error.response?.data || error);
    throw new Error("Perspective API Failed");
  }
}
