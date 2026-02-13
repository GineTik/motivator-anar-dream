import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_partnership_locales" RENAME COLUMN "tagline" TO "badge_text";
  ALTER TABLE "_pages_v_blocks_partnership_locales" RENAME COLUMN "tagline" TO "badge_text";
  ALTER TABLE "pages_blocks_partnership_locales" ALTER COLUMN "heading" SET DEFAULT 'What if you don''t have to sell?';
  ALTER TABLE "pages_blocks_partnership_locales" ALTER COLUMN "button_text" SET DEFAULT 'Become a Partner';
  ALTER TABLE "_pages_v_blocks_partnership_locales" ALTER COLUMN "heading" SET DEFAULT 'What if you don''t have to sell?';
  ALTER TABLE "_pages_v_blocks_partnership_locales" ALTER COLUMN "button_text" SET DEFAULT 'Become a Partner';
  ALTER TABLE "pages_blocks_partnership" ADD COLUMN "badge_icon_id" integer;
  ALTER TABLE "pages_blocks_partnership_locales" ADD COLUMN "subtitle" varchar DEFAULT 'Share what resonates with you and let others decide for themselves.';
  ALTER TABLE "_pages_v_blocks_partnership" ADD COLUMN "badge_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_partnership_locales" ADD COLUMN "subtitle" varchar DEFAULT 'Share what resonates with you and let others decide for themselves.';
  ALTER TABLE "pages_blocks_partnership" ADD CONSTRAINT "pages_blocks_partnership_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partnership" ADD CONSTRAINT "_pages_v_blocks_partnership_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_partnership_badge_badge_icon_idx" ON "pages_blocks_partnership" USING btree ("badge_icon_id");
  CREATE INDEX "_pages_v_blocks_partnership_badge_badge_icon_idx" ON "_pages_v_blocks_partnership" USING btree ("badge_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_partnership_locales" RENAME COLUMN "badge_text" TO "tagline";
  ALTER TABLE "_pages_v_blocks_partnership_locales" RENAME COLUMN "badge_text" TO "tagline";
  ALTER TABLE "pages_blocks_partnership" DROP CONSTRAINT "pages_blocks_partnership_badge_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_partnership" DROP CONSTRAINT "_pages_v_blocks_partnership_badge_icon_id_media_id_fk";
  
  DROP INDEX "pages_blocks_partnership_badge_badge_icon_idx";
  DROP INDEX "_pages_v_blocks_partnership_badge_badge_icon_idx";
  ALTER TABLE "pages_blocks_partnership_locales" ALTER COLUMN "heading" SET DEFAULT 'Если не продавать?';
  ALTER TABLE "pages_blocks_partnership_locales" ALTER COLUMN "button_text" SET DEFAULT 'Стань партнером';
  ALTER TABLE "_pages_v_blocks_partnership_locales" ALTER COLUMN "heading" SET DEFAULT 'Если не продавать?';
  ALTER TABLE "_pages_v_blocks_partnership_locales" ALTER COLUMN "button_text" SET DEFAULT 'Стань партнером';
  ALTER TABLE "pages_blocks_partnership" DROP COLUMN "badge_icon_id";
  ALTER TABLE "pages_blocks_partnership_locales" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_partnership" DROP COLUMN "badge_icon_id";
  ALTER TABLE "_pages_v_blocks_partnership_locales" DROP COLUMN "subtitle";`)
}
