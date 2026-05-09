export async function getToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find((c) => c.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}

export async function setToken(token: string): Promise<void> {
  document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

export async function removeToken(): Promise<void> {
  document.cookie = 'token=; path=/; max-age=0';
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();
  return !!token;
}
