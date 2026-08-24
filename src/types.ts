export type BatteryStatus = 
  | 'submitted' 
  | 'partner_assigned' 
  | 'collected' 
  | 'processed' 
  | 'offtake_delivered';

export interface BatteryPickupRequest {
  id: string;
  trackingCode: string; // e.g. VL-2026-00184
  sellerName: string;
  phone: string;
  garageName: string;
  garageType: 'fleet_depot' | 'workshop' | 'cooperative' | 'individual';
  district: string;
  thana: string;
  address: string;
  lat?: number;
  lng?: number;
  batteryType: string;
  batteryVoltage: string;
  quantity: number;
  condition: 'intact' | 'swollen' | 'cracked' | 'mixed';
  photoUrl?: string;
  pickupWindow: string;
  preferredPayment: 'bkash' | 'nagad' | 'bank' | 'cash_on_scale';
  estimatedPayoutBDT: number;
  notes?: string;
  createdAt: string;
  status: BatteryStatus;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  weightKg?: number;
  leadRecoveredKg?: number;
  acidNeutralizedLiters?: number;
  manufacturerOfftake?: string;
  timeline: {
    status: BatteryStatus;
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    location?: string;
  }[];
}

export interface HubLocation {
  id: string;
  name: string;
  zoneNameBn: string;
  area: string;
  district: string;
  activeVans: number;
  dailyCapacityUnits: number;
  managerName: string;
  contactPhone: string;
  coordinates: {
    xPercent: number; // For SVG map coordinate positioning (0-100)
    yPercent: number;
    lat: number;
    lng: number;
  };
  address: string;
  status: 'active' | 'expanding';
}

export interface ImpactStats {
  batteriesCollected: number;
  leadRecoveredMT: number;
  acidNeutralizedLiters: number;
  activeGarages: number;
  co2SavedMT: number;
  soilProtectedSqM: number;
}

export interface PublicLedgerEntry {
  id: string;
  trackingCode: string;
  district: string;
  thana: string;
  quantity: number;
  leadWeightKg: number;
  status: BatteryStatus;
  timestamp: string;
  offsetScore: string;
}

export interface PartnerInquiry {
  id: string;
  name: string;
  organization: string;
  partnerType: 'garage' | 'manufacturer' | 'investor' | 'regulator';
  email: string;
  phone: string;
  district?: string;
  interestArea: string;
  message: string;
  timestamp: string;
}

export type PageView = 
  | 'home'
  | 'problem'
  | 'model'
  | 'track'
  | 'impact'
  | 'partners'
  | 'about'
  | 'contact';

export type Language = 'en' | 'bn';
