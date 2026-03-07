import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import { SiteHeader } from "@/features/payload-page/ui/site-header";
import "./globals.css";

export const metadata: Metadata = {
	title: "Motivator",
	description: "Your motivation platform",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const payload = await getPayload({ config });
	const headerData = await payload.findGlobal({ slug: "header" });

	return (
		<html lang="uk" className="scroll-smooth">
			<body>
				<SiteHeader data={headerData} />
				{children}
			</body>
		</html>
	);
}
