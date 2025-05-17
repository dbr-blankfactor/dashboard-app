"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon } from "@/components/ui/custom-icons";
import { ContactEmailList } from "./contact-email-list";
import { FormFieldProps } from "@/types/support-types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Send } from "lucide-react";
import { useState } from "react";

export function SupportTicketForm() {
  const [formData, setFormData] = useState({
    issueTitle: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Get Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <h3 className="text-sm font-medium mb-2">Submit a Ticket</h3>
            <div className="space-y-4">
              <FormField
                label="Account"
                value="Operating - *****39180"
                readOnly
                icon={<Lock className="h-4 w-4 text-gray-400" />}
              />

              <FormField
                label="User"
                value="Tim McGraw"
                readOnly
                icon={<Lock className="h-4 w-4 text-gray-400" />}
              />

              <FormField
                label="Issue Priority"
                value="Medium"
                readOnly
                icon={<ChevronDownIcon className="h-3 w-3 text-teal-400" />}
              />

              <FormField
                label="Inquiry Type"
                value="Technical"
                readOnly
                icon={<ChevronDownIcon className="h-3 w-3 text-teal-400" />}
              />

              <FormField
                label="Issue Title"
                placeholder="API Rate Limiting..."
                name="issueTitle"
                value={formData.issueTitle}
                onChange={handleChange}
              />

              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <div className="text-sm text-gray-500 pt-2">Description</div>
                <Textarea
                  placeholder="I am trying to loop the API a million times per minute and I am being throttled. Why would you limit my access?"
                  className="min-h-[100px]"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <div></div>
                <Button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 w-auto"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </Button>
              </div>
            </div>
          </form>

          <div className="pt-4 border-t">
            <ContactEmailList />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FormField({
  label,
  value,
  placeholder,
  readOnly,
  icon,
  name,
  onChange,
}: FormFieldProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="relative">
        <Input
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          className={icon ? "pr-10" : ""}
          name={name}
          onChange={onChange}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
