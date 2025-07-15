import React from 'react';
import { X, ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';
import { tutorialSteps } from '../../lib/constants';

export const TutorialOverlay: React.FC = () => {
  const { 
    showTutorial, 
    tutorialStep, 
    nextTutorialStep, 
    prevTutorialStep, 
    skipTutorial,
    setActiveTab 
  } = useBabyFoodStore();

  if (!showTutorial) return null;

  const currentStep = tutorialSteps[tutorialStep];

  const handleNext = () => {
    if (currentStep.action) {
      setActiveTab(currentStep.action);
    }
    nextTutorialStep();
  };

  const handlePrev = () => {
    if (tutorialStep > 0) {
      const prevStep = tutorialSteps[tutorialStep - 1];
      if (prevStep.action) {
        setActiveTab(prevStep.action);
      }
    }
    prevTutorialStep();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop escuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Tutorial Card */}
      <div className="relative z-60 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-auto border-4 border-pink-200 max-h-[90vh] overflow-y-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="text-sm text-gray-500">
            Passo {tutorialStep + 1} de {tutorialSteps.length}
          </div>
          <button 
            onClick={skipTutorial}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 sm:mb-6">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((tutorialStep + 1) / tutorialSteps.length) * 100}%` }}
          ></div>
        </div>

        {/* Content */}
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
            {currentStep.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {currentStep.content}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            disabled={tutorialStep === 0}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-xl transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <button
            onClick={skipTutorial}
            className="px-3 sm:px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors text-xs sm:text-sm flex items-center"
          >
            <SkipForward className="h-4 w-4 mr-1" />
            <span>Pular</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg text-sm"
          >
            <span>{tutorialStep === tutorialSteps.length - 1 ? 'Finalizar' : 'Próximo'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Tips */}
        {tutorialStep === 0 && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-xs sm:text-sm text-blue-700">
              <strong>💡 Dica:</strong> Este tutorial dura só 2 minutos e vai te ensinar tudo que precisa saber!
            </div>
          </div>
        )}

        {/* Step-specific tips */}
        {tutorialStep === 6 && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-50 rounded-xl border border-orange-200">
            <div className="text-xs sm:text-sm text-orange-700">
              <strong>🍎 Lembre-se:</strong> Sempre teste um alimento por 3-4 dias antes de tentar outro!
            </div>
          </div>
        )}

        {tutorialStep === 7 && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-xs sm:text-sm text-blue-700">
              <strong>💊 Importante:</strong> Use o "Reset Dia" toda manhã para começar a checklist de novo!
            </div>
          </div>
        )}

        {tutorialStep === tutorialSteps.length - 1 && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-xs sm:text-sm text-green-700">
              <strong>🎉 Parabéns!</strong> Agora você está pronto para acompanhar a introdução alimentar da Clarinha!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 