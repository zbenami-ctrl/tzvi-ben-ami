// Background loop over the hero image. Phones get a lighter encode; the <Image>
// underneath stays visible until the first frame arrives, so no poster is needed.
export function HeroVideo() {
  return (
    <video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
      <source src="/media/hero-loop-mobile.mp4" type="video/mp4" media="(max-width: 760px)" />
      <source src="/media/hero-loop-desktop.mp4" type="video/mp4" />
    </video>
  );
}
