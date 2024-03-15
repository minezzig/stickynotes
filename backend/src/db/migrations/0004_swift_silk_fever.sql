ALTER TABLE "notes" ADD COLUMN "completed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "is_editing" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "created_at" timestamp DEFAULT now();