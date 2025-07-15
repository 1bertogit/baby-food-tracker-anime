import React from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useBabyFoodStore } from '../../store/baby-food-store';

interface OnboardingTourProps {
  run: boolean;
  onComplete: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ run, onComplete }) => {
  const { setActiveTab } = useBabyFoodStore();

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold text-purple-800 mb-3">
            Baby Food Tracker
          </h2>
          <p className="text-gray-700 mb-4">
            Este tutorial vai te mostrar como usar o app para acompanhar a introdução alimentar de forma simples e segura.
          </p>
          <div className="bg-purple-50 p-3 rounded-lg text-sm text-purple-800">
            ✨ Vamos conhecer todas as funcionalidades principais
          </div>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="dashboard-summary"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-green-800 mb-2">📊 Resumo do Dia</h3>
          <p className="text-gray-700 mb-3">
            Esta seção mostra tudo que você precisa fazer hoje:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🎉 <strong>Concluído:</strong> O que já foi feito</li>
            <li>⏳ <strong>Pendente:</strong> O que ainda precisa fazer</li>
            <li>📅 <strong>Próximos dias:</strong> Orientações futuras</li>
          </ul>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="progress-cards"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-blue-800 mb-2">📈 Cards de Progresso</h3>
          <p className="text-gray-700 mb-3">
            Acompanhe o progresso do bebê em tempo real:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🍎 <strong>Alimentos testados</strong></li>
            <li>🧪 <strong>Testes de alergia realizados</strong></li>
            <li>💊 <strong>Suplementos do dia</strong></li>
          </ul>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="navigation-tabs"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-purple-800 mb-2">🗂️ Navegação Principal</h3>
          <p className="text-gray-700 mb-3">
            Use estas abas para acessar todas as funcionalidades:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🏠 <strong>Dashboard:</strong> Visão geral</li>
            <li>🍎 <strong>Alimentos:</strong> Testar comidas</li>
            <li>📅 <strong>Cronograma:</strong> Plano semanal</li>
            <li>📝 <strong>Diário:</strong> Horários diários</li>
            <li>🧪 <strong>Testes:</strong> Alergias programadas</li>
            <li>💊 <strong>Suplementos:</strong> Ferro, Vitamina D, Ômega</li>
          </ul>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="foods-tab"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-green-800 mb-2">🍎 Testar Alimentos</h3>
          <p className="text-gray-700 mb-3">
            Vamos ver como registrar se o bebê gostou de um alimento:
          </p>
          <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800">
            👆 Clique aqui para ver a lista de alimentos
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="schedule-tab"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-blue-800 mb-2">📅 Cronograma Semanal</h3>
          <p className="text-gray-700 mb-3">
            Aqui você vê o plano completo das 4 semanas:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>📍 <strong>Semana atual destacada</strong></li>
            <li>🥗 <strong>Orientações por fase</strong></li>
            <li>📋 <strong>Refeições recomendadas</strong></li>
          </ul>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="daily-tab"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-orange-800 mb-2">📝 Diário Dia-a-Dia</h3>
          <p className="text-gray-700 mb-3">
            Navegue pelos 28 dias com horários detalhados:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>⬅️➡️ <strong>Setas para navegar</strong></li>
            <li>⏰ <strong>Horários específicos</strong></li>
            <li>📍 <strong>Instruções por dia</strong></li>
          </ul>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="tests-tab"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-red-800 mb-2">🧪 Testes de Alergia</h3>
          <p className="text-gray-700 mb-3">
            Programados para dias específicos:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>📌 <strong>Dia 5:</strong> Glúten (aveia)</li>
            <li>📌 <strong>Dia 8:</strong> Peixe (tilápia)</li>
            <li>📌 <strong>Dia 18:</strong> Ovo (gema/clara)</li>
          </ul>
          <div className="bg-red-50 p-3 rounded-lg text-sm text-red-800 mt-3">
            ⚠️ Instruções detalhadas para cada teste
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="supplements-tab"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-blue-800 mb-2">💊 Suplementos Diários</h3>
          <p className="text-gray-700 mb-3">
            Marque quando o bebê tomar cada suplemento:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🔸 <strong>Ferro quelado</strong> - 11h e 13:30h</li>
            <li>🔸 <strong>Vitamina D</strong> - 14h</li>
            <li>🔸 <strong>Ômega-3</strong> - 15:30h</li>
          </ul>
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mt-3">
            🔄 Reset automático todos os dias
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="todos-tab"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-purple-800 mb-2">✅ Lista de Tarefas</h3>
          <p className="text-gray-700 mb-3">
            Organize suas tarefas personalizadas:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>➕ <strong>Adicionar tarefas customizadas</strong></li>
            <li>⏰ <strong>Definir horários e prioridades</strong></li>
            <li>✅ <strong>Marcar como concluído</strong></li>
          </ul>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="guidelines-tab"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-green-800 mb-2">📚 Diretrizes e Segurança</h3>
          <p className="text-gray-700 mb-3">
            Informações importantes sempre à mão:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🚫 <strong>Alimentos proibidos</strong></li>
            <li>💡 <strong>Dicas de preparo</strong></li>
            <li>⚠️ <strong>Sinais de alergia</strong></li>
            <li>📞 <strong>Quando procurar ajuda</strong></li>
          </ul>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="theme-toggle"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">🌙 Modo Escuro</h3>
          <p className="text-gray-700 mb-3">
            Alterne entre tema claro e escuro para usar o app de noite sem cansar os olhos.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
            💡 Perfeito para usar durante as mamadas noturnas!
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="quick-actions"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-purple-800 mb-2">⚡ Ações Rápidas</h3>
          <p className="text-gray-700 mb-3">
            Botões para as ações mais comuns do dia:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>📝 <strong>Ver Diário</strong> - Horários de hoje</li>
            <li>🍎 <strong>Adicionar Alimento</strong> - Testar comida</li>
            <li>🧪 <strong>Teste Alergia</strong> - Verificar reações</li>
            <li>💊 <strong>Suplementos</strong> - Marcar doses</li>
          </ul>
        </div>
      ),
      placement: 'top',
    },
    {
      target: 'body',
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold text-green-800 mb-3">
            🎉 Tutorial Concluído!
          </h2>
          <p className="text-gray-700 mb-4">
            Agora você já sabe usar todas as funcionalidades do Baby Food Tracker!
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📝 Próximos Passos:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>1. 🍌 Comece testando os primeiros alimentos</li>
              <li>2. 💊 Configure os lembretes de suplementos</li>
              <li>3. 📱 Instale o app no seu celular (PWA)</li>
              <li>4. 📖 Leia as diretrizes de segurança</li>
            </ul>
          </div>
          <div className="mt-4 text-center">
            <div className="text-sm text-purple-600">
              💡 Você pode repetir este tutorial a qualquer momento!
            </div>
          </div>
        </div>
      ),
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, action } = data;
    
    // Navigate to appropriate tab based on current step
    if (action === 'next' || action === 'prev') {
      switch (index) {
        case 3: // Navigation tabs step - stay on dashboard
          setActiveTab('dashboard');
          break;
        case 4: // Foods tab step
          setActiveTab('foods');
          break;
        case 5: // Schedule tab step
          setActiveTab('schedule');
          break;
        case 6: // Daily tab step
          setActiveTab('daily');
          break;
        case 7: // Tests tab step
          setActiveTab('tests');
          break;
        case 8: // Supplements tab step
          setActiveTab('supplements');
          break;
        case 9: // Todos tab step
          setActiveTab('todos');
          break;
        case 10: // Guidelines tab step
          setActiveTab('guidelines');
          break;
        default:
          setActiveTab('dashboard');
          break;
      }
    }

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setActiveTab('dashboard');
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
      disableOverlayClose={true}
      scrollToFirstStep={true}
      hideBackButton={false}
      debug={false}
      styles={{
        options: {
          primaryColor: '#9333ea',
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 10000,
        },
        tooltip: {
          fontSize: 16,
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          color: '#1f2937',
        },
        buttonNext: {
          backgroundColor: '#9333ea',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 600,
          padding: '8px 16px',
          borderRadius: '8px',
        },
        buttonBack: {
          color: '#6b7280',
          fontSize: 14,
          fontWeight: 500,
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#6b7280',
          fontSize: 14,
          fontWeight: 500,
        },
        spotlight: {
          borderRadius: '8px',
        },
        overlay: {
          borderRadius: '8px',
        },
      }}
      locale={{
        back: 'Anterior',
        close: 'Fechar',
        last: 'Finalizar',
        next: 'Próximo',
        skip: 'Pular Tutorial',
      }}
    />
  );
};