import React, { useState } from 'react';
import { AlertTriangle, Book, ChefHat, Shield, Droplets, ChevronDown, ChevronUp } from 'lucide-react';
import { getGuidelinesByCategory } from '../../lib/constants';
import type { NutritionalGuideline } from '../../lib/types';

export const NutritionalGuidelines: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['prohibited']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryIcon = (category: NutritionalGuideline['category']) => {
    switch (category) {
      case 'intestinal':
        return <Droplets className="h-5 w-5 text-blue-600" />;
      case 'preparation':
        return <ChefHat className="h-5 w-5 text-green-600" />;
      case 'prohibited':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'hygiene':
        return <Shield className="h-5 w-5 text-purple-600" />;
      default:
        return <Book className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCategoryTitle = (category: NutritionalGuideline['category']) => {
    switch (category) {
      case 'intestinal':
        return 'Função Intestinal';
      case 'preparation':
        return 'Preparo de Alimentos';
      case 'prohibited':
        return 'Alimentos Proibidos';
      case 'hygiene':
        return 'Higiene Alimentar';
      default:
        return 'Diretrizes';
    }
  };

  const getCategoryColor = (category: NutritionalGuideline['category']) => {
    switch (category) {
      case 'intestinal':
        return 'border-blue-200 bg-blue-50';
      case 'preparation':
        return 'border-green-200 bg-green-50';
      case 'prohibited':
        return 'border-red-200 bg-red-50';
      case 'hygiene':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const categories: NutritionalGuideline['category'][] = ['prohibited', 'intestinal', 'preparation', 'hygiene'];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Book className="h-6 w-6 mr-3 text-blue-600" />
        <h3 className="font-semibold text-gray-800">Diretrizes Nutricionais</h3>
      </div>

      <div className="space-y-4">
        {/* Alerta de segurança crítica */}
        <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            ⚠️ SEGURANÇA CRÍTICA - LEIA PRIMEIRO
          </h4>
          <div className="text-sm text-red-700 space-y-2">
            <p><strong>REFLEXO DE GAG ≠ ENGASGO:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Normal:</strong> Bebê tosse, faz barulho, consegue respirar</li>
              <li><strong>Emergência:</strong> Bebê roxo, sem som, sem respiração → SOCORRO IMEDIATO</li>
            </ul>
            <p><strong>SEMPRE supervisione as refeições e aprenda manobras de desengasgo!</strong></p>
          </div>
        </div>

        {categories.map(category => {
          const guidelines = getGuidelinesByCategory(category);
          const isExpanded = expandedCategories.includes(category);
          
          return (
            <div key={category} className={`border rounded-xl ${getCategoryColor(category)}`}>
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(category)}
                  <h4 className="font-semibold text-gray-800">{getCategoryTitle(category)}</h4>
                  <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                    {guidelines.length}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {guidelines.map(guideline => (
                    <div key={guideline.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-800">{guideline.title}</h5>
                        {guideline.importance === 'high' && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                            Importante
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{guideline.description}</p>
                      
                      <ul className="space-y-1">
                        {guideline.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="mr-2 text-gray-400">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumo de emergência */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
        <h4 className="font-semibold text-red-800 mb-2 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Lembrete Importante
        </h4>
        <p className="text-sm text-red-700">
          <strong>NUNCA ofereça:</strong> Mel, leite de vaca, clara de ovo antes do teste, sal, açúcar, 
          frutos do mar. Em caso de reação alérgica, suspenda o alimento e procure orientação médica.
        </p>
      </div>
    </div>
  );
}; 