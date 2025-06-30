interface ErrorProps {
  error: unknown;
}

const ErrorMessage = ({ error }: ErrorProps) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "An unexpected error occurred.";

  return (
    <div className="w-full h-full flex items-center justify-center text-red-600 font-semibold text-sm p-4 bg-red-100 rounded-md">
      {message}
    </div>
  );
};

export default ErrorMessage;
