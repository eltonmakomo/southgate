import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { schoolEvents } from "@/content/site";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export function SchoolCalendar() {
  const now = new Date();
  const [view, setView] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const [selected, setSelected] = useState<string | null>(null);

  const first = new Date(view.y, view.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const daysIn = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysIn }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const todayIso = iso(now.getFullYear(), now.getMonth(), now.getDate());

  const shift = (n: number) => {
    setSelected(null);
    setView(({ y, m }) => {
      const d = new Date(y, m + n, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };

  const monthEvents = schoolEvents.filter((e) => e.date.startsWith(iso(view.y, view.m, 1).slice(0, 7)));
  const shown = selected ? monthEvents.filter((e) => e.date === selected) : monthEvents;
  const upcoming = schoolEvents.filter((e) => e.date >= todayIso).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="rounded-lg border border-border bg-card p-4 shadow-card sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button type="button" onClick={() => shift(-1)} className="inline-flex min-h-10 items-center gap-1 rounded-md border border-border px-3 text-sm font-semibold hover:bg-sec-soft" aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
          </button>
          <h2 className="font-display text-xl sm:text-2xl" aria-live="polite">{MONTHS[view.m]} {view.y}</h2>
          <button type="button" onClick={() => shift(1)} className="inline-flex min-h-10 items-center gap-1 rounded-md border border-border px-3 text-sm font-semibold hover:bg-sec-soft" aria-label="Next month">
            Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {DAYS.map((d) => (
            <div key={d} className="py-2 font-display text-[0.65rem] uppercase text-muted-foreground sm:text-xs">
              <span className="sm:hidden">{d.slice(0, 3)}</span>
              <span className="hidden sm:inline">{d}</span>
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const key = iso(view.y, view.m, d);
            const has = monthEvents.some((e) => e.date === key);
            return (
              <button
                key={i}
                type="button"
                disabled={!has}
                onClick={() => setSelected(selected === key ? null : key)}
                className={cn(
                  "relative flex aspect-square flex-col items-center justify-center rounded-md border text-sm transition-colors",
                  has ? "border-sec bg-sec-soft font-semibold text-sec-soft-foreground hover:bg-sec hover:text-sec-foreground" : "border-transparent text-foreground/80",
                  selected === key && "bg-sec text-sec-foreground",
                  key === todayIso && "ring-2 ring-accent",
                )}
                aria-label={has ? `${d} ${MONTHS[view.m]}: events` : undefined}
              >
                {d}
                {has && <span className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg">{selected ? "Events for this date" : monthEvents.length ? `Events in ${MONTHS[view.m]}` : "Upcoming events"}</h3>
        {(shown.length ? shown : upcoming).length ? (
          <ul className="flex flex-col gap-3">
            {(shown.length ? shown : upcoming).map((e) => (
              <li key={e.date + e.title} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                <CalendarDays className="h-5 w-5 shrink-0 text-sec" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(e.date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No events are listed yet. Further dates will be added as they are confirmed.</p>
        )}
      </div>
    </div>
  );
}
