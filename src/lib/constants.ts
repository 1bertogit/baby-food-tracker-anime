import type { WeeklySchedule, DailySchedule, TutorialStep, FoodGroupInfo, NutritionalFood, FoodGroup, NutritionalGuideline } from './types';

// Grupos alimentares conforme PDF oficial
export const foodGroups: Record<FoodGroup, FoodGroupInfo> = {
  carboidrato: {
    name: 'Carboidrato',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '🌾',
    description: 'Fonte de energia principal',
    examples: ['Arroz', 'Batata doce', 'Mandioca', 'Inhame', 'Batata baroa', 'Quinoa']
  },
  proteina: {
    name: 'Proteína',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '🥩',
    description: 'Construção e reparação muscular',
    examples: ['Frango', 'Carne bovina', 'Peixe', 'Ovo']
  },
  leguminosa: {
    name: 'Leguminosa',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '🫘',
    description: 'Proteína vegetal e fibras',
    examples: ['Feijão', 'Lentilha', 'Grão de bico', 'Ervilha']
  },
  legume: {
    name: 'Legume',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '🥕',
    description: 'Vitaminas e minerais',
    examples: ['Cenoura', 'Abobrinha', 'Chuchu', 'Beterraba', 'Tomate', 'Brócolis']
  },
  verdura: {
    name: 'Verdura',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: '🥬',
    description: 'Folhas ricas em ferro e vitaminas',
    examples: ['Couve', 'Espinafre', 'Alface', 'Rúcula']
  }
};

// Alimentos categorizados por grupo nutricional
export const nutritionalFoods: NutritionalFood[] = [
  // CARBOIDRATOS
  { name: 'Arroz', group: 'carboidrato', preparation: 'Bem cozido e amassado', benefits: 'Energia de fácil digestão' },
  { name: 'Batata doce', group: 'carboidrato', preparation: 'Cozida no vapor ou assada', benefits: 'Rica em betacaroteno' },
  { name: 'Mandioca', group: 'carboidrato', preparation: 'Bem cozida e amassada', benefits: 'Fonte de energia' },
  { name: 'Inhame', group: 'carboidrato', preparation: 'Cozido no vapor', benefits: 'Rico em potássio' },
  { name: 'Batata baroa', group: 'carboidrato', preparation: 'Cozida e amassada', benefits: 'Fácil digestão' },
  { name: 'Quinoa', group: 'carboidrato', preparation: 'Cozida em grãos', benefits: 'Proteína completa' },
  
  // PROTEÍNAS
  { name: 'Frango', group: 'proteina', preparation: 'Desfiado, bem cozido', benefits: 'Proteína de alta qualidade' },
  { name: 'Carne bovina', group: 'proteina', preparation: 'Cozida em panela de pressão', benefits: 'Rica em ferro' },
  { name: 'Tilápia', group: 'proteina', preparation: 'Grelhada com azeite', benefits: 'Ômega-3', warnings: 'Teste de alergia no dia 8' },
  { name: 'Ovo', group: 'proteina', preparation: 'Cozido por 15 minutos', benefits: 'Proteína completa', warnings: 'Teste de alergia no dia 18' },
  
  // LEGUMINOSAS
  { name: 'Feijão', group: 'leguminosa', preparation: 'Bem cozido, só o caldo no início', benefits: 'Proteína vegetal e ferro' },
  { name: 'Lentilha', group: 'leguminosa', preparation: 'Cozida até ficar macia', benefits: 'Rica em ferro' },
  { name: 'Grão de bico', group: 'leguminosa', preparation: 'Cozido e amassado', benefits: 'Proteína e fibras' },
  
  // LEGUMES
  { name: 'Cenoura', group: 'legume', preparation: 'Cozida no vapor', benefits: 'Rica em betacaroteno' },
  { name: 'Abobrinha', group: 'legume', preparation: 'Cozida e amassada', benefits: 'Fácil digestão' },
  { name: 'Chuchu', group: 'legume', preparation: 'Cozido no vapor', benefits: 'Hidratante' },
  { name: 'Beterraba', group: 'legume', preparation: 'Cozida e ralada', benefits: 'Rica em ferro' },
  { name: 'Tomate', group: 'legume', preparation: 'Sem pele e sementes', benefits: 'Licopeno' },
  { name: 'Brócolis', group: 'legume', preparation: 'Cozido no vapor', benefits: 'Vitamina C e ferro' },
  { name: 'Quiabo', group: 'legume', preparation: 'Cozido e picado', benefits: 'Fibras' },
  
  // VERDURAS
  { name: 'Couve', group: 'verdura', preparation: 'Refogada rapidamente', benefits: 'Rica em ferro e cálcio' },
  { name: 'Espinafre', group: 'verdura', preparation: 'Refogado sem temperos', benefits: 'Ferro e ácido fólico' },
  { name: 'Alface', group: 'verdura', preparation: 'Crua, bem lavada', benefits: 'Fibras' },
  { name: 'Rúcula', group: 'verdura', preparation: 'Crua, bem lavada', benefits: 'Vitamina K' }
];

// Função para obter grupo de um alimento
export const getFoodGroup = (foodName: string): FoodGroup | null => {
  const food = nutritionalFoods.find(f => f.name.toLowerCase() === foodName.toLowerCase());
  return food ? food.group : null;
};

// Função para obter alimentos de um grupo
export const getFoodsByGroup = (group: FoodGroup): NutritionalFood[] => {
  return nutritionalFoods.filter(f => f.group === group);
};

export const weeklySchedule: Record<number, WeeklySchedule> = {
  1: { 
    phase: '1ª semana (6º mês)', 
    meals: ['Fruta manhã', 'Fruta tarde'], 
    focus: 'Adaptação às frutas',
    periodo: '26/Jun - 02/Jul',
    testes: ['Teste glúten (aveia)']
  },
  2: { 
    phase: '2ª semana (6º mês)', 
    meals: ['Fruta manhã', 'Fruta tarde'], 
    focus: 'Variação de frutas',
    periodo: '03/Jul - 09/Jul',
    testes: ['Teste peixe (tilápia)']
  },
  3: { 
    phase: '3ª semana (6º mês)', 
    meals: ['Fruta manhã', 'Almoço', 'Fruta tarde'], 
    focus: 'Introdução do almoço',
    periodo: '10/Jul - 16/Jul',
    testes: ['Teste ovo']
  },
  4: { 
    phase: '4ª semana (6º mês)', 
    meals: ['Fruta manhã', 'Almoço', 'Fruta tarde'], 
    focus: 'Consolidação do almoço',
    periodo: '17/Jul - 23/Jul',
    testes: []
  },
  5: { 
    phase: '1ª semana (7º mês)', 
    meals: ['Fruta manhã', 'Almoço', 'Fruta tarde', 'Jantar'], 
    focus: 'Introdução do jantar',
    periodo: '24/Jul - 30/Jul',
    testes: []
  },
  6: { 
    phase: '2ª semana (7º mês)', 
    meals: ['Fruta manhã', 'Almoço', 'Fruta tarde', 'Jantar'], 
    focus: 'Consolidação do jantar',
    periodo: '31/Jul - 06/Ago',
    testes: []
  },
  7: { 
    phase: '3ª semana (7º mês)', 
    meals: ['Fruta manhã', 'Almoço', 'Fruta tarde', 'Jantar'], 
    focus: 'Rotina estabelecida',
    periodo: '07/Ago - 13/Ago',
    testes: []
  },
  8: { 
    phase: '4ª semana (7º mês)', 
    meals: ['Fruta manhã', 'Almoço', 'Fruta tarde', 'Jantar'], 
    focus: 'Preparação próxima consulta',
    periodo: '14/Ago - 20/Ago',
    testes: []
  }
};

export const dailySchedule: Record<number, DailySchedule> = {
  // SEMANA 1 (Dias 1-7): Só frutas + Teste glúten
  1: {
    day: 1,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Abacate'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Abacate'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  2: {
    day: 2,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Mamão'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Mamão'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  3: {
    day: 3,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Banana'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Banana'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  4: {
    day: 4,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Laranja'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Laranja'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  5: {
    day: 5,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { 
        type: 'fruta_manha', 
        time: '09:30h',
        foods: ['TESTE DO GLÚTEN', 'Morango + 1 colher (chá) de aveia orgânica'],
        isTestDay: true,
        testType: 'gluten'
      },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Morango'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  6: {
    day: 6,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Manga'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Manga'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  7: {
    day: 7,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Melão'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Melão'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },

  // SEMANA 2 (Dias 8-14): Só frutas + Teste peixe
  8: {
    day: 8,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { 
        type: 'fruta_manha', 
        time: '09:30h',
        foods: ['TESTE DO PEIXE', 'Maçã + ½ colher (café) de tilápia grelhada'],
        isTestDay: true,
        testType: 'peixe'
      },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Maçã'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  9: {
    day: 9,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Abacate + banana'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Abacate + banana'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  10: {
    day: 10,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Pera raspadinha'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Pera raspadinha'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  11: {
    day: 11,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Ameixa'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Ameixa'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  12: {
    day: 12,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Frutas vermelhas'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Frutas vermelhas'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  13: {
    day: 13,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Kiwi'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Kiwi'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  14: {
    day: 14,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Uva'] },
      { type: 'almoco', time: '11:30h', foods: [], milkAmount: '90ml', milkType: 'formula' },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Uva'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },

  // SEMANA 3 (Dias 15-21): Frutas + Almoço + Teste ovo
  15: {
    day: 15,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Abacate'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Batata doce', '🥩 Frango desfiadinho', '🥕 Abobrinha'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Pera raspadinha'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  16: {
    day: 16,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Mamão'] },
      { type: 'almoco', time: '11:30h', foods: ['�� Arroz', '🫘 Feijão', '🥕 Cenoura'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Maçã'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  17: {
    day: 17,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Manga'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Batata baroa', '🥩 Frango', '🥕 Chuchu'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Melão'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  18: {
    day: 18,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Banana'] },
      { 
        type: 'almoco', 
        time: '11:30h',
        foods: ['🌾 Arroz', '🫘 Feijão', '🥩 TESTE DO OVO - ½ colher (café) ovo cozido 15min', '🥕 Cenoura'],
        isTestDay: true,
        testType: 'ovo'
      },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Picolé de manga'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  19: {
    day: 19,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Abacate + banana'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Inhame', '🥩 Carne bovina', '🥕 Brócolis'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Pitaya'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  20: {
    day: 20,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Mamão'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Mandioca', '🥩 Carne de panela', '🥕 Tomate'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Maçã raspadinha'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  21: {
    day: 21,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Melão'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Arroz', '🫘 Feijão', '🥕 Beterraba'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Sorvete de melão'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },

  // SEMANA 4 (Dias 22-28): Consolidação Almoço
  22: {
    day: 22,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Abacate'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Quinoa', '🥩 Carne bovina', '🥕 Brócolis'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Pera raspadinha'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  23: {
    day: 23,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Manga'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Arroz', '🫘 Lentilha', '🥕 Quiabo'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Frutas vermelhas'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  24: {
    day: 24,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Uva'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Batata doce', '🥩 Frango', '🥬 Couve'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Sorvetinho de uva'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  25: {
    day: 25,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Banana'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Arroz', '🫘 Feijão', '🥕 Abobrinha'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Melancia'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  26: {
    day: 26,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Mamão'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Inhame', '🥩 Carne bovina', '🥕 Cenoura'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Maçã raspadinha'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  27: {
    day: 27,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Abacate'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Batata baroa', '🥩 Frango', '🥬 Espinafre'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Ameixa'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  },
  28: {
    day: 28,
    meals: [
      { type: 'acordar', time: '08:30h', foods: [], milkAmount: '120ml', milkType: 'formula' },
      { type: 'fruta_manha', time: '09:30h', foods: ['Maçã cozida com canela'] },
      { type: 'almoco', time: '11:30h', foods: ['🌾 Arroz', '🫘 Feijão', '🥕 Beterraba'] },
      { type: 'fruta_tarde', time: '13:30h', foods: ['Picolé de acerola'], supplements: ['Ferro (antes da refeição)'] },
      { type: 'jantar', time: '15:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Vitamina D (após)'] },
      { type: 'dormir', time: '20:00h-21:00h', foods: [], milkAmount: '120ml', milkType: 'formula', supplements: ['Ômega-3 (após)'] }
    ]
  }
};

// Função utilitária para calcular semana baseada no dia (28 dias = 4 semanas)
export const getDayWeek = (day: number): number => {
  return Math.ceil(day / 7);
};

// Função para obter informações da semana do dia
export const getWeekInfoForDay = (day: number) => {
  const week = getDayWeek(day);
  return {
    week,
    weekInfo: weeklySchedule[week] || null,
    dayInWeek: ((day - 1) % 7) + 1,
    isValidDay: day >= 1 && day <= 28
  };
};

export const tutorialSteps: TutorialStep[] = [
  {
    target: 'welcome',
    title: '👋 Olá! Bem-vindos ao app da Clarinha!',
    content: 'Eu vou te ajudar a não perder nenhum detalhe da introdução alimentar. É super fácil, prometo! 😊',
    position: 'bottom'
  },
  {
    target: 'header-info',
    title: '📊 Aqui fica o resumo',
    content: 'Sempre que abrir o app, você vê: qual semana estamos, quantos dias faltam para a consulta, e o progresso geral.',
    position: 'bottom'
  },
  {
    target: 'navigation',
    title: '🧭 Estas são as 6 abas principais',
    content: 'Dashboard (resumo), Alimentos (o que testar), Cronograma (semana a semana), Diário (dia a dia), Testes de Alergia e Suplementos. Tudo organizado!',
    position: 'bottom'
  },
  {
    target: 'progress-cards',
    title: '🎯 Cartões de progresso',
    content: 'Estes cartões mostram seu progresso: quantos alimentos já testaram, testes de alergia feitos e suplementos do dia.',
    position: 'bottom'
  },
  {
    target: 'current-schedule',
    title: '📅 Cronograma da semana',
    content: 'Aqui você vê exatamente o que fazer esta semana: quais refeições oferecer e se tem algum teste de alergia.',
    position: 'top'
  },
  {
    target: 'quick-actions',
    title: '⚡ Ações rápidas',
    content: 'Botões para as ações mais comuns: avançar semana, resetar suplementos, registrar alimentos e agendar testes.',
    position: 'top'
  },
  {
    target: 'foods-tab',
    title: '🍎 Como registrar alimentos',
    content: 'Na aba "Alimentos": clique no círculo ⭕ quando testar algo novo, depois nos emojis 😊😐😞 para dizer se ela gostou.',
    position: 'bottom',
    action: 'foods'
  },
  {
    target: 'supplements-tab',
    title: '💊 Checklist de suplementos',
    content: 'Na aba "Suplementos": marque ✅ cada um conforme for dando. No final do dia, use "Reset Dia" para começar de novo.',
    position: 'bottom',
    action: 'supplements'
  },
  {
    target: 'dashboard-final',
    title: '🎉 Pronto! Você já sabe usar!',
    content: 'Use o Dashboard como sua "central de comando" diária. Sempre que tiver dúvida, volte aqui. Boa sorte com a Clarinha! 💕',
    position: 'bottom',
    action: 'dashboard'
  }
];

export const categoryIcons = {
  fruta: 'apple',
  carboidrato: 'wheat',
  proteina: 'beef',
  legume: 'carrot',
  verdura: 'carrot',
  leguminosa: 'circle'
};

export const categoryColors = {
  fruta: 'bg-orange-100 text-orange-700 border-orange-200',
  carboidrato: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  proteina: 'bg-red-100 text-red-700 border-red-200',
  legume: 'bg-green-100 text-green-700 border-green-200',
  verdura: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  leguminosa: 'bg-purple-100 text-purple-700 border-purple-200'
};

export const supplementsInfo = {
  ferro: {
    name: 'Ferro Quelado Taste Free',
    dose: '8mg (1ml)',
    when: '15 min antes do almoço ou jantar',
    pharmacy: 'Essentia Pharma (manipulado)',
    alternatives: 'Flora Nativa Ferrix (8 gotas) ou True Source Iron Plus (8 gotas)',
    color: 'orange'
  },
  vitamina: {
    name: 'Vitamina D',
    dose: '400 UI (1 gota)',
    when: 'Após fruta da tarde',
    options: 'Flora Nativa D-trix, Addera, Pura Vida ou True Source',
    note: 'Dose será ajustada com 1 ano',
    color: 'yellow'
  },
  omega: {
    name: 'Ômega-3 DHA',
    dose: '1,5ml (Essential Nutrition) ou 10 gotas (True Source)',
    when: 'Logo após o almoço',
    storage: 'Geladeira após aberto',
    note: 'Dose será ajustada com 1 ano',
    color: 'blue'
  }
};

export const allergyTestInstructions = {
  gluten: {
    name: 'Glúten (6º mês)',
    instruction: '1 colher (chá) de aveia orgânica misturada com fruta já testada'
  },
  fish: {
    name: 'Peixe (6º mês)',
    instruction: '½ colher (café) de tilápia grelhada, bem cozida'
  },
  egg: {
    name: 'Ovo (6º mês)',
    instruction: '½ colher (café) de ovo cozido por 15 min (gema + clara)'
  }
}; 

// Diretrizes nutricionais conforme PDF oficial
export const nutritionalGuidelines: NutritionalGuideline[] = [
  // FUNÇÃO INTESTINAL
  {
    id: 'intestinal-constipation',
    category: 'intestinal',
    title: 'Alimentos Constipantes',
    description: 'Alguns alimentos podem causar prisão de ventre no bebê',
    tips: [
      'Maçã sem casca e banana nanica podem prender o intestino',
      'Ofereça água nos intervalos das refeições',
      'Mamão, ameixa e laranja ajudam o funcionamento intestinal',
      'Observe as reações e ajuste conforme necessário'
    ],
    importance: 'high'
  },
  {
    id: 'intestinal-laxative',
    category: 'intestinal',
    title: 'Alimentos Laxativos',
    description: 'Alimentos que estimulam o funcionamento intestinal',
    tips: [
      'Mamão, ameixa e frutas vermelhas são laxativos naturais',
      'Comece com pequenas quantidades',
      'Laranja pode causar diarreia em excesso',
      'Feijão pode causar gases nos primeiros dias'
    ],
    importance: 'high'
  },

  // PREPARO DE ALIMENTOS
  {
    id: 'preparation-cooking',
    category: 'preparation',
    title: 'Métodos de Cocção',
    description: 'Como preparar os alimentos de forma segura e nutritiva',
    tips: [
      'Cozinhar no vapor preserva mais nutrientes',
      'Evite fritar alimentos para bebês',
      'Carne deve ser bem cozida (panela de pressão)',
      'Legumes devem ficar macios para facilitar a mastigação',
      'Não use sal, açúcar ou temperos industrializados'
    ],
    importance: 'high'
  },
  {
    id: 'preparation-consistency',
    category: 'preparation',
    title: 'Consistência dos Alimentos',
    description: 'Texturas adequadas para cada fase',
    tips: [
      'Início: alimentos bem amassados com garfo',
      'Evolução gradual para pedaços pequenos',
      'Não bater no liquidificador (perde textura)',
      'Deixar alguns grãos de arroz e feijão inteiros',
      'BLW: oferecer em pedaços que o bebê consiga segurar'
    ],
    importance: 'high'
  },

  // ALIMENTOS PROIBIDOS
  {
    id: 'prohibited-first-year',
    category: 'prohibited',
    title: 'Proibidos no Primeiro Ano',
    description: 'Alimentos que NÃO devem ser oferecidos antes de 12 meses',
    tips: [
      'MEL (risco de botulismo)',
      'LEITE DE VACA in natura',
      'Clara de ovo antes do teste',
      'Frutos do mar (camarão, lagosta)',
      'Refrigerantes e sucos industrializados',
      'Açúcar, sal e adoçantes',
      'Embutidos (salsicha, presunto)'
    ],
    importance: 'high'
  },
  {
    id: 'prohibited-choking',
    category: 'prohibited',
    title: 'Risco de Engasgo',
    description: 'Alimentos que podem causar engasgo',
    tips: [
      'Uvas inteiras (cortar ao meio)',
      'Nozes e amendoins inteiros',
      'Pipoca e balas',
      'Cenoura crua em pedaços grandes',
      'Maçã em pedaços duros',
      'Sempre supervisionar as refeições'
    ],
    importance: 'high'
  },

  // HIGIENE ALIMENTAR
  {
    id: 'hygiene-storage',
    category: 'hygiene',
    title: 'Armazenamento Seguro',
    description: 'Como armazenar e conservar os alimentos',
    tips: [
      'Geladeira: máximo 3 dias em recipiente fechado',
      'Congelador: até 1 mês em porções pequenas',
      'Não reaquecer mais de uma vez',
      'Descartar se ficar mais de 2h fora da geladeira',
      'Não oferecer sobras que o bebê já mexeu'
    ],
    importance: 'medium'
  },
  {
    id: 'hygiene-preparation',
    category: 'hygiene',
    title: 'Higiene no Preparo',
    description: 'Cuidados durante o preparo das refeições',
    tips: [
      'Lavar bem as mãos antes de preparar',
      'Higienizar frutas e verduras com água sanitária',
      'Usar utensílios limpos e exclusivos',
      'Não usar a mesma tábua para carne e vegetais',
      'Cozinhar bem carnes e ovos'
    ],
    importance: 'medium'
  },

  // SEGURANÇA ALIMENTAR
  {
    id: 'safety-gag-reflex',
    category: 'prohibited',
    title: 'Reflexo de Gag vs Engasgo',
    description: 'Diferença crucial entre reflexo normal e emergência',
    tips: [
      'REFLEXO DE GAG (normal): bebê faz barulho, tosse, consegue respirar',
      'ENGASGO (emergência): bebê fica roxo, sem som, sem respiração',
      'Reflexo de gag protege contra engasgo - é positivo!',
      'Permaneça calmo durante o reflexo, não retire o alimento',
      'Se bebê engasgar: vire de barriga para baixo, bata nas costas',
      'Aprenda manobras de desengasgo antes de iniciar'
    ],
    importance: 'high'
  },
  {
    id: 'safety-supervision',
    category: 'prohibited',
    title: 'Supervisão Durante Refeições',
    description: 'Nunca deixe o bebê sozinho durante as refeições',
    tips: [
      'SEMPRE supervisione o bebê enquanto come',
      'Sente-se junto, na mesma altura dos olhos',
      'Evite distrações (TV, celular) durante a refeição',
      'Ofereça água apenas nos intervalos das refeições',
      'Ensine a mastigar devagar e engolir antes de oferecer mais',
      'Crie ambiente tranquilo e sem pressa'
    ],
    importance: 'high'
  },
  {
    id: 'safety-portion-size',
    category: 'preparation',
    title: 'Tamanho das Porções',
    description: 'Porções adequadas para evitar engasgo',
    tips: [
      'Tamanho ideal: do tamanho da unha do mindinho do bebê',
      'Corte uvas e tomates cereja ao meio no sentido longitudinal',
      'Cenoura crua: apenas ralada, nunca em bastões',
      'Maçã: sempre cozida ou ralada nos primeiros meses',
      'Carnes: desfiadas em fibras pequenas',
      'Evite alimentos redondos e duros'
    ],
    importance: 'high'
  }];

// Função para obter diretrizes por categoria
export const getGuidelinesByCategory = (category: NutritionalGuideline['category']): NutritionalGuideline[] => {
  return nutritionalGuidelines.filter(guideline => guideline.category === category);
};

// Função para obter diretrizes de alta importância
export const getHighImportanceGuidelines = (): NutritionalGuideline[] => {
  return nutritionalGuidelines.filter(guideline => guideline.importance === 'high');
}; 