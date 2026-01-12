ALTER TABLE "trainings_data" RENAME TO "events_data";--> statement-breakpoint
ALTER TABLE "events_data" RENAME COLUMN "training_id" TO "event_id";