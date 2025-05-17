import { StatementsAndTaxDocuments } from "@/components/documents/statements-and-tax-documents";
import { DocumentInformation } from "@/components/documents/document-information";
import { DocumentLibrary } from "@/components/documents/document-library";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatementsAndTaxDocuments />
        </div>

        <div className="space-y-6">
          <DocumentLibrary />
          <DocumentInformation />
        </div>
      </div>
    </div>
  );
}
