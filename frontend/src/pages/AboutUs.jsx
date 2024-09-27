import AboutUsHero from '../components/about/AboutHero';
import MissionVision from '../components/about/MissionVision';
import TeamMembers from '../components/about/TeamMembers';
import CallToAction from '../components/about/CallToAction';
import BasicLayout from '../components/layout/BasicLayout';

const AboutUs = () => {
  return (
    <BasicLayout>
      <AboutUsHero />
      <MissionVision />
      <TeamMembers />
      <CallToAction />
    </BasicLayout>
  );
};

export default AboutUs;
