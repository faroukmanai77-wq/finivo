export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          category: string
          category_en: string | null
          content: string
          content_en: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string
          excerpt_en: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          published_at: string
          read_time: number
          slug: string
          tags: string[]
          tags_en: string[] | null
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          author?: string
          category?: string
          category_en?: string | null
          content: string
          content_en?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt: string
          excerpt_en?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          published_at?: string
          read_time?: number
          slug: string
          tags?: string[]
          tags_en?: string[] | null
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          category_en?: string | null
          content?: string
          content_en?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          excerpt_en?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          published_at?: string
          read_time?: number
          slug?: string
          tags?: string[]
          tags_en?: string[] | null
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          affiliate_link: string
          affiliate_platform: string | null
          author: string
          category: string
          category_en: string | null
          cover_image_url: string | null
          created_at: string
          full_description: string | null
          full_description_en: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean
          language: string
          level: string
          quote: string | null
          quote_en: string | null
          rating: number | null
          reader_profile: string | null
          reader_profile_en: string | null
          short_description: string
          short_description_en: string | null
          slug: string
          sub_categories: string[]
          sub_categories_en: string[] | null
          themes: string[]
          themes_en: string[] | null
          title: string
          title_en: string | null
          updated_at: string
          why_read_this_book: string | null
          why_read_this_book_en: string | null
        }
        Insert: {
          affiliate_link?: string
          affiliate_platform?: string | null
          author: string
          category: string
          category_en?: string | null
          cover_image_url?: string | null
          created_at?: string
          full_description?: string | null
          full_description_en?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean
          language?: string
          level?: string
          quote?: string | null
          quote_en?: string | null
          rating?: number | null
          reader_profile?: string | null
          reader_profile_en?: string | null
          short_description: string
          short_description_en?: string | null
          slug: string
          sub_categories?: string[]
          sub_categories_en?: string[] | null
          themes?: string[]
          themes_en?: string[] | null
          title: string
          title_en?: string | null
          updated_at?: string
          why_read_this_book?: string | null
          why_read_this_book_en?: string | null
        }
        Update: {
          affiliate_link?: string
          affiliate_platform?: string | null
          author?: string
          category?: string
          category_en?: string | null
          cover_image_url?: string | null
          created_at?: string
          full_description?: string | null
          full_description_en?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean
          language?: string
          level?: string
          quote?: string | null
          quote_en?: string | null
          rating?: number | null
          reader_profile?: string | null
          reader_profile_en?: string | null
          short_description?: string
          short_description_en?: string | null
          slug?: string
          sub_categories?: string[]
          sub_categories_en?: string[] | null
          themes?: string[]
          themes_en?: string[] | null
          title?: string
          title_en?: string | null
          updated_at?: string
          why_read_this_book?: string | null
          why_read_this_book_en?: string | null
        }
        Relationships: []
      }
      brokerage_platforms: {
        Row: {
          accounts: string[]
          affiliate_link: string
          created_at: string
          has_crypto: boolean
          has_french: boolean
          has_mobile_app: boolean
          has_options: boolean
          id: string
          ideal_for: string
          ideal_for_en: string | null
          is_active: boolean | null
          level: string
          level_en: string | null
          logo: string | null
          markets_access: string[]
          monthly_fee: string
          name: string
          products: string[]
          rating: number
          regulation: string[]
          slug: string
          strengths: string[]
          strengths_en: string[] | null
          transaction_fee_etf: string
          transaction_fee_stocks: string
          type: string
          type_en: string | null
          updated_at: string
          weaknesses: string[]
          weaknesses_en: string[] | null
        }
        Insert: {
          accounts?: string[]
          affiliate_link?: string
          created_at?: string
          has_crypto?: boolean
          has_french?: boolean
          has_mobile_app?: boolean
          has_options?: boolean
          id?: string
          ideal_for: string
          ideal_for_en?: string | null
          is_active?: boolean | null
          level?: string
          level_en?: string | null
          logo?: string | null
          markets_access?: string[]
          monthly_fee: string
          name: string
          products?: string[]
          rating?: number
          regulation?: string[]
          slug: string
          strengths?: string[]
          strengths_en?: string[] | null
          transaction_fee_etf: string
          transaction_fee_stocks: string
          type?: string
          type_en?: string | null
          updated_at?: string
          weaknesses?: string[]
          weaknesses_en?: string[] | null
        }
        Update: {
          accounts?: string[]
          affiliate_link?: string
          created_at?: string
          has_crypto?: boolean
          has_french?: boolean
          has_mobile_app?: boolean
          has_options?: boolean
          id?: string
          ideal_for?: string
          ideal_for_en?: string | null
          is_active?: boolean | null
          level?: string
          level_en?: string | null
          logo?: string | null
          markets_access?: string[]
          monthly_fee?: string
          name?: string
          products?: string[]
          rating?: number
          regulation?: string[]
          slug?: string
          strengths?: string[]
          strengths_en?: string[] | null
          transaction_fee_etf?: string
          transaction_fee_stocks?: string
          type?: string
          type_en?: string | null
          updated_at?: string
          weaknesses?: string[]
          weaknesses_en?: string[] | null
        }
        Relationships: []
      }
      credit_cards: {
        Row: {
          affiliate_link: string
          annual_fee: number
          cash_advance_rate: number
          categories: string[]
          created_at: string
          features: string[] | null
          features_en: string[] | null
          first_year_free: boolean | null
          id: string
          image_url: string | null
          interest_rate: number
          is_active: boolean | null
          issuer: string
          min_income: number | null
          name: string
          name_en: string | null
          rating: number
          rewards_rate: number
          rewards_type: string
          rewards_type_en: string | null
          slug: string
          updated_at: string
          welcome_bonus: string | null
          welcome_bonus_en: string | null
          welcome_bonus_value: number | null
        }
        Insert: {
          affiliate_link: string
          annual_fee?: number
          cash_advance_rate: number
          categories?: string[]
          created_at?: string
          features?: string[] | null
          features_en?: string[] | null
          first_year_free?: boolean | null
          id?: string
          image_url?: string | null
          interest_rate: number
          is_active?: boolean | null
          issuer: string
          min_income?: number | null
          name: string
          name_en?: string | null
          rating?: number
          rewards_rate?: number
          rewards_type: string
          rewards_type_en?: string | null
          slug: string
          updated_at?: string
          welcome_bonus?: string | null
          welcome_bonus_en?: string | null
          welcome_bonus_value?: number | null
        }
        Update: {
          affiliate_link?: string
          annual_fee?: number
          cash_advance_rate?: number
          categories?: string[]
          created_at?: string
          features?: string[] | null
          features_en?: string[] | null
          first_year_free?: boolean | null
          id?: string
          image_url?: string | null
          interest_rate?: number
          is_active?: boolean | null
          issuer?: string
          min_income?: number | null
          name?: string
          name_en?: string | null
          rating?: number
          rewards_rate?: number
          rewards_type?: string
          rewards_type_en?: string | null
          slug?: string
          updated_at?: string
          welcome_bonus?: string | null
          welcome_bonus_en?: string | null
          welcome_bonus_value?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
