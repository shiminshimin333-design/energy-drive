export interface BlackHoleParams {
  mass: number; // in micro-solar units
  spin: number; // dimensionless Kerr spin parameter 0 - 0.998
  accretionRate: number; // 0 - 100
  particleDensity: number; // 50 - 500
  tiltAngle: number; // in radians
  glowIntensity: number; // 0.5 - 2.0
  colorScheme: 'cyan-purple' | 'ultraviolet' | 'quantum-blue' | 'singularity-gold';
}

export interface EnergyMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  description: string;
  iconName: string;
}

export interface EnterpriseArchetype {
  id: string;
  name: string;
  entity: string;
  badge: string;
  description: string;
  requiredPowerTeraWatts: number;
  singularityMassMicroGrams: number;
  efficiencyGain: string;
  co2ReductionTons: string;
  features: string[];
}

export interface PhysicsStep {
  stepNumber: string;
  title: string;
  tag: string;
  formula: string;
  description: string;
  keyAspects: string[];
  color: string;
}
