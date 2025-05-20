import { ReactNode } from "react";

export interface ServiceFeature {
  id: string;

  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface ServiceCategory {
  category: string;
  icon: ReactNode;
  description: string;
  services: ServiceFeature[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface WorkProcess {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
}
