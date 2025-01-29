import Pictogram from '@/components/ui/pictogram';
// app/(auth)/login/page.tsx
import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Pictogram size={40} />
      <div className="m-10 max-w-screen-md rounded-xl border border-border bg-elevated p-4 shadow-md">
        <div>
          <h1>Welcome to Founderswap</h1>
          <p>The community of startup founders that wants to meet</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
