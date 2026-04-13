import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.clerk.com/v1/users/count", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      next: { revalidate: 60 } // Cache the response for 60 seconds
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch Clerk stats");
    }

    const data = await res.json();
    return NextResponse.json({ total_count: data.total_count });
  } catch (error) {
    console.error("Clerk API Error:", error);
    // Return a fallback count if API fails
    return NextResponse.json({ total_count: 128000 });
  }
}
