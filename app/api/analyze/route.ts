import { groq } from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
        }

        const prompt = `Analyze this food image. Identify the food item and estimate the nutritional content (calories, carbs in g, protein in g, fat in g). 
    Return ONLY a valid JSON object with these keys: 
    - calories (number)
    - carbs (number)
    - protein (number)
    - fat (number)
    - food_name (string)
    
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: prompt,
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrl,
                            },
                        },
                    ],
                },
            ],
            model: "llama-3.2-11b-vision-preview",
            temperature: 0.1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            throw new Error("No content received from Groq");
        }

        try {
            const data = JSON.parse(content);
            return NextResponse.json(data);
        } catch (e) {
            console.error("Failed to parse JSON:", content, e);
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

    } catch (error) {
        console.error("Analysis error:", error);
        // @ts-ignore
        return NextResponse.json({ error: `Failed to analyze image: ${error.message || error}` }, { status: 500 });
    }
}
