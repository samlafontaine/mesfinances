import { getPostById, getAllPosts } from "@/lib/api";
import Link from "next/link";

// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const { html, title, date } = await getPostById(id);
  return (
    <>
      <Link
        href="/blog"
        className="text-sm text-neutral-600 dark:text-neutral-400 invisible md:visible mb-8"
      >
        &larr; back to the blog
      </Link>
      <article className="prose prose-quoteless prose-neutral slide-up dark:prose-invert">
        <h1 className="title font-medium text-3xl tracking-tighter max-w-[650px] mb-2">
          {title}
        </h1>
        <div className="flex justify-between items-center text-sm max-w-[650px]">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {date}
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <hr></hr>
      </article>
    </>
  );
}

// This function can statically allow nextjs to find all the posts that you
// have made, and statically generate them
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
}

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const { title } = await getPostById(id);
  return {
    title,
  };
}
