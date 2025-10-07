// app/api/auth.ts
export async function login(email: string, password: string) {
  try {
    // For now, use mock authentication since backend is not deployed
    // In production, you would connect to your deployed backend
    
    // Mock validation - in real app, this would be done by the backend
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Mock successful login
    const mockUser = {
      id: 'mock-user-id',
      email: email,
      name: email.split('@')[0],
      profiles: []
    };
    
    const mockToken = `mock-jwt-token-${Date.now()}`;
    
    // Store in localStorage
    localStorage.setItem('auth-token', mockToken);
    localStorage.setItem('user-info', JSON.stringify(mockUser));
    
    return {
      accessToken: mockToken,
      user: mockUser
    };
    
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function signup(email: string, password: string, plan?: string) {
  try {
    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }
    
    // Mock successful signup
    const mockUser = {
      id: `mock-user-${Date.now()}`,
      email: email,
      name: email.split('@')[0],
      subscriptionPlan: plan || 'standard',
      profiles: []
    };
    
    const mockToken = `mock-jwt-token-${Date.now()}`;
    
    // Store in localStorage
    localStorage.setItem('auth-token', mockToken);
    localStorage.setItem('user-info', JSON.stringify(mockUser));
    
    return {
      accessToken: mockToken,
      user: mockUser
    };
    
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('auth-token');
  localStorage.removeItem('active-profile');
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('auth-token');
}