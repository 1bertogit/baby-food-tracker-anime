import { useEffect, useState } from 'react';
import { useBabyFoodStore } from '../store/baby-food-store';

interface Reminder {
  id: string;
  type: 'meal' | 'supplement' | 'test' | 'consultation';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
}

// Schedule based on daily routine
const DAILY_REMINDERS = [
  {
    id: 'morning-fruit',
    type: 'meal' as const,
    title: 'Fruta da Manhã',
    message: 'Hora da fruta da manhã! 🍌',
    time: '09:30',
    priority: 'medium' as const,
  },
  {
    id: 'iron-supplement',
    type: 'supplement' as const,
    title: 'Ferro Quelado',
    message: 'Hora do ferro quelado (antes do almoço) 💊',
    time: '11:00',
    priority: 'high' as const,
  },
  {
    id: 'lunch',
    type: 'meal' as const,
    title: 'Almoço',
    message: 'Hora do almoço! 🍽️',
    time: '11:30',
    priority: 'high' as const,
  },
  {
    id: 'afternoon-fruit',
    type: 'supplement' as const,
    title: 'Fruta da Tarde + Ferro',
    message: 'Fruta da tarde + Ferro (13:30h) 🍎💊',
    time: '13:30',
    priority: 'medium' as const,
  },
  {
    id: 'vitamin-d',
    type: 'supplement' as const,
    title: 'Vitamina D',
    message: 'Vitamina D após fruta da tarde 🌞',
    time: '14:00',
    priority: 'medium' as const,
  },
  {
    id: 'dinner',
    type: 'meal' as const,
    title: 'Jantar',
    message: 'Hora do jantar! 🍽️',
    time: '15:00',
    priority: 'high' as const,
  },
  {
    id: 'omega-3',
    type: 'supplement' as const,
    title: 'Ômega-3',
    message: 'Ômega-3 DHA após o jantar 🐟',
    time: '15:30',
    priority: 'medium' as const,
  },
];

export const useReminders = () => {
  const { currentDay, allergyTests, supplements } = useBabyFoodStore();
  const [activeReminders, setActiveReminders] = useState<Reminder[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Generate reminders based on current day and time
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    const reminders: Reminder[] = [];

    // Daily routine reminders
    DAILY_REMINDERS.forEach(reminder => {
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const reminderTime = new Date(now);
      reminderTime.setHours(hours, minutes, 0, 0);

      // Show reminder if it's within 30 minutes
      const timeDiff = reminderTime.getTime() - now.getTime();
      const isWithin30Minutes = timeDiff > 0 && timeDiff <= 30 * 60 * 1000;
      const isExactTime = currentTimeString === reminder.time;

      if (isWithin30Minutes || isExactTime) {
        reminders.push({
          ...reminder,
          isActive: isExactTime,
        });
      }
    });

    // Allergy test reminders
    const todayTests = allergyTests.filter(test => test.day === currentDay && !test.tested);
    todayTests.forEach(test => {
      reminders.push({
        id: `test-${test.id}`,
        type: 'test',
        title: `Teste de ${test.food}`,
        message: `Hoje é dia de testar ${test.food}! ${test.instructions || ''}`,
        time: '11:30', // Lunch time
        priority: 'high',
        isActive: currentTimeString === '11:30',
      });
    });

    // Tomorrow's test reminders
    const tomorrowTests = allergyTests.filter(test => test.day === currentDay + 1 && !test.tested);
    if (tomorrowTests.length > 0 && currentHour >= 18) { // Evening reminder
      tomorrowTests.forEach(test => {
        reminders.push({
          id: `tomorrow-test-${test.id}`,
          type: 'test',
          title: `Teste amanhã: ${test.food}`,
          message: `Amanhã é dia de testar ${test.food}. Prepare o alimento!`,
          time: '18:00',
          priority: 'medium',
          isActive: currentTimeString === '18:00',
        });
      });
    }

    // Supplements not taken reminders
    const pendingSupplements = supplements.filter(s => !s.taken);
    if (pendingSupplements.length > 0 && currentHour >= 20) { // Evening check
      reminders.push({
        id: 'pending-supplements',
        type: 'supplement',
        title: 'Suplementos pendentes',
        message: `Ainda faltam: ${pendingSupplements.map(s => s.name).join(', ')}`,
        time: '20:00',
        priority: 'medium',
        isActive: currentTimeString === '20:00',
      });
    }

    setActiveReminders(reminders);
  }, [currentDay, allergyTests, supplements, currentTime]);

  const dismissReminder = (id: string) => {
    setActiveReminders(prev => prev.filter(r => r.id !== id));
  };

  const snoozeReminder = (id: string, minutes: number = 10) => {
    // In a real app, this would reschedule the reminder
    setActiveReminders(prev => 
      prev.map(r => r.id === id ? { ...r, isActive: false } : r)
    );
    
    setTimeout(() => {
      setActiveReminders(prev => 
        prev.map(r => r.id === id ? { ...r, isActive: true } : r)
      );
    }, minutes * 60 * 1000);
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    const upcoming = DAILY_REMINDERS.filter(reminder => {
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const reminderTime = new Date(now);
      reminderTime.setHours(hours, minutes, 0, 0);
      
      return reminderTime.getTime() > now.getTime();
    }).slice(0, 3); // Next 3 reminders

    return upcoming;
  };

  return {
    activeReminders,
    currentTime,
    dismissReminder,
    snoozeReminder,
    getUpcomingReminders,
  };
};