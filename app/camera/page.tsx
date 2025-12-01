"use client";

import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CameraPage() {
    const webcamRef = useRef<Webcam>(null);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (!imageSrc) return;

        setIsUploading(true);

        try {
            // Convert base64 to blob
            const res = await fetch(imageSrc);
            const blob = await res.blob();

            const fileName = `${crypto.randomUUID()}.jpeg`;

            // Upload to Supabase
            const { error } = await supabase.storage
                .from('food-images')
                .upload(fileName, blob, {
                    contentType: 'image/jpeg'
                });

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('food-images')
                .getPublicUrl(fileName);

            // Redirect to analysis
            router.push(`/analysis?imageUrl=${encodeURIComponent(publicUrl)}`);

        } catch (error) {
            console.error("Error uploading:", error);
            // @ts-ignore
            alert(`Failed to upload image: ${error.message || error}`);
            setIsUploading(false);
        }
    }, [router]);

    return (
        <div className="h-screen w-full bg-black relative flex flex-col">
            <div className="absolute top-4 left-4 z-10">
                <button onClick={() => router.back()} className="text-white p-2 rounded-full bg-black/20 backdrop-blur-md">
                    <ArrowLeft />
                </button>
            </div>

            <div className="flex-1 relative overflow-hidden">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="h-32 bg-black flex items-center justify-center pb-8">
                <button
                    onClick={capture}
                    disabled={isUploading}
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/10 active:bg-white/30 transition-all"
                >
                    {isUploading ? (
                        <Loader2 className="animate-spin text-white" size={32} />
                    ) : (
                        <div className="w-16 h-16 bg-white rounded-full" />
                    )}
                </button>
            </div>
        </div>
    );
}
