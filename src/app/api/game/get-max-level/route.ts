import { db } from "@/database/db";
import { gamesTable } from "@/database/schemas/games";
import { profilesTable } from "@/database/schemas/profiles";
import { createClient } from "@/lib/supabase/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get session" },
        { status: 400 },
      );
    }

    const userId = data.session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const level = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.userId, userId))
      .orderBy(desc(gamesTable.newLevel))
      .limit(1)
      .then((res) => (res.length === 1 ? res[0].newLevel : 1));

    return NextResponse.json({ level }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
