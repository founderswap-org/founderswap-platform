export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      areas: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      availabilities: {
        Row: {
          created_at: string;
          id: number;
          slot: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          slot: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          slot?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_availabilities_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      company: {
        Row: {
          created_at: string;
          grow_stage_id: number;
          name: string;
          user_id: string;
          website: string | null;
        };
        Insert: {
          created_at?: string;
          grow_stage_id: number;
          name: string;
          user_id: string;
          website?: string | null;
        };
        Update: {
          created_at?: string;
          grow_stage_id?: number;
          name?: string;
          user_id?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'company_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_company_grow_stage_id_fkey';
            columns: ['grow_stage_id'];
            isOneToOne: false;
            referencedRelation: 'grow_stages';
            referencedColumns: ['id'];
          },
        ];
      };
      goals: {
        Row: {
          created_at: string;
          description: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
        };
        Relationships: [];
      };
      grow_stages: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      matches: {
        Row: {
          created_at: string;
          slot: string;
          user_a: string;
          user_b: string;
        };
        Insert: {
          created_at?: string;
          slot: string;
          user_a: string;
          user_b: string;
        };
        Update: {
          created_at?: string;
          slot?: string;
          user_a?: string;
          user_b?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'matches_user_a_fkey';
            columns: ['user_a'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matches_user_b_fkey';
            columns: ['user_b'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          firstname: string;
          id: string;
          languages: string;
          lastname: string;
          linkedin: string;
          recId: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          firstname: string;
          id?: string;
          languages: string;
          lastname: string;
          linkedin: string;
          recId?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          firstname?: string;
          id?: string;
          languages?: string;
          lastname?: string;
          linkedin?: string;
          recId?: string | null;
        };
        Relationships: [];
      };
      users_areas: {
        Row: {
          area_id: number;
          created_at: string;
          user_id: string;
        };
        Insert: {
          area_id: number;
          created_at?: string;
          user_id: string;
        };
        Update: {
          area_id?: number;
          created_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_users_areas_area_id_fkey';
            columns: ['area_id'];
            isOneToOne: false;
            referencedRelation: 'areas';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_areas_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      users_goals: {
        Row: {
          created_at: string;
          goal_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          goal_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          goal_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_users_goals_goal_id_fkey';
            columns: ['goal_id'];
            isOneToOne: false;
            referencedRelation: 'goals';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_goals_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
