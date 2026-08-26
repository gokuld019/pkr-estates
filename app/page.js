import HeroBanner from "./components/HeroBanner";
import GallerySection from "./components/GallerySection";
import AboutSection from "./components/AboutSection";
// import ManifestoSection from "./components/ManifestoSection";
import WhyChooseSection from "./components/WhyChooseSection";
// import AmenitiesSection from "./components/AmenitiesSection";
import ProjectsSection from "./components/ProjectsSection";
import CompletedProjectsSection from "./components/CompletedProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ConnectSection from "./components/ConnectSection";

export default function Home() {
  return (
    <main
      data-main
      style={{ position: "relative", zIndex: 2, overflow: "hidden" }}
    >
      <HeroBanner />
      <AboutSection />
      {/* <ManifestoSection /> */}
      <WhyChooseSection />
      {/* <AmenitiesSection /> */}
      <ProjectsSection />
      <TestimonialsSection />
      <CompletedProjectsSection />
      <ConnectSection />
      {/* <GallerySection /> */}
    </main>
  );
}