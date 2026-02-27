import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_footer" ADD COLUMN "newsletter_button_href" varchar DEFAULT '#';
  ALTER TABLE "_pages_v_blocks_footer" ADD COLUMN "newsletter_button_href" varchar DEFAULT '#';
  ALTER TABLE "pages_blocks_footer_locales" DROP COLUMN "newsletter_placeholder";
  ALTER TABLE "_pages_v_blocks_footer_locales" DROP COLUMN "newsletter_placeholder";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_footer_locales" ADD COLUMN "newsletter_placeholder" varchar DEFAULT 'Enter Email';
  ALTER TABLE "_pages_v_blocks_footer_locales" ADD COLUMN "newsletter_placeholder" varchar DEFAULT 'Enter Email';
  ALTER TABLE "pages_blocks_footer" DROP COLUMN "newsletter_button_href";
  ALTER TABLE "_pages_v_blocks_footer" DROP COLUMN "newsletter_button_href";`)
}
