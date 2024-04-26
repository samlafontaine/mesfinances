import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ThumbnailProps {
  link: string;
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  year: string;
  tag: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  link,
  title,
  description,
  imageSrc,
  alt,
  year,
  tag,
}) => {
  const tagBgColorMap: { [key: string]: string } = {
    Immobilier: "bg-green-700",
    Autre: "bg-red-500",
    // Add more mappings here as needed
  };

  const tagBgColor = tagBgColorMap[tag] || "bg-zinc-900";

  return (
    <div className="flex flex-col p-0.5 rounded-md bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 group">
      <Link href={link}>
        <div className="flex flex-col p-1 rounded-md bg-zinc-100 gap-6 dark:bg-zinc-800">
          <div className="min-h-40 rounded flex items-center justify-center">
            <Image
              src={imageSrc}
              width={300}
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
              <div className="flex flex-row gap-1">
                <p className="px-1 py-0.5 bg-zinc-900 text-zinc-200 uppercase rounded text-xs dark:bg-zinc-200 dark:text-zinc-900">
                  {year}
                </p>
                <p
                  className={`px-1 py-0.5 rounded text-xs uppercase text-zinc-200 dark:text-zinc-900 ${tagBgColor}`}
                >
                  {tag}
                </p>
              </div>
            </div>
            <p className="text-left text-sm mb-2">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;
