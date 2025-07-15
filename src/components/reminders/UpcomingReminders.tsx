import React from 'react';
import { Clock, Bell } from 'lucide-react';
import { useReminders } from '../../hooks/useReminders';

export const UpcomingReminders: React.FC = () => {
  const { getUpcomingReminders, currentTime } = useReminders();
  const upcomingReminders = getUpcomingReminders();

  const getTimeUntil = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date(now);
    reminderTime.setHours(hours, minutes, 0, 0);
    
    const diff = reminderTime.getTime() - now.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `em ${diffHours}h ${diffMinutes}min`;
    } else {
      return `em ${diffMinutes}min`;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meal': return '🍽️';
      case 'supplement': return '💊';
      case 'test': return '🧪';
      default: return '⏰';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2 text-blue-500" />
        Próximos Lembretes
      </h3>

      {upcomingReminders.length > 0 ? (
        <div className="space-y-3">
          {upcomingReminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getTypeIcon(reminder.type)}</span>
                <div>
                  <div className="font-medium text-gray-800 text-sm">{reminder.title}</div>
                  <div className="text-gray-600 text-xs">{reminder.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-medium text-sm">{getTimeUntil(reminder.time)}</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  reminder.priority === 'high' 
                    ? 'bg-red-100 text-red-600' 
                    : reminder.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {reminder.priority === 'high' ? 'Importante' : reminder.priority === 'medium' ? 'Médio' : 'Baixo'}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Nenhum lembrete próximo</p>
          <p className="text-gray-400 text-xs">Você está em dia! 🎉</p>
        </div>
      )}

      {/* Current time */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <div className="text-gray-600 text-sm">
          Agora são {currentTime.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
        <div className="text-gray-400 text-xs">
          {currentTime.toLocaleDateString('pt-BR', { 
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })}
        </div>
      </div>
    </div>
  );
};