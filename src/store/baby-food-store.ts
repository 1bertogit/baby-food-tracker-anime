import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FoodItem, AllergyTest, Supplement, Todo } from '../lib/types';

interface BabyFoodState {
  // Data states
  foods: FoodItem[];
  allergyTests: AllergyTest[];
  supplements: Supplement[];
  todos: Todo[];
  
  // App states
  currentWeek: number;
  currentMonth: number;
  currentDay: number;
  activeTab: string;
  
  // Tutorial states
  showTutorial: boolean;
  tutorialStep: number;
  isFirstAccess: boolean;
  
  // Important dates
  consultaInicial: Date;
  proximaConsulta: Date;
  
  // Actions
  addFood: (food: FoodItem) => void;
  toggleFood: (id: string) => void;
  updateFoodAcceptance: (id: string, accepted: 'sim' | 'nao' | 'parcial') => void;
  updateFoodAcceptanceNotes: (id: string, acceptanceNotes: string) => void;
  toggleAllergyTest: (id: string) => void;
  toggleSupplement: (index: number) => void;
  resetDailySupplements: () => void;
  
  // Todo actions
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  setCurrentWeek: (week: number) => void;
  setCurrentDay: (day: number) => void;
  nextDay: () => void;
  previousDay: () => void;
  setActiveTab: (tab: string) => void;
  nextTutorialStep: () => void;
  prevTutorialStep: () => void;
  finishTutorial: () => void;
  skipTutorial: () => void;
  restartTutorial: () => void;
}

// Initial data
const initialFoods: FoodItem[] = [
  // Frutas
  { id: 'fruta-abacate', name: 'Abacate', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-abacaxi', name: 'Abacaxi', category: 'fruta', tested: false, notes: '⚠️ Risco de alergia' },
  { id: 'fruta-acai', name: 'Açaí (polpa sem açúcar ou xarope)', category: 'fruta', tested: false },
  { id: 'fruta-acerola', name: 'Acerola', category: 'fruta', tested: false },
  { id: 'fruta-agua-coco', name: 'Água de coco', category: 'fruta', tested: false },
  { id: 'fruta-ameixa', name: 'Ameixa', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-amora', name: 'Amora', category: 'fruta', tested: false },
  { id: 'fruta-banana', name: 'Banana', category: 'fruta', tested: false, notes: '🔒 Se não estiver madura, pode prender o intestino, principalmente banana-maçã e prata' },
  { id: 'fruta-cacau', name: 'Cacau', category: 'fruta', tested: false },
  { id: 'fruta-caju', name: 'Caju', category: 'fruta', tested: false },
  { id: 'fruta-cambuci', name: 'Cambuci', category: 'fruta', tested: false },
  { id: 'fruta-caqui', name: 'Caqui', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-carambola', name: 'Carambola', category: 'fruta', tested: false, notes: '🔒 Pode prender o intestino' },
  { id: 'fruta-cereja', name: 'Cereja', category: 'fruta', tested: false, notes: '⚠️ Risco de alergia' },
  { id: 'fruta-cupuacu', name: 'Cupuaçu', category: 'fruta', tested: false },
  { id: 'fruta-damasco', name: 'Damasco', category: 'fruta', tested: false },
  { id: 'fruta-fisalis', name: 'Fisalis', category: 'fruta', tested: false },
  { id: 'fruta-framboesa', name: 'Framboesa', category: 'fruta', tested: false, notes: '⚠️ Risco de alergia' },
  { id: 'fruta-fruta-conde', name: 'Fruta do conde', category: 'fruta', tested: false },
  { id: 'fruta-goiaba', name: 'Goiaba', category: 'fruta', tested: false, notes: '🔒 Pode prender o intestino' },
  { id: 'fruta-graviola', name: 'Graviola', category: 'fruta', tested: false },
  { id: 'fruta-kiwi', name: 'Kiwi', category: 'fruta', tested: false, notes: '⚠️ Baixo risco de alergia, porém já foram encontrados casos de alergia em pessoas com alergia à látex e pólen. Pode surgir irritação na pele devido sua acidez.' },
  { id: 'fruta-jabuticaba', name: 'Jabuticaba', category: 'fruta', tested: false },
  { id: 'fruta-laranja', name: 'Laranja', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-lichia', name: 'Lichia', category: 'fruta', tested: false },
  { id: 'fruta-limao', name: 'Limão', category: 'fruta', tested: false, notes: '🔒⚠️ Constipante quando só o suco do limão é ofertado. Pode surgir irritação na pele devido sua acidez.' },
  { id: 'fruta-maca-vermelha', name: 'Maçã vermelha', category: 'fruta', tested: false, notes: '🔒 Pode prender o intestino quando consumida sem a casca' },
  { id: 'fruta-maca-verde', name: 'Maçã verde', category: 'fruta', tested: false, notes: '🔒 Pode prender o intestino quando consumida sem a casca' },
  { id: 'fruta-mamao', name: 'Mamão', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-mamgostao', name: 'Mamgostão', category: 'fruta', tested: false },
  { id: 'fruta-manga', name: 'Manga', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-mangostin', name: 'Mangostin', category: 'fruta', tested: false },
  { id: 'fruta-maracuja', name: 'Maracujá', category: 'fruta', tested: false },
  { id: 'fruta-melancia', name: 'Melancia', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-melao', name: 'Melão', category: 'fruta', tested: false, notes: '🔒 Pode prender o intestino' },
  { id: 'fruta-mexerica', name: 'Mexerica', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-mirtilo', name: 'Mirtilo', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-morango', name: 'Morango orgânico', category: 'fruta', tested: false, notes: '⚠️ Risco de alergia' },
  { id: 'fruta-pera', name: 'Pera', category: 'fruta', tested: false, notes: '🔒 Pode prender o intestino quando consumida sem a casca' },
  { id: 'fruta-pessego', name: 'Pêssego', category: 'fruta', tested: false, notes: '⚠️ Pode dar reação em pessoas com alergia a pólen.' },
  { id: 'fruta-pitanga', name: 'Pitanga', category: 'fruta', tested: false },
  { id: 'fruta-pitaya', name: 'Pitaya', category: 'fruta', tested: false },
  { id: 'fruta-tamara', name: 'Tâmara', category: 'fruta', tested: false },
  { id: 'fruta-tamarindo', name: 'Tamarindo', category: 'fruta', tested: false },
  { id: 'fruta-tangerina', name: 'Tangerina', category: 'fruta', tested: false, notes: '💩 Pode ter ação laxativa' },
  { id: 'fruta-temoia', name: 'Temoia', category: 'fruta', tested: false },
  { id: 'fruta-umbu', name: 'Umbu', category: 'fruta', tested: false },
  { id: 'fruta-uva', name: 'Uva', category: 'fruta', tested: false },

  // Carboidratos
  { id: 'carboidrato-amaranto-graos', name: 'Amaranto em grãos', category: 'carboidrato', tested: false },
  { id: 'carboidrato-amaranto-flocos', name: 'Amaranto em flocos', category: 'carboidrato', tested: false },
  { id: 'carboidrato-arroz-branco', name: 'Arroz branco', category: 'carboidrato', tested: false },
  { id: 'carboidrato-arroz-integral', name: 'Arroz integral', category: 'carboidrato', tested: false },
  { id: 'carboidrato-arroz-7-graos', name: 'Arroz 7 grãos', category: 'carboidrato', tested: false },
  { id: 'carboidrato-aveia', name: 'Aveia', category: 'carboidrato', tested: false, notes: '⚠️ Risco de alergia' },
  { id: 'carboidrato-batata-baroa', name: 'Batata baroa', category: 'carboidrato', tested: false },
  { id: 'carboidrato-batata-doce', name: 'Batata doce', category: 'carboidrato', tested: false },
  { id: 'carboidrato-batata-inglesa', name: 'Batata inglesa', category: 'carboidrato', tested: false },
  { id: 'carboidrato-batata-yacon', name: 'Batata yacon', category: 'carboidrato', tested: false },
  { id: 'carboidrato-cara', name: 'Cará', category: 'carboidrato', tested: false },
  { id: 'carboidrato-inhame', name: 'Inhame', category: 'carboidrato', tested: false },
  { id: 'carboidrato-macarrao', name: 'Macarrão', category: 'carboidrato', tested: false },
  { id: 'carboidrato-macarrao-integral', name: 'Macarrão integral', category: 'carboidrato', tested: false },
  { id: 'carboidrato-macarrao-milho', name: 'Macarrão de milho', category: 'carboidrato', tested: false },
  { id: 'carboidrato-macarrao-arroz', name: 'Macarrão de arroz', category: 'carboidrato', tested: false },
  { id: 'carboidrato-macarrao-bifum', name: 'Macarrão de arroz – Bifum', category: 'carboidrato', tested: false },
  { id: 'carboidrato-mandioca', name: 'Mandioca', category: 'carboidrato', tested: false },
  { id: 'carboidrato-milho', name: 'Milho', category: 'carboidrato', tested: false },
  { id: 'carboidrato-quinoa-graos', name: 'Quinoa em grãos', category: 'carboidrato', tested: false, notes: '🔒 Pode ser constipante quando consumido com pouca água' },
  { id: 'carboidrato-quinoa-flocos', name: 'Quinoa em flocos', category: 'carboidrato', tested: false, notes: '🔒 Pode ser constipante quando consumido com pouca água' },

  // Leguminosas
  { id: 'leguminosa-ervilha', name: 'Ervilha', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-feijao-azuki', name: 'Feijão azuki', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-feijao-branco', name: 'Feijão branco', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-feijao-carioca', name: 'Feijão carioca', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-feijao-fradinho', name: 'Feijão fradinho', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-feijao-preto', name: 'Feijão preto', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-feijao-roxo', name: 'Feijão roxo', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-grao-bico', name: 'Grão de Bico', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },
  { id: 'leguminosa-lentilha', name: 'Lentilha', category: 'leguminosa', tested: false, notes: 'Podem causar gases. Deixe de molho na água por 12 a 16 horas (trocar a água 1 a 2 vezes), antes de cozinhar.' },

  // Proteína
  { id: 'proteina-carne-boi', name: 'Carne de boi', category: 'proteina', tested: false },
  { id: 'proteina-frango-peito', name: 'Frango – peito', category: 'proteina', tested: false },
  { id: 'proteina-frango-coxa', name: 'Frango – coxa', category: 'proteina', tested: false },
  { id: 'proteina-frango-sobrecoxa', name: 'Frango – sobrecoxa', category: 'proteina', tested: false },
  { id: 'proteina-ovo-galinha', name: 'Ovo de galinha', category: 'proteina', tested: false, notes: '⚠️ Sintomas que podem surgir são coceira, vermelhidão na pele, inchaço e sintomas gastrointestinais. Essa alergia pode surgir de 2 a 4 horas após o consumo.' },
  { id: 'proteina-ovo-codorna', name: 'Ovo de codorna', category: 'proteina', tested: false, notes: '⚠️ Sintomas que podem surgir são coceira, vermelhidão na pele, inchaço e sintomas gastrointestinais. Essa alergia pode surgir de 2 a 4 horas após o consumo.' },
  { id: 'proteina-peixe', name: 'Peixe', category: 'proteina', tested: false, notes: '⚠️ Risco de alergia' },
  { id: 'proteina-figado-organico', name: 'Fígado orgânico', category: 'proteina', tested: false },
  { id: 'proteina-carne-porco', name: 'Carne de porco', category: 'proteina', tested: false },

  // Legumes
  { id: 'legume-abobora', name: 'Abóbora', category: 'legume', tested: false },
  { id: 'legume-abobrinha', name: 'Abobrinha', category: 'legume', tested: false },
  { id: 'legume-aspargos', name: 'Aspargos', category: 'legume', tested: false },
  { id: 'legume-berinjela', name: 'Berinjela', category: 'legume', tested: false },
  { id: 'legume-beterraba', name: 'Beterraba', category: 'legume', tested: false, notes: '🔒💩 Cozida pode ter ação constipante, crua ação laxativa.' },
  { id: 'legume-brocolis', name: 'Brócolis', category: 'legume', tested: false },
  { id: 'legume-cenoura', name: 'Cenoura', category: 'legume', tested: false, notes: '🔒💩 Cozida pode ter ação constipante, crua ação laxativa.' },
  { id: 'legume-chuchu', name: 'Chuchu', category: 'legume', tested: false },
  { id: 'legume-couve-flor', name: 'Couve-flor', category: 'legume', tested: false },
  { id: 'legume-nabo', name: 'Nabo', category: 'legume', tested: false },
  { id: 'legume-pepino', name: 'Pepino', category: 'legume', tested: false },
  { id: 'legume-pimentao-organico', name: 'Pimentão orgânico', category: 'legume', tested: false },
  { id: 'legume-rabanete', name: 'Rabanete', category: 'legume', tested: false },

  // Verduras
  { id: 'verdura-acelga', name: 'Acelga', category: 'verdura', tested: false },
  { id: 'verdura-agriao', name: 'Agrião', category: 'verdura', tested: false },
  { id: 'verdura-aipo', name: 'Aipo', category: 'verdura', tested: false },
  { id: 'verdura-alface-americana', name: 'Alface americana', category: 'verdura', tested: false },
  { id: 'verdura-alface-crespa', name: 'Alface crespa', category: 'verdura', tested: false },
  { id: 'verdura-alface-lisa', name: 'Alface lisa', category: 'verdura', tested: false },
  { id: 'verdura-almeirao', name: 'Almeirão', category: 'verdura', tested: false },
  { id: 'verdura-chicoria', name: 'Chicória', category: 'verdura', tested: false },
  { id: 'verdura-couve-bruxelas', name: 'Couve-de-bruxelas', category: 'verdura', tested: false },
  { id: 'verdura-couve-manteiga', name: 'Couve-manteiga', category: 'verdura', tested: false },
  { id: 'verdura-escarola', name: 'Escarola', category: 'verdura', tested: false },
  { id: 'verdura-espinafre', name: 'Espinafre', category: 'verdura', tested: false },
  { id: 'verdura-repolho', name: 'Repolho', category: 'verdura', tested: false },
  { id: 'verdura-rucula', name: 'Rúcula', category: 'verdura', tested: false },
];

const initialAllergyTests: AllergyTest[] = [
  { id: '1', food: 'Glúten (Aveia)', day: 5, tested: false, icon: 'wheat', instructions: 'Ofereça aveia (papinha ou mingau) no café da manhã' },
  { id: '2', food: 'Peixe (Tilápia)', day: 8, tested: false, icon: 'fish', instructions: 'Ofereça peixe cozido no almoço, observar por 2 horas' },
  { id: '3', food: 'Ovo', day: 18, tested: false, icon: 'egg', instructions: 'Comece com gema cozida, depois clara em dias separados' },
  { id: '4', food: 'Amendoim', day: 90, tested: false, icon: 'star', instructions: 'Pasta de amendoim diluída ou amendoim em pó' },
  { id: '5', food: 'Oleaginosas', day: 120, tested: false, icon: 'star', instructions: 'Castanhas trituradas ou em pasta' },
  { id: '6', food: 'Gergelim', day: 127, tested: false, icon: 'star', instructions: 'Tahine (pasta de gergelim) ou sementes trituradas' },
];

const initialSupplements: Supplement[] = [
  { name: 'Ferro quelado', dose: '1ml', time: 'Antes do almoço', taken: false },
  { name: 'Vitamina D', dose: '1 gota (400 UI)', time: 'Após fruta da tarde', taken: false },
  { name: 'Ômega-3 DHA', dose: '1,5ml', time: 'Após o almoço', taken: false },
];

const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Preparar abacate para fruta da manhã',
    description: 'Lavar, descascar e amassar o abacate',
    completed: false,
    priority: 'high',
    category: 'preparation',
    dueTime: '09:00',
    isAutoGenerated: true,
    relatedDay: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '2', 
    title: 'Dar suplemento Ferro antes da fruta',
    description: 'Administrar ferro 30min antes da fruta da tarde',
    completed: false,
    priority: 'high',
    category: 'health',
    dueTime: '13:00',
    isAutoGenerated: true,
    relatedDay: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Observar reações do teste de ovo',
    description: 'Anotar qualquer reação nas próximas 4 horas',
    completed: false,
    priority: 'medium',
    category: 'observation',
    isAutoGenerated: true,
    relatedDay: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Comprar frutas no mercado',
    description: 'Manga, melão, kiwi para próximos dias',
    completed: false,
    priority: 'medium',
    category: 'shopping',
    isAutoGenerated: false,
    createdAt: new Date().toISOString()
  }
];

// Calculate current week based on consultation date
const consultaInicial = new Date('2025-06-26');
const proximaConsulta = new Date('2025-08-26');
const hoje = new Date();
const diasDesdeConsulta = Math.floor((hoje.getTime() - consultaInicial.getTime()) / (1000 * 60 * 60 * 24));
const semanaAtual = Math.min(Math.max(Math.floor(diasDesdeConsulta / 7) + 1, 1), 8);

export const useBabyFoodStore = create<BabyFoodState>()(
  persist(
    (set, get) => ({
      // Initial state
      foods: initialFoods,
      allergyTests: initialAllergyTests,
      supplements: initialSupplements,
      todos: initialTodos,
      currentWeek: semanaAtual,
      currentMonth: 6,
      currentDay: 1, // Added currentDay
      activeTab: 'dashboard',
      showTutorial: false,
      tutorialStep: 0,
      isFirstAccess: true,
      consultaInicial,
      proximaConsulta,

      // Actions
      addFood: (food: FoodItem) => {
        set((state) => ({
          foods: [...state.foods, food],
        }));
      },

      toggleFood: (id: string) => {
        set((state) => ({
          foods: state.foods.map(food =>
            food.id === id
              ? { ...food, tested: !food.tested, testDate: !food.tested ? new Date().toLocaleDateString() : undefined }
              : food
          )
        }));
      },

      updateFoodAcceptance: (id: string, accepted: 'sim' | 'nao' | 'parcial') => {
        set((state) => ({
          foods: state.foods.map(food =>
            food.id === id ? { ...food, accepted } : food
          )
        }));
      },

      updateFoodAcceptanceNotes: (id: string, acceptanceNotes: string) => {
        set((state) => ({
          foods: state.foods.map(food =>
            food.id === id ? { ...food, acceptanceNotes } : food
          )
        }));
      },

      toggleAllergyTest: (id: string) => {
        set((state) => ({
          allergyTests: state.allergyTests.map(test =>
            test.id === id
              ? { ...test, tested: !test.tested, testDate: !test.tested ? new Date().toLocaleDateString() : undefined }
              : test
          )
        }));
      },

      toggleSupplement: (index: number) => {
        set((state) => ({
          supplements: state.supplements.map((sup, i) =>
            i === index ? { ...sup, taken: !sup.taken } : sup
          )
        }));
      },

      resetDailySupplements: () => {
        set((state) => ({
          supplements: state.supplements.map(sup => ({ ...sup, taken: false }))
        }));
      },

      // Todo actions
      addTodo: (todo: Todo) => {
        set((state) => ({
          todos: [...state.todos, todo]
        }));
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }));
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        }));
      },

      updateTodo: (id: string, updates: Partial<Todo>) => {
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
          )
        }));
      },

      setCurrentWeek: (week: number) => {
        const clampedWeek = Math.min(Math.max(week, 1), 4);
        const correspondingDay = (clampedWeek - 1) * 7 + 1;
        set({ 
          currentWeek: clampedWeek,
          currentDay: correspondingDay
        });
      },

      setCurrentDay: (day: number) => {
        const clampedDay = Math.min(Math.max(day, 1), 28);
        const correspondingWeek = Math.ceil(clampedDay / 7);
        set({ 
          currentDay: clampedDay,
          currentWeek: correspondingWeek
        });
      },

      nextDay: () => {
        const { currentDay } = get();
        if (currentDay < 28) {
          get().setCurrentDay(currentDay + 1);
        }
      },

      previousDay: () => {
        const { currentDay } = get();
        if (currentDay > 1) {
          get().setCurrentDay(currentDay - 1);
        }
      },

      setActiveTab: (tab: string) => {
        set({ activeTab: tab });
      },

      nextTutorialStep: () => {
        const { tutorialStep } = get();
        if (tutorialStep < 8) {
          set({ tutorialStep: tutorialStep + 1 });
        } else {
          get().finishTutorial();
        }
      },

      prevTutorialStep: () => {
        const { tutorialStep } = get();
        if (tutorialStep > 0) {
          set({ tutorialStep: tutorialStep - 1 });
        }
      },

      finishTutorial: () => {
        set({
          showTutorial: false,
          isFirstAccess: false,
          activeTab: 'dashboard'
        });
        localStorage.setItem('clarinha-tutorial-seen', 'true');
      },

      skipTutorial: () => {
        get().finishTutorial();
      },

      restartTutorial: () => {
        set({
          tutorialStep: 0,
          showTutorial: true,
          activeTab: 'dashboard'
        });
      },
    }),
    {
      name: 'baby-food-storage',
      partialize: (state) => ({
        foods: state.foods,
        allergyTests: state.allergyTests,
        supplements: state.supplements,
        todos: state.todos,
        currentWeek: state.currentWeek,
        currentMonth: state.currentMonth,
      }),
    }
  )
); 