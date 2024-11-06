export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          created_at: string
          hex_color: string
          name: string
          uuid: string
        }
        Insert: {
          created_at?: string
          hex_color: string
          name: string
          uuid?: string
        }
        Update: {
          created_at?: string
          hex_color?: string
          name?: string
          uuid?: string
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          note: string | null
          project_uuid: string
          started_at: string
          stopped_at: string | null
          user_uuid: string
          uuid: string
        }
        Insert: {
          note?: string | null
          project_uuid: string
          started_at: string
          stopped_at?: string | null
          user_uuid: string
          uuid?: string
        }
        Update: {
          note?: string | null
          project_uuid?: string
          started_at?: string
          stopped_at?: string | null
          user_uuid?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_project_uuid_fkey"
            columns: ["project_uuid"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "time_entries_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uuid"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          user_uuid: string
          uses_24_hour_clock: boolean
          week_starts_on_monday: boolean
        }
        Insert: {
          created_at?: string
          user_uuid: string
          uses_24_hour_clock?: boolean
          week_starts_on_monday?: boolean
        }
        Update: {
          created_at?: string
          user_uuid?: string
          uses_24_hour_clock?: boolean
          week_starts_on_monday?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["uuid"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          username: string
          uuid: string
        }
        Insert: {
          created_at?: string
          email: string
          username: string
          uuid?: string
        }
        Update: {
          created_at?: string
          email?: string
          username?: string
          uuid?: string
        }
        Relationships: []
      }
      users_on_projects: {
        Row: {
          created_at: string
          project_uuid: string
          user_uuid: string
          uuid: string
        }
        Insert: {
          created_at?: string
          project_uuid: string
          user_uuid: string
          uuid?: string
        }
        Update: {
          created_at?: string
          project_uuid?: string
          user_uuid?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_on_projects_project_uuid_fkey"
            columns: ["project_uuid"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "users_on_projects_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uuid"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
