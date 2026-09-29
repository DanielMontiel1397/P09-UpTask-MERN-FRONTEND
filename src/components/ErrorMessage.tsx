import type React from "react";

export default function ErrorMessage({children,}: {children: React.ReactNode;}) {
  return (
    <p className="mt-1 text-sm text-red-500">
      {children}
    </p>
  );
}