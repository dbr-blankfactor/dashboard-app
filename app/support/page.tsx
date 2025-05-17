import { FrequentlyAskedQuestions } from "@/components/support/frequently-asked-questions";
import { SupportTicketForm } from "@/components/support/support-ticket-form";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <SupportTicketForm />
        </div>

        <div className="lg:col-span-3">
          <FrequentlyAskedQuestions />
        </div>
      </div>
    </div>
  );
}
