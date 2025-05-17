export function ContactEmailList() {
  const contactEmails = [
    { department: "Technology", email: "techsupport@indxco.com" },
    { department: "Operations", email: "opssupport@indxco.com" },
    { department: "Compliance", email: "comsupport@indxco.com" },
  ];

  return (
    <>
      <h3 className="text-sm font-medium mb-4">Contact Us via Email</h3>
      <div className="space-y-2">
        {contactEmails.map((contact) => (
          <div
            key={contact.department}
            className="grid grid-cols-[120px_1fr] items-center gap-4"
          >
            <div className="text-sm text-gray-500">{contact.department}</div>
            <a
              href={`mailto:${contact.email}`}
              className="text-teal-500 hover:underline"
            >
              {contact.email}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
