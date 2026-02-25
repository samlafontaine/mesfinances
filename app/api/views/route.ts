import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

// GET /api/views — returns all view counts
export async function GET() {
  try {
    const keys = await redis.keys("views:*");

    if (keys.length === 0) {
      return NextResponse.json({});
    }

    const values = await redis.mget<number[]>(...keys);
    const counts: Record<string, number> = {};

    keys.forEach((key, i) => {
      const slug = key.replace("views:", "");
      counts[slug] = values[i] ?? 0;
    });

    return NextResponse.json(counts);
  } catch {
    return NextResponse.json({});
  }
}

// POST /api/views — increment a view count
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const count = await redis.incr(`views:${slug}`);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Failed to increment" }, { status: 500 });
  }
}
