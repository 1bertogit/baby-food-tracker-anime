import React from 'react';
import { AlertTriangle, Wheat, Fish, Egg, Star, Check } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';

const iconMap = {
  wheat: Wheat,
  fish: Fish,
  egg: Egg,
  star: Star
};

export const AllergyTestsTab: React.FC = () => {
  const { allergyTests, toggleAllergyTest, currentDay } = useBabyFoodStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h3 className="font-semibold text-gray-800 mb-6 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
        Cronograma de Testes de Alergia
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allergyTests.map((test) => {
          const IconComponent = iconMap[test.icon as keyof typeof iconMap] || Star;
          const isTestDay = test.day === currentDay;
          const isPastDue = test.day < currentDay && !test.tested;
          const isUpcoming = test.day > currentDay;
          
          return (
            <div 
              key={test.id}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                test.tested 
                  ? 'bg-green-50 border-green-200' 
                  : isTestDay
                  ? 'bg-yellow-50 border-yellow-200 animate-pulse'
                  : isPastDue
                  ? 'bg-red-50 border-red-200'
                  : isUpcoming
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-6 w-6 text-gray-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{test.food}</h4>
                    <p className="text-sm text-gray-600">Dia {test.day} - Semana {Math.ceil(test.day / 7)}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleAllergyTest(test.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    test.tested 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {test.tested && <Check className="h-5 w-5" />}
                </button>
              </div>
              
              {isTestDay && !test.tested && (
                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-yellow-700 font-medium">⏰ Testar hoje!</p>
                </div>
              )}
              
              {isPastDue && (
                <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-red-700 font-medium">⚠️ Teste atrasado!</p>
                </div>
              )}
              
              {isUpcoming && (
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">📅 Faltam {test.day - currentDay} dias</p>
                </div>
              )}
              
              {test.tested && test.testDate && (
                <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700">✅ Testado em: {test.testDate}</p>
                </div>
              )}
              
              {test.instructions && (
                <div className="text-xs text-gray-600 mt-3 p-2 bg-gray-50 rounded">
                  💡 {test.instructions}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-800 mb-3">📋 Instruções para Testes</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-blue-700 mb-2">Glúten (6º mês)</h5>
            <p className="text-blue-600">1 colher (chá) de aveia orgânica misturada com fruta já testada</p>
          </div>
          <div>
            <h5 className="font-medium text-blue-700 mb-2">Peixe (6º mês)</h5>
            <p className="text-blue-600">½ colher (café) de tilápia grelhada, bem cozida</p>
          </div>
          <div>
            <h5 className="font-medium text-blue-700 mb-2">Ovo (6º mês)</h5>
            <p className="text-blue-600">½ colher (café) de ovo cozido por 15 min (gema + clara)</p>
          </div>
        </div>
      </div>

      {/* Warning Signs */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
        <h4 className="font-semibold text-red-800 mb-3">🚨 Sinais de Alerta</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-red-700 mb-2">Reações Imediatas (até 2h)</h5>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Urticária, coceira, inchaço</li>
              <li>• Vômitos, diarreia</li>
              <li>• Dificuldade respiratória</li>
              <li>• Irritabilidade excessiva</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-red-700 mb-2">Reações Tardias (até 4 dias)</h5>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Eczema, dermatite</li>
              <li>• Fezes com sangue ou muco</li>
              <li>• Cólicas persistentes</li>
              <li>• Refluxo aumentado</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-red-100 rounded-lg">
          <p className="text-sm text-red-700">
            <strong>⚠️ Importante:</strong> Se houver qualquer reação suspeita, suspenda o alimento e consulte o pediatra imediatamente.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h4 className="font-semibold text-purple-800 mb-3">📅 Cronograma dos Testes</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Wheat className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h5 className="font-medium text-gray-800">6º mês - 1ª semana</h5>
              <p className="text-sm text-gray-600">Teste do glúten (aveia)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Fish className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h5 className="font-medium text-gray-800">6º mês - 2ª semana</h5>
              <p className="text-sm text-gray-600">Teste do peixe (tilápia)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Egg className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h5 className="font-medium text-gray-800">6º mês - 3ª semana</h5>
              <p className="text-sm text-gray-600">Teste do ovo (gema + clara)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h5 className="font-medium text-gray-800">9º-10º mês</h5>
              <p className="text-sm text-gray-600">Amendoim, oleaginosas e gergelim</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 