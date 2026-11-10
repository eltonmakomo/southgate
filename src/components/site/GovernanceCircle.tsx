import { BookOpen, GraduationCap, Landmark, Users } from "lucide-react";
import emblem from "@/assets/southgate-senior-emblem.png.asset.json";
import { school } from "@/content/site";

const sectors = [
  { x: 175, y: 175, start: 182, end: 268, tone: "text-olive", Icon: Users },
  { x: 465, y: 175, start: 272, end: 358, tone: "text-rose", Icon: GraduationCap },
  { x: 465, y: 465, start: 2, end: 88, tone: "text-sage", Icon: BookOpen },
  { x: 175, y: 465, start: 92, end: 178, tone: "text-gold", Icon: Landmark },
];

function point(radius: number, angle: number) {
  const radians = angle * Math.PI / 180;
  return `${320 + radius * Math.cos(radians)} ${320 + radius * Math.sin(radians)}`;
}

function segment(start: number, end: number) {
  return `M ${point(286, start)} A 286 286 0 0 1 ${point(286, end)} L ${point(132, end)} A 132 132 0 0 0 ${point(132, start)} Z`;
}

export function GovernanceCircle({ groups, authorityNote, description }: {
  groups: string[];
  authorityNote: string;
  description: string;
}) {
  return (
    <figure className="mx-auto my-4 w-full max-w-2xl">
      <svg viewBox="0 0 640 640" role="img" aria-label={description} className="block h-auto w-full overflow-visible">
        <title>{description}</title>
        <circle cx="320" cy="320" r="304" className="fill-none stroke-border" strokeWidth="1" strokeDasharray="3 8" />
        {sectors.map(({ x, y, start, end, tone, Icon }, index) => (
          <g key={groups[index]}>
            <path d={segment(start, end)} className={`${tone} fill-current`} />
            <g transform={`translate(${x - 23} ${y - 55})`} className={index === 3 ? "text-ink" : "text-primary-foreground"}>
              <Icon width="46" height="46" strokeWidth="1.5" aria-hidden="true" />
            </g>
            <text x={x} y={y + 22} textAnchor="middle" className={`font-display text-[25px] font-semibold ${index === 3 ? "fill-ink" : "fill-primary-foreground"}`}>
              {groups[index]}
            </text>
            {index === 3 && (
              <text x={x} y={y + 48} textAnchor="middle" className="fill-ink font-sans text-[16px]">
                {authorityNote}
              </text>
            )}
          </g>
        ))}
        <circle cx="320" cy="320" r="116" className="fill-card stroke-border" strokeWidth="1" />
        <image href={emblem.url} x="242" y="246" width="156" height="148" preserveAspectRatio="xMidYMid meet" aria-label={school.name} />
      </svg>
    </figure>
  );
}