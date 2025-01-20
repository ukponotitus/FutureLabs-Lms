interface User {
  first_name: string;
    id: number;
    surname: string;
    email: string;
    age_range: string; 
    gender: "male" | "female" | "other"; 
    address: string;
    state: string;
    lga: string;
    phone_number: string;
    experience: "beginner" | "intermediate" | "advanced"; 
    heard_about_us: string; 
    service_id: number;
    user_id: number | null; 
    created_at: string; 
    updated_at: string;
    email_verified: number; 
  }
  
  export interface ISingleUserData {
    success: boolean;
    message: string;
    data: User[];
  }

  interface IMeProfile {
    id: number;
    first_name: string;
    surname: string;
    email: string;
    age_range: string; 
    gender: "male" | "female" | "other"; 
    address: string;
    state: string;
    lga: string; 
    phone_number: string | null; 
    experience: string | null; 
    heard_about_us: string; 
    service_id: number;
    user_id: number;
    created_at: string; 
    updated_at: string;
    email_verified: 0 | 1; 
  }
  
  interface MeUserData {
    id: number;
    fullname: string;
    email: string;
    profile: IMeProfile; 
  }
  
  export interface ApiMEResponse{
    success: boolean;
    message: string;
    data: MeUserData;
  }
  
  