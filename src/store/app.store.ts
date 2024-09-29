import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAppStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('auth') === 'true',
  login: (username, password) => {
    if (username === 'admin' && password === 'password') {
      set({ isAuthenticated: true });
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem('auth');
  }
}));

