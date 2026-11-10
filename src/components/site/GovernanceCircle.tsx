import infographic from "@/assets/together-for-a-brighter-future-transparent.png";

export function GovernanceCircle({ description }: { description: string }) {
  return (
    <figure className="mx-auto my-4 w-full max-w-2xl">
      <img
        src={infographic}
        alt={description}
        width={1254}
        height={1254}
        loading="lazy"
        className="block h-auto w-full"
      />
    </figure>
  );
}
