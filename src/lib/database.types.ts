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
      categories: {
        Row: {
          created_at: string | null
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          name: string
          team_size: number
        }
        Insert: {
          created_at?: string | null
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          name: string
          team_size?: number
        }
        Update: {
          created_at?: string | null
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          name?: string
          team_size?: number
        }
        Relationships: []
      }
      checkins: {
        Row: {
          category: string
          category_id: string
          created_at: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["checkin_status"] | null
          team_id: string
        }
        Insert: {
          category: string
          category_id: string
          created_at?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["checkin_status"] | null
          team_id: string
        }
        Update: {
          category?: string
          category_id?: string
          created_at?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["checkin_status"] | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkins_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkins_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          location: string | null
          name: string
          start_date: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          location?: string | null
          name: string
          start_date: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          location?: string | null
          name?: string
          start_date?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          created_at: string | null
          id: string
          result_type: Database["public"]["Enums"]["result_type"]
          result_value: number
          status: Database["public"]["Enums"]["score_status"] | null
          team_id: string
          tiebreak_type: Database["public"]["Enums"]["result_type"] | null
          tiebreak_value: number | null
          workout_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          result_type: Database["public"]["Enums"]["result_type"]
          result_value: number
          status?: Database["public"]["Enums"]["score_status"] | null
          team_id: string
          tiebreak_type?: Database["public"]["Enums"]["result_type"] | null
          tiebreak_value?: number | null
          workout_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          result_type?: Database["public"]["Enums"]["result_type"]
          result_value?: number
          status?: Database["public"]["Enums"]["score_status"] | null
          team_id?: string
          tiebreak_type?: Database["public"]["Enums"]["result_type"] | null
          tiebreak_value?: number | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      team_users: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          event_id: string
          gym: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          gym?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          gym?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string | null
          id: string
          price: number
          status: string | null
          team_id: string
          ticket_number: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          price: number
          status?: string | null
          team_id: string
          ticket_number: string
        }
        Update: {
          created_at?: string | null
          id?: string
          price?: number
          status?: string | null
          team_id?: string
          ticket_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          payment_method: string | null
          status: string | null
          ticket_id: string
          transaction_reference: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          ticket_id: string
          transaction_reference?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          ticket_id?: string
          transaction_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          category_id: string
          created_at: string | null
          event_id: string
          id: string
          name: string
          result: Database["public"]["Enums"]["result_type"]
          tiebreak: Database["public"]["Enums"]["result_type"]
          timecap: number
          type: Database["public"]["Enums"]["workout_type"]
        }
        Insert: {
          category_id: string
          created_at?: string | null
          event_id: string
          id?: string
          name: string
          result: Database["public"]["Enums"]["result_type"]
          tiebreak: Database["public"]["Enums"]["result_type"]
          timecap: number
          type: Database["public"]["Enums"]["workout_type"]
        }
        Update: {
          category_id?: string
          created_at?: string | null
          event_id?: string
          id?: string
          name?: string
          result?: Database["public"]["Enums"]["result_type"]
          tiebreak?: Database["public"]["Enums"]["result_type"]
          timecap?: number
          type?: Database["public"]["Enums"]["workout_type"]
        }
        Relationships: [
          {
            foreignKeyName: "workouts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
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
      checkin_status: "pending" | "checked" | "noshow"
      gender_type: "male" | "female" | "mixed"
      result_type: "time" | "reps" | "weight"
      score_status: "published" | "non-published" | "pending"
      workout_type: "amrap" | "fortime" | "emom"
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
    Enums: {
      checkin_status: ["pending", "checked", "noshow"],
      gender_type: ["male", "female", "mixed"],
      result_type: ["time", "reps", "weight"],
      score_status: ["published", "non-published", "pending"],
      workout_type: ["amrap", "fortime", "emom"],
    },
  },
} as const

