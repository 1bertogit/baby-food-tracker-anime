import React from 'react';
import { Calendar, ChefHat, Apple, Clock, AlertTriangle, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';
import { dailySchedule, getWeekInfoForDay, foodGroups, nutritionalFoods } from '../../lib/constants';

export const DailyScheduleTab: React.FC = () => {
  const { currentDay, setCurrentDay } = useBabyFoodStore();

  const today = dailySchedule[currentDay];
  const weekInfo = getWeekInfoForDay(currentDay);

  // Função para extrair informações nutricionais
  const getNutritionalInfo = (foodText: string) => {
    // Remove emojis e texto extra para encontrar o alimento
    const cleanName = foodText.replace(/[🌾🥩🫘🥕🥬]/g, '').replace(/TESTE DO \w+ - /, '').trim();
    return nutritionalFoods.find(food => 
      cleanName.toLowerCase().includes(food.name.toLowerCase()) ||
      food.name.toLowerCase().includes(cleanName.toLowerCase())
    );
  };

  // Componente para legenda dos grupos alimentares
  const FoodGroupsLegend = () => (
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
      <h4 className="font-semibold text-gray-800 mb-3">🍽️ Grupos Alimentares do Almoço</h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(foodGroups).map(([key, group]) => (
          <div key={key} className="flex items-center space-x-2 text-sm">
            <span className="text-lg">{group.icon}</span>
            <div>
              <div className="font-medium text-gray-700">{group.name}</div>
              <div className="text-xs text-gray-500">{group.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-600">
        <strong>Regra de ouro:</strong> Cada almoço deve conter 1 alimento de cada grupo para nutrição completa
      </div>
    </div>
  );
  
  const getMealIcon = (type: string) => {
    switch (type) {
      case 'acordar':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'fruta_manha':
        return <Apple className="h-5 w-5 text-orange-500" />;
      case 'almoco':
        return <ChefHat className="h-5 w-5 text-green-500" />;
      case 'fruta_tarde':
        return <Apple className="h-5 w-5 text-purple-500" />;
      case 'jantar':
        return <ChefHat className="h-5 w-5 text-blue-500" />;
      case 'dormir':
        return <Clock className="h-5 w-5 text-indigo-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getMealTitle = (type: string) => {
    switch (type) {
      case 'acordar':
        return 'Acordar';
      case 'fruta_manha':
        return 'Fruta da Manhã';
      case 'almoco':
        return 'Almoço';
      case 'fruta_tarde':
        return 'Fruta da Tarde';
      case 'jantar':
        return 'Jantar';
      case 'dormir':
        return 'Antes de Dormir';
      default:
        return 'Refeição';
    }
  };

  const getMealTime = (type: string) => {
    switch (type) {
      case 'acordar':
        return '08:30h';
      case 'fruta_manha':
        return '09:30h - 10h';
      case 'almoco':
        return '11:30h';
      case 'fruta_tarde':
        return '13:30h';
      case 'jantar':
        return '15:00h';
      case 'dormir':
        return '20:00h - 21:00h';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      {/* Header com navegação */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-500" />
          Cronograma Diário Detalhado - 6º Mês
        </h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentDay(currentDay - 1)}
            disabled={currentDay <= 1}
            className="p-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-medium text-lg px-4 py-2 bg-purple-50 rounded-lg">
            Dia {currentDay}/28
          </span>
          <button
            onClick={() => setCurrentDay(currentDay + 1)}
            disabled={currentDay >= 28}
            className="p-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Informações da semana correlacionada */}
      {weekInfo.weekInfo && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">
              {weekInfo.weekInfo.phase} - Dia {weekInfo.dayInWeek} da semana
            </h4>
          </div>
          <p className="text-sm text-blue-700 mb-2">
            <strong>Foco:</strong> {weekInfo.weekInfo.focus}
          </p>
          <p className="text-sm text-blue-700 mb-2">
            <strong>Período:</strong> {weekInfo.weekInfo.periodo}
          </p>
          <div className="flex flex-wrap gap-2">
            {weekInfo.weekInfo.meals.map((meal, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {meal}
              </span>
            ))}
          </div>
          {weekInfo.weekInfo.testes.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-blue-600 font-medium">Testes desta semana: </span>
              {weekInfo.weekInfo.testes.map((teste, index) => (
                <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs mr-1">
                  {teste}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cronograma do dia */}
      {today ? (
        <div className="space-y-6">
          {today.meals.map((meal, index) => (
            <div 
              key={index}
              className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                meal.isTestDay 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Header da refeição */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getMealIcon(meal.type)}
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {getMealTitle(meal.type)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getMealTime(meal.type)}
                    </p>
                  </div>
                </div>
                
                {meal.isTestDay && (
                  <div className="flex items-center space-x-2 bg-red-100 px-3 py-1 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-medium text-red-600">
                      DIA DE TESTE
                    </span>
                  </div>
                )}
              </div>

              {/* Lista de alimentos */}
              <div className="space-y-3">
                {/* Leite */}
                {meal.milkAmount && (
                  <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">🍼</span>
                      <div className="font-medium text-blue-800">
                        {meal.milkAmount} - {meal.milkType === 'formula' ? 'Fórmula' : 'Leite Materno'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Alimentos */}
                {meal.foods.length > 0 && meal.foods.map((food, foodIndex) => {
                  const nutritionalInfo = getNutritionalInfo(food);
                  return (
                    <div 
                      key={foodIndex}
                      className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        food.includes('TESTE') 
                          ? 'border-red-200 bg-red-100 hover:bg-red-50' 
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                      title={nutritionalInfo ? `${nutritionalInfo.preparation} - ${nutritionalInfo.benefits}` : ''}
                    >
                      <div className={`font-medium ${
                        food.includes('TESTE') ? 'text-red-700' : 'text-gray-800'
                      }`}>
                        {food}
                      </div>
                      {nutritionalInfo && (
                        <div className="mt-2 text-xs text-gray-600">
                          <div><strong>Preparo:</strong> {nutritionalInfo.preparation}</div>
                          <div><strong>Benefício:</strong> {nutritionalInfo.benefits}</div>
                          {nutritionalInfo.warnings && (
                            <div className="text-orange-600"><strong>Atenção:</strong> {nutritionalInfo.warnings}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Suplementos */}
                {meal.supplements && meal.supplements.length > 0 && (
                  <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-600">💊</span>
                      <div className="font-medium text-green-800">Suplementos:</div>
                    </div>
                    {meal.supplements.map((supplement, supIndex) => (
                      <div key={supIndex} className="text-sm text-green-700 ml-6">
                        • {supplement}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Instruções para dias de teste */}
              {meal.isTestDay && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="font-medium text-yellow-800 mb-2">
                    ⚠️ Instruções para o teste de {meal.testType}
                  </h5>
                  <div className="text-sm text-yellow-700">
                    {meal.testType === 'gluten' && (
                      <p>Ofereça 1 colher (chá) de aveia orgânica misturada com fruta já testada. Aguarde 4 dias para verificar reações.</p>
                    )}
                    {meal.testType === 'peixe' && (
                      <p>Grelhe tilápia com azeite até ficar bem cozida. Ofereça ½ colher (café) apenas 1 vez. Aguarde 4 dias.</p>
                    )}
                    {meal.testType === 'ovo' && (
                      <p>Ferva 1 ovo por 15 minutos. Ofereça ½ colher (café) de gema + clara apenas 1 vez. Aguarde 4 dias.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Legenda dos grupos alimentares */}
          <FoodGroupsLegend />

          {/* Navegação rápida */}
          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-semibold text-purple-800 mb-4">🗓️ Navegação Rápida - 28 Dias</h4>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                const dayWeekInfo = getWeekInfoForDay(day);
                return (
                  <button
                    key={day}
                    onClick={() => setCurrentDay(day)}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      day === currentDay
                        ? 'bg-purple-500 text-white'
                        : dailySchedule[day]?.meals.some(m => m.isTestDay)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-white text-gray-700 hover:bg-purple-100'
                    }`}
                    title={`Dia ${day} - ${dayWeekInfo.weekInfo?.phase || 'Semana ' + dayWeekInfo.week}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-purple-700">Dia atual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                <span className="text-red-700">Dia com teste de alergia</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                <span className="text-gray-700">Dia normal</span>
              </div>
            </div>
          </div>

          {/* Resumo da semana */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-medium text-green-800 mb-2">📋 Resumo dos próximos dias</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {[currentDay + 1, currentDay + 2, currentDay + 3].filter(day => day <= 28).map((day) => {
                const daySchedule = dailySchedule[day];
                const dayWeekInfo = getWeekInfoForDay(day);
                if (!daySchedule) return null;
                
                return (
                  <div key={day} className="bg-white p-3 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800 mb-1">
                      Dia {day} - {dayWeekInfo.weekInfo?.phase || `Semana ${dayWeekInfo.week}`}
                    </div>
                    {daySchedule.meals.map((meal, idx) => (
                      <div key={idx} className="text-green-700">
                        <span className="text-xs">{getMealTitle(meal.type)}:</span>
                        <span className="ml-1">{meal.foods[0]}</span>
                        {meal.isTestDay && <span className="text-red-600 ml-1">🧪</span>}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Cronograma não disponível para este dia.</p>
        </div>
      )}
    </div>
  );
};