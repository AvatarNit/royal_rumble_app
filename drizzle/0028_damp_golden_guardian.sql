CREATE TABLE "block_schedule" (
	"block_schedule_id" serial PRIMARY KEY NOT NULL,
	"block_name" text NOT NULL,
	"start_time" text NOT NULL,
	"duration_minutes" integer NOT NULL,
	CONSTRAINT "block_schedule_block_name_unique" UNIQUE("block_name")
);
--> statement-breakpoint
CREATE TABLE "event_order_pattern" (
	"pattern_id" serial PRIMARY KEY NOT NULL,
	"pattern_num" integer NOT NULL,
	"block_order" text NOT NULL,
	CONSTRAINT "event_order_pattern_pattern_num_unique" UNIQUE("pattern_num")
);
--> statement-breakpoint
CREATE TABLE "group_route_attendance" (
	"attendance_id" serial PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"hallway_stop_id" integer NOT NULL,
	"present" boolean DEFAULT false NOT NULL,
	"marked_at" timestamp,
	CONSTRAINT "unique_group_stop" UNIQUE("group_id","hallway_stop_id")
);
--> statement-breakpoint
CREATE TABLE "tour_route" (
	"route_id" serial PRIMARY KEY NOT NULL,
	"route_num" integer NOT NULL,
	CONSTRAINT "tour_route_route_num_unique" UNIQUE("route_num")
);
--> statement-breakpoint
CREATE TABLE "tour_route_stop" (
	"route_stop_id" serial PRIMARY KEY NOT NULL,
	"route_id" integer NOT NULL,
	"hallway_stop_id" integer NOT NULL,
	"stop_order" integer NOT NULL,
	"duration_minutes" integer NOT NULL,
	CONSTRAINT "unique_route_stop" UNIQUE("route_id","hallway_stop_id"),
	CONSTRAINT "unique_route_order" UNIQUE("route_id","stop_order")
);
--> statement-breakpoint
ALTER TABLE "group_route_attendance" ADD CONSTRAINT "group_route_attendance_group_id_group_data_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group_data"("group_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_route_attendance" ADD CONSTRAINT "group_route_attendance_hallway_stop_id_hallway_stop_data_hallway_stop_id_fk" FOREIGN KEY ("hallway_stop_id") REFERENCES "public"."hallway_stop_data"("hallway_stop_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_route_stop" ADD CONSTRAINT "tour_route_stop_route_id_tour_route_route_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."tour_route"("route_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_route_stop" ADD CONSTRAINT "tour_route_stop_hallway_stop_id_hallway_stop_data_hallway_stop_id_fk" FOREIGN KEY ("hallway_stop_id") REFERENCES "public"."hallway_stop_data"("hallway_stop_id") ON DELETE no action ON UPDATE no action;