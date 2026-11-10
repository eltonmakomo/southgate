import infographic from "@/assets/together-for-a-brighter-future.png.asset.json";

export function GovernanceCircle({ description }: { description: string }) {
  return (
    <figure className="mx-auto my-4 w-full max-w-2xl">
      <div className="overflow-hidden rounded-lg bg-card p-3 shadow-card sm:p-6">
        <img
          src={infographic.url}
          alt={description}
          width={1254}
          height={1254}
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
    </figure>
  );
}
