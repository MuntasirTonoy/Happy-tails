import Banner from "@/components/ui/Banner";
import HowItWorks from "@/components/ui/HowItWorks";
import MakeDifference from "@/components/ui/MakeDifference";
import MostPopularPets from "@/components/ui/MostPopularPets";
import OurGallery from "@/components/ui/OurGallery";


export default function Home() {
  return (
    <main>
      <Banner/>
      <HowItWorks/>
      <MakeDifference/>
      <MostPopularPets/>
      <OurGallery/>
    </main>
  );
}
