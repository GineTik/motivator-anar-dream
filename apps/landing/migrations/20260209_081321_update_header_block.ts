import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_header" ADD COLUMN "cta_arrow_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_header" ADD COLUMN "cta_arrow_icon_id" integer;
  ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_cta_arrow_icon_id_media_id_fk" FOREIGN KEY ("cta_arrow_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header" ADD CONSTRAINT "_pages_v_blocks_header_cta_arrow_icon_id_media_id_fk" FOREIGN KEY ("cta_arrow_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_header_cta_arrow_icon_idx" ON "pages_blocks_header" USING btree ("cta_arrow_icon_id");
  CREATE INDEX "_pages_v_blocks_header_cta_arrow_icon_idx" ON "_pages_v_blocks_header" USING btree ("cta_arrow_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_header" DROP CONSTRAINT "pages_blocks_header_cta_arrow_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_header" DROP CONSTRAINT "_pages_v_blocks_header_cta_arrow_icon_id_media_id_fk";
  
  DROP INDEX "pages_blocks_header_cta_arrow_icon_idx";
  DROP INDEX "_pages_v_blocks_header_cta_arrow_icon_idx";
  ALTER TABLE "pages_blocks_header" DROP COLUMN "cta_arrow_icon_id";
  ALTER TABLE "_pages_v_blocks_header" DROP COLUMN "cta_arrow_icon_id";`)
}
