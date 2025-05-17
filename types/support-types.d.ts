export interface FormFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  icon?: React.ReactNode;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SupportTicket {
  issueTitle: string;
  description: string;
  priority: string;
  inquiryType: string;
  account: string;
  user: string;
}
