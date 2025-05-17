export interface StatementDocument {
  period: string;
  type: string;
  account: string;
}

export interface LibraryDocument {
  name: string;
  date: string;
}

export interface InfoSectionProps {
  title: string;
  description: React.ReactNode;
}