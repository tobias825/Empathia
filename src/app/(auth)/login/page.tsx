import { LoginForm } from '@/components/auth/LoginForm';
import { CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Welcome Back</CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to continue your journey with Sereno AI.
        </CardDescription>
      </CardHeader>
      <LoginForm />
    </>
  );
}
