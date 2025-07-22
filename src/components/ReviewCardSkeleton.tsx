export default function ReviewCardSkeleton() {
  return (
    <div className="bg-card-bg rounded-3xl p-8 card-shadow animate-pulse h-full">
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
      <div className="mt-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  );
}