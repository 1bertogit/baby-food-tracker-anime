import React from 'react';
import { InstallPrompt } from './InstallPrompt';
import { UpdateNotification } from './UpdateNotification';
import { ConnectionStatus } from './ConnectionStatus';
import { ReminderNotification } from '../reminders/ReminderNotification';

interface PWAWrapperProps {
  children: React.ReactNode;
}

export const PWAWrapper: React.FC<PWAWrapperProps> = ({ children }) => {
  return (
    <>
      {children}
      <InstallPrompt />
      <UpdateNotification />
      <ConnectionStatus />
      <ReminderNotification />
    </>
  );
};