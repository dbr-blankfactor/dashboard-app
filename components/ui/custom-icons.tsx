export function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 8L0 0H12L6 8Z" fill="currentColor" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 6L0 12V0L8 6Z" fill="currentColor" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 6L8 0V12L0 6Z" fill="currentColor" />
    </svg>
  );
}
