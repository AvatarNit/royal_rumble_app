CREATE TABLE "site_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "site_content_key_unique" UNIQUE("key")
);
