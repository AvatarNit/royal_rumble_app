-- Migration: convert group_data.group_id from text PK to serial int, add name column
-- and update all foreign key columns accordingly.

-- ============================================================
-- 1. Drop existing FK constraints that reference group_data.group_id
-- ============================================================
ALTER TABLE "group_route_attendance" DROP CONSTRAINT IF EXISTS "group_route_attendance_group_id_group_data_group_id_fk";

-- ============================================================
-- 2. Add a temporary integer id column to group_data
--    and populate it from the existing text group_id where possible
-- ============================================================
ALTER TABLE "group_data" ADD COLUMN "group_id_new" serial;
ALTER TABLE "group_data" ADD COLUMN "name" text;

-- Copy old group_id into name
UPDATE "group_data" SET "name" = "group_id";

-- ============================================================
-- 3. Add temporary integer groupId columns to FK tables
-- ============================================================
ALTER TABLE "freshmen_data"         ADD COLUMN "group_id_new" integer;
ALTER TABLE "seminar_data"          ADD COLUMN "group_id_new" integer;
ALTER TABLE "ambassador_data"       ADD COLUMN "group_id_new" integer;
ALTER TABLE "group_route_attendance" ADD COLUMN "group_id_new" integer;

-- ============================================================
-- 4. Populate the new FK columns by joining on the old text group_id
-- ============================================================
UPDATE "freshmen_data" f
  SET "group_id_new" = g."group_id_new"
  FROM "group_data" g
  WHERE f."group_id" = g."group_id";

UPDATE "seminar_data" s
  SET "group_id_new" = g."group_id_new"
  FROM "group_data" g
  WHERE s."group_id" = g."group_id";

UPDATE "ambassador_data" a
  SET "group_id_new" = g."group_id_new"
  FROM "group_data" g
  WHERE a."group_id" = g."group_id";

UPDATE "group_route_attendance" r
  SET "group_id_new" = g."group_id_new"
  FROM "group_data" g
  WHERE r."group_id" = g."group_id";

-- ============================================================
-- 5. Drop old text PK and columns
-- ============================================================
ALTER TABLE "group_data" DROP CONSTRAINT "group_data_pkey";
ALTER TABLE "group_data" DROP COLUMN "group_id";

ALTER TABLE "freshmen_data"          DROP COLUMN "group_id";
ALTER TABLE "seminar_data"           DROP COLUMN "group_id";
ALTER TABLE "ambassador_data"        DROP COLUMN "group_id";
ALTER TABLE "group_route_attendance" DROP COLUMN "group_id";

-- ============================================================
-- 6. Rename new columns into place
-- ============================================================
ALTER TABLE "group_data"             RENAME COLUMN "group_id_new" TO "group_id";
ALTER TABLE "freshmen_data"          RENAME COLUMN "group_id_new" TO "group_id";
ALTER TABLE "seminar_data"           RENAME COLUMN "group_id_new" TO "group_id";
ALTER TABLE "ambassador_data"        RENAME COLUMN "group_id_new" TO "group_id";
ALTER TABLE "group_route_attendance" RENAME COLUMN "group_id_new" TO "group_id";

-- ============================================================
-- 7. Set group_data.group_id as primary key and make name NOT NULL
-- ============================================================
ALTER TABLE "group_data" ADD PRIMARY KEY ("group_id");
ALTER TABLE "group_data" ALTER COLUMN "name" SET NOT NULL;

-- ============================================================
-- 8. Re-add FK constraint on group_route_attendance
-- ============================================================
ALTER TABLE "group_route_attendance"
  ADD CONSTRAINT "group_route_attendance_group_id_group_data_group_id_fk"
  FOREIGN KEY ("group_id") REFERENCES "group_data"("group_id") ON DELETE CASCADE;
