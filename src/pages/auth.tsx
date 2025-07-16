import { LoginForm } from '@/components/auth/login-form';
import { Baby } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="w-full max-w-md p-4">
        <div className="mb-6 flex flex-col items-center">
          <Baby className="w-12 h-12 text-pink-500 mb-2" />
          <h1 className="text-3xl font-bold text-center">Baby Food Tracker</h1>
          <p className="text-gray-500 text-center mt-2">
            Acompanhe e gerencie a alimentação do seu bebê
          </p>
        </div>
        <LoginForm />
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Baby Food Tracker. Todos os direitos reservados.
      </footer>
    </div>
  );
} 