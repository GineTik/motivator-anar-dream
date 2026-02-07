import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_process_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"icon_active_id" integer,
  	"button_link" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_process_tabs_locales" (
  	"title" varchar,
  	"badge" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_locales" (
  	"badge_text" varchar DEFAULT 'What you will find here',
  	"heading" varchar DEFAULT 'Your path to transformation',
  	"subtitle" varchar DEFAULT 'Discover practical tools for consciousness and self-discovery that bring real transformation to your life',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"icon_active_id" integer,
  	"button_link" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_tabs_locales" (
  	"title" varchar,
  	"badge" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_locales" (
  	"badge_text" varchar DEFAULT 'What you will find here',
  	"heading" varchar DEFAULT 'Your path to transformation',
  	"subtitle" varchar DEFAULT 'Discover practical tools for consciousness and self-discovery that bring real transformation to your life',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "badge_text" SET DEFAULT 'Space for inner awakening';
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "heading" SET DEFAULT 'Create your path';
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "subtitle" SET DEFAULT 'Connect with yourself, unlock your potential, and create your reality through love, clarity, and strength';
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "cta_form_button_text" SET DEFAULT 'Start Your Journey';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "badge_text" SET DEFAULT 'Space for inner awakening';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "heading" SET DEFAULT 'Create your path';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "subtitle" SET DEFAULT 'Connect with yourself, unlock your potential, and create your reality through love, clarity, and strength';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "cta_form_button_text" SET DEFAULT 'Start Your Journey';
  ALTER TABLE "pages_blocks_process_tabs" ADD CONSTRAINT "pages_blocks_process_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_tabs" ADD CONSTRAINT "pages_blocks_process_tabs_icon_active_id_media_id_fk" FOREIGN KEY ("icon_active_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_tabs" ADD CONSTRAINT "pages_blocks_process_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_tabs" ADD CONSTRAINT "pages_blocks_process_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_tabs_locales" ADD CONSTRAINT "pages_blocks_process_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_locales" ADD CONSTRAINT "pages_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_tabs" ADD CONSTRAINT "_pages_v_blocks_process_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_tabs" ADD CONSTRAINT "_pages_v_blocks_process_tabs_icon_active_id_media_id_fk" FOREIGN KEY ("icon_active_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_tabs" ADD CONSTRAINT "_pages_v_blocks_process_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_tabs" ADD CONSTRAINT "_pages_v_blocks_process_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_tabs_locales" ADD CONSTRAINT "_pages_v_blocks_process_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_locales" ADD CONSTRAINT "_pages_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_process_tabs_order_idx" ON "pages_blocks_process_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_tabs_parent_id_idx" ON "pages_blocks_process_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_tabs_icon_idx" ON "pages_blocks_process_tabs" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_process_tabs_icon_active_idx" ON "pages_blocks_process_tabs" USING btree ("icon_active_id");
  CREATE INDEX "pages_blocks_process_tabs_image_idx" ON "pages_blocks_process_tabs" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_process_tabs_locales_locale_parent_id_unique" ON "pages_blocks_process_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_badge_badge_icon_idx" ON "pages_blocks_process" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_process_locales_locale_parent_id_unique" ON "pages_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_tabs_order_idx" ON "_pages_v_blocks_process_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_tabs_parent_id_idx" ON "_pages_v_blocks_process_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_tabs_icon_idx" ON "_pages_v_blocks_process_tabs" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_process_tabs_icon_active_idx" ON "_pages_v_blocks_process_tabs" USING btree ("icon_active_id");
  CREATE INDEX "_pages_v_blocks_process_tabs_image_idx" ON "_pages_v_blocks_process_tabs" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_tabs_locales_locale_parent_id_unique" ON "_pages_v_blocks_process_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_order_idx" ON "_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_parent_id_idx" ON "_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_path_idx" ON "_pages_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_badge_badge_icon_idx" ON "_pages_v_blocks_process" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_locales_locale_parent_id_unique" ON "_pages_v_blocks_process_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_process_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_tabs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_tabs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_process_tabs" CASCADE;
  DROP TABLE "pages_blocks_process_tabs_locales" CASCADE;
  DROP TABLE "pages_blocks_process" CASCADE;
  DROP TABLE "pages_blocks_process_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_process_tabs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process" CASCADE;
  DROP TABLE "_pages_v_blocks_process_locales" CASCADE;
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "badge_text" SET DEFAULT 'Trusted by spiritual seekers worldwide';
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "heading" SET DEFAULT 'Transform your workflow with spiritual awakening';
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "subtitle" SET DEFAULT 'Track the growth and engagement of your consciousness through detailed practices. Understand what works and supercharge your inner journey.';
  ALTER TABLE "pages_blocks_hero_locales" ALTER COLUMN "cta_form_button_text" SET DEFAULT 'Join Waitlist';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "badge_text" SET DEFAULT 'Trusted by spiritual seekers worldwide';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "heading" SET DEFAULT 'Transform your workflow with spiritual awakening';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "subtitle" SET DEFAULT 'Track the growth and engagement of your consciousness through detailed practices. Understand what works and supercharge your inner journey.';
  ALTER TABLE "_pages_v_blocks_hero_locales" ALTER COLUMN "cta_form_button_text" SET DEFAULT 'Join Waitlist';`)
}
