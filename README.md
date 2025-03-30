# Resume Builder SaaS Platform

An AI-powered resume and cover letter builder that creates tailored, ATS-optimized documents for job seekers.

## Project Overview

This platform helps job seekers create professional resumes and cover letters using AI-powered content generation and ATS optimization. The system analyzes job descriptions and provides personalized improvements to increase hiring chances.

## Features

- Multi-step resume builder
- Personal information management
- Work experience tracking
- Education history
- Skills management
- Job description analysis
- ATS optimization
- AI-powered content suggestions (mock implementation)

## Tech Stack

- Frontend: React + TypeScript
- UI Library: Material-UI
- Form Handling: Formik + Yup
- State Management: React Hooks
- Development Server: Create React App

## Project Structure

```
resume-builder/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── coverLetter/   # Cover letter components
│   │   ├── layout/        # Layout components
│   │   └── resume/        # Resume builder components
│   ├── hooks/            # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # Service layer (AI, API)
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
└── package.json         # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd resume-builder
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Development Status

### Implemented Features
- Basic resume builder interface
- Multi-step form wizard
- Personal information collection
- Work experience management
- Education history tracking
- Skills input system
- Mock AI service integration
- Basic ATS optimization structure

### Pending Implementation
- Real AI integration
- Backend services
- User authentication
- Data persistence
- Template system
- PDF export
- Cover letter builder
- Real ATS optimization

See [REQUIREMENTS.md](./REQUIREMENTS.md) for detailed feature status and roadmap.

## Contributing

This project is under active development. Please refer to REQUIREMENTS.md for the current status and pending features before contributing.

## License

This project is proprietary and confidential. All rights reserved.

## Security Notes

- Current implementation uses mock AI services
- No sensitive data storage implemented
- Authentication system pending
- All API endpoints are placeholders

## Next Steps

Please refer to the Next Steps Priority List in REQUIREMENTS.md for the detailed implementation roadmap.
