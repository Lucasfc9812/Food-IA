"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface FoodData {
    food_name: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
}

export default function AnalysisPage() {
    const searchParams = useSearchParams();
    const imageUrl = searchParams.get("imageUrl");
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<FoodData>({
        food_name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0
    });

    useEffect(() => {
        if (!imageUrl) return;

        const analyze = async () => {
            try {
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    body: JSON.stringify({ imageUrl }),
                });
                const result = await res.json();
                if (result.error) throw new Error(result.error);

                setData(result);
            } catch (error) {
                console.error("Analysis failed:", error);
                alert("Failed to analyze image.");
            } finally {
                setLoading(false);
            }
        };

        analyze();
    }, [imageUrl]);

    const handleSave = async () => {
        setSaving(true);
        try {
            // We don't strictly need user_id if RLS allows anon inserts, or we can handle it later.
            // For now, we'll just insert.
            const { error } = await supabase.from("foods").insert({
                image_url: imageUrl,
                ...data,
            });

            if (error) throw error;

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save food. Make sure the database table exists.");
        } finally {
            setSaving(false);
        }
    };

    if (!imageUrl) return <div className="p-6">No image provided</div>;

    return (
        <div className="min-h-screen bg-background p-6 max-w-md mx-auto">
            <header className="flex items-center mb-6">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold ml-2">Analysis Result</h1>
            </header>

            <div className="mb-6 rounded-2xl overflow-hidden shadow-sm border aspect-video relative bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Analyzed Food" className="w-full h-full object-cover" />
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="animate-spin text-primary" size={48} />
                    <p className="text-muted-foreground animate-pulse">Analyzing food with AI...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Food Name</label>
                        <input
                            type="text"
                            value={data.food_name}
                            onChange={(e) => setData({ ...data, food_name: e.target.value })}
                            className="w-full p-3 rounded-xl bg-muted border-transparent focus:border-primary focus:ring-2 outline-none transition-all font-semibold"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground">Calories</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.calories}
                                    onChange={(e) => setData({ ...data, calories: Number(e.target.value) })}
                                    className="w-full p-3 rounded-xl bg-muted border-transparent focus:border-primary focus:ring-2 outline-none transition-all font-mono"
                                />
                                <span className="absolute right-3 top-3 text-sm text-muted-foreground">kcal</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground">Protein</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.protein}
                                    onChange={(e) => setData({ ...data, protein: Number(e.target.value) })}
                                    className="w-full p-3 rounded-xl bg-muted border-transparent focus:border-primary focus:ring-2 outline-none transition-all font-mono"
                                />
                                <span className="absolute right-3 top-3 text-sm text-muted-foreground">g</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground">Carbs</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.carbs}
                                    onChange={(e) => setData({ ...data, carbs: Number(e.target.value) })}
                                    className="w-full p-3 rounded-xl bg-muted border-transparent focus:border-primary focus:ring-2 outline-none transition-all font-mono"
                                />
                                <span className="absolute right-3 top-3 text-sm text-muted-foreground">g</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground">Fat</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.fat}
                                    onChange={(e) => setData({ ...data, fat: Number(e.target.value) })}
                                    className="w-full p-3 rounded-xl bg-muted border-transparent focus:border-primary focus:ring-2 outline-none transition-all font-mono"
                                />
                                <span className="absolute right-3 top-3 text-sm text-muted-foreground">g</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-8 active:scale-95"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Check />}
                        Confirm & Save
                    </button>
                </div>
            )}
        </div>
    );
}
