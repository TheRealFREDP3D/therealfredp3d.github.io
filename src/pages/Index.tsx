
import HeroSection from "@/components/HeroSection";
import LatestActivities from "@/components/LatestActivities";
import PinnedReposSection from "@/components/PinnedReposSection";
import InterestsSection from "@/components/InterestsSection";
import ProjectsSection from "@/components/ProjectsSection";
import LearningJourneySection from "@/components/LearningJourneySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <HeroSection />
      <LatestActivities />
      <PinnedReposSection />
      <InterestsSection />
      <ProjectsSection />
      <LearningJourneySection />
      <Footer />
    </div>
  );
};

export default Index;
