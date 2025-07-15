import React, { useState } from 'react';
import { Apple, Wheat, Beef, Carrot, Circle, Check, Plus } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';
import { categoryColors } from '../../lib/constants';
import { AddFoodModal } from './add-food-modal';

const categoryIcons = {
  fruta: Apple,
  carboidrato: Wheat,
  proteina: Beef,
  legume: Carrot,
  verdura: Carrot,
  leguminosa: Circle
};

export const FoodsTab: React.FC = () => {
  const { foods, toggleFood, updateFoodAcceptance, updateFoodAcceptanceNotes } = useBabyFoodStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);

  return (
    <div id="foods-tab" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Apple className="h-5 w-5 mr-2 text-purple-500" />
            Lista de Alimentos
            <div className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              Clique no ⭕ para testar
            </div>
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {foods.map((food) => {
            const IconComponent = categoryIcons[food.category];
            return (
              <div 
                key={food.id} 
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  food.tested ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleFood(food.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        food.tested 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-red-500 hover:border-red-600'
                      }`}
                    >
                      {food.tested && <Check className="h-4 w-4" />}
                    </button>
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-800">{food.name}</div>
                      {food.notes && (
                        <div className="text-xs text-gray-600 mt-1">{food.notes}</div>
                      )}
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${categoryColors[food.category]}`}>
                        {food.category}
                      </div>
                    </div>
                  </div>
                  {food.tested && (
                    <div className="flex space-x-1">
                      {(['sim', 'parcial', 'nao'] as const).map((acceptance) => (
                        <button
                          key={acceptance}
                          onClick={() => updateFoodAcceptance(food.id, acceptance)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            food.accepted === acceptance
                              ? acceptance === 'sim' 
                                ? 'bg-green-500 text-white'
                                : acceptance === 'parcial'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {acceptance === 'sim' ? '😊' : acceptance === 'parcial' ? '😐' : '😞'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Campo de observações melhorado */}
                {food.tested && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    {editingNotes === food.id ? (
                      <div className="w-full">
                        <input
                          type="text"
                          value={food.acceptanceNotes || ''}
                          onChange={(e) => updateFoodAcceptanceNotes(food.id, e.target.value)}
                          onBlur={() => setEditingNotes(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingNotes(null);
                            }
                            if (e.key === 'Escape') {
                              setEditingNotes(null);
                            }
                          }}
                          placeholder="Como foi a aceitação? Ex: Comeu tudo, fez careta mas engoliu..."
                          className="w-full px-3 py-2 text-sm border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          autoFocus
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Pressione Enter para salvar ou Esc para cancelar
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingNotes(food.id)}
                        className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className={food.acceptanceNotes ? 'text-gray-800' : 'text-gray-500'}>
                            {food.acceptanceNotes || 'Clique para escrever como foi a aceitação...'}
                          </span>
                          <span className="text-xs text-purple-500">✏️</span>
                        </div>
                      </button>
                    )}
                  </div>
                )}
                {food.testDate && (
                  <div className="text-xs text-gray-500 mt-2">Testado em: {food.testDate}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h3 className="font-semibold text-gray-800 mb-4">Estatísticas por Categoria</h3>
        <div className="space-y-4">
          {Object.entries(categoryColors).map(([category, colorClass]) => {
            const categoryFoods = foods.filter(f => f.category === category);
            const testedInCategory = categoryFoods.filter(f => f.tested).length;
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            
            return (
              <div key={category} className={`p-4 rounded-xl border ${colorClass}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium capitalize">{category}</span>
                  </div>
                  <span className="font-bold">{testedInCategory}/{categoryFoods.length}</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      category === 'fruta' ? 'bg-orange-500' :
                      category === 'carboidrato' ? 'bg-yellow-500' :
                      category === 'proteina' ? 'bg-red-500' :
                      category === 'legume' ? 'bg-green-500' :
                      category === 'verdura' ? 'bg-emerald-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${categoryFoods.length ? (testedInCategory / categoryFoods.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 Como usar</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Clique no círculo ⭕ quando testar um alimento</li>
            <li>• Use os emojis 😊😐😞 para registrar a reação</li>
            <li>• 😊 = Gostou • 😐 = Parcial • 😞 = Não gostou</li>
            <li>• Sempre ofereça por 3-4 dias antes de desistir</li>
          </ul>
        </div>

        {/* Acceptance Instructions */}
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="font-medium text-green-800 mb-2">📝 Instrução</h4>
          <p className="text-sm text-green-700 mb-3">
            <strong>Assinale os alimentos já oferecidos e escreva como foi a aceitação.</strong>
          </p>
          
          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span>💩</span>
              <span className="text-green-700">Pode ter ação laxativa</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span className="text-green-700">Pode prender o intestino</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span className="text-green-700">Risco de alergia</span>
            </div>
          </div>
        </div>
      </div>
      
      <AddFoodModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
}; 