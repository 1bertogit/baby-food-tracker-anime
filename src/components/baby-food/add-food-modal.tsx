import React, { useRef } from 'react';
import { X } from 'lucide-react';

import { useBabyFoodStore } from '@/store/baby-food-store';
import { FoodCategory } from '@/lib/types';
import { useFocusManagement, useFocusAnnouncement } from '@/hooks/useFocusManagement';
import { ValidatedForm } from '@/components/forms/ValidatedForm';
import { ValidatedInput } from '@/components/forms/ValidatedInput';
import { ValidatedSelect } from '@/components/forms/ValidatedSelect';
import { validationSchemas } from '@/hooks/useFormValidation';
import { ThemeToggle } from '@/components/theme/theme-toggle';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose }) => {
  const { addFood } = useBabyFoodStore();
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { containerRef } = useFocusManagement({
    isOpen,
    initialFocusRef: nameInputRef
  });
  const { announce } = useFocusAnnouncement();

  // Validation rules for the form
  const validationRules = [
    {
      field: 'name',
      schema: validationSchemas.foodName(),
      message: 'Nome do alimento deve ter entre 2 e 30 caracteres'
    },
    {
      field: 'category',
      schema: validationSchemas.required('Categoria é obrigatória'),
      message: 'Selecione uma categoria'
    },
    {
      field: 'emoji',
      schema: validationSchemas.required('Emoji é obrigatório para identificação visual'),
      message: 'Selecione um emoji'
    }
  ];

  // Category options for the select
  const categoryOptions = [
    { value: 'fruta', label: 'Fruta', description: 'Frutas frescas e naturais' },
    { value: 'vegetal', label: 'Vegetal', description: 'Vegetais e verduras' },
    { value: 'proteina', label: 'Proteína', description: 'Carnes, peixes e ovos' },
    { value: 'carboidrato', label: 'Carboidrato', description: 'Grãos, cereais e tubérculos' },
    { value: 'laticinios', label: 'Laticínios', description: 'Leites e derivados' },
    { value: 'leguminosas', label: 'Leguminosas', description: 'Feijões, lentilhas e grão-de-bico' },
    { value: 'oleaginosas', label: 'Oleaginosas', description: 'Castanhas, nozes e sementes' },
    { value: 'outros', label: 'Outros', description: 'Outros alimentos' }
  ];

  // Common food emojis
  const emojiOptions = [
    { value: '🍎', label: 'Maçã', description: 'Frutas vermelhas' },
    { value: '🍌', label: 'Banana', description: 'Frutas amarelas' },
    { value: '🥕', label: 'Cenoura', description: 'Vegetais laranja' },
    { value: '🥦', label: 'Brócolis', description: 'Vegetais verdes' },
    { value: '🍖', label: 'Carne', description: 'Proteínas' },
    { value: '🐟', label: 'Peixe', description: 'Peixes' },
    { value: '🥚', label: 'Ovo', description: 'Ovos' },
    { value: '🍞', label: 'Pão', description: 'Carboidratos' },
    { value: '🥛', label: 'Leite', description: 'Laticínios' },
    { value: '🫘', label: 'Feijão', description: 'Leguminosas' },
    { value: '🥜', label: 'Castanha', description: 'Oleaginosas' },
    { value: '🍯', label: 'Mel', description: 'Outros' }
  ];

  if (!isOpen) return null;

  const handleFormSubmit = async (data: Record<string, any>, isValid: boolean) => {
    if (!isValid) {
      announce('Por favor, corrija os erros no formulário.', 'assertive');
      return;
    }
    
    try {
      addFood({
        id: `custom-${Date.now()}`,
        name: data.name.trim(),
        category: data.category as FoodCategory,
        tested: false,
        accepted: undefined
      });
      
      announce(`Alimento "${data.name}" adicionado com sucesso!`, 'polite');
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar alimento:', error);
      announce('Erro ao adicionar alimento. Tente novamente.', 'assertive');
      throw error; // Re-throw to let ValidatedForm handle it
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={containerRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="add-food-title"
        aria-describedby="add-food-description"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 id="add-food-title" className="text-xl font-semibold text-gray-900 dark:text-white">
              Adicionar Alimento
            </h2>
            <ThemeToggle variant="button" className="ml-auto" />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p id="add-food-description" className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Adicione um novo alimento para acompanhar a introdução alimentar do seu bebê.
          </p>

          <ValidatedForm
            validationRules={validationRules}
            onSubmit={handleFormSubmit}
            submitButtonText="Adicionar Alimento"
            showValidationSummary={true}
            showProgressBar={true}
            autoFocus={true}
            resetOnSubmit={true}
          >
            <ValidatedInput
              fieldName="name"
              label="Nome do Alimento"
              placeholder="Ex: Maçã, Banana, Cenoura..."
              required
              maxLength={30}
              showCharacterCount={true}
              helperText="Digite o nome do alimento que será introduzido"
              ref={nameInputRef}
            />

            <ValidatedSelect
              fieldName="category"
              label="Categoria"
              placeholder="Selecione a categoria do alimento"
              options={categoryOptions}
              required
              helperText="Escolha a categoria que melhor descreve o alimento"
            />

            <ValidatedSelect
              fieldName="emoji"
              label="Emoji"
              placeholder="Selecione um emoji para o alimento"
              options={emojiOptions}
              required
              helperText="Escolha um emoji para identificar visualmente o alimento"
            />
          </ValidatedForm>
        </div>
      </div>
    </div>
  );
};
