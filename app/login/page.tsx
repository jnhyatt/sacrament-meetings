import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/LoginForm';

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  const { callbackUrl } = await searchParams;
  const redirectTo = typeof callbackUrl === 'string' && callbackUrl ? callbackUrl : '/meetings';

  const session = await auth();
  if (session?.user) {
    redirect('/meetings');
  }

  return (
    <div className="max-w-content px-page mx-auto pt-8">
      <p className="heading">Ward leaders</p>
      <h1 className="mt-1 mb-8 text-3xl">Sign in</h1>
      <LoginForm callbackUrl={redirectTo} />
    </div>
  );
}
