
import Logo from '@/components/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="mb-8">
        <Logo iconSize={40} textSize="text-4xl" />
      </div>
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-2xl">
        {children}
      </div>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        Empathia &copy; {new Date().getFullYear()} - Your space for peace.
      </p>
    </div>
  );
}
