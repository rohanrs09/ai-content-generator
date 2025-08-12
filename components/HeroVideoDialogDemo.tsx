import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="relative">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://youtu.be/naYqAkxLEwQ"
        thumbnailSrc="/aigen.svg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
