CREATE TABLE "ip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" text NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"mods" text NOT NULL,
	CONSTRAINT "ip_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE "port" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" integer NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"mods" text NOT NULL,
	CONSTRAINT "port_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE "url" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" text NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"mods" text NOT NULL,
	CONSTRAINT "url_value_unique" UNIQUE("value")
);
