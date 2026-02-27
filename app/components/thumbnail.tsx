"use client";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Eye } from "lucide-react";

interface ThumbnailProps {
  link: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
  imageSrc?: string;
  alt?: string;
  year?: string;
  popular?: boolean;
  views?: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  link,
  title,
  description,
  icon,
  views,
}) => {
  const router = useRouter();

  const handleClick = () => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: link }),
    }).catch(() => {});

    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      router.push(link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-150 group"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xl shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <h2 className="text-[15px] font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
          {description}
        </p>
      </div>
      {views !== undefined && (
        <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
          <Eye size={14} strokeWidth={1.5} />
          <span>{views.toLocaleString("fr-CA")}</span>
        </div>
      )}
      <ArrowUpRight
        strokeWidth={1.5}
        size={16}
        className="shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 group-hover:rotate-45 transition duration-150"
      />
    </div>
  );
};

export default Thumbnail;
