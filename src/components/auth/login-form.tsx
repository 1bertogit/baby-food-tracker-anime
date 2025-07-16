import React, { useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";

export function LoginForm() {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error("Falha ao fazer login. Verifique suas credenciais.");
          console.error("Login error:", error);
        } else {
          toast.success("Login realizado com sucesso!");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error("Falha ao criar conta. Tente novamente.");
          console.error("Signup error:", error);
        } else {
          toast.success("Conta criada! Verifique seu email para confirmação.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Erro durante a autenticação.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {mode === "login" ? "Login" : "Criar Conta"}
        </CardTitle>
        <CardDescription>
          {mode === "login" 
            ? "Faça login para acessar o Baby Food Tracker" 
            : "Crie uma nova conta para começar a usar o Baby Food Tracker"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processando..." : mode === "login" ? "Entrar" : "Registrar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={toggleMode}>
          {mode === "login" 
            ? "Não tem uma conta? Registre-se" 
            : "Já tem uma conta? Faça login"}
        </Button>
      </CardFooter>
    </Card>
  );
} 