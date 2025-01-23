
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."area" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."area" OWNER TO "postgres";

ALTER TABLE "public"."area" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."area_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."availabilities" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "slot" timestamp with time zone NOT NULL
);

ALTER TABLE "public"."availabilities" OWNER TO "postgres";

ALTER TABLE "public"."availabilities" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."availabilities_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."company" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "website" "text",
    "name" "text" NOT NULL,
    "grow_stage_id" bigint NOT NULL
);

ALTER TABLE "public"."company" OWNER TO "postgres";

ALTER TABLE "public"."company" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."company_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."goals" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "description" "text" NOT NULL
);

ALTER TABLE "public"."goals" OWNER TO "postgres";

ALTER TABLE "public"."goals" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."goals_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."grow_stages" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."grow_stages" OWNER TO "postgres";

ALTER TABLE "public"."grow_stages" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."grow_stages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "firstname" "text" NOT NULL,
    "lastname" "text" NOT NULL,
    "email" "text" NOT NULL,
    "linkedin" "text" NOT NULL,
    "languages" "text" NOT NULL,
    "recId" "text" NOT NULL,
    "company_id" bigint NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

COMMENT ON TABLE "public"."users" IS 'user';

CREATE TABLE IF NOT EXISTS "public"."users_areas" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" bigint NOT NULL,
    "area_id" bigint NOT NULL
);

ALTER TABLE "public"."users_areas" OWNER TO "postgres";

ALTER TABLE "public"."users_areas" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."users_areas_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."users_availabilities" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" bigint NOT NULL,
    "availability_id" bigint NOT NULL
);

ALTER TABLE "public"."users_availabilities" OWNER TO "postgres";

ALTER TABLE "public"."users_availabilities" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."users_availabilities_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."users_goals" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" bigint NOT NULL,
    "goal_id" bigint NOT NULL
);

ALTER TABLE "public"."users_goals" OWNER TO "postgres";

ALTER TABLE "public"."users_goals" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."users_goals_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE "public"."users" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."area"
    ADD CONSTRAINT "area_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."availabilities"
    ADD CONSTRAINT "availabilities_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."company"
    ADD CONSTRAINT "company_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."goals"
    ADD CONSTRAINT "goals_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."grow_stages"
    ADD CONSTRAINT "grow_stages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users_areas"
    ADD CONSTRAINT "users_areas_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users_availabilities"
    ADD CONSTRAINT "users_availabilities_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users_goals"
    ADD CONSTRAINT "users_goals_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."company"
    ADD CONSTRAINT "public_company_grow_stage_id_fkey" FOREIGN KEY ("grow_stage_id") REFERENCES "public"."grow_stages"("id");

ALTER TABLE ONLY "public"."users_areas"
    ADD CONSTRAINT "public_users_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id");

ALTER TABLE ONLY "public"."users_areas"
    ADD CONSTRAINT "public_users_areas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."users_availabilities"
    ADD CONSTRAINT "public_users_availabilities_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "public"."availabilities"("id");

ALTER TABLE ONLY "public"."users_availabilities"
    ADD CONSTRAINT "public_users_availabilities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "public_users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id");

ALTER TABLE ONLY "public"."users_goals"
    ADD CONSTRAINT "public_users_goals_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id");

ALTER TABLE ONLY "public"."users_goals"
    ADD CONSTRAINT "public_users_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE "public"."area" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."availabilities" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."company" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."goals" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."grow_stages" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users_areas" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users_availabilities" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users_goals" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."area" TO "anon";
GRANT ALL ON TABLE "public"."area" TO "authenticated";
GRANT ALL ON TABLE "public"."area" TO "service_role";

GRANT ALL ON SEQUENCE "public"."area_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."area_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."area_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."availabilities" TO "anon";
GRANT ALL ON TABLE "public"."availabilities" TO "authenticated";
GRANT ALL ON TABLE "public"."availabilities" TO "service_role";

GRANT ALL ON SEQUENCE "public"."availabilities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."availabilities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."availabilities_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."company" TO "anon";
GRANT ALL ON TABLE "public"."company" TO "authenticated";
GRANT ALL ON TABLE "public"."company" TO "service_role";

GRANT ALL ON SEQUENCE "public"."company_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."company_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."company_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."goals" TO "anon";
GRANT ALL ON TABLE "public"."goals" TO "authenticated";
GRANT ALL ON TABLE "public"."goals" TO "service_role";

GRANT ALL ON SEQUENCE "public"."goals_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."goals_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."goals_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."grow_stages" TO "anon";
GRANT ALL ON TABLE "public"."grow_stages" TO "authenticated";
GRANT ALL ON TABLE "public"."grow_stages" TO "service_role";

GRANT ALL ON SEQUENCE "public"."grow_stages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."grow_stages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."grow_stages_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."users_areas" TO "anon";
GRANT ALL ON TABLE "public"."users_areas" TO "authenticated";
GRANT ALL ON TABLE "public"."users_areas" TO "service_role";

GRANT ALL ON SEQUENCE "public"."users_areas_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_areas_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_areas_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."users_availabilities" TO "anon";
GRANT ALL ON TABLE "public"."users_availabilities" TO "authenticated";
GRANT ALL ON TABLE "public"."users_availabilities" TO "service_role";

GRANT ALL ON SEQUENCE "public"."users_availabilities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_availabilities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_availabilities_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."users_goals" TO "anon";
GRANT ALL ON TABLE "public"."users_goals" TO "authenticated";
GRANT ALL ON TABLE "public"."users_goals" TO "service_role";

GRANT ALL ON SEQUENCE "public"."users_goals_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_goals_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_goals_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
