import React from 'react';
import { Bell, X, Clock, AlertTriangle } from 'lucide-react';
import { useReminders } from '../../hooks/useReminders';

export const ReminderNotification: React.FC = () => {
  const { activeReminders, dismissReminder, snoozeReminder } = useReminders();

  const activeReminder = activeReminders.find(r => r.isActive);

  if (!activeReminder) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-blue-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'meal': return '🍽️';
      case 'supplement': return '💊';
      case 'test': return '🧪';
      default: return '⏰';
    }
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className={`bg-gradient-to-r ${getPriorityColor(activeReminder.priority)} text-white rounded-2xl shadow-2xl p-4 border border-white/20 animate-bounce`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 rounded-full p-2">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Lembrete {getPriorityIcon(activeReminder.type)}</h3>
              <p className="text-white/80 text-xs">{activeReminder.time}</p>
            </div>
          </div>
          <button
            onClick={() => dismissReminder(activeReminder.id)}
            className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">{activeReminder.title}</h4>
          <p className="text-white/90 text-sm">{activeReminder.message}</p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => dismissReminder(activeReminder.id)}
            className="flex-1 bg-white text-gray-800 hover:bg-gray-100 rounded-xl py-2 px-3 font-medium text-sm transition-colors"
          >
            Feito ✓
          </button>
          <button
            onClick={() => snoozeReminder(activeReminder.id, 10)}
            className="bg-white/20 hover:bg-white/30 rounded-xl py-2 px-3 font-medium text-sm transition-colors flex items-center space-x-1"
          >
            <Clock className="h-4 w-4" />
            <span>10min</span>
          </button>
        </div>

        {/* Priority indicator */}
        {activeReminder.priority === 'high' && (
          <div className="mt-3 flex items-center space-x-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            <span>Importante - Não pular!</span>
          </div>
        )}
      </div>
    </div>
  );
};