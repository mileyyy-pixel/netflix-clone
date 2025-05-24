// app/api/auth.ts
export async function login(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('auth-token', data.accessToken);
    return data; 
  } catch (error) {
    console.error("Login error:", error);
    
    // For development, just mock a successful login
    //const mockToken = 'mock-jwt-token';
    //localStorage.setItem('auth-token', mockToken);
    //return { token: mockToken, email };
    throw error;
  }
}

export async function signup(email: string, password: string, plan?: string) {
  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, plan: plan || 'standard' }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    
    const data = await response.json();
    localStorage.setItem('auth-token', data.accessToken);
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
    
    // For development, just mock a successful signup
    //const mockToken = 'mock-jwt-token';
    //localStorage.setItem('auth-token', mockToken);
    //return { token: mockToken, email };
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