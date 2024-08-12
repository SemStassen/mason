export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string;
          id: string;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          username?: string | null;
        };
        RelationShips: [
          {
            foreignKeyName: "profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
  };
};
