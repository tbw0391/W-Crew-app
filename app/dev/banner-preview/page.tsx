import { Trophy } from "lucide-react";
import { placeEmoji, ordinalPlace } from "@/lib/raceResults";

// Throwaway preview page — no database reads/writes, hardcoded fake data
// only. Renders the exact same markup as the race-result banner on the home
// page (app/page.tsx) so the medal/team-color styling can be checked in a
// browser without ever touching real regatta data. Delete this route once
// it's validated.

type DemoResult = {
  lineupId: string;
  raceLabel: string | null;
  categoryLabel: string;
  place: number;
  resultTime: string | null;
};

const DEMO_RESULTS: DemoResult[] = [
  { lineupId: "1", raceLabel: "Event 4", categoryLabel: "Women's 1V8", place: 1, resultTime: "6:42.1" },
  { lineupId: "2", raceLabel: "Event 7", categoryLabel: "Men's 1V8", place: 2, resultTime: "6:48.7" },
  { lineupId: "3", raceLabel: "Event 9", categoryLabel: "Women's 2V4+", place: 3, resultTime: "7:15.4" },
  { lineupId: "4", raceLabel: "Event 11", categoryLabel: "Men's 2V8", place: 5, resultTime: "7:02.9" },
  { lineupId: "5", raceLabel: "Event 13", categoryLabel: "Women's 3V4+", place: 4, resultTime: "7:38.2" },
];

export default function BannerPreviewPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl flex flex-col gap-2">
        <h1 className="text-xl font-bold">Race result banner preview</h1>
        <p className="text-sm text-gray-500">
          Temporary route (app/dev/banner-preview) — not linked from nav, no database access.
          Delete app/dev/banner-preview/page.tsx once you&apos;re happy with the look.
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-2">
        {DEMO_RESULTS.map((b, i) => {
          const isMedal = b.place <= 3;
          const medalStyle =
            b.place === 1
              ? "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-yellow-950 border-2 border-yellow-600"
              : b.place === 2
              ? "bg-gradient-to-r from-gray-200 via-slate-300 to-gray-200 text-gray-900 border-2 border-gray-500"
              : b.place === 3
              ? "bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-amber-50 border-2 border-amber-800"
              : i % 2 === 0
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-secondary)] text-white";

          return (
            <div
              key={b.lineupId}
              className={`relative overflow-hidden rounded-lg px-4 py-3 text-sm font-medium ${medalStyle}`}
            >
              {isMedal && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center justify-around text-lg opacity-40"
                >
                  <span>🎉</span>
                  <span>✨</span>
                  <span>🎊</span>
                  <span>✨</span>
                  <span>🎉</span>
                </span>
              )}
              <span className="relative flex items-center gap-2">
                {isMedal && <Trophy className="w-5 h-5 shrink-0 animate-bounce" />}
                <span>
                  {b.raceLabel && <strong>{b.raceLabel}</strong>}
                  {b.raceLabel && " — "}
                  {b.categoryLabel}: {placeEmoji(b.place)} <strong>{ordinalPlace(b.place)} place</strong>
                  {b.resultTime && <> · {b.resultTime}</>}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
