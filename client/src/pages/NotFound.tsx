import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Not Found");

  return (
    <div className="flex h-screen w-screen items-center justify-center text-3xl font-bold">
      404 Not Found
    </div>
  );
}
