export interface CoverLetterData {
  recipient: {
    name?: string;
    position?: string;
    company: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    email?: string;
  };
  sender: {
    firstName: string;
    lastName: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    email: string;
    phone: string;
    linkedin?: string;
  };
  letterContent: {
    introduction: string;
    body: string;
    conclusion: string;
    signature?: string;
  };
  jobDetails: {
    title: string;
    description?: string;
    requirements?: string[];
    keySkills?: string[];
    company: string;
  };
  date: string;
}

export interface CoverLetterTemplate {
  id: string;
  name: string;
  previewUrl: string;
  category: 'Professional' | 'Creative' | 'Simple' | 'Modern';
}

export interface AIGenerationPrompt {
  jobTitle: string;
  jobDescription: string;
  userExperience: string;
  userSkills: string[];
  companyName: string;
  tone?: 'Professional' | 'Friendly' | 'Enthusiastic' | 'Confident';
  additionalInfo?: string;
}