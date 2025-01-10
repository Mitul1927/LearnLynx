import Hero from "./Hero/Hero";
import HeroFeatures from "./Hero-features/HeroFeatures";
import HeroCourses from "./Hero-courses/HeroCourses";
import HeroPlans from "./Hero-plans/HeroPlans";

export default function Landingpage() {
  return (
    <>
      <Hero />
      <HeroFeatures />
      <HeroCourses />
      <HeroPlans />
    </>
  );
}
