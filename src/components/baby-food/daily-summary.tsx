import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';

export const DailySummary: React.FC = () => {
  const { currentDay, foods, allergyTests, todos, supplements } = useBabyFoodStore();

  // Calculate what's done today
  const todayFoods = foods.filter(f => f.tested && f.testDate === new Date().toLocaleDateString());
  const todayTests = allergyTests.filter(t => t.day === currentDay && t.tested);
  const todaySupplements = supplements.filter(s => s.taken);
  const todayTodos = todos.filter(t => t.relatedDay === currentDay);
  const completedTodos = todayTodos.filter(t => t.completed);

  // Calculate what's pending
  const pendingTests = allergyTests.filter(t => t.day === currentDay && !t.tested);
  const pendingSupplements = supplements.filter(s => !s.taken);
  const pendingTodos = todayTodos.filter(t => !t.completed);

  // Upcoming items
  const upcomingTests = allergyTests.filter(t => t.day > currentDay && t.day <= currentDay + 7);
  const nextTest = upcomingTests.sort((a, b) => a.day - b.day)[0];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 mb-6">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-purple-500" />
        Resumo do Dia {currentDay}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* O que já foi feito */}
        <div className="space-y-3">
          <h4 className="font-medium text-green-700 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            ✅ Concluído Hoje
          </h4>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">{todayFoods.length}</span> alimentos testados
            </div>
            <div className="text-sm">
              <span className="font-medium">{todaySupplements.length}</span> suplementos tomados
            </div>
            <div className="text-sm">
              <span className="font-medium">{todayTests.length}</span> testes de alergia
            </div>
            <div className="text-sm">
              <span className="font-medium">{completedTodos.length}</span> tarefas finalizadas
            </div>
          </div>
          
          {(todayFoods.length > 0 || todaySupplements.length > 0 || todayTests.length > 0) && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <div className="text-green-800 text-xs font-medium">🎉 Parabéns!</div>
              <div className="text-green-700 text-xs">
                Você está seguindo o cronograma perfeitamente
              </div>
            </div>
          )}
        </div>

        {/* O que está pendente */}
        <div className="space-y-3">
          <h4 className="font-medium text-orange-700 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            ⏳ Pendente Hoje
          </h4>
          <div className="space-y-2">
            {pendingSupplements.length > 0 && (
              <div className="text-sm">
                <span className="font-medium">{pendingSupplements.length}</span> suplementos
                <div className="text-xs text-gray-600 ml-2">
                  {pendingSupplements.map(s => s.name).join(', ')}
                </div>
              </div>
            )}
            {pendingTests.length > 0 && (
              <div className="text-sm">
                <span className="font-medium">{pendingTests.length}</span> teste de alergia
                <div className="text-xs text-gray-600 ml-2">
                  {pendingTests.map(t => t.food).join(', ')}
                </div>
              </div>
            )}
            {pendingTodos.length > 0 && (
              <div className="text-sm">
                <span className="font-medium">{pendingTodos.length}</span> tarefas
                <div className="text-xs text-gray-600 ml-2">
                  {pendingTodos.slice(0, 2).map(t => t.title).join(', ')}
                  {pendingTodos.length > 2 && '...'}
                </div>
              </div>
            )}
            {pendingSupplements.length === 0 && pendingTests.length === 0 && pendingTodos.length === 0 && (
              <div className="text-sm text-gray-500">
                Nada pendente! Tudo em dia 🎯
              </div>
            )}
          </div>

          {(pendingSupplements.length > 0 || pendingTests.length > 0) && (
            <div className="mt-3 p-3 bg-orange-50 rounded-lg">
              <div className="text-orange-800 text-xs font-medium">📋 Lembrete</div>
              <div className="text-orange-700 text-xs">
                Não esqueça dos itens pendentes de hoje
              </div>
            </div>
          )}
        </div>

        {/* Próximos */}
        <div className="space-y-3">
          <h4 className="font-medium text-blue-700 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            📅 Próximos Dias
          </h4>
          <div className="space-y-2">
            {nextTest && (
              <div className="text-sm">
                <span className="font-medium">Dia {nextTest.day}</span> - Teste de {nextTest.food}
                <div className="text-xs text-gray-600">
                  Em {nextTest.day - currentDay} dias
                </div>
              </div>
            )}
            
            {currentDay < 14 && (
              <div className="text-sm">
                <span className="font-medium">Semanas 1-2</span> - Só frutas
                <div className="text-xs text-gray-600">
                  Introdução gradual
                </div>
              </div>
            )}
            
            {currentDay >= 14 && currentDay < 28 && (
              <div className="text-sm">
                <span className="font-medium">Semanas 3-4</span> - Frutas + Almoço
                <div className="text-xs text-gray-600">
                  Refeições completas
                </div>
              </div>
            )}
            
            {currentDay >= 28 && (
              <div className="text-sm">
                <span className="font-medium">Parabéns!</span> - Cronograma completo
                <div className="text-xs text-gray-600">
                  Continue acompanhando
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="text-blue-800 text-xs font-medium">💡 Dica</div>
            <div className="text-blue-700 text-xs">
              Sempre aguarde 3-4 dias entre novos alimentos
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progresso do Cronograma</span>
          <span className="text-sm text-gray-600">{Math.round((currentDay / 28) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentDay / 28) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Dia {currentDay} de 28 • {28 - currentDay} dias restantes
        </div>
      </div>
    </div>
  );
};