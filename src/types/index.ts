
export interface Advocate {
  id: string;
  name: string;
  profileImage: string;
  specialization: string[];
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  courts: string[];
  verified: boolean;
  consultationFee: number;
  about: string;
  gender: 'Male' | 'Female' | 'Other';
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface SearchFilters {
  caseType: string[];
  court: string[];
  location: string;
  language: string[];
  gender: string;
  feeRange: {
    min: number;
    max: number;
  };
  rating: number;
  verified: boolean;
}

export type UserType = 'client' | 'advocate';

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  userType: UserType;
}
