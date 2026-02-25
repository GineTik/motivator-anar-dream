import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "header_nav_links_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_links_children_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"cta_link" varchar DEFAULT '#',
  	"cta_arrow_icon_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_text" varchar DEFAULT 'Begin Your Journey' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "pages_blocks_header_nav_links_children" CASCADE;
  DROP TABLE "pages_blocks_header_nav_links_children_locales" CASCADE;
  DROP TABLE "pages_blocks_header_nav_links" CASCADE;
  DROP TABLE "pages_blocks_header_nav_links_locales" CASCADE;
  DROP TABLE "pages_blocks_header" CASCADE;
  DROP TABLE "pages_blocks_header_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links_children" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links_children_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_header" CASCADE;
  DROP TABLE "_pages_v_blocks_header_locales" CASCADE;
  ALTER TABLE "header_nav_links_children" ADD CONSTRAINT "header_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_links_children_locales" ADD CONSTRAINT "header_nav_links_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_links_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_links" ADD CONSTRAINT "header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_links_locales" ADD CONSTRAINT "header_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_arrow_icon_id_media_id_fk" FOREIGN KEY ("cta_arrow_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_links_children_order_idx" ON "header_nav_links_children" USING btree ("_order");
  CREATE INDEX "header_nav_links_children_parent_id_idx" ON "header_nav_links_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_links_children_locales_locale_parent_id_unique" ON "header_nav_links_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_links_order_idx" ON "header_nav_links" USING btree ("_order");
  CREATE INDEX "header_nav_links_parent_id_idx" ON "header_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_links_locales_locale_parent_id_unique" ON "header_nav_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_cta_arrow_icon_idx" ON "header" USING btree ("cta_arrow_icon_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_header_nav_links_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_header_nav_links_children_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_header_nav_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"cta_link" varchar DEFAULT '#',
  	"cta_arrow_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_header_locales" (
  	"cta_text" varchar DEFAULT 'Begin Your Journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_header_nav_links_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_header_nav_links_children_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_header_nav_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"cta_link" varchar DEFAULT '#',
  	"cta_arrow_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_header_locales" (
  	"cta_text" varchar DEFAULT 'Begin Your Journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "header_nav_links_children" CASCADE;
  DROP TABLE "header_nav_links_children_locales" CASCADE;
  DROP TABLE "header_nav_links" CASCADE;
  DROP TABLE "header_nav_links_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  ALTER TABLE "pages_blocks_header_nav_links_children" ADD CONSTRAINT "pages_blocks_header_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_nav_links_children_locales" ADD CONSTRAINT "pages_blocks_header_nav_links_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header_nav_links_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_nav_links" ADD CONSTRAINT "pages_blocks_header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_nav_links_locales" ADD CONSTRAINT "pages_blocks_header_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_cta_arrow_icon_id_media_id_fk" FOREIGN KEY ("cta_arrow_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_locales" ADD CONSTRAINT "pages_blocks_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links_children" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links_children_locales" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_children_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header_nav_links_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links_locales" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header" ADD CONSTRAINT "_pages_v_blocks_header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header" ADD CONSTRAINT "_pages_v_blocks_header_cta_arrow_icon_id_media_id_fk" FOREIGN KEY ("cta_arrow_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header" ADD CONSTRAINT "_pages_v_blocks_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_locales" ADD CONSTRAINT "_pages_v_blocks_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_header_nav_links_children_order_idx" ON "pages_blocks_header_nav_links_children" USING btree ("_order");
  CREATE INDEX "pages_blocks_header_nav_links_children_parent_id_idx" ON "pages_blocks_header_nav_links_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_header_nav_links_children_locales_locale_parent" ON "pages_blocks_header_nav_links_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_header_nav_links_order_idx" ON "pages_blocks_header_nav_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_header_nav_links_parent_id_idx" ON "pages_blocks_header_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_header_nav_links_locales_locale_parent_id_uniqu" ON "pages_blocks_header_nav_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_header_order_idx" ON "pages_blocks_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_header_parent_id_idx" ON "pages_blocks_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_header_path_idx" ON "pages_blocks_header" USING btree ("_path");
  CREATE INDEX "pages_blocks_header_logo_idx" ON "pages_blocks_header" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_header_cta_arrow_icon_idx" ON "pages_blocks_header" USING btree ("cta_arrow_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_header_locales_locale_parent_id_unique" ON "pages_blocks_header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_header_nav_links_children_order_idx" ON "_pages_v_blocks_header_nav_links_children" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_header_nav_links_children_parent_id_idx" ON "_pages_v_blocks_header_nav_links_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_header_nav_links_children_locales_locale_par" ON "_pages_v_blocks_header_nav_links_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_header_nav_links_order_idx" ON "_pages_v_blocks_header_nav_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_header_nav_links_parent_id_idx" ON "_pages_v_blocks_header_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_header_nav_links_locales_locale_parent_id_un" ON "_pages_v_blocks_header_nav_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_header_order_idx" ON "_pages_v_blocks_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_header_parent_id_idx" ON "_pages_v_blocks_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_header_path_idx" ON "_pages_v_blocks_header" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_header_logo_idx" ON "_pages_v_blocks_header" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_header_cta_arrow_icon_idx" ON "_pages_v_blocks_header" USING btree ("cta_arrow_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_header_locales_locale_parent_id_unique" ON "_pages_v_blocks_header_locales" USING btree ("_locale","_parent_id");`)
}
