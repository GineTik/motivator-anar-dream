import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_pricing_plan_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"check_icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_pricing_plan_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_pricing_testimonials_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"plan_icon_id" integer,
  	"plan_button_link" varchar DEFAULT '#',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_locales" (
  	"badge_text" varchar DEFAULT 'Investment in yourself',
  	"heading" varchar DEFAULT 'Your path to transformation',
  	"subtitle" varchar DEFAULT 'Choose an approach that resonates with your inner readiness. No obligations, just space for your personal journey.',
  	"plan_name" varchar DEFAULT 'Personal Mentorship',
  	"plan_description" varchar DEFAULT 'Individual guidance on your path of conscious development, personal practices, and support on the journey to inner awakening',
  	"plan_price" varchar DEFAULT '$380',
  	"plan_period" varchar DEFAULT '/month',
  	"plan_button_text" varchar DEFAULT 'Begin your journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plan_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"check_icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plan_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_testimonials_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"plan_icon_id" integer,
  	"plan_button_link" varchar DEFAULT '#',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_locales" (
  	"badge_text" varchar DEFAULT 'Investment in yourself',
  	"heading" varchar DEFAULT 'Your path to transformation',
  	"subtitle" varchar DEFAULT 'Choose an approach that resonates with your inner readiness. No obligations, just space for your personal journey.',
  	"plan_name" varchar DEFAULT 'Personal Mentorship',
  	"plan_description" varchar DEFAULT 'Individual guidance on your path of conscious development, personal practices, and support on the journey to inner awakening',
  	"plan_price" varchar DEFAULT '$380',
  	"plan_period" varchar DEFAULT '/month',
  	"plan_button_text" varchar DEFAULT 'Begin your journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_pricing_plan_features" ADD CONSTRAINT "pages_blocks_pricing_plan_features_check_icon_id_media_id_fk" FOREIGN KEY ("check_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plan_features" ADD CONSTRAINT "pages_blocks_pricing_plan_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plan_features_locales" ADD CONSTRAINT "pages_blocks_pricing_plan_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_plan_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_testimonials" ADD CONSTRAINT "pages_blocks_pricing_testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_testimonials" ADD CONSTRAINT "pages_blocks_pricing_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_testimonials_locales" ADD CONSTRAINT "pages_blocks_pricing_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_plan_icon_id_media_id_fk" FOREIGN KEY ("plan_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_locales" ADD CONSTRAINT "pages_blocks_pricing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plan_features" ADD CONSTRAINT "_pages_v_blocks_pricing_plan_features_check_icon_id_media_id_fk" FOREIGN KEY ("check_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plan_features" ADD CONSTRAINT "_pages_v_blocks_pricing_plan_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plan_features_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_plan_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_plan_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_testimonials" ADD CONSTRAINT "_pages_v_blocks_pricing_testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_testimonials" ADD CONSTRAINT "_pages_v_blocks_pricing_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_plan_icon_id_media_id_fk" FOREIGN KEY ("plan_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_pricing_plan_features_order_idx" ON "pages_blocks_pricing_plan_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plan_features_parent_id_idx" ON "pages_blocks_pricing_plan_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_plan_features_check_icon_idx" ON "pages_blocks_pricing_plan_features" USING btree ("check_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_plan_features_locales_locale_parent_id_" ON "pages_blocks_pricing_plan_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_testimonials_order_idx" ON "pages_blocks_pricing_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_testimonials_parent_id_idx" ON "pages_blocks_pricing_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_testimonials_author_image_idx" ON "pages_blocks_pricing_testimonials" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_testimonials_locales_locale_parent_id_u" ON "pages_blocks_pricing_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_badge_badge_icon_idx" ON "pages_blocks_pricing" USING btree ("badge_icon_id");
  CREATE INDEX "pages_blocks_pricing_plan_plan_icon_idx" ON "pages_blocks_pricing" USING btree ("plan_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_locales_locale_parent_id_unique" ON "pages_blocks_pricing_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_plan_features_order_idx" ON "_pages_v_blocks_pricing_plan_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plan_features_parent_id_idx" ON "_pages_v_blocks_pricing_plan_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_plan_features_check_icon_idx" ON "_pages_v_blocks_pricing_plan_features" USING btree ("check_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_plan_features_locales_locale_parent_" ON "_pages_v_blocks_pricing_plan_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_testimonials_order_idx" ON "_pages_v_blocks_pricing_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_testimonials_parent_id_idx" ON "_pages_v_blocks_pricing_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_testimonials_author_image_idx" ON "_pages_v_blocks_pricing_testimonials" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_testimonials_locales_locale_parent_i" ON "_pages_v_blocks_pricing_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_badge_badge_icon_idx" ON "_pages_v_blocks_pricing" USING btree ("badge_icon_id");
  CREATE INDEX "_pages_v_blocks_pricing_plan_plan_icon_idx" ON "_pages_v_blocks_pricing" USING btree ("plan_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_locales_locale_parent_id_unique" ON "_pages_v_blocks_pricing_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_pricing_plan_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_plan_features_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_testimonials" CASCADE;
  DROP TABLE "pages_blocks_pricing_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_pricing_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plan_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plan_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_locales" CASCADE;`)
}
