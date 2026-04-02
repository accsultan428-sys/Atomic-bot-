import Divider        from "./components/divider"
import AboutMe        from "./components/home/about-me"
import Education      from "./components/home/education"
import Experience     from "./components/home/experience"
import FeaturedWork   from "./components/home/featured-work"
import HeroSection    from "./components/home/hero-section"
import ProjectOverview from "./components/home/project-overview"
import { FadeIn }     from "@/components/animate-ui/fade-in"

const page = () => {
  return (
    <main>
      <HeroSection/>
      <Divider/>
      <FadeIn>
        <AboutMe/>
      </FadeIn>
      <Divider/>
      <FadeIn delay={50}>
        <FeaturedWork/>
      </FadeIn>
      <Divider/>
      <FadeIn delay={50}>
        <Experience/>
      </FadeIn>
      <Divider/>
      <FadeIn delay={50}>
        <Education/>
      </FadeIn>
      <Divider/>
      <FadeIn delay={50}>
        <ProjectOverview/>
      </FadeIn>
      <Divider/>
    </main>
  )
}

export default page