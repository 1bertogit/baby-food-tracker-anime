import React from 'react';
import { Pill, Check } from 'lucide-react';
import { useBabyFoodStore } from '../../store/baby-food-store';

export const SupplementsTab: React.FC = () => {
  const { supplements, toggleSupplement, resetDailySupplements } = useBabyFoodStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Pill className="h-5 w-5 mr-2 text-blue-500" />
            Suplementação Diária
          </h3>
          <button
            onClick={resetDailySupplements}
            className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            Reset Dia
          </button>
        </div>

        <div id="supplements-tab" className="space-y-4">
          {supplements.map((supplement, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                supplement.taken ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleSupplement(index)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      supplement.taken 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {supplement.taken && <Check className="h-4 w-4" />}
                  </button>
                  <div>
                    <h4 className="font-semibold text-gray-800">{supplement.name}</h4>
                    <p className="text-sm text-gray-600">{supplement.dose} - {supplement.time}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  supplement.taken ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {supplement.taken ? 'Tomado' : 'Pendente'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 Lembretes Importantes</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ferro: Agitar bem antes de oferecer</li>
            <li>• Ômega-3: Manter na geladeira após aberto</li>
            <li>• Doses serão ajustadas conforme crescimento</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h3 className="font-semibold text-gray-800 mb-6">Informações dos Suplementos</h3>
        
        <div className="space-y-6">
          <div className="border border-orange-200 rounded-xl p-4 bg-orange-50">
            <h4 className="font-semibold text-orange-800 flex items-center mb-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              Ferro Quelado Taste Free
            </h4>
            <div className="text-sm text-orange-700 space-y-1">
              <p><strong>Dose:</strong> 8mg (1ml)</p>
              <p><strong>Quando:</strong> 15 min antes do almoço ou jantar</p>
              <p><strong>Farmácia:</strong> Essentia Pharma (manipulado)</p>
              <p><strong>Alternativas:</strong> Flora Nativa Ferrix (8 gotas) ou True Source Iron Plus (8 gotas)</p>
            </div>
          </div>

          <div className="border border-yellow-200 rounded-xl p-4 bg-yellow-50">
            <h4 className="font-semibold text-yellow-800 flex items-center mb-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              Vitamina D
            </h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>Dose:</strong> 400 UI (1 gota)</p>
              <p><strong>Quando:</strong> Após fruta da tarde</p>
              <p><strong>Opções:</strong> Flora Nativa D-trix, Addera, Pura Vida ou True Source</p>
              <p><strong>Observação:</strong> Dose será ajustada com 1 ano</p>
            </div>
          </div>

          <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-800 flex items-center mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              Ômega-3 DHA
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Dose:</strong> 1,5ml (Essential Nutrition) ou 10 gotas (True Source)</p>
              <p><strong>Quando:</strong> Logo após o almoço</p>
              <p><strong>Armazenamento:</strong> Geladeira após aberto</p>
              <p><strong>Observação:</strong> Dose será ajustada com 1 ano</p>
            </div>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h4 className="font-semibold text-purple-800 mb-3">⏰ Horário Sugerido</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">09:00 - Fruta da manhã</span>
              <span className="text-xs text-purple-500">-</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">11:45 - Ferro quelado</span>
              <span className="text-xs text-purple-500">15min antes almoço</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">12:00 - Almoço</span>
              <span className="text-xs text-purple-500">-</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">12:15 - Ômega-3</span>
              <span className="text-xs text-purple-500">Logo após almoço</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">15:00 - Fruta da tarde</span>
              <span className="text-xs text-purple-500">-</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">15:15 - Vitamina D</span>
              <span className="text-xs text-purple-500">Após fruta</span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 className="font-semibold text-red-800 mb-2">⚠️ Atenção</h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Não misturar ferro com leite ou derivados</li>
            <li>• Ferro pode causar constipação - ofereça mais água</li>
            <li>• Vitamina D é lipossolúvel - dar junto com gordura</li>
            <li>• Sempre consultar pediatra antes de alterar doses</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 