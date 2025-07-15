import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';
import { weeklySchedule } from '../../lib/constants';

export const ScheduleTab: React.FC = () => {
  const { currentWeek, setCurrentWeek, consultaInicial } = useBabyFoodStore();

  const hoje = new Date();
  const diasDesdeConsulta = Math.floor((hoje.getTime() - consultaInicial.getTime()) / (1000 * 60 * 60 * 24));
  const semanaAtual = Math.min(Math.max(Math.floor(diasDesdeConsulta / 7) + 1, 1), 8);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-500" />
          Cronograma de Introdução
        </h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            disabled={currentWeek <= 1}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            ← Anterior
          </button>
          <span className="font-medium">Semana {currentWeek} de 8</span>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            disabled={currentWeek >= 8}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Próxima →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(weeklySchedule).map(([week, schedule]) => (
          <div 
            key={week}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              parseInt(week) === currentWeek 
                ? 'border-purple-500 bg-purple-50' 
                : parseInt(week) < semanaAtual
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800 text-sm">{schedule.phase}</h4>
              {parseInt(week) === currentWeek && (
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              )}
              {parseInt(week) < semanaAtual && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">{schedule.periodo}</p>
            <p className="text-xs text-gray-600 mb-3">{schedule.focus}</p>
            <div className="space-y-1">
              {schedule.meals.map((meal, index) => (
                <div 
                  key={index}
                  className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-700"
                >
                  {meal}
                </div>
              ))}
            </div>
            {schedule.testes && schedule.testes.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                {schedule.testes.map((teste, index) => (
                  <div key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full mb-1">
                    {teste}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress to Consultation */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800">Progresso até a Próxima Consulta</h4>
          <span className="text-sm text-gray-600">{semanaAtual} de 8 semanas completas</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(semanaAtual / 8) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Início: 26/Jun</span>
            <span className="font-medium">Consulta: 26/Ago</span>
          </div>
        </div>
      </div>

      {/* Current Week Details */}
      <div className="mt-6 bg-white border border-purple-200 rounded-xl p-6">
        <h4 className="font-semibold text-purple-800 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Detalhes da Semana Atual ({currentWeek}ª semana)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">📅 Período</h5>
            <p className="text-gray-600 mb-4">{weeklySchedule[currentWeek].periodo}</p>
            
            <h5 className="font-medium text-gray-700 mb-2">🎯 Foco</h5>
            <p className="text-gray-600">{weeklySchedule[currentWeek].focus}</p>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">🍽️ Refeições</h5>
            <div className="space-y-2">
              {weeklySchedule[currentWeek].meals.map((meal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">{meal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {weeklySchedule[currentWeek].testes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-medium text-gray-700 mb-2">🧪 Testes desta semana</h5>
            <div className="flex flex-wrap gap-2">
              {weeklySchedule[currentWeek].testes.map((teste, index) => (
                <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                  {teste}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h4 className="font-medium text-yellow-800 mb-2">💡 Dicas importantes</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Sempre ofereça a mesma comida por 3-4 dias seguidos</li>
          <li>• Não force se a criança recusar - tente novamente no dia seguinte</li>
          <li>• Mantenha um ambiente calmo e sem distrações durante as refeições</li>
          <li>• Deixe a criança explorar e se sujar - faz parte do aprendizado</li>
        </ul>
      </div>
    </div>
  );
}; 