export interface Application {
  id?: string
  created_at?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  age: number
  city_state: string
  hair_loss_story: string
  why_me: string
  photo_front_url?: string
  photo_top_url?: string
  photo_back_url?: string
  photo_side_url?: string
  consent: boolean
  status?: 'pending' | 'selected' | 'archived'
}

export interface FormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  age: string
  city_state: string
  hair_loss_story: string
  why_me: string
  photo_front: File | null
  photo_top: File | null
  photo_back: File | null
  photo_side: File | null
  consent: boolean
}
