import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const settings = pgTable("settings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  showFeedback: boolean("showFeedback").notNull(),
  canChildrenChangeSettings: boolean("canChildrenChangeSettings"),
});
