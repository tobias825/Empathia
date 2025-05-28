
import { LoginForm } from '@/components/auth/LoginForm';
import { CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Bienvenido de Nuevo</CardTitle>
        <CardDescription className="text-muted-foreground">
          Inicia sesión para continuar tu viaje con Empathia.
        </CardDescription>
      </CardHeader>
      <LoginForm />
    </>
  );
}
