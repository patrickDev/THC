CREATE TABLE `buyer_preferences` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`budget_min_cents` integer NOT NULL,
	`budget_max_cents` integer NOT NULL,
	`strategy` text NOT NULL,
	`markets` text DEFAULT '[]' NOT NULL,
	`financing_type` text NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_type` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`message` text,
	`consent` integer DEFAULT false NOT NULL,
	`source_path` text NOT NULL,
	`ip_hash` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE INDEX `leads_email_idx` ON `leads` (`email`);--> statement-breakpoint
CREATE INDEX `leads_created_at_idx` ON `leads` (`created_at`);--> statement-breakpoint
CREATE TABLE `partner_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`partner_type` text NOT NULL,
	`capital_available_cents` integer,
	`markets_of_interest` text DEFAULT '[]' NOT NULL,
	`years_experience` integer,
	`accredited` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`price_cents` integer NOT NULL,
	`beds` integer NOT NULL,
	`baths` integer NOT NULL,
	`sqft` integer NOT NULL,
	`strategy` text NOT NULL,
	`status` text DEFAULT 'available' NOT NULL,
	`description` text NOT NULL,
	`hero_image_url` text NOT NULL,
	`images` text DEFAULT '[]' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `properties_slug_unique` ON `properties` (`slug`);--> statement-breakpoint
CREATE TABLE `seller_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`property_address` text NOT NULL,
	`property_city` text NOT NULL,
	`property_state` text NOT NULL,
	`zip` text NOT NULL,
	`condition` text NOT NULL,
	`timeline` text NOT NULL,
	`asking_price_cents` integer,
	`reason_for_selling` text,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`quote` text NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`featured` integer DEFAULT false NOT NULL
);
