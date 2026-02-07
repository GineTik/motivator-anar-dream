import type { HeroBlock as HeroBlockType } from "@/payload-types";
import styles from "./hero-block.module.css";

interface HeroBlockProps {
	block: HeroBlockType;
}

export function HeroBlock({ block }: HeroBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const dashboardImageUrl =
		typeof block.dashboardImage === "object" && block.dashboardImage?.url
			? block.dashboardImage.url
			: null;

	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.heroWrap}>
					<div className={styles.heroHeaderWrap}>
						<div className={styles.animateOnLoad01}>
							<div className={styles.sectionBadge}>
								<div className={styles.sectionBadgeWrap}>
									<div className={styles.sectionBadgeIconWrap}>
										<div className={styles.sectionBadgeIconBox}>
											{badgeIconUrl ? (
												<img
													src={badgeIconUrl}
													loading="lazy"
													alt=""
													className={styles.sectionBadgeIcon}
												/>
											) : (
												<div className={styles.iconFallback}>!</div>
											)}
										</div>
										<div className={styles.sectionBadgeOutline}></div>
									</div>
									<div className={styles.sectionBadgeTextWrap}>
										<div className={styles.badgeTitle}>{block.badge?.text}</div>
									</div>
								</div>
								<div className={styles.sectionBadgeOutline}></div>
							</div>
						</div>
						<div className={styles.heroTextWrap}>
							<div className={styles.animateOnLoad02}>
								<div className={styles.heroHeadingWrap}>
									<h1 className={styles.h1}>{block.heading}</h1>
								</div>
							</div>
							<div className={styles.animateOnLoad03}>
								<div className={styles.heroSubtitleWrap}>
									<div className={styles.paragraphText02}>{block.subtitle}</div>
								</div>
							</div>
						</div>
						<div className={styles.animateOnLoad04}>
							<div className={styles.heroFormWrap}>
								<div className={styles.subscribeFormBlock}>
									<form className={styles.subscribeForm}>
										<div className={styles.subscribeFormGroup}>
											<input
												className={styles.subscribeInputField}
												maxLength={256}
												name="email"
												placeholder={block.ctaForm?.inputPlaceholder}
												type="email"
												required
											/>
											<input
												type="submit"
												className={styles.subscribeSubmitButton}
												value={block.ctaForm?.buttonText}
											/>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.animateOnLoad05}>
						<div className={styles.heroDashboardWrap}>
							<div className={styles.heroDashboardImageWrap}>
								{dashboardImageUrl ? (
									<img
										src={dashboardImageUrl}
										loading="lazy"
										alt="Dashboard"
										className={styles.heroDashboard}
									/>
								) : (
									<div className={styles.dashboardFallback}>
										<div className={styles.fallbackText}>Dashboard Preview</div>
									</div>
								)}
							</div>
							<div className={styles.heroDashboardLinear}></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
