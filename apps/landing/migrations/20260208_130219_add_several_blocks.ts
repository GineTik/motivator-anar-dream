import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_header_locales" (
  	"cta_text" varchar DEFAULT 'Begin Your Journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_alt_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_alt_plans_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_alt_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"button_link" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing_alt_plans_locales" (
  	"name" varchar,
  	"badge_text" varchar,
  	"monthly_price" varchar,
  	"yearly_price" varchar,
  	"period" varchar DEFAULT '/monthly',
  	"yearly_period" varchar DEFAULT '/yearly',
  	"button_text" varchar DEFAULT 'Begin Now',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_alt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_alt_locales" (
  	"badge_text" varchar DEFAULT 'Your Investment',
  	"heading" varchar DEFAULT 'Simple, transparent pricing',
  	"subtitle" varchar DEFAULT 'Choose the path that resonates with your journey. No hidden costs, no surprises — just honest pricing for genuine transformation.',
  	"discount_label" varchar DEFAULT 'Save 15%',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"badge_text" varchar DEFAULT 'Trusted by seekers around the world',
  	"heading" varchar DEFAULT 'Transform your inner world through conscious awakening',
  	"subtitle" varchar DEFAULT 'Experience deep transformation with guided spiritual practices. Release what no longer serves you, reconnect with your authentic self, and begin creating your reality from a place of inner clarity.',
  	"email_placeholder" varchar DEFAULT 'Enter Email',
  	"button_text" varchar DEFAULT 'Begin Your Journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_posts_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"explore_button_link" varchar DEFAULT '/blog',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_locales" (
  	"badge_text" varchar DEFAULT 'Insights',
  	"heading" varchar DEFAULT 'Wisdom for your path',
  	"subtitle" varchar DEFAULT 'Begin in moments, not hours. Our intuitive approach welcomes you wherever you are — no prior experience needed.',
  	"explore_heading" varchar DEFAULT 'Explore more insights',
  	"explore_subtitle" varchar DEFAULT 'Deepen your understanding through our collection of guided articles and reflections.',
  	"explore_button_text" varchar DEFAULT 'Read All Articles',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer_menu_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_menu_groups_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer_menu_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer_menu_groups_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"href" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_locales" (
  	"newsletter_heading" varchar DEFAULT 'Stay connected with your inner journey',
  	"newsletter_subtitle" varchar DEFAULT 'Receive guidance, practices, and insights delivered to your inbox.',
  	"newsletter_placeholder" varchar DEFAULT 'Enter Email',
  	"newsletter_button_text" varchar DEFAULT 'Subscribe',
  	"copyright" varchar DEFAULT 'All rights reserved, Anara Dreams',
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
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_header_locales" (
  	"cta_text" varchar DEFAULT 'Begin Your Journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_alt_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_alt_plans_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_alt_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"button_link" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_alt_plans_locales" (
  	"name" varchar,
  	"badge_text" varchar,
  	"monthly_price" varchar,
  	"yearly_price" varchar,
  	"period" varchar DEFAULT '/monthly',
  	"yearly_period" varchar DEFAULT '/yearly',
  	"button_text" varchar DEFAULT 'Begin Now',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_alt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_alt_locales" (
  	"badge_text" varchar DEFAULT 'Your Investment',
  	"heading" varchar DEFAULT 'Simple, transparent pricing',
  	"subtitle" varchar DEFAULT 'Choose the path that resonates with your journey. No hidden costs, no surprises — just honest pricing for genuine transformation.',
  	"discount_label" varchar DEFAULT 'Save 15%',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"badge_text" varchar DEFAULT 'Trusted by seekers around the world',
  	"heading" varchar DEFAULT 'Transform your inner world through conscious awakening',
  	"subtitle" varchar DEFAULT 'Experience deep transformation with guided spiritual practices. Release what no longer serves you, reconnect with your authentic self, and begin creating your reality from a place of inner clarity.',
  	"email_placeholder" varchar DEFAULT 'Enter Email',
  	"button_text" varchar DEFAULT 'Begin Your Journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_blog_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_posts_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_icon_id" integer,
  	"explore_button_link" varchar DEFAULT '/blog',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_locales" (
  	"badge_text" varchar DEFAULT 'Insights',
  	"heading" varchar DEFAULT 'Wisdom for your path',
  	"subtitle" varchar DEFAULT 'Begin in moments, not hours. Our intuitive approach welcomes you wherever you are — no prior experience needed.',
  	"explore_heading" varchar DEFAULT 'Explore more insights',
  	"explore_subtitle" varchar DEFAULT 'Deepen your understanding through our collection of guided articles and reflections.',
  	"explore_button_text" varchar DEFAULT 'Read All Articles',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_footer_menu_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_menu_groups_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_footer_menu_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_menu_groups_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"href" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_locales" (
  	"newsletter_heading" varchar DEFAULT 'Stay connected with your inner journey',
  	"newsletter_subtitle" varchar DEFAULT 'Receive guidance, practices, and insights delivered to your inbox.',
  	"newsletter_placeholder" varchar DEFAULT 'Enter Email',
  	"newsletter_button_text" varchar DEFAULT 'Subscribe',
  	"copyright" varchar DEFAULT 'All rights reserved, Anara Dreams',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_header_nav_links_children" ADD CONSTRAINT "pages_blocks_header_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_nav_links_children_locales" ADD CONSTRAINT "pages_blocks_header_nav_links_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header_nav_links_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_nav_links" ADD CONSTRAINT "pages_blocks_header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_nav_links_locales" ADD CONSTRAINT "pages_blocks_header_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_locales" ADD CONSTRAINT "pages_blocks_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt_plans_features" ADD CONSTRAINT "pages_blocks_pricing_alt_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_alt_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt_plans_features_locales" ADD CONSTRAINT "pages_blocks_pricing_alt_plans_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_alt_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt_plans" ADD CONSTRAINT "pages_blocks_pricing_alt_plans_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt_plans" ADD CONSTRAINT "pages_blocks_pricing_alt_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_alt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt_plans_locales" ADD CONSTRAINT "pages_blocks_pricing_alt_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_alt_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt" ADD CONSTRAINT "pages_blocks_pricing_alt_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt" ADD CONSTRAINT "pages_blocks_pricing_alt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_alt_locales" ADD CONSTRAINT "pages_blocks_pricing_alt_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_alt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_posts" ADD CONSTRAINT "pages_blocks_blog_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_posts" ADD CONSTRAINT "pages_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_posts_locales" ADD CONSTRAINT "pages_blocks_blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_locales" ADD CONSTRAINT "pages_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_menu_groups_links" ADD CONSTRAINT "pages_blocks_footer_menu_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_menu_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_menu_groups_links_locales" ADD CONSTRAINT "pages_blocks_footer_menu_groups_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_menu_groups_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_menu_groups" ADD CONSTRAINT "pages_blocks_footer_menu_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_menu_groups_locales" ADD CONSTRAINT "pages_blocks_footer_menu_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_menu_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_social_links" ADD CONSTRAINT "pages_blocks_footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_social_links" ADD CONSTRAINT "pages_blocks_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer" ADD CONSTRAINT "pages_blocks_footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer" ADD CONSTRAINT "pages_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_locales" ADD CONSTRAINT "pages_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links_children" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links_children_locales" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_children_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header_nav_links_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_nav_links_locales" ADD CONSTRAINT "_pages_v_blocks_header_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header" ADD CONSTRAINT "_pages_v_blocks_header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header" ADD CONSTRAINT "_pages_v_blocks_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_locales" ADD CONSTRAINT "_pages_v_blocks_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_alt_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt_plans_features_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_plans_features_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_alt_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_plans_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_alt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt_plans_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_alt_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_alt_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_alt_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_alt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_posts" ADD CONSTRAINT "_pages_v_blocks_blog_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_posts" ADD CONSTRAINT "_pages_v_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_posts_locales" ADD CONSTRAINT "_pages_v_blocks_blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog" ADD CONSTRAINT "_pages_v_blocks_blog_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog" ADD CONSTRAINT "_pages_v_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_locales" ADD CONSTRAINT "_pages_v_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_menu_groups_links" ADD CONSTRAINT "_pages_v_blocks_footer_menu_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_menu_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_menu_groups_links_locales" ADD CONSTRAINT "_pages_v_blocks_footer_menu_groups_links_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_menu_groups_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_menu_groups" ADD CONSTRAINT "_pages_v_blocks_footer_menu_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_menu_groups_locales" ADD CONSTRAINT "_pages_v_blocks_footer_menu_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_menu_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_social_links" ADD CONSTRAINT "_pages_v_blocks_footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_social_links" ADD CONSTRAINT "_pages_v_blocks_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer" ADD CONSTRAINT "_pages_v_blocks_footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer" ADD CONSTRAINT "_pages_v_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_locales" ADD CONSTRAINT "_pages_v_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE UNIQUE INDEX "pages_blocks_header_locales_locale_parent_id_unique" ON "pages_blocks_header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_alt_plans_features_order_idx" ON "pages_blocks_pricing_alt_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_alt_plans_features_parent_id_idx" ON "pages_blocks_pricing_alt_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_alt_plans_features_locales_locale_paren" ON "pages_blocks_pricing_alt_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_alt_plans_order_idx" ON "pages_blocks_pricing_alt_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_alt_plans_parent_id_idx" ON "pages_blocks_pricing_alt_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_alt_plans_badge_icon_idx" ON "pages_blocks_pricing_alt_plans" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_alt_plans_locales_locale_parent_id_uniq" ON "pages_blocks_pricing_alt_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_alt_order_idx" ON "pages_blocks_pricing_alt" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_alt_parent_id_idx" ON "pages_blocks_pricing_alt" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_alt_path_idx" ON "pages_blocks_pricing_alt" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_alt_badge_badge_icon_idx" ON "pages_blocks_pricing_alt" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_alt_locales_locale_parent_id_unique" ON "pages_blocks_pricing_alt_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_badge_badge_icon_idx" ON "pages_blocks_cta" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_posts_order_idx" ON "pages_blocks_blog_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_posts_parent_id_idx" ON "pages_blocks_blog_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_posts_image_idx" ON "pages_blocks_blog_posts" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_blog_posts_locales_locale_parent_id_unique" ON "pages_blocks_blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_order_idx" ON "pages_blocks_blog" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_parent_id_idx" ON "pages_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_path_idx" ON "pages_blocks_blog" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_badge_badge_icon_idx" ON "pages_blocks_blog" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_blog_locales_locale_parent_id_unique" ON "pages_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_footer_menu_groups_links_order_idx" ON "pages_blocks_footer_menu_groups_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_menu_groups_links_parent_id_idx" ON "pages_blocks_footer_menu_groups_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_footer_menu_groups_links_locales_locale_parent_" ON "pages_blocks_footer_menu_groups_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_footer_menu_groups_order_idx" ON "pages_blocks_footer_menu_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_menu_groups_parent_id_idx" ON "pages_blocks_footer_menu_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_footer_menu_groups_locales_locale_parent_id_uni" ON "pages_blocks_footer_menu_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_footer_social_links_order_idx" ON "pages_blocks_footer_social_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_social_links_parent_id_idx" ON "pages_blocks_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_social_links_icon_idx" ON "pages_blocks_footer_social_links" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_footer_order_idx" ON "pages_blocks_footer" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_parent_id_idx" ON "pages_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_path_idx" ON "pages_blocks_footer" USING btree ("_path");
  CREATE INDEX "pages_blocks_footer_logo_idx" ON "pages_blocks_footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_footer_locales_locale_parent_id_unique" ON "pages_blocks_footer_locales" USING btree ("_locale","_parent_id");
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
  CREATE UNIQUE INDEX "_pages_v_blocks_header_locales_locale_parent_id_unique" ON "_pages_v_blocks_header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_alt_plans_features_order_idx" ON "_pages_v_blocks_pricing_alt_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_alt_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_alt_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_alt_plans_features_locales_locale_pa" ON "_pages_v_blocks_pricing_alt_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_alt_plans_order_idx" ON "_pages_v_blocks_pricing_alt_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_alt_plans_parent_id_idx" ON "_pages_v_blocks_pricing_alt_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_alt_plans_badge_icon_idx" ON "_pages_v_blocks_pricing_alt_plans" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_alt_plans_locales_locale_parent_id_u" ON "_pages_v_blocks_pricing_alt_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_alt_order_idx" ON "_pages_v_blocks_pricing_alt" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_alt_parent_id_idx" ON "_pages_v_blocks_pricing_alt" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_alt_path_idx" ON "_pages_v_blocks_pricing_alt" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_alt_badge_badge_icon_idx" ON "_pages_v_blocks_pricing_alt" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_alt_locales_locale_parent_id_unique" ON "_pages_v_blocks_pricing_alt_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_badge_badge_icon_idx" ON "_pages_v_blocks_cta" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_posts_order_idx" ON "_pages_v_blocks_blog_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_posts_parent_id_idx" ON "_pages_v_blocks_blog_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_posts_image_idx" ON "_pages_v_blocks_blog_posts" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_blog_posts_locales_locale_parent_id_unique" ON "_pages_v_blocks_blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_order_idx" ON "_pages_v_blocks_blog" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_parent_id_idx" ON "_pages_v_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_path_idx" ON "_pages_v_blocks_blog" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_badge_badge_icon_idx" ON "_pages_v_blocks_blog" USING btree ("badge_icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_blog_locales_locale_parent_id_unique" ON "_pages_v_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_menu_groups_links_order_idx" ON "_pages_v_blocks_footer_menu_groups_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_menu_groups_links_parent_id_idx" ON "_pages_v_blocks_footer_menu_groups_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_footer_menu_groups_links_locales_locale_pare" ON "_pages_v_blocks_footer_menu_groups_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_menu_groups_order_idx" ON "_pages_v_blocks_footer_menu_groups" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_menu_groups_parent_id_idx" ON "_pages_v_blocks_footer_menu_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_footer_menu_groups_locales_locale_parent_id_" ON "_pages_v_blocks_footer_menu_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_social_links_order_idx" ON "_pages_v_blocks_footer_social_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_social_links_parent_id_idx" ON "_pages_v_blocks_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_social_links_icon_idx" ON "_pages_v_blocks_footer_social_links" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_footer_order_idx" ON "_pages_v_blocks_footer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_parent_id_idx" ON "_pages_v_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_path_idx" ON "_pages_v_blocks_footer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_footer_logo_idx" ON "_pages_v_blocks_footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_footer_locales_locale_parent_id_unique" ON "_pages_v_blocks_footer_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_header_nav_links_children" CASCADE;
  DROP TABLE "pages_blocks_header_nav_links_children_locales" CASCADE;
  DROP TABLE "pages_blocks_header_nav_links" CASCADE;
  DROP TABLE "pages_blocks_header_nav_links_locales" CASCADE;
  DROP TABLE "pages_blocks_header" CASCADE;
  DROP TABLE "pages_blocks_header_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_alt_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_alt_plans_features_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_alt_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing_alt_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_alt" CASCADE;
  DROP TABLE "pages_blocks_pricing_alt_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_blog_posts" CASCADE;
  DROP TABLE "pages_blocks_blog_posts_locales" CASCADE;
  DROP TABLE "pages_blocks_blog" CASCADE;
  DROP TABLE "pages_blocks_blog_locales" CASCADE;
  DROP TABLE "pages_blocks_footer_menu_groups_links" CASCADE;
  DROP TABLE "pages_blocks_footer_menu_groups_links_locales" CASCADE;
  DROP TABLE "pages_blocks_footer_menu_groups" CASCADE;
  DROP TABLE "pages_blocks_footer_menu_groups_locales" CASCADE;
  DROP TABLE "pages_blocks_footer_social_links" CASCADE;
  DROP TABLE "pages_blocks_footer" CASCADE;
  DROP TABLE "pages_blocks_footer_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links_children" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links_children_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links" CASCADE;
  DROP TABLE "_pages_v_blocks_header_nav_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_header" CASCADE;
  DROP TABLE "_pages_v_blocks_header_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_alt_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_alt_plans_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_alt_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_alt_plans_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_alt" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_alt_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_posts_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_blog" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_menu_groups_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_menu_groups_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_menu_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_menu_groups_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_locales" CASCADE;`)
}
