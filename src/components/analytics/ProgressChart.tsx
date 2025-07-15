import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Target } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';

export const ProgressChart: React.FC = () => {
  const { foods } = useBabyFoodStore();

  // Weekly progress data
  const weeklyData = [
    { week: 'Semana 1', tested: foods.filter(f => f.tested && f.testDate).length * 0.2, target: 5 },
    { week: 'Semana 2', tested: foods.filter(f => f.tested && f.testDate).length * 0.4, target: 10 },
    { week: 'Semana 3', tested: foods.filter(f => f.tested && f.testDate).length * 0.7, target: 15 },
    { week: 'Semana 4', tested: foods.filter(f => f.tested && f.testDate).length, target: 20 },
  ];

  // Category progress data
  const categoryData = [
    { name: 'Frutas', count: foods.filter(f => f.category === 'fruta' && f.tested).length, color: '#ef4444' },
    { name: 'Proteínas', count: foods.filter(f => f.category === 'proteina' && f.tested).length, color: '#8b5cf6' },
    { name: 'Carboidratos', count: foods.filter(f => f.category === 'carboidrato' && f.tested).length, color: '#06b6d4' },
    { name: 'Legumes', count: foods.filter(f => f.category === 'legume' && f.tested).length, color: '#10b981' },
    { name: 'Verduras', count: foods.filter(f => f.category === 'verdura' && f.tested).length, color: '#f59e0b' },
    { name: 'Leguminosas', count: foods.filter(f => f.category === 'leguminosa' && f.tested).length, color: '#ec4899' },
  ];

  const totalTested = foods.filter(f => f.tested).length;
  const totalFoods = foods.length;
  const progressPercentage = (totalTested / totalFoods) * 100;

  const acceptedFoods = foods.filter(f => f.tested && f.accepted === 'sim').length;
  const rejectedFoods = foods.filter(f => f.tested && f.accepted === 'nao').length;
  const partialFoods = foods.filter(f => f.tested && f.accepted === 'parcial').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h3 className="font-semibold text-gray-800 mb-6 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
        Progresso e Analytics
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Progresso Semanal
          </h4>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="target" fill="#e5e7eb" name="Meta" />
                <Bar dataKey="tested" fill="#8b5cf6" name="Testado" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalTested}</div>
            <div className="text-sm text-gray-600">alimentos testados de {totalFoods}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(1)}% completo</div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Por Categoria
          </h4>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData.filter(c => c.count > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="count"
                  label={({ name, count }) => `${name}: ${count}`}
                  labelLine={false}
                  fontSize={12}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}: {category.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acceptance Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="font-medium text-gray-700 mb-3">Taxa de Aceitação</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{acceptedFoods}</div>
            <div className="text-xs text-green-700">Aceitos</div>
            <div className="text-xs text-gray-500">
              {totalTested > 0 ? Math.round((acceptedFoods / totalTested) * 100) : 0}%
            </div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{partialFoods}</div>
            <div className="text-xs text-yellow-700">Parciais</div>
            <div className="text-xs text-gray-500">
              {totalTested > 0 ? Math.round((partialFoods / totalTested) * 100) : 0}%
            </div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{rejectedFoods}</div>
            <div className="text-xs text-red-700">Rejeitados</div>
            <div className="text-xs text-gray-500">
              {totalTested > 0 ? Math.round((rejectedFoods / totalTested) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-blue-800 text-sm font-medium mb-1">💡 Insights</div>
        <div className="text-blue-700 text-sm">
          {progressPercentage >= 75 ? 
            'Excelente progresso! Você está quase finalizando o cronograma.' :
            progressPercentage >= 50 ?
            'Bom progresso! Continue seguindo o cronograma regularmente.' :
            progressPercentage >= 25 ?
            'Progresso moderado. Tente manter consistência nos testes.' :
            'Início do cronograma. Foque em testar 1-2 alimentos por dia.'
          }
        </div>
      </div>
    </div>
  );
};