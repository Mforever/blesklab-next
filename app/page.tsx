// app/page.tsx
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Advantages from '@/components/home/Advantages';
import BeforeAfterBlock from '@/components/home/BeforeAfterBlock';
import VideoReels from '@/components/home/VideoReels';
import GalleryPreview from '@/components/home/GalleryPreview';
import Reviews from '@/components/home/Reviews';
import FAQ from '@/components/home/FAQ';
import Contacts from '@/components/home/Contacts';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Advantages />
      <BeforeAfterBlock />
      <VideoReels />
      <GalleryPreview />
      <Reviews />
      <FAQ />
      <Contacts />
    </>
  );
}