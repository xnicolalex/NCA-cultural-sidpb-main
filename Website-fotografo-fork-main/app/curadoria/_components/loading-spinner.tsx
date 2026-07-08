"use client";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}