import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('ai_output', {
    id: serial('id').primaryKey(),
    formData: text('form_data'),
    aiResponse: text('ai_response'),
    templateSlug: text('template_slug'),
    createdBy: text('created_by'),
    createdAt: timestamp('created_at').defaultNow(), // This will automatically set the current timestamp
  });
