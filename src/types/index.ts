export type ProductCategory = 
  | 'Jaket Kulit Pria' 
  | 'Sepatu Pria' 
  | 'Sepatu Wanita';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  storeName: string;
  shopeeUrl: string;
  imageId: string;
  imageUrl: string;
  description: string;
  materialInfo: string;
  isFeatured?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatarUrl: string;
  phone?: string;
  joinDate: string;
}

export interface ExplorationLocation {
  id: string;
  name: string;
  category: 'Sentra Industri' | 'Landmark' | 'Edukasi' | 'Toko Mitra';
  coordinates: [number, number]; // [lat, lng]
  address: string;
  description: string;
  imageUrl: string;
  visitorTip: string;
}

export interface LeatherMaterial {
  id: string;
  name: string;
  slug: string;
  origin: string;
  textureDescription: string;
  characteristics: string[];
  pros: string[];
  cons: string[];
  commonUses: string[];
  careTips: string[];
  genuineComparison: string;
  imageUrl: string;
  comparison: {
    texture: string;
    flexibility: string;
    thickness: string;
    durability: string;
    maintenance: string;
  };
}

export interface ProductionStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  keyTools: string[];
  artisanInsight: string;
  imageUrl: string;
}

export interface HistoryMilestone {
  era: string;
  yearRange: string;
  title: string;
  narrative: string;
  keyHighlights: string[];
  imageUrl: string;
}
