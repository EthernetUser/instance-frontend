module.exports = {
  reactStrictMode: true,
  async rewrites() {
        return [
          {
            source: '/login',
            destination: 'http://localhost:8000/api/auth/login',
          },
        ]
      },
}
