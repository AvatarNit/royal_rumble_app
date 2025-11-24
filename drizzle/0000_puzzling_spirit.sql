CREATE TABLE "admin_data" (
	"admin_id" integer PRIMARY KEY NOT NULL,
	"email" text,
	"f_name" text,
	"l_name" text
);
--> statement-breakpoint
CREATE TABLE "freshmen_data" (
	"freshmen_id" integer PRIMARY KEY NOT NULL,
	"f_name" text,
	"l_name" text,
	"tshirt_size" text,
	"email" text,
	"primary_language" text,
	"interests" text,
	"health_concerns" text,
	"present" boolean
);
--> statement-breakpoint
CREATE TABLE "group_data" (
	"group_id" integer PRIMARY KEY NOT NULL,
	"event_order" text,
	"route_color" text,
	"start_pos" integer
);
--> statement-breakpoint
CREATE TABLE "group_leader_data" (
	"mentor_id" integer,
	"group_id" integer
);
--> statement-breakpoint
CREATE TABLE "hallway_host_data" (
	"mentor_id" integer,
	"hallway_stop_id" integer
);
--> statement-breakpoint
CREATE TABLE "hallway_stop_data" (
	"hallway_stop_id" integer PRIMARY KEY NOT NULL,
	"location" text
);
--> statement-breakpoint
CREATE TABLE "mentor_attendance_data" (
	"mentor_id" integer,
	"training_id" integer,
	"status" text
);
--> statement-breakpoint
CREATE TABLE "mentor_data" (
	"mentor_id" integer PRIMARY KEY NOT NULL,
	"email" text,
	"f_name" text,
	"l_name" text,
	"grad_year" integer,
	"job" text,
	"pizza_type" text,
	"languages" text,
	"training_day" text,
	"tshirt_size" text,
	"phone_num" integer
);
--> statement-breakpoint
CREATE TABLE "seminar_data" (
	"full_name" text,
	"freshmen_id" integer,
	"teacher_full_name" text,
	"group_id" integer
);
--> statement-breakpoint
CREATE TABLE "trainings_data" (
	"training_id" integer PRIMARY KEY NOT NULL,
	"job" text,
	"date" date,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "group_leader_data" ADD CONSTRAINT "group_leader_data_group_id_group_data_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group_data"("group_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hallway_host_data" ADD CONSTRAINT "hallway_host_data_hallway_stop_id_hallway_stop_data_hallway_stop_id_fk" FOREIGN KEY ("hallway_stop_id") REFERENCES "public"."hallway_stop_data"("hallway_stop_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seminar_data" ADD CONSTRAINT "seminar_data_group_id_group_data_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group_data"("group_id") ON DELETE no action ON UPDATE no action;