import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';

const DynamicContactForm = dynamic(
  () => import('./ContactForm'),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="md" color="primary" />
      </div>
    ),
    ssr: false,
  }
);

export default DynamicContactForm;