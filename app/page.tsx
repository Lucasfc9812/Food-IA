import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Camera } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let foods = [];
  try {
    const { data } = await supabase
      .from("foods")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) foods = data;
  } catch (error) {
    console.warn("Could not fetch foods:", error);
  }

  const totals = foods?.reduce(
    (acc, food) => ({
      calories: acc.calories + (food.calories || 0),
      carbs: acc.carbs + (food.carbs || 0),
      protein: acc.protein + (food.protein || 0),
      fat: acc.fat + (food.fat || 0),
    }),
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  ) || { calories: 0, carbs: 0, protein: 0, fat: 0 };

  return (
    <main className="min-h-screen pb-20 p-6 max-w-md mx-auto relative bg-background text-foreground">
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-bold mb-2">Today&apos;s Nutrition</h1>
        <p className="text-muted-foreground">Track your meals and stay healthy.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Calories</p>
          <p className="text-2xl font-bold">{totals.calories}</p>
          <p className="text-xs text-muted-foreground">kcal</p>
        </div>
        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Protein</p>
          <p className="text-2xl font-bold">{totals.protein}g</p>
        </div>
        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Carbs</p>
          <p className="text-2xl font-bold">{totals.carbs}g</p>
        </div>
        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Fat</p>
          <p className="text-2xl font-bold">{totals.fat}g</p>
        </div>
      </div>

      {/* Recent Meals */}
      <h2 className="text-xl font-semibold mb-4">Recent Meals</h2>
      <div className="grid grid-cols-2 gap-4">
        {foods?.map((food) => (
          <div key={food.id} className="relative aspect-square rounded-xl overflow-hidden bg-muted border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={food.image_url}
              alt="Food"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs backdrop-blur-sm">
              <span className="font-bold">{food.calories}</span> kcal
            </div>
          </div>
        ))}
        {(!foods || foods.length === 0) && (
          <div className="col-span-2 text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
            No meals logged yet.
          </div>
        )}
      </div>

      {/* FAB */}
      <Link
        href="/camera"
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
      >
        <Camera size={24} />
      </Link>
    </main>
  );
}
