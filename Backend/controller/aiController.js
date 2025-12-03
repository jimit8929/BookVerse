import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateOutline = async (req, res) => {
  try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Please Provide a topic" });
    }


    const prompt = `You are an expert book outline generator. Create a comprehensive book outline based on the following requirements:
    Topic: "${topic}"
    ${description ? `Description: "${description}"` : ""}
    Writing Style: "${style || "Creative"}"
    Number of Chapters: ${numChapters || 5}
    
    Requirements:
    1. Generate exactly ${numChapters || 5} chapters.
    2. Each chapter title should be clear, engaging, and follow a logical progression.
    3. Each chapter description should be 2-3 sentences explaning what the chapter covers
    4. Ensure chapters build upon each other coherently.
    5. Match the "${style || "Creative"}" writing style in your titles and description.


    Output Format:
    Return ONLY a valid JSON array with no additional text, markdown, or formatting. Each object must have exactly two keys: "title" and "description".

    Example structure:
    [
      {
        "title": "Chapter 1: Introduction to the Topic",
        "description": "This chapter introduces the main concepts and sets the stage for the rest of the book."
      },

      {
        "title": "Chapter 2: Deep Dive into Key Concepts",
        "description": "This chapter explores the fundamental ideas in detail, providing examples and explanations."
      },

      {
        "title": "Chapter 3: Advanced Applications",
        "description": "This chapter discusses advanced topics and real-world applications of the concepts covered."
      }
    ]
    
    Generate the outline now.

    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    //find and extract JSON array from text

    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      console.error("No JSON array found in the response", text);
      return res
        .status(500)
        .json({ message: "Failed to parse AI response, no JSON array found" });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    //validate if response is valid JSON

    try {
      const outline = JSON.parse(jsonString);
      return res.status(200).json({ outline });
    } catch (e) {
      console.error("Failed to parse AI response", jsonString);

      res
        .status(500)
        .json({
          message:
            "Failed to generate a valid outline. The AI response was not valid JSON",
        });
    }
  } catch (error) {
    console.error("Error generating outline:", error);
    res.status(500).json({ message: "Failed to generate outline" });
  }
};

export const generateChapterContent = async (req, res) => {
  try {
    const {chapterTitle , chapterDescription , style} = req.body;

    if(!chapterTitle){
      return res.status(400).json({message: "Please provide a chapter title"});
    }

    const prompt = `You are an expert writer specializing in ${style} content. Write a complete chapter for a book with the following specifications:
    Chapter Title: "${chapterTitle}"
    ${chapterDescription ? `Chapter Description: "${chapterDescription}"` : ""}
    Writing Style: "${style || "Creative"}"
    Target Length: comprehensive and detailed (aim for 1000-1500 words)


    Requirements:
    1. Write in a ${style.toLowerCase()} tone throughout the chapter.
    2. Structure the content with clear sections and smooth transitions.
    3. Include relevant examples, explanations, or anecdotes as appropriate for the style.
    4. Ensure the content flows logically from introduction to conclusion.
    5. Make the content engaging and valuable for readers.

    ${chapterDescription ? "6. Cover al points mentioned in the chapter description." : ""}

    Format Guidelines:
    -Start with a compelling opening paragraph
    -use clear paragraph breaks for readability.
    -include subheadings if appropriate for the content Length
    -end with a strong conclusion or transition to the next chapter.
    -write in plain text without any markdown or special formatting.

    Begin writing the chapter now.
    `;

    const response = await ai.models.generateContent({
      model : "gemini-2.5-flash",
      contents : prompt,
    })

    res.status(200).json({content: response.text});
  } catch (error) {
    console.error("Error generating chapter content:", error);
    res.status(500).json({ message: "Failed to generate chapter content" });
  }
};
