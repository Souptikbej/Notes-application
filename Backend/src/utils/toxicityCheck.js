import axios from "axios";

export async function checkToxicity(text) {
    try {
        const response = await axios.post(
            "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze",
            {
                comment: { text },
                languages: ["en"],
                requestedAttributes: {
                    TOXICITY: {},
                    INSULT: {},
                    PROFANITY: {},
                    THREAT: {}
                }
            },
            {
                params: { key: process.env.PERSPECTIVE_API_KEY }
            }
        );

        const scores = response.data.attributeScores;

        const toxicity =
            scores.TOXICITY.summaryScore.value ||
            scores.INSULT.summaryScore.value ||
            scores.PROFANITY.summaryScore.value ||
            scores.THREAT.summaryScore.value;

        return toxicity; // 0.0 – 1.0
    } catch (err) {
        console.error("Perspective API Error:", err.message);
        return 0;
    }
}
