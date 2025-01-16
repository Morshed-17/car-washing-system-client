
import HeroSection from "@/components/Home/HeroSection";
import ReviewSection from "@/components/Home/ReviewSection";

import FeaturedServices from "@/components/Home/ServiceSection";
import Container from "@/components/ui/Container";

const Home = () => {
  return (
    <Container>
     <HeroSection/>
     <FeaturedServices/>
     <ReviewSection/>
    </Container>
  );
};

export default Home;
