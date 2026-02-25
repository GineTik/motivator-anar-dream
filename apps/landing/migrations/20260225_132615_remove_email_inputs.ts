import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN "cta_button_href" varchar DEFAULT '#';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "cta_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "cta_button_text" varchar DEFAULT 'Start Your Journey';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "cta_button_href" varchar DEFAULT '#';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "cta_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cta_locales" ADD COLUMN "cta_button_text" varchar DEFAULT 'Begin Your Journey';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "cta_button_href" varchar DEFAULT '#';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "cta_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "cta_button_text" varchar DEFAULT 'Start Your Journey';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "cta_button_href" varchar DEFAULT '#';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "cta_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD COLUMN "cta_button_text" varchar DEFAULT 'Begin Your Journey';
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "cta_form_input_placeholder";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "cta_form_button_text";
  ALTER TABLE "pages_blocks_cta_locales" DROP COLUMN "email_placeholder";
  ALTER TABLE "pages_blocks_cta_locales" DROP COLUMN "button_text";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "cta_form_input_placeholder";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "cta_form_button_text";
  ALTER TABLE "_pages_v_blocks_cta_locales" DROP COLUMN "email_placeholder";
  ALTER TABLE "_pages_v_blocks_cta_locales" DROP COLUMN "button_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "cta_form_input_placeholder" varchar DEFAULT 'Enter Email';
  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "cta_form_button_text" varchar DEFAULT 'Start Your Journey';
  ALTER TABLE "pages_blocks_cta_locales" ADD COLUMN "email_placeholder" varchar DEFAULT 'Enter Email';
  ALTER TABLE "pages_blocks_cta_locales" ADD COLUMN "button_text" varchar DEFAULT 'Begin Your Journey';
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "cta_form_input_placeholder" varchar DEFAULT 'Enter Email';
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "cta_form_button_text" varchar DEFAULT 'Start Your Journey';
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD COLUMN "email_placeholder" varchar DEFAULT 'Enter Email';
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD COLUMN "button_text" varchar DEFAULT 'Begin Your Journey';
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_button_href";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_button_open_in_new_tab";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "cta_button_text";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "cta_button_href";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "cta_button_open_in_new_tab";
  ALTER TABLE "pages_blocks_cta_locales" DROP COLUMN "cta_button_text";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "cta_button_href";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "cta_button_open_in_new_tab";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "cta_button_text";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "cta_button_href";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "cta_button_open_in_new_tab";
  ALTER TABLE "_pages_v_blocks_cta_locales" DROP COLUMN "cta_button_text";`)
}
