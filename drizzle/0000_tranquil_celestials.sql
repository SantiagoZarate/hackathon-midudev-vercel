CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`roadtripFingerprint` text NOT NULL,
	FOREIGN KEY (`roadtripFingerprint`) REFERENCES `roadtrip`(`fingerprint`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `location` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`exact_location` text NOT NULL,
	`aproximate_distance_in_km` integer NOT NULL,
	`lat` integer NOT NULL,
	`lng` integer NOT NULL,
	`type` text NOT NULL,
	`roadtripFingerprint` text NOT NULL,
	FOREIGN KEY (`roadtripFingerprint`) REFERENCES `roadtrip`(`fingerprint`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `roadtrip` (
	`fingerprint` text PRIMARY KEY NOT NULL,
	`lat` integer NOT NULL,
	`lng` integer NOT NULL
);
