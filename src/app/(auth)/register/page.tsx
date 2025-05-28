import { RegisterForm } from '@/components/auth/RegisterForm';
import { CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Create an Account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Join Sereno AI and start your journey to emotional clarity.
        </CardDescription>
      </CardHeader>
      <RegisterForm />
    </>
  );
}
