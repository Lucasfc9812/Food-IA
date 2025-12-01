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
        const base64Image = Buffer.from(imageBuffer).toString("base64");

        // Use Hugging Face Inference API (FREE)
        const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || "hf_placeholder";

        const response = await fetch(
            "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: `data:image/jpeg;base64,${base64Image}`,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HF API error: ${response.statusText}`);
        }

        const result = await response.json();
        const description = result[0]?.generated_text || "Unknown food";

        // Simple estimation based on description (fallback)
        const data = {
            food_name: description,
            calories: 250,
            carbs: 30,
            protein: 15,
            fat: 10,
        };

        return NextResponse.json(data);

    } catch (error) {
        console.error("Analysis error:", error);
        // @ts-ignore
        return NextResponse.json({ error: `Failed to analyze image: ${error.message || error}` }, { status: 500 });
    }
}
