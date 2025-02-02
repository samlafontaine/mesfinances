import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import { Newsletter } from "../components/newsletter";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div className="slide-up">
      <h1 className="text-3xl md:text-4xl tracking-tighter md:leading-snug font-semibold mb-4">
        Blog
      </h1>
      <p className="mb-8">
        Si, comme moi, tu penses souvent à tes finances personnelles et que tu
        as envie de prendre tes finances en main, tu es à la bonne place. Ici,
        tu trouveras une série d'articles qui traitent des finances personnelles
        sous tous ses angles. Bonne lecture!
      </p>
      <ul className="space-y-2">
        {posts.map((post) => {
          const { id, date, title } = post;
          return (
            <li className="" key={id}>
              <Link
                href={`/blog/${id}`}
                className="font-medium underline underline-offset-2 decoration-green-800 hover:decoration-2 hover:text-green-800"
              >
                {title}
              </Link>
              , {date}
            </li>
          );
        })}
      </ul>
      <Newsletter />
    </div>
  );
}
