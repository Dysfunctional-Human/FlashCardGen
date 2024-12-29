import { CircleAlert } from "lucide-react";

function Alert() {
  return (
    <div className="rounded-lg border border-border px-4 py-3">
      <p className="text-sm">
        <CircleAlert
          className="-mt-0.5 me-3 inline-flex text-red-500"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Input text cannot be empty!
      </p>
    </div>
  );
}

export { Alert };