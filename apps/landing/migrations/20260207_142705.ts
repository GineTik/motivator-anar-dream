import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" RENAME COLUMN "dashboard_image_id" TO "person_image_id";
  ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "dashboard_image_id" TO "person_image_id";
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_dashboard_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_dashboard_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_dashboard_image_idx";
  DROP INDEX "_pages_v_blocks_hero_dashboard_image_idx";
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_person_image_id_media_id_fk" FOREIGN KEY ("person_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_person_image_id_media_id_fk" FOREIGN KEY ("person_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_person_image_idx" ON "pages_blocks_hero" USING btree ("person_image_id");
  CREATE INDEX "_pages_v_blocks_hero_person_image_idx" ON "_pages_v_blocks_hero" USING btree ("person_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" RENAME COLUMN "person_image_id" TO "dashboard_image_id";
  ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "person_image_id" TO "dashboard_image_id";
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_person_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_person_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_person_image_idx";
  DROP INDEX "_pages_v_blocks_hero_person_image_idx";
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_dashboard_image_id_media_id_fk" FOREIGN KEY ("dashboard_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_dashboard_image_id_media_id_fk" FOREIGN KEY ("dashboard_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_dashboard_image_idx" ON "pages_blocks_hero" USING btree ("dashboard_image_id");
  CREATE INDEX "_pages_v_blocks_hero_dashboard_image_idx" ON "_pages_v_blocks_hero" USING btree ("dashboard_image_id");`)
}
