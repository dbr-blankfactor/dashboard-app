import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InfoSectionProps } from "@/types/document-statement";

export function DocumentInformation() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Information About Your Docs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <InfoSection
            title="Account Statements."
            description={
              <>
                You will receive a monthly account statement in digital form.
                You may retrieve them in PDF form on this page. Use{" "}
                <a href="#" className="text-teal-500 hover:underline">
                  Adobe Reader
                </a>{" "}
                to view PDFs.
              </>
            }
          />

          <InfoSection
            title="1099-INT / Tax."
            description={
              <>
                You will receive an annual tax form in digital form. You may
                retrieve them in PDF form on this page. Use{" "}
                <a href="#" className="text-teal-500 hover:underline">
                  Adobe Reader
                </a>{" "}
                to view PDFs.
              </>
            }
          />

          <InfoSection
            title="Document Library."
            description="From time-to-time, we update terms, fee schedules, or other legal items. They will be posted to this page when they become effective."
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoSection({ title, description }: InfoSectionProps) {
  return (
    <div>
      <p className="font-medium mb-1">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
