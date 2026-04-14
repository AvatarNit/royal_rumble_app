-- Rename group_leader_data table to ambassador_data
ALTER TABLE "group_leader_data" RENAME TO "ambassador_data";

-- Add new columns to mentor_data
ALTER TABLE "mentor_data" ADD COLUMN "past_mentor" boolean;
ALTER TABLE "mentor_data" ADD COLUMN "interests_involvement" text;
