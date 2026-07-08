import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export function useContribuirClick() {
  const router = useRouter();
  const { user } = useAuth();

  const handleContribuirClick = () => {
    if (user) {
      router.push('/contribuir');
    } else {
      window.dispatchEvent(new CustomEvent('openLoginModal'));
    }
  };

  return { handleContribuirClick };
}