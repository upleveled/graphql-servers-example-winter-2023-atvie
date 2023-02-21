import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ApolloClientProvider from '../../ApolloClientProvider';
import LoginForm from './loginForm';

export default function page() {
  const nextCookies = cookies();

  const fakeSessionToken = nextCookies.get('fakeSessionToken');

  if (fakeSessionToken?.value) {
    redirect('/');
  }
  return (
    <ApolloClientProvider initialApolloState={JSON.stringify([])}>
      <LoginForm />
    </ApolloClientProvider>
  );
}
