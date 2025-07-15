import { FC, useEffect } from 'react';
import { useBabyFoodStore } from '../store/baby-food-store';
import { BabyFoodTracker } from '../components/baby-food-tracker';
import { PageSEO } from '../components/seo/PageSEO';

const IndexPage: FC = () => {
  const { isFirstAccess, restartTutorial } = useBabyFoodStore();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('clarinha-tutorial-seen');
    if (!hasSeenTutorial && isFirstAccess) {
      restartTutorial();
    }
  }, [isFirstAccess, restartTutorial]);

  return (
    <>
      <PageSEO page="home" />
      <BabyFoodTracker />
    </>
  );
};

export default IndexPage;
