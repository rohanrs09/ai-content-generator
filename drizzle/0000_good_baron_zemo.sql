CREATE TABLE IF NOT EXISTS "ai_output" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_data" text,
	"ai_response" text,
	"template_slug" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);
