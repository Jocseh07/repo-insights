# RepoInsight - AI-Powered GitHub Repository Analysis

RepoInsight is a modern web application that helps developers understand GitHub repositories through AI-powered analysis and interactive Q&A capabilities.

## Features

- 🧠 **AI-Powered Code Analysis** - Leverage GPT-4o-mini for intelligent code understanding
- 🔄 **GitHub Integration** - Seamless access to repositories using GitHub authentication
- ⚡ **Smart Repository Indexing** - Automatic code embedding generation for enhanced search
- 💬 **Interactive Q&A** - Ask questions about any codebase and get AI-powered explanations
- 🌐 **Real-time Updates** - Track commits, issues, and releases
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - The React framework for production
- **Authentication**: [Clerk](https://clerk.com/) - Complete user management and authentication
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Neon](https://neon.tech/) serverless hosting, [Drizzle ORM](https://orm.drizzle.team/) and vector support
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind
- **AI Integration**: [GPT-4o-mini](https://github.com/marketplace/models/azure-openai/gpt-4o-mini) - Optimized GPT model for code analysis
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) - Static type checking
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) - Powerful asynchronous state management
- **GitHub Integration**: [Octokit](https://github.com/octokit/octokit.js) - Official GitHub API client

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database (We use [Neon](https://neon.tech)
  - Run `CREATE EXTENSION vector;` in your database SQL editor before pushing the database
- Clerk account (Create one and get your API keys by following the [Clerk Next.js quickstart](https://clerk.com/docs/quickstarts/nextjs))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Jocseh07/repo-insights.git
cd repo-insight
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL=your_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/sync-user"
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/sync-user"

# Environment
NODE_ENV="development"
```

4. Initialize the database:

```bash
pnpm db:generate
pnpm db:push
```

5. Start the development server:

```bash
pnpm dev
```

## Deployment

### Vercel (Recommended)

1. Fork this repository
2. Create a new project on Vercel
3. Connect your fork
4. Configure environment variables
5. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
