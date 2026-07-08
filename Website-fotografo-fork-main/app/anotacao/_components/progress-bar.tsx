export function ProgressBar({ total, anotadas }: { total: number; anotadas: number }) {
  const percent = total > 0 ? Math.round((anotadas / total) * 100) : 0;

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center gap-4">
        <span className="text-sm font-medium text-emerald-700">
          {anotadas} / {total} anotadas ({percent}%)
        </span>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}