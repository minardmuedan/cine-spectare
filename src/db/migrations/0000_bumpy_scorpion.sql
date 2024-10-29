CREATE TYPE "public"."purpose" AS ENUM('email-verification', 'create-password', 'change-password-verification', 'change-password');--> statement-breakpoint
CREATE TYPE "public"."provider" AS ENUM('credentials', 'google', 'github');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token" (
	"id" text PRIMARY KEY NOT NULL,
	"emailPayload" text NOT NULL,
	"code" text NOT NULL,
	"purpose" "purpose" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"oauthId" text,
	"provider" "provider" NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"hashedPassword" text,
	"avatarUrl" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
