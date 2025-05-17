"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQ } from "@/types/support-types";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs: FAQ[] = [
  {
    id: "item-1",
    category: "WIRE",
    question: "How long until my deposit posts?",
    answer:
      "Wire deposits typically post within 1-2 business hours of receipt by our bank. If you've sent a wire and it hasn't posted, please contact operations.",
  },
  {
    id: "item-2",
    category: "WIRE",
    question: "What are my wire instructions?",
    answer:
      'Your wire instructions can be found in the Transactions page under "Deposit Instructions (Wire)".',
  },
  {
    id: "item-3",
    category: "TRANSFER",
    question: "How do I send an instant transfer?",
    answer:
      "You can send an instant transfer from the Transactions page using the \"Send Instant Transfer\" form. You'll need the recipient's INDX ID.",
  },
  {
    id: "item-4",
    category: "TRANSFER",
    question: "Do instant transfers provide finality?",
    answer:
      "Yes, all instant transfers on the INDX platform provide immediate settlement finality. Once completed, they cannot be reversed.",
  },
  {
    id: "item-5",
    category: "TRANSFER",
    question: 'Why is my instant transfer\'s status "pending"?',
    answer:
      'Transfers may show as "pending" if they require additional verification or if the recipient hasn\'t yet accepted the transfer. This typically resolves within 30 minutes.',
  },
  {
    id: "item-6",
    category: "WITHDRAWAL",
    question: "Where are my withdrawals sent?",
    answer:
      "Withdrawals are sent to the bank account you've previously verified with us. You can view your verified accounts in the Transactions page.",
  },
  {
    id: "item-7",
    category: "WITHDRAWAL",
    question: "How do I change my external account on record?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt blandit mi, vel pellentesque dolor venenatis at. Maecenas euismod augue at venenatis ornare. Suspendisse aliquam augue eu urna laoreet aliquam. Ut et ipsum rhoncus, semper tellus quis, posuere mauris. Nunc justo metus, maximus a euismod dictum, malesuada ut sem.",
  },
  {
    id: "item-8",
    category: "TRANSFER",
    question: "How do I send an instant transfer?",
    answer:
      "You can send an instant transfer from the Transactions page using the \"Send Instant Transfer\" form. You'll need the recipient's INDX ID.",
  },
  {
    id: "item-9",
    category: "TRANSFER",
    question: "Do instant transfers provide finality?",
    answer:
      "Yes, all instant transfers on the INDX platform provide immediate settlement finality. Once completed, they cannot be reversed.",
  },
  {
    id: "item-10",
    category: "TRANSFER",
    question: 'Why is my instant transfer\'s status "pending"?',
    answer:
      'Transfers may show as "pending" if they require additional verification or if the recipient hasn\'t yet accepted the transfer. This typically resolves within 30 minutes.',
  },
  {
    id: "item-11",
    category: "WITHDRAWAL",
    question: "Where are my withdrawals sent?",
    answer:
      "Withdrawals are sent to the bank account you've previously verified with us. You can view your verified accounts in the Transactions page.",
  },
  {
    id: "item-12",
    category: "TRANSFER",
    question: "How do I send an instant transfer?",
    answer:
      "You can send an instant transfer from the Transactions page using the \"Send Instant Transfer\" form. You'll need the recipient's INDX ID.",
  },
];

export function FrequentlyAskedQuestions() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" value={expandedItems} className="space-y-2">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isExpanded={expandedItems.includes(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

interface FAQItemProps {
  faq: FAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, onToggle }: FAQItemProps) {
  return (
    <AccordionItem value={faq.id} className="border-b">
      <AccordionTrigger
        onClick={onToggle}
        className="text-sm hover:no-underline py-3"
      >
        <span className="text-teal-500 font-medium mr-2">{faq.category}:</span>{" "}
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-sm text-gray-600 pb-3 pl-5">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
}
