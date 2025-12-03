ALTER TABLE "group_data" RENAME COLUMN "route_color" TO "route_num";--> statement-breakpoint
ALTER TABLE "group_data" ALTER COLUMN "group_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "group_leader_data" ALTER COLUMN "group_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "seminar_data" ALTER COLUMN "group_id" SET DATA TYPE text;