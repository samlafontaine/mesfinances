"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Eye, Sparkles } from "lucide-react";

interface ThumbnailProps {
  link: string;
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  year: string;
  tag: string;
  popular?: boolean;
  views?: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  link,
  title,
  description,
  imageSrc,
  alt,
  year,
  tag,
  popular,
  views,
}) => {
  const router = useRouter();

  const tagBgColorMap: { [key: string]: string } = {
    Immobilier: "bg-green-700",
    Autre: "bg-red-500",
    "Finances personnelles": "bg-blue-500",
    // Add more mappings here as needed
  };

  const tagBgColor = tagBgColorMap[tag] || "bg-zinc-900";

  const handleClick = () => {
    // Fire and forget — don't block navigation
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
    <div className="relative">
      <div onClick={handleClick} className="block cursor-pointer">
        {popular && (
          <div className="absolute -top-2 -right-1 bg-yellow-500 text-yellow-50 px-2 py-1 rounded-full text-xs font-medium z-10 shadow-sm">
            <Sparkles strokeWidth={1.5} className="inline h-4 w-4" /> populaire
          </div>
        )}
        <div className="flex flex-col p-0.5 rounded-md bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 group">
          <div className="flex flex-col p-1 rounded-md bg-zinc-100 gap-6 dark:bg-zinc-800">
            <div className="min-h-40 rounded flex items-center justify-center">
              <Image
                src={imageSrc}
                width={400}
                height={100}
                alt={alt}
                className="rounded"
              />
            </div>
            <div className="flex flex-col gap-3 px-2">
              <div className="flex flex-col justify-between items-left gap-3">
                <div className="flex flex-row items-center gap-1">
                  <h2 className="text-lg text-left tracking-tighter group-hover:underline underline-offset-3 transition duration-300 ease-in-out">
                    {title}
                  </h2>
                  <ArrowUpRight
                    strokeWidth={1.5}
                    size={18}
                    className="group-hover:rotate-45 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div
                    className={`text-center px-2 py-1 rounded text-xs uppercase text-zinc-200 dark:text-zinc-900 ${tagBgColor}`}
                  >
                    {tag}
                  </div>
                  {views !== undefined && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye size={14} strokeWidth={1.5} />
                      <span>{views.toLocaleString("fr-CA")}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-left text-sm mb-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
