import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * @deprecated This component is no longer used. Authentication logic has been moved to App.tsx.
 * Keeping this file for backwards compatibility but it should not be imported in new code.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  return <>{children}</>;
}
