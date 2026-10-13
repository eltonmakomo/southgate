import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Props = { src: string; poster: string; label: string };

export function HeroVideo({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => setFailed(true));
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {failed ? (
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onError={() => setFailed(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {!failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          aria-pressed={!playing}
          className="glass-dark absolute bottom-6 right-6 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-105"
        >
          {playing ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
