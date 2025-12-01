import { model } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
        }

        // Fetch the image
        const imageResp = await fetch(imageUrl);
        if (!imageResp.ok) {
            return NextResponse.json({ error: "Failed to fetch image" }, { status: 400 });
        }

        const imageBuffer = await imageResp.arrayBuffer();

        const prompt = `Analyze this food image. Identify the food item and estimate the nutritional content (calories, carbs in g, protein in g, fat in g). 
    Return ONLY a valid JSON object with these keys: 
    - calories (number)
    - carbs (number)
    - protein (number)
    - fat (number)
    - food_name (string)
    
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: Buffer.from(imageBuffer).toString("base64"),
                    mimeType: imageResp.headers.get("content-type") || "image/jpeg",
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present (just in case)
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const data = JSON.parse(cleanText);
            return NextResponse.json(data);
        } catch (e) {
            console.error("Failed to parse JSON:", text, e);
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

    } catch (error) {
        console.error("Analysis error:", error);
        // @ts-ignore
        return NextResponse.json({ error: `Failed to analyze image: ${error.message || error}` }, { status: 500 });
    }
}
