import React, { useState, useEffect } from 'react';
import { Calendar, Apple, TestTubes, AlertTriangle, Pill, Plus, ArrowRight, Timer, TrendingUp, Zap } from 'lucide-react';
import { CiHome, CiApple, CiCalendar, CiStickyNote, CiWarning, CiPill, CiBookmark, CiRead } from 'react-icons/ci';
import { motion } from 'framer-motion';
import { ChibiAvatar } from './anime/ChibiAvatar';
import { useBabyFoodStore } from '../store/baby-food-store';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { weeklySchedule } from '../lib/constants';
import { TutorialOverlay } from './baby-food/tutorial-overlay';
import { FoodsTab } from './baby-food/foods-tab';
import { ScheduleTab } from './baby-food/schedule-tab';
import { DailyScheduleTab } from './baby-food/daily-schedule-tab';
import { AllergyTestsTab } from './baby-food/allergy-tests-tab';
import { SupplementsTab } from './baby-food/supplements-tab';
import { NutritionalGuidelines } from './baby-food/nutritional-guidelines';
import { TodosTab } from './baby-food/todos-tab';
import { PWAStatus } from './pwa/PWAStatus';
import { DailySummary } from './baby-food/daily-summary';
import { ThemeToggle } from './theme/theme-toggle';
import { UpcomingReminders } from './reminders/UpcomingReminders';
import { ProgressChart } from './analytics/ProgressChart';
import { OnboardingTour } from './onboarding/OnboardingTour';

export const BabyFoodTracker: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentWeek,
    currentDay,
    foods, 
    allergyTests, 
    supplements,
    restartTutorial
  } = useBabyFoodStore();

  const [showOnboarding, setShowOnboarding] = useState(false);

  // Tab navigation setup with anime icons
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: CiHome, shortLabel: 'Home', tourId: 'dashboard-tab' },
    { id: 'foods', label: 'Alimentos', icon: CiApple, shortLabel: 'Alimentos', tourId: 'foods-tab' },
    { id: 'schedule', label: 'Cronograma', icon: CiCalendar, shortLabel: 'Agenda', tourId: 'schedule-tab' },
    { id: 'daily', label: 'Diário', icon: CiStickyNote, shortLabel: 'Diário', tourId: 'daily-tab' },
    { id: 'tests', label: 'Testes Alergia', icon: CiWarning, shortLabel: 'Testes', tourId: 'tests-tab' },
    { id: 'supplements', label: 'Suplementos', icon: CiPill, shortLabel: 'Suplem.', tourId: 'supplements-tab' },
    { id: 'todos', label: 'Tarefas', icon: CiBookmark, shortLabel: 'Tarefas', tourId: 'todos-tab' },
    { id: 'guidelines', label: 'Diretrizes', icon: CiRead, shortLabel: 'Guias', tourId: 'guidelines-tab' },
  ];

  const { containerRef, handleKeyDown } = useKeyboardNavigation({
    items: tabs.map(tab => tab.id),
    activeItem: activeTab,
    onItemChange: setActiveTab,
    orientation: 'horizontal'
  });

  // Check if user is new (first time visiting)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('baby-food-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('baby-food-onboarding-completed', 'true');
  };

  // Stats
  const testedFoods = foods.filter(f => f.tested).length;
  const totalFoods = foods.length;
  const completedTests = allergyTests.filter(t => t.tested).length;
  const totalTests = allergyTests.length;
  const dailySupplements = supplements.filter(s => s.taken).length;
  const totalSupplements = supplements.length;

  const currentSchedule = weeklySchedule[currentWeek];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <TutorialOverlay />
      <OnboardingTour 
        run={showOnboarding} 
        onComplete={handleOnboardingComplete} 
      />
      
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="relative bg-anime-gradient text-white overflow-hidden slide-in-top" role="banner">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
          </div>
          
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Left side - Branding and context */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ChibiAvatar size="md" isActive={true} className="shadow-kawaii" />
                  <div>
                    <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight">Baby Clara</h1>
                    <p className="text-kawaii-pink text-xs sm:text-sm font-medium">Introdução Alimentar</p>
                  </div>
                </div>
                
                {/* Context info - mobile stacked, desktop inline */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 fade-in-up">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    <span className="text-kawaii-cream">6º Mês</span>
                  </div>
                  <div className="flex items-center gap-2 fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Calendar className="h-3 w-3 text-pink-200" />
                    <span className="text-kawaii-cream">Dia {currentDay}</span>
                  </div>
                </div>
              </div>

              {/* Right side - Stats and controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Progress indicator */}
                <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-right">
                    <div className="text-kawaii-cream text-xs font-medium">Progresso</div>
                    <div className="text-sm font-bold">Semana {currentWeek}/4</div>
                  </div>
                  <div className="w-8 h-8 relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + (currentWeek / 4) * 50}% 0%, ${50 + (currentWeek / 4) * 50}% 100%, 50% 100%)`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{Math.round((currentWeek / 4) * 100)}%</span>
                    </div>
                  </div>
                </div>

                {/* Mobile progress - simplified */}
                <div className="sm:hidden bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-center">
                    <div className="text-pink-100 text-xs">Semana</div>
                    <div className="text-lg font-bold">{currentWeek}/4</div>
                  </div>
                </div>

                {/* Notification badge */}
                <div className="relative fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <button className="w-8 h-8 glass-button rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-pink-100" />
                  </button>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                </div>

                {/* Theme toggle */}
                <div data-tour="theme-toggle" className="glass-effect rounded-lg p-1 fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <ThemeToggle />
                </div>

                {/* User menu */}
                <div className="hidden sm:block fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <button className="w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition-all duration-300 hover:scale-110">
                    C
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom row - Quick stats for mobile */}
            <div className="sm:hidden mt-4 flex justify-between text-xs fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-center glass-effect rounded-lg px-2 py-1">
                <div className="text-pink-200">Testados</div>
                <div className="font-bold">{testedFoods}/{totalFoods}</div>
              </div>
              <div className="text-center glass-effect rounded-lg px-2 py-1">
                <div className="text-pink-200">Alergias</div>
                <div className="font-bold">{completedTests}/{totalTests}</div>
              </div>
              <div className="text-center glass-effect rounded-lg px-2 py-1">
                <div className="text-pink-200">Suplementos</div>
                <div className="font-bold">{dailySupplements}/{totalSupplements}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b border-gray-200 px-3 py-4" data-tour="navigation-tabs" role="navigation" aria-label="Navegação principal">
          <div className="max-w-7xl mx-auto">
            <div 
              ref={containerRef}
              onKeyDown={handleKeyDown}
              className="flex flex-wrap gap-1 justify-center"
              role="tablist"
              aria-label="Navegação principal do aplicativo"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  data-tour={tab.tourId}
                  data-tab-id={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  className={`relative flex flex-col sm:flex-row items-center px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:ring-offset-2 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-anime-gradient text-white shadow-cel transform scale-105'
                      : 'text-gray-600 hover:bg-kawaii-cream/50 hover:text-kawaii-lavender'
                  }`}
                >
                  {/* Animated bottom border for active tab */}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-kawaii-gradient animate-spin-slow rounded-full" />
                  )}
                  <tab.icon className="h-5 w-5 sm:mr-2 mb-1 sm:mb-0" aria-hidden="true" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Tutorial Button */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-center">
            <button
              onClick={restartTutorial}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center transition-colors"
            >
              <span className="mr-1">📖</span>
              Mini Tutorial
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main id="main-content" className="flex-1 bg-gray-50" role="main">
          <div className="p-6 max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Daily Summary */}
                <div data-tour="dashboard-summary">
                  <DailySummary />
                </div>
                
                {/* Progress Cards */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  data-tour="progress-cards"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {/* Alimentos Testados */}
                  <motion.div 
                    className="bg-white rounded-2xl shadow-cel p-6 border border-kawaii-mint"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Apple className="h-5 w-5 mr-2 text-green-500" />
                      Alimentos Testados
                    </h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {testedFoods}
                    </div>
                    <div className="text-sm text-gray-600">
                      de {totalFoods} alimentos disponíveis
                    </div>
                    <div className="mt-4 bg-green-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-green-800">Próximos a testar:</div>
                      <div className="text-xs text-green-700 mt-1">
                        Manga, Melão, Kiwi, Frutas vermelhas
                      </div>
                    </div>
                  </motion.div>

                  {/* Testes de Alergia */}
                  <motion.div 
                    className="bg-white rounded-2xl shadow-cel p-6 border border-kawaii-peach"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                      Testes de Alergia
                    </h3>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {completedTests}
                    </div>
                    <div className="text-sm text-gray-600">
                      de {totalTests} testes realizados
                    </div>
                    <div className="mt-4 bg-orange-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-orange-800">Próximo teste:</div>
                      <div className="text-xs text-orange-700 mt-1">
                        {allergyTests.find(t => !t.tested)?.food || 'Todos concluídos'}
                      </div>
                    </div>
                  </motion.div>

                  {/* Suplementos Diários */}
                  <motion.div 
                    className="bg-white rounded-2xl shadow-cel p-6 border border-kawaii-sky"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Pill className="h-5 w-5 mr-2 text-blue-500" />
                      Suplementos Hoje
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {dailySupplements}
                    </div>
                    <div className="text-sm text-gray-600">
                      de {totalSupplements} suplementos tomados
                    </div>
                    <div className="mt-4 bg-blue-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-blue-800">Próximo:</div>
                      <div className="text-xs text-blue-700 mt-1">
                        {supplements.find(s => !s.taken)?.name || 'Todos tomados'}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* PWA Status */}
                  <PWAStatus />
                  
                  {/* Upcoming Reminders */}
                  <UpcomingReminders />
                </motion.div>

                {/* Analytics */}
                <ProgressChart />

                {/* Current Schedule */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                    Cronograma de Hoje - Dia {currentDay}
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    {currentSchedule?.phase} • {currentSchedule?.focus}
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium text-purple-800 mb-2">Refeições de hoje:</div>
                        <div className="text-sm text-purple-700">
                          {currentSchedule?.meals.join(', ')}
                        </div>
                      </div>
                      {currentSchedule?.testes && currentSchedule.testes.length > 0 && (
                        <div>
                          <div className="font-medium text-red-800 mb-2">Testes desta semana:</div>
                          <div className="text-sm text-red-700">
                            {currentSchedule.testes.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions - Versão Melhorada */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100" data-tour="quick-actions">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-purple-500" />
                      Ações Rápidas
                    </h3>
                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Dia {currentDay}/28
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ver Diário - Melhorado */}
                    <button
                      onClick={() => setActiveTab('daily')}
                      className="stagger-animation group relative bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl quick-action-button glow-on-hover"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm floating-icon">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">Ver Diário</div>
                            <div className="text-xs text-purple-100">Horários de hoje</div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-purple-200 group-hover:translate-x-1 transition-transform icon-bounce" />
                      </div>
                      <div className="mt-3 text-xs text-purple-100">
                        {currentSchedule ? `${currentSchedule.meals?.length || 0} refeições programadas` : 'Cronograma disponível'}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </button>

                    {/* Adicionar Alimento - Melhorado */}
                    <button
                      onClick={() => setActiveTab('foods')}
                      className="stagger-animation group relative bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl quick-action-button glow-on-hover"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm floating-icon">
                            <Plus className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">Adicionar Alimento</div>
                            <div className="text-xs text-green-100">Testar nova comida</div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-green-200 group-hover:translate-x-1 transition-transform icon-bounce" />
                      </div>
                      <div className="mt-3 text-xs text-green-100">
                        {testedFoods}/{totalFoods} alimentos testados
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </button>

                    {/* Teste Alergia - Melhorado */}
                    <button
                      onClick={() => setActiveTab('tests')}
                      className="stagger-animation group relative bg-gradient-to-br from-red-500 to-pink-600 text-white p-4 rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl quick-action-button glow-on-hover"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm floating-icon">
                            <TestTubes className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">Teste Alergia</div>
                            <div className="text-xs text-red-100">Verificar reações</div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-red-200 group-hover:translate-x-1 transition-transform icon-bounce" />
                      </div>
                      <div className="mt-3 text-xs text-red-100">
                        {allergyTests.filter(t => t.day === currentDay && !t.tested).length > 0 
                          ? `${allergyTests.filter(t => t.day === currentDay && !t.tested).length} teste(s) hoje` 
                          : 'Nenhum teste hoje'}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </button>

                    {/* Suplementos - Melhorado */}
                    <button
                      onClick={() => setActiveTab('supplements')}
                      className="stagger-animation group relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl quick-action-button glow-on-hover"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm floating-icon">
                            <Pill className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">Suplementos</div>
                            <div className="text-xs text-blue-100">Marcar doses</div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-blue-200 group-hover:translate-x-1 transition-transform icon-bounce" />
                      </div>
                      <div className="mt-3 text-xs text-blue-100">
                        {dailySupplements}/{totalSupplements} tomados hoje
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </button>
                  </div>

                  {/* Indicador de progresso geral */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-purple-800 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Progresso Geral
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {Math.round((currentDay / 28) * 100)}%
                        </span>
                        <Timer className="h-3 w-3 text-purple-500" />
                      </div>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out progress-bar-animated relative"
                        style={{ width: `${(currentDay / 28) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="text-xs text-purple-700">
                        Semana {currentWeek}/4 • {28 - currentDay} dias restantes
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs text-purple-600">
                          {currentDay < 7 ? 'Iniciando' : currentDay < 14 ? 'Progredindo' : currentDay < 21 ? 'Avançando' : 'Finalizando'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'foods' && (
              <div 
                id="tabpanel-foods"
                role="tabpanel"
                aria-labelledby="tab-foods"
              >
                <h1 className="sr-only">Alimentos - Gerenciar lista de alimentos</h1>
                <FoodsTab />
              </div>
            )}
            {activeTab === 'schedule' && (
              <div 
                id="tabpanel-schedule"
                role="tabpanel"
                aria-labelledby="tab-schedule"
              >
                <h1 className="sr-only">Cronograma - Planejamento semanal</h1>
                <ScheduleTab />
              </div>
            )}
            {activeTab === 'daily' && (
              <div 
                id="tabpanel-daily"
                role="tabpanel"
                aria-labelledby="tab-daily"
              >
                <h1 className="sr-only">Diário - Cronograma diário detalhado</h1>
                <DailyScheduleTab />
              </div>
            )}
            {activeTab === 'tests' && (
              <div 
                id="tabpanel-tests"
                role="tabpanel"
                aria-labelledby="tab-tests"
              >
                <h1 className="sr-only">Testes de Alergia - Acompanhar reações</h1>
                <AllergyTestsTab />
              </div>
            )}
            {activeTab === 'supplements' && (
              <div 
                id="tabpanel-supplements"
                role="tabpanel"
                aria-labelledby="tab-supplements"
              >
                <h1 className="sr-only">Suplementos - Controlar suplementação</h1>
                <SupplementsTab />
              </div>
            )}
            {activeTab === 'todos' && (
              <div 
                id="tabpanel-todos"
                role="tabpanel"
                aria-labelledby="tab-todos"
              >
                <h1 className="sr-only">Tarefas - Lista de afazeres</h1>
                <TodosTab />
              </div>
            )}
            {activeTab === 'guidelines' && (
              <div 
                id="tabpanel-guidelines"
                role="tabpanel"
                aria-labelledby="tab-guidelines"
              >
                <h1 className="sr-only">Diretrizes - Orientações nutricionais</h1>
                <NutritionalGuidelines />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}; 