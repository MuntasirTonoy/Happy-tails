import Banner from "@/components/ui/Banner";
import HowItWorks from "@/components/ui/HowItWorks";
import MakeDifference from "@/components/ui/MakeDifference";

export const metadata = {
  title: "Happy Tails",
  description: "A Pet Adoption Portal",
};

export default function Home() {
  return (
    <main>
      <Banner/>
      <HowItWorks/>
      <MakeDifference/>
    </main>
  );
}
