# Debt and Budget App

A simple, privacy‑minded application to help you track debts, plan budgets, and improve your personal finances.

## Key Features

- Track income, expenses, and outstanding debts in one place
- Create and manage monthly budgets and categories
- Monitor spending vs. budget with clear summaries
- Lightweight, easy to set up, and friendly for beginners

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node.js)
- MongoDB account, preferably on the free tier

### Installation
- `npm install` — install dependencies on the application

### Configuration

Create a `.env` file in the project root to store configuration values (do not commit secrets):
Need:
- PORT
- MONGODB_URI
- JWT_SECRET
- TOTP_SECRET

## Run the App
### Scripts

Common npm scripts you may find or add:

- `npm start` — start the application
- `npm run dev` — start in development mode (e.g., with nodemon)
- `npm test` — run test suite

## Contributing

Contributions are welcome! To propose changes:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request with a clear description and context

Please follow conventional commit messages when possible and include tests for new functionality.

## Security

- Do not commit secrets or personal data
- Use the `.env` file for sensitive configuration
- Open a security-related issue or contact the maintainers privately for vulnerabilities
- Always change and adapt your security settings

## Roadmap

- SalaryCalculator

## License

This project is licensed under the terms of the LICENSE file included in the repository.

## Support

- Open an issue for bugs or feature requests
- Check existing issues before creating a new one
- Provide steps to reproduce and environment details when reporting bugs

# Changelog

- 0.0.1 Initial Release
    - Added README, .gitignore
