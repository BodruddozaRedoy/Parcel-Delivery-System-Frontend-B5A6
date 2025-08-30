export interface Parcel {
  _id: string;
  type: string;
  weight: number;
  fee: number;
  sender: string | User;
  receiver: {name:string,phone:string};
  fromAddress: string;
  toAddress: string;
  statusLogs: [{ status: string }];
  trackingId: string;
  deliveryDate?: string;
  createdAt: string;
  updatedAt: string;
  currentStatus:string;
  isBlocked:boolean
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string
  role: "sender" | "receiver" | "admin";
  isBlocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParcelRequest {
  sender?:string
  type: string;
  weight: number;
  fee: number;
  receiver: {name:string,phone:string};
  fromAddress: string;
  toAddress: string;
}

export interface UpdateParcelStatusRequest {
  status:string;
  note?: string;
  location?: string;
}

export interface ParcelStats {
  totalParcels: number;
  pendingParcels: number;
  deliveredParcels: number;
  cancelledParcels: number;
  totalRevenue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    parcels: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "sender" | "receiver" | "admin";
  isBlocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "sender" | "receiver" | "admin";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
}

export interface ToggleUserStatusRequest {
  isBlocked: boolean;
}
