
import { Advocate } from "@/types";

export const advocatesData: Advocate[] = [
  {
    id: "1",
    name: "Adv. Priya Sharma",
    profileImage: "/placeholder.svg",
    specialization: ["Criminal Law", "Constitutional Law"],
    experience: 15,
    rating: 4.8,
    reviews: 127,
    location: "New Delhi",
    languages: ["Hindi", "English", "Punjabi"],
    courts: ["Supreme Court", "Delhi High Court"],
    verified: true,
    consultationFee: 5000,
    about: "Priya Sharma is a seasoned advocate with extensive experience in criminal and constitutional law. She has argued several landmark cases before the Supreme Court and various High Courts across India.",
    gender: "Female",
    contactInfo: {
      email: "priya.sharma@dalexample.com",
      phone: "+91 98XXXXXXXX",
      address: "Lawyer's Chambers, Supreme Court, New Delhi"
    }
  },
  {
    id: "2",
    name: "Adv. Rajiv Kumar",
    profileImage: "/placeholder.svg",
    specialization: ["Corporate Law", "Tax Law"],
    experience: 12,
    rating: 4.6,
    reviews: 98,
    location: "Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    courts: ["Bombay High Court", "NCLT Mumbai"],
    verified: true,
    consultationFee: 6000,
    about: "Rajiv Kumar specializes in corporate and tax laws with particular expertise in mergers and acquisitions, corporate restructuring, and tax planning for businesses and high-net-worth individuals.",
    gender: "Male",
    contactInfo: {
      email: "rajiv.kumar@dalexample.com",
      phone: "+91 98XXXXXXXX",
      address: "Nariman Point, Mumbai"
    }
  },
  {
    id: "3",
    name: "Adv. Aisha Khan",
    profileImage: "/placeholder.svg",
    specialization: ["Family Law", "Property Law"],
    experience: 8,
    rating: 4.7,
    reviews: 76,
    location: "Bangalore",
    languages: ["Hindi", "English", "Kannada"],
    courts: ["Karnataka High Court", "Family Courts Bangalore"],
    verified: true,
    consultationFee: 4000,
    about: "Aisha Khan is known for her compassionate approach in family law matters. She handles divorce cases, child custody disputes, property division, and inheritance issues with sensitivity and strategic thinking.",
    gender: "Female",
    contactInfo: {
      email: "aisha.khan@dalexample.com",
      phone: "+91 98XXXXXXXX",
      address: "MG Road, Bangalore"
    }
  },
  {
    id: "4",
    name: "Adv. Vikram Singh",
    profileImage: "/placeholder.svg",
    specialization: ["Criminal Law", "Cyber Crime"],
    experience: 10,
    rating: 4.5,
    reviews: 83,
    location: "Hyderabad",
    languages: ["Hindi", "English", "Telugu"],
    courts: ["Telangana High Court", "District Courts"],
    verified: true,
    consultationFee: 3500,
    about: "Vikram Singh is a criminal law expert with specialization in cyber crimes. He has successfully defended numerous clients in complex criminal cases involving digital evidence and online fraud.",
    gender: "Male",
    contactInfo: {
      email: "vikram.singh@dalexample.com",
      phone: "+91 98XXXXXXXX",
      address: "Jubilee Hills, Hyderabad"
    }
  },
  {
    id: "5",
    name: "Adv. Meera Desai",
    profileImage: "/placeholder.svg",
    specialization: ["Intellectual Property", "Media Law"],
    experience: 7,
    rating: 4.4,
    reviews: 62,
    location: "Chennai",
    languages: ["Hindi", "English", "Tamil"],
    courts: ["Madras High Court", "Intellectual Property Appellate Board"],
    verified: false,
    consultationFee: 4500,
    about: "Meera Desai focuses on intellectual property rights and media law. She advises clients on copyright, trademark, patent issues, and represents media houses on defamation and regulatory matters.",
    gender: "Female",
    contactInfo: {
      email: "meera.desai@dalexample.com",
      phone: "+91 98XXXXXXXX",
      address: "Anna Salai, Chennai"
    }
  },
  {
    id: "6",
    name: "Adv. Arjun Patel",
    profileImage: "/placeholder.svg",
    specialization: ["Labor Law", "Industrial Disputes"],
    experience: 18,
    rating: 4.9,
    reviews: 145,
    location: "Ahmedabad",
    languages: ["Hindi", "English", "Gujarati"],
    courts: ["Gujarat High Court", "Labor Courts"],
    verified: true,
    consultationFee: 3000,
    about: "Arjun Patel has extensive experience in labor law and industrial disputes. He represents both employers and employees in matters related to termination, workplace harassment, and collective bargaining agreements.",
    gender: "Male",
    contactInfo: {
      email: "arjun.patel@dalexample.com",
      phone: "+91 98XXXXXXXX",
      address: "CG Road, Ahmedabad"
    }
  }
];

export const courtOptions = [
  "Supreme Court",
  "High Courts",
  "District Courts",
  "Family Courts",
  "Consumer Courts",
  "Labor Courts",
  "NCLT",
  "Tribunals"
];

export const caseTypeOptions = [
  "Criminal Law",
  "Civil Law",
  "Family Law",
  "Corporate Law",
  "Property Law",
  "Intellectual Property",
  "Tax Law",
  "Labor Law",
  "Constitutional Law",
  "Environmental Law",
  "Cyber Law",
  "Media Law"
];

export const languageOptions = [
  "Hindi",
  "English",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Odia",
  "Urdu"
];

export const locationOptions = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi"
];
