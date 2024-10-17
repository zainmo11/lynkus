import LoadingSpinner from "../components/LoadingSpinner";

export default function LoadingPage() {
  return (
    <div className="h-screen bg-light-background dark:bg-dark-background flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
