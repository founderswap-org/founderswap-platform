export const runtime = 'edge';

import { SignupForm } from '@/components/auth/signup-form';
import Pictogram from '@/components/ui/pictogram';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Pictogram size={40} />
      <div className="m-10 max-w-screen-md rounded-xl border border-border bg-elevated p-4 shadow-md">
        <div>
          <h1>Welcome to Founderswap</h1>
          <p>The community of startup founders that wants to meet </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
