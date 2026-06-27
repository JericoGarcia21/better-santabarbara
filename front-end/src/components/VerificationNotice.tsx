import { Banner } from '@bettergov/kapwa/banner';

interface VerificationNoticeProps {
  context?: 'services' | 'government' | 'content';
}

const copy = {
  services: {
    title: 'Service information pending LGU verification',
    description:
      'This service information is provisional and compiled from public sources. Procedures, requirements, fees, schedules, and contact details should be verified with the Municipality of Santa Barbara before use.',
  },
  government: {
    title: 'Government information pending LGU verification',
    description:
      'This government information is provisional and compiled from public sources. Office mandates, personnel, contacts, and schedules should be verified with the Municipality of Santa Barbara before use.',
  },
  content: {
    title: 'Pending LGU review',
    description:
      'This page is ready for LGU review. Information may change after verification, correction, or update by the responsible municipal office.',
  },
};

export default function VerificationNotice({
  context = 'content',
}: VerificationNoticeProps) {
  return (
    <div className="mb-6">
      <Banner
        type="warning"
        title={copy[context].title}
        description={copy[context].description}
        icon
      />
    </div>
  );
}
