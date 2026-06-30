import { localGovernmentBarangays } from './localGovernment';

const captainNames: Record<string, string | undefined> = {};

export const barangayCaptains = localGovernmentBarangays.map(barangay => ({
  ...barangay,
  captain: captainNames[barangay.name],
  verificationStatus: captainNames[barangay.name]
    ? 'Verified'
    : 'For LGU verification',
}));
