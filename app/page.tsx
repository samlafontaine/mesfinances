import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Page() {
  return (
    <div className="slide-up text-center">
      <div className="space-y-3 md:space-y-0.5 mb-12 md:mb-20">
        <h1 className="text-4xl md:text-5xl tracking-tighter md:leading-snug font-semibold">
          Prends tes finances 💸 en main ✋
        </h1>
        <p className="md:text-xl text-black/80">
          Calculatrices, outils et ressources pour t'aider à prendre de
          meilleures décisions financières.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex flex-col p-1 rounded-md bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 group">
          <Link href="https://www.quickedit.ai">
            <div className="flex flex-col p-1 rounded-md bg-zinc-100 gap-6 dark:bg-zinc-800">
              <div className="bg-gradient-to-r from-red-300 to-rose-500 min-h-40 rounded flex items-center justify-center">
                <Image
                  src="/logo-full.png"
                  width={100}
                  height={100}
                  alt="Picture of the author"
                />
              </div>
              <div className="flex flex-col gap-2 px-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-1">
                    <h2 className="text-lg tracking-tighter group-hover:underline underline-offset-3 transition duration-300 ease-in-out">
                      Calculateur Plex
                    </h2>
                    <ArrowUpRight
                      strokeWidth={1.5}
                      size={18}
                      className="group-hover:rotate-45 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="px-2 bg-rose-100 text-rose-500 uppercase rounded text-sm dark:bg-rose-500 dark:text-rose-100">
                      wip
                    </p>
                    <p className="px-2 bg-zinc-900 text-zinc-200 uppercase rounded text-sm dark:bg-zinc-200 dark:text-zinc-900">
                      2024
                    </p>
                  </div>
                </div>
                <p className="text-left text-sm mb-2">
                  The impact of video is undeniable. Yet, the tools we have at
                  our disposal today to make and edit them are often too complex
                  or expensive. Together with a friend, we're building the
                  future of video making.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
