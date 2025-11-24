// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  health: `${API_URL}/api/health`,
  login: `${API_URL}/api/auth/login`,
  posts: `${API_URL}/api/posts`,
  postLike: (id: number) => `${API_URL}/api/posts/${id}/like`,
  postComment: (id: number) => `${API_URL}/api/posts/${id}/comment`,
  user: (username: string) => `${API_URL}/api/user/${username}`,
}

