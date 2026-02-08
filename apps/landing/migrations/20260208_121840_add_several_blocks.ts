import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_features_layout_type" AS ENUM('large', 'small');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_testimonials_card_style" AS ENUM('normal', 'highlighted');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_testimonials_grid_span" AS ENUM('single', 'double');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_features_layout_type" AS ENUM('large', 'small');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_testimonials_card_style" AS ENUM('normal', 'highlighted');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_testimonials_grid_span" AS ENUM('single', 'double');
  CREATE TABLE "pages_blocks_feature_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"image_id" integer,
  	"layout_type" "enum_pages_blocks_feature_features_layout_type" DEFAULT 'large'
  );
  
  CREATE TABLE "pages_blocks_feature_features_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_locales" (
  	"badge_text" varchar DEFAULT 'Inner Tools',
  	"heading" varchar DEFAULT 'Tools for Conscious Transformation',
  	"subtitle" varchar DEFAULT 'Connect all aspects of your spiritual practice into one harmonious journey. Discover tools that help you integrate consciousness work into everyday life.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_integration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"main_image_id" integer,
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_integration_locales" (
  	"badge_text" varchar DEFAULT 'Connections',
  	"heading" varchar DEFAULT 'Unite with aligned souls and practices',
  	"description" varchar DEFAULT 'Connect effortlessly with like-minded practitioners, spiritual communities, and transformative practices that resonate with your journey.',
  	"link_text" varchar DEFAULT 'Explore all connections',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonial_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"author_image_id" integer,
  	"card_style" "enum_pages_blocks_testimonial_testimonials_card_style" DEFAULT 'normal',
  	"grid_span" "enum_pages_blocks_testimonial_testimonials_grid_span" DEFAULT 'single'
  );
  
  CREATE TABLE "pages_blocks_testimonial_testimonials_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_locales" (
  	"badge_text" varchar DEFAULT 'Stories of Transformation',
  	"heading" varchar DEFAULT 'Journeys that inspire awakening',
  	"subtitle" varchar DEFAULT 'Begin your path in moments, not hours. Our intuitive approach requires no prior experience—just an open heart and willingness to explore.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_faq_questions_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"badge_text" varchar DEFAULT 'Your Questions',
  	"heading" varchar DEFAULT 'Guidance for your journey',
  	"subtitle" varchar DEFAULT 'Begin in moments, not hours. Our intuitive approach welcomes you wherever you are—no prior experience needed, just an open heart.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"image_id" integer,
  	"layout_type" "enum__pages_v_blocks_feature_features_layout_type" DEFAULT 'large',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_features_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_locales" (
  	"badge_text" varchar DEFAULT 'Inner Tools',
  	"heading" varchar DEFAULT 'Tools for Conscious Transformation',
  	"subtitle" varchar DEFAULT 'Connect all aspects of your spiritual practice into one harmonious journey. Discover tools that help you integrate consciousness work into everyday life.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_integration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"main_image_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_integration_locales" (
  	"badge_text" varchar DEFAULT 'Connections',
  	"heading" varchar DEFAULT 'Unite with aligned souls and practices',
  	"description" varchar DEFAULT 'Connect effortlessly with like-minded practitioners, spiritual communities, and transformative practices that resonate with your journey.',
  	"link_text" varchar DEFAULT 'Explore all connections',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"author_image_id" integer,
  	"card_style" "enum__pages_v_blocks_testimonial_testimonials_card_style" DEFAULT 'normal',
  	"grid_span" "enum__pages_v_blocks_testimonial_testimonials_grid_span" DEFAULT 'single',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial_testimonials_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial_locales" (
  	"badge_text" varchar DEFAULT 'Stories of Transformation',
  	"heading" varchar DEFAULT 'Journeys that inspire awakening',
  	"subtitle" varchar DEFAULT 'Begin your path in moments, not hours. Our intuitive approach requires no prior experience—just an open heart and willingness to explore.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_questions_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"badge_text" varchar DEFAULT 'Your Questions',
  	"heading" varchar DEFAULT 'Guidance for your journey',
  	"subtitle" varchar DEFAULT 'Begin in moments, not hours. Our intuitive approach welcomes you wherever you are—no prior experience needed, just an open heart.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_pricing_plan_features" DROP CONSTRAINT "pages_blocks_pricing_plan_features_check_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_pricing_plan_features" DROP CONSTRAINT "_pages_v_blocks_pricing_plan_features_check_icon_id_media_id_fk";
  
  DROP INDEX "pages_blocks_pricing_plan_features_check_icon_idx";
  DROP INDEX "_pages_v_blocks_pricing_plan_features_check_icon_idx";
  ALTER TABLE "pages_blocks_feature_features" ADD CONSTRAINT "pages_blocks_feature_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_features" ADD CONSTRAINT "pages_blocks_feature_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_features" ADD CONSTRAINT "pages_blocks_feature_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_features_locales" ADD CONSTRAINT "pages_blocks_feature_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_locales" ADD CONSTRAINT "pages_blocks_feature_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_integration" ADD CONSTRAINT "pages_blocks_integration_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_integration" ADD CONSTRAINT "pages_blocks_integration_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_integration" ADD CONSTRAINT "pages_blocks_integration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_integration_locales" ADD CONSTRAINT "pages_blocks_integration_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_integration"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_testimonials" ADD CONSTRAINT "pages_blocks_testimonial_testimonials_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_testimonials" ADD CONSTRAINT "pages_blocks_testimonial_testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_testimonials" ADD CONSTRAINT "pages_blocks_testimonial_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonial_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonial_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_locales" ADD CONSTRAINT "pages_blocks_testimonial_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_questions" ADD CONSTRAINT "pages_blocks_faq_questions_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_questions" ADD CONSTRAINT "pages_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_questions_locales" ADD CONSTRAINT "pages_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_features" ADD CONSTRAINT "_pages_v_blocks_feature_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_features" ADD CONSTRAINT "_pages_v_blocks_feature_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_features" ADD CONSTRAINT "_pages_v_blocks_feature_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_features_locales" ADD CONSTRAINT "_pages_v_blocks_feature_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_locales" ADD CONSTRAINT "_pages_v_blocks_feature_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_integration" ADD CONSTRAINT "_pages_v_blocks_integration_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_integration" ADD CONSTRAINT "_pages_v_blocks_integration_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_integration" ADD CONSTRAINT "_pages_v_blocks_integration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_integration_locales" ADD CONSTRAINT "_pages_v_blocks_integration_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_integration"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonial_testimonials_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonial_testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonial_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonial_testimonials_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonial_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_locales" ADD CONSTRAINT "_pages_v_blocks_testimonial_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_questions" ADD CONSTRAINT "_pages_v_blocks_faq_questions_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_questions" ADD CONSTRAINT "_pages_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_questions_locales" ADD CONSTRAINT "_pages_v_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_features_order_idx" ON "pages_blocks_feature_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_features_parent_id_idx" ON "pages_blocks_feature_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_features_icon_idx" ON "pages_blocks_feature_features" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_feature_features_image_idx" ON "pages_blocks_feature_features" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_features_locales_locale_parent_id_uniqu" ON "pages_blocks_feature_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_order_idx" ON "pages_blocks_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_parent_id_idx" ON "pages_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_path_idx" ON "pages_blocks_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_badge_badge_icon_idx" ON "pages_blocks_feature" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_locales_locale_parent_id_unique" ON "pages_blocks_feature_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_integration_order_idx" ON "pages_blocks_integration" USING btree ("_order");
  CREATE INDEX "pages_blocks_integration_parent_id_idx" ON "pages_blocks_integration" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_integration_path_idx" ON "pages_blocks_integration" USING btree ("_path");
  CREATE INDEX "pages_blocks_integration_badge_badge_icon_idx" ON "pages_blocks_integration" USING btree ("badge_icon_id");
  CREATE INDEX "pages_blocks_integration_main_image_idx" ON "pages_blocks_integration" USING btree ("main_image_id");
  CREATE UNIQUE INDEX "pages_blocks_integration_locales_locale_parent_id_unique" ON "pages_blocks_integration_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonial_testimonials_order_idx" ON "pages_blocks_testimonial_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_testimonials_parent_id_idx" ON "pages_blocks_testimonial_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_testimonials_logo_idx" ON "pages_blocks_testimonial_testimonials" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_testimonial_testimonials_author_image_idx" ON "pages_blocks_testimonial_testimonials" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonial_testimonials_locales_locale_parent_" ON "pages_blocks_testimonial_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonial_order_idx" ON "pages_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_parent_id_idx" ON "pages_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_path_idx" ON "pages_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_badge_badge_icon_idx" ON "pages_blocks_testimonial" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonial_locales_locale_parent_id_unique" ON "pages_blocks_testimonial_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_questions_order_idx" ON "pages_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_questions_parent_id_idx" ON "pages_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_questions_icon_idx" ON "pages_blocks_faq_questions" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_questions_locales_locale_parent_id_unique" ON "pages_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_badge_badge_icon_idx" ON "pages_blocks_faq" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_features_order_idx" ON "_pages_v_blocks_feature_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_features_parent_id_idx" ON "_pages_v_blocks_feature_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_features_icon_idx" ON "_pages_v_blocks_feature_features" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_feature_features_image_idx" ON "_pages_v_blocks_feature_features" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_features_locales_locale_parent_id_un" ON "_pages_v_blocks_feature_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_order_idx" ON "_pages_v_blocks_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_parent_id_idx" ON "_pages_v_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_path_idx" ON "_pages_v_blocks_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_badge_badge_icon_idx" ON "_pages_v_blocks_feature" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_integration_order_idx" ON "_pages_v_blocks_integration" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_integration_parent_id_idx" ON "_pages_v_blocks_integration" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_integration_path_idx" ON "_pages_v_blocks_integration" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_integration_badge_badge_icon_idx" ON "_pages_v_blocks_integration" USING btree ("badge_icon_id");
  CREATE INDEX "_pages_v_blocks_integration_main_image_idx" ON "_pages_v_blocks_integration" USING btree ("main_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_integration_locales_locale_parent_id_unique" ON "_pages_v_blocks_integration_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_testimonials_order_idx" ON "_pages_v_blocks_testimonial_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonial_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_testimonials_logo_idx" ON "_pages_v_blocks_testimonial_testimonials" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_testimonial_testimonials_author_image_idx" ON "_pages_v_blocks_testimonial_testimonials" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonial_testimonials_locales_locale_pare" ON "_pages_v_blocks_testimonial_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_order_idx" ON "_pages_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_parent_id_idx" ON "_pages_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_path_idx" ON "_pages_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_badge_badge_icon_idx" ON "_pages_v_blocks_testimonial" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonial_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonial_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_questions_order_idx" ON "_pages_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_questions_parent_id_idx" ON "_pages_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_questions_icon_idx" ON "_pages_v_blocks_faq_questions" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_questions_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_badge_badge_icon_idx" ON "_pages_v_blocks_faq" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_pricing_plan_features" DROP COLUMN "check_icon_id";
  ALTER TABLE "_pages_v_blocks_pricing_plan_features" DROP COLUMN "check_icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_integration" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_integration_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_integration" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_integration_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonial_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonial_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonial_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_feature_features" CASCADE;
  DROP TABLE "pages_blocks_feature_features_locales" CASCADE;
  DROP TABLE "pages_blocks_feature" CASCADE;
  DROP TABLE "pages_blocks_feature_locales" CASCADE;
  DROP TABLE "pages_blocks_integration" CASCADE;
  DROP TABLE "pages_blocks_integration_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonial_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonial_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonial" CASCADE;
  DROP TABLE "pages_blocks_testimonial_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_questions" CASCADE;
  DROP TABLE "pages_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_features" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_integration" CASCADE;
  DROP TABLE "_pages_v_blocks_integration_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  ALTER TABLE "pages_blocks_pricing_plan_features" ADD COLUMN "check_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_pricing_plan_features" ADD COLUMN "check_icon_id" integer;
  ALTER TABLE "pages_blocks_pricing_plan_features" ADD CONSTRAINT "pages_blocks_pricing_plan_features_check_icon_id_media_id_fk" FOREIGN KEY ("check_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plan_features" ADD CONSTRAINT "_pages_v_blocks_pricing_plan_features_check_icon_id_media_id_fk" FOREIGN KEY ("check_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_pricing_plan_features_check_icon_idx" ON "pages_blocks_pricing_plan_features" USING btree ("check_icon_id");
  CREATE INDEX "_pages_v_blocks_pricing_plan_features_check_icon_idx" ON "_pages_v_blocks_pricing_plan_features" USING btree ("check_icon_id");
  DROP TYPE "public"."enum_pages_blocks_feature_features_layout_type";
  DROP TYPE "public"."enum_pages_blocks_testimonial_testimonials_card_style";
  DROP TYPE "public"."enum_pages_blocks_testimonial_testimonials_grid_span";
  DROP TYPE "public"."enum__pages_v_blocks_feature_features_layout_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_testimonials_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_testimonials_grid_span";`)
}
