import { RegisterForm } from '@/components/auth/RegisterForm';
import { CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Crear una Cuenta</CardTitle>
        <CardDescription className="text-muted-foreground">
          Únete a Sereno AI y comienza tu viaje hacia la claridad emocional.
        </CardDescription>
      </CardHeader>
      <RegisterForm />
    </>
  );
}
