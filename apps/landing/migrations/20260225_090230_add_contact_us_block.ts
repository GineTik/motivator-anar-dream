import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_us_contact_items_type" AS ENUM('email', 'telegram', 'phone');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_us_contact_items_type" AS ENUM('email', 'telegram', 'phone');
  CREATE TABLE "pages_blocks_contact_us_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_contact_us_contact_items_type"
  );
  
  CREATE TABLE "pages_blocks_contact_us_contact_items_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_us_locales" (
  	"badge_text" varchar DEFAULT 'Reach out to us',
  	"heading" varchar DEFAULT 'Connect with our spiritual guides',
  	"subtitle" varchar DEFAULT 'Have questions, need support, or want to explore how we can guide your inner transformation? Reach out to our team anytime.',
  	"card_heading" varchar DEFAULT 'Contact Us',
  	"card_description" varchar DEFAULT 'Have questions, need support, or want to explore how we can help your spiritual growth? Reach out to our team anytime.',
  	"form_fields_name_label" varchar DEFAULT 'Name',
  	"form_fields_name_placeholder" varchar DEFAULT 'Enter your Name',
  	"form_fields_email_label" varchar DEFAULT 'Email',
  	"form_fields_email_placeholder" varchar DEFAULT 'Enter your email',
  	"form_fields_phone_label" varchar DEFAULT 'Phone',
  	"form_fields_phone_placeholder" varchar DEFAULT '(+123)',
  	"form_fields_company_label" varchar DEFAULT 'Company Name',
  	"form_fields_company_placeholder" varchar DEFAULT 'Enter your company name',
  	"form_fields_message_label" varchar DEFAULT 'Is there any other information you''d like to share with us?',
  	"form_fields_message_placeholder" varchar DEFAULT 'Message here',
  	"button_text" varchar DEFAULT 'Submit now',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_contact_us_contact_items_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_contact_items_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_locales" (
  	"badge_text" varchar DEFAULT 'Reach out to us',
  	"heading" varchar DEFAULT 'Connect with our spiritual guides',
  	"subtitle" varchar DEFAULT 'Have questions, need support, or want to explore how we can guide your inner transformation? Reach out to our team anytime.',
  	"card_heading" varchar DEFAULT 'Contact Us',
  	"card_description" varchar DEFAULT 'Have questions, need support, or want to explore how we can help your spiritual growth? Reach out to our team anytime.',
  	"form_fields_name_label" varchar DEFAULT 'Name',
  	"form_fields_name_placeholder" varchar DEFAULT 'Enter your Name',
  	"form_fields_email_label" varchar DEFAULT 'Email',
  	"form_fields_email_placeholder" varchar DEFAULT 'Enter your email',
  	"form_fields_phone_label" varchar DEFAULT 'Phone',
  	"form_fields_phone_placeholder" varchar DEFAULT '(+123)',
  	"form_fields_company_label" varchar DEFAULT 'Company Name',
  	"form_fields_company_placeholder" varchar DEFAULT 'Enter your company name',
  	"form_fields_message_label" varchar DEFAULT 'Is there any other information you''d like to share with us?',
  	"form_fields_message_placeholder" varchar DEFAULT 'Message here',
  	"button_text" varchar DEFAULT 'Submit now',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_contact_us_contact_items" ADD CONSTRAINT "pages_blocks_contact_us_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_contact_items_locales" ADD CONSTRAINT "pages_blocks_contact_us_contact_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us_contact_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_locales" ADD CONSTRAINT "pages_blocks_contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_contact_items" ADD CONSTRAINT "_pages_v_blocks_contact_us_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_contact_items_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_contact_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us_contact_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_us_contact_items_order_idx" ON "pages_blocks_contact_us_contact_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_contact_items_parent_id_idx" ON "pages_blocks_contact_us_contact_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_contact_items_locales_locale_parent_" ON "pages_blocks_contact_us_contact_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_us_order_idx" ON "pages_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_parent_id_idx" ON "pages_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_us_path_idx" ON "pages_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_us_badge_badge_icon_idx" ON "pages_blocks_contact_us" USING btree ("badge_icon_id");
  CREATE INDEX "pages_blocks_contact_us_background_image_idx" ON "pages_blocks_contact_us" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_locales_locale_parent_id_unique" ON "pages_blocks_contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_contact_items_order_idx" ON "_pages_v_blocks_contact_us_contact_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_contact_items_parent_id_idx" ON "_pages_v_blocks_contact_us_contact_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_contact_items_locales_locale_pare" ON "_pages_v_blocks_contact_us_contact_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_order_idx" ON "_pages_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_parent_id_idx" ON "_pages_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_path_idx" ON "_pages_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_us_badge_badge_icon_idx" ON "_pages_v_blocks_contact_us" USING btree ("badge_icon_id");
  CREATE INDEX "_pages_v_blocks_contact_us_background_image_idx" ON "_pages_v_blocks_contact_us" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_us_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_contact_us_contact_items" CASCADE;
  DROP TABLE "pages_blocks_contact_us_contact_items_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_us" CASCADE;
  DROP TABLE "pages_blocks_contact_us_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_contact_items" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_contact_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_contact_us_contact_items_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_us_contact_items_type";`)
}
