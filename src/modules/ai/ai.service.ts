import groq from "../../config/groq";

interface GenerateBlogPayload {
  topic: string;
  category: string;
  tone: string;
  length: string;
}

interface ChatPayload {
  blog: string;
  message: string;
}

export const generateBlog = async (
  payload: GenerateBlogPayload
) => {
  try {
    const prompt = `
You are a professional blog writer.

Generate a complete blog.

Topic: ${payload.topic}
Category: ${payload.category}
Tone: ${payload.tone}
Length: ${payload.length}

Return only:

Title:

Short Description:

Content:
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error("========== GROQ ERROR ==========");
    console.error(error);
    console.error("Message:", error?.message);
    console.error("Status:", error?.status);
    console.error("================================");

    throw error;
  }
};

export const chatWithAI = async (
  payload: ChatPayload
) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an AI blog assistant. Always answer using the given blog as context.",
      },
      {
        role: "user",
        content: `Blog:

${payload.blog}

User Question:

${payload.message}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};