import React from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface SimpleOnboardingProps {
  run: boolean;
  onComplete: () => void;
}

export const SimpleOnboarding: React.FC<SimpleOnboardingProps> = ({ run, onComplete }) => {
  const steps: Step[] = [
    {
      target: 'body',
      content: 'Bem-vinda ao Baby Food Tracker! Este é o primeiro passo do tutorial.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="dashboard-summary"]',
      content: 'Este é o resumo do dia. Aqui você vê o que foi concluído e o que ainda precisa fazer.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="progress-cards"]',
      content: 'Estes cards mostram o progresso geral do bebê em alimentos, testes e suplementos.',
      placement: 'top',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      onComplete();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleJoyrideCallback}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      styles={{
        options: {
          primaryColor: '#9333ea',
          zIndex: 10000,
        },
      }}
      locale={{
        back: 'Anterior',
        close: 'Fechar',
        last: 'Finalizar',
        next: 'Próximo',
        skip: 'Pular',
      }}
    />
  );
};