import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { schoolEvents } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      <div>
        <div className="mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4">
          <Button variant="ghost" type="button" onClick={() => shift(-1)} className="px-2 text-xs font-semibold uppercase sm:px-3" aria-label="Previous month">
            <ChevronLeft className="text-gold" aria-hidden="true" /> <span className="hidden sm:inline">Previous</span>
          </Button>
          <h2 className="text-center font-display text-lg leading-snug text-primary sm:text-2xl" aria-live="polite">{MONTHS[view.m]} {view.y}</h2>
          <Button variant="ghost" type="button" onClick={() => shift(1)} className="px-2 text-xs font-semibold uppercase sm:px-3" aria-label="Next month">
            <span className="hidden sm:inline">Next</span> <ChevronRight className="text-gold" aria-hidden="true" />
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="grid grid-cols-7 bg-primary text-primary-foreground">
          {DAYS.map((d) => (
            <div key={d} className="min-w-0 py-4 text-center font-display text-[0.6rem] font-semibold uppercase sm:text-[0.65rem]">
              <span className="sm:hidden">{d.slice(0, 3)}</span>
              <span className="hidden sm:inline">{d}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => {
            if (!d) return <div key={i} aria-hidden="true" className="school-calendar-empty min-h-24 border-b border-r border-border sm:min-h-36" />;
            const key = iso(view.y, view.m, d);
            const events = monthEvents.filter((e) => e.date === key);
            const has = events.length > 0;
            const date = <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold", key === todayIso && "bg-primary text-primary-foreground")}>{d}</span>;
            const cellClass = cn("flex min-h-24 min-w-0 flex-col items-start justify-start gap-2 border-b border-r border-border p-1.5 text-left sm:min-h-36 sm:p-3", key === todayIso && "relative ring-1 ring-inset ring-primary");
            if (!has) return <div key={i} className={cellClass} aria-current={key === todayIso ? "date" : undefined}>{date}</div>;
            return (
              <Button
                variant="ghost"
                key={i}
                type="button"
                onClick={() => setSelected(selected === key ? null : key)}
                className={cn(
                  cellClass,
                  "h-auto whitespace-normal rounded-none bg-accent/40 text-foreground hover:bg-accent",
                  selected === key && "bg-accent ring-1 ring-inset ring-primary",
                )}
                aria-pressed={selected === key}
                aria-label={`${d} ${MONTHS[view.m]}: events`}
              >
                {date}
                {events.map((e) => <span key={e.title} className="hidden w-full break-words text-xs leading-relaxed text-primary sm:block">{e.title}</span>)}
                <span className="h-1.5 w-1.5 rounded-full bg-primary sm:hidden" aria-hidden="true" />
              </Button>
            );
          })}
        </div>
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
