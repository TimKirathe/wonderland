import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';

const DynamicJourneyModal = dynamic(
  () => import('./JourneyModal'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <LoadingSpinner size="lg" color="primary" />
      </div>
    ),
    ssr: false,
  }
);

export default DynamicJourneyModal;