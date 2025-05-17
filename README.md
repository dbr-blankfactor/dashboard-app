# INDX Financial Dashboard

A modern, secure, and accessible financial dashboard application built with Next.js and React.

## Technologies

- **Frontend Framework**: React 19 with Next.js 15
- **Type Safety**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **State Management**: React Query 5 for server state
- **Component Development**: Storybook 8
- **Testing**: Jest 29 and React Testing Library 14
- **UI Components**: Custom components built on Radix UI primitives
- **Icons**: Lucide React

## Features

- **Real-time Financial Data**: View account balances, transactions, and positions
- **Transaction Management**: Monitor and approve pending transactions
- **Document Access**: View and download statements and tax documents
- **Responsive Design**: Optimized for desktop and mobile devices
- **Accessibility**: WCAG 2.1 AA compliant
- **Dark/Light Mode**: Support for user preference and system settings
- **Secure Authentication**: Protected routes and data

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```
# Clone the repository
git clone <https://github.com/trust-indx/indx-webapp-dev.git>
cd indx-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run storybook` - Start Storybook
- `npm run test` - Run tests
- `npm run lint` - Run linting

## Security

The application implements several security best practices:

- JWT-based authentication with secure HTTP-only cookies
- Role-based access control
- Input validation and sanitization
- Content Security Policy
- Regular dependency audits

## Accessibility

We are committed to creating an accessible application:

- Semantic HTML structure
- ARIA attributes for complex components
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility

## Testing

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Feature and workflow tests
- **Accessibility Tests**: Automated and manual accessibility testing
- **End-to-End Tests**: Critical user flow testing

## Contributing

Please read our [Contributing Guide](https://www.notion.so/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](https://www.notion.so/LICENSE).

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - UI component inspiration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
