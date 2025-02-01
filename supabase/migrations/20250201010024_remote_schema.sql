

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






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  INSERT INTO public.user_profile (user_id, first_name, last_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name', NEW.email); -- Extracts name and email from auth metadata
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."goal_translations" (
    "goal_id" integer NOT NULL,
    "language_code" "text" NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."goal_translations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."goal_types" (
    "id" integer NOT NULL
);


ALTER TABLE "public"."goal_types" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."goal_types_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."goal_types_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."goal_types_id_seq" OWNED BY "public"."goal_types"."id";



CREATE TABLE IF NOT EXISTS "public"."interest_translations" (
    "interest_id" integer NOT NULL,
    "language_code" "text" NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."interest_translations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."interest_types" (
    "id" integer NOT NULL
);


ALTER TABLE "public"."interest_types" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."interest_types_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."interest_types_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."interest_types_id_seq" OWNED BY "public"."interest_types"."id";



CREATE TABLE IF NOT EXISTS "public"."languages" (
    "code" "text" NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."languages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."meetings" (
    "id" integer NOT NULL,
    "founder1_id" "uuid",
    "founder2_id" "uuid",
    "timeslot_id" integer,
    "meeting_date" timestamp with time zone NOT NULL,
    "status" "text" DEFAULT 'scheduled'::"text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."meetings" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."meetings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."meetings_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."meetings_id_seq" OWNED BY "public"."meetings"."id";



CREATE TABLE IF NOT EXISTS "public"."reports" (
    "id" integer NOT NULL,
    "meeting_id" integer,
    "reporter_id" "uuid",
    "reported_id" "uuid",
    "reason" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."reports" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."reports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."reports_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."reports_id_seq" OWNED BY "public"."reports"."id";



CREATE TABLE IF NOT EXISTS "public"."reviews" (
    "id" integer NOT NULL,
    "meeting_id" integer,
    "reviewer_id" "uuid",
    "reviewed_id" "uuid",
    "rating" integer,
    "comment" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "reviews_rating_check" CHECK ((("rating" >= 1) AND ("rating" <= 5)))
);


ALTER TABLE "public"."reviews" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."reviews_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."reviews_id_seq" OWNED BY "public"."reviews"."id";



CREATE TABLE IF NOT EXISTS "public"."skill_translations" (
    "skill_id" integer NOT NULL,
    "language_code" "text" NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."skill_translations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skill_types" (
    "id" integer NOT NULL
);


ALTER TABLE "public"."skill_types" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."skill_types_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."skill_types_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."skill_types_id_seq" OWNED BY "public"."skill_types"."id";



CREATE TABLE IF NOT EXISTS "public"."timeslots" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "start_time" timestamp with time zone NOT NULL,
    "end_time" timestamp with time zone NOT NULL,
    "is_booked" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."timeslots" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."timeslots_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."timeslots_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."timeslots_id_seq" OWNED BY "public"."timeslots"."id";



CREATE TABLE IF NOT EXISTS "public"."user_company" (
    "user_id" "uuid" NOT NULL,
    "name" "text",
    "linkedin" "text",
    "website" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_company" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_goals" (
    "user_id" "uuid" NOT NULL,
    "goal_id" integer NOT NULL
);


ALTER TABLE "public"."user_goals" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_interests" (
    "user_id" "uuid" NOT NULL,
    "interest_id" integer NOT NULL
);


ALTER TABLE "public"."user_interests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_profile" (
    "user_id" "uuid" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "linkedin" "text",
    "website" "text",
    "bio" "text",
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_profile" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_skills" (
    "user_id" "uuid" NOT NULL,
    "skill_id" integer NOT NULL
);


ALTER TABLE "public"."user_skills" OWNER TO "postgres";


ALTER TABLE ONLY "public"."goal_types" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."goal_types_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."interest_types" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."interest_types_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."meetings" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."meetings_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."reports" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reports_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."reviews" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reviews_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."skill_types" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."skill_types_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."timeslots" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."timeslots_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."goal_translations"
    ADD CONSTRAINT "goal_translations_pkey" PRIMARY KEY ("goal_id", "language_code");



ALTER TABLE ONLY "public"."goal_types"
    ADD CONSTRAINT "goal_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."interest_translations"
    ADD CONSTRAINT "interest_translations_pkey" PRIMARY KEY ("interest_id", "language_code");



ALTER TABLE ONLY "public"."interest_types"
    ADD CONSTRAINT "interest_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."languages"
    ADD CONSTRAINT "languages_pkey" PRIMARY KEY ("code");



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "reports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_translations"
    ADD CONSTRAINT "skill_translations_pkey" PRIMARY KEY ("skill_id", "language_code");



ALTER TABLE ONLY "public"."skill_types"
    ADD CONSTRAINT "skill_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."timeslots"
    ADD CONSTRAINT "timeslots_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "unique_report_per_meeting_and_user" UNIQUE ("meeting_id", "reporter_id", "reported_id");



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "unique_review_per_meeting_and_user" UNIQUE ("meeting_id", "reviewer_id");



ALTER TABLE ONLY "public"."user_company"
    ADD CONSTRAINT "user_company_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."user_goals"
    ADD CONSTRAINT "user_goals_pkey" PRIMARY KEY ("user_id", "goal_id");



ALTER TABLE ONLY "public"."user_interests"
    ADD CONSTRAINT "user_interests_pkey" PRIMARY KEY ("user_id", "interest_id");



ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."user_skills"
    ADD CONSTRAINT "user_skills_pkey" PRIMARY KEY ("user_id", "skill_id");



ALTER TABLE ONLY "public"."goal_translations"
    ADD CONSTRAINT "goal_translations_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "public"."goal_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."goal_translations"
    ADD CONSTRAINT "goal_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."interest_translations"
    ADD CONSTRAINT "interest_translations_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "public"."interest_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."interest_translations"
    ADD CONSTRAINT "interest_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_founder1_id_fkey" FOREIGN KEY ("founder1_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_founder2_id_fkey" FOREIGN KEY ("founder2_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_timeslot_id_fkey" FOREIGN KEY ("timeslot_id") REFERENCES "public"."timeslots"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "reports_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "reports_reported_id_fkey" FOREIGN KEY ("reported_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_reviewed_id_fkey" FOREIGN KEY ("reviewed_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_translations"
    ADD CONSTRAINT "skill_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_translations"
    ADD CONSTRAINT "skill_translations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skill_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."timeslots"
    ADD CONSTRAINT "timeslots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_company"
    ADD CONSTRAINT "user_company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_goals"
    ADD CONSTRAINT "user_goals_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "public"."goal_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_goals"
    ADD CONSTRAINT "user_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_interests"
    ADD CONSTRAINT "user_interests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "public"."interest_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_interests"
    ADD CONSTRAINT "user_interests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_skills"
    ADD CONSTRAINT "user_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skill_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_skills"
    ADD CONSTRAINT "user_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE CASCADE;



CREATE POLICY "Users can create goals for themselves" ON "public"."user_goals" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create interests for themselves" ON "public"."user_interests" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create reports for meetings they are part of" ON "public"."reports" FOR INSERT WITH CHECK ((("auth"."uid"() = "reporter_id") AND (EXISTS ( SELECT 1
   FROM "public"."meetings"
  WHERE (("meetings"."id" = "reports"."meeting_id") AND (("meetings"."founder1_id" = "auth"."uid"()) OR ("meetings"."founder2_id" = "auth"."uid"())))))));



CREATE POLICY "Users can create reviews for meetings they are part of" ON "public"."reviews" FOR INSERT WITH CHECK ((("auth"."uid"() = "reviewer_id") AND (EXISTS ( SELECT 1
   FROM "public"."meetings"
  WHERE (("meetings"."id" = "reviews"."meeting_id") AND (("meetings"."founder1_id" = "auth"."uid"()) OR ("meetings"."founder2_id" = "auth"."uid"())))))));



CREATE POLICY "Users can create skills for themselves" ON "public"."user_skills" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create timeslots for themselves" ON "public"."timeslots" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own goals" ON "public"."user_goals" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own interests" ON "public"."user_interests" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own skills" ON "public"."user_skills" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own timeslots" ON "public"."timeslots" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read meetings they are part of" ON "public"."meetings" FOR SELECT USING ((("auth"."uid"() = "founder1_id") OR ("auth"."uid"() = "founder2_id")));



CREATE POLICY "Users can read reviews they are part of" ON "public"."reviews" FOR SELECT USING ((("auth"."uid"() = "reviewer_id") OR ("auth"."uid"() = "reviewed_id")));



CREATE POLICY "Users can read their own company information" ON "public"."user_company" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own goals" ON "public"."user_goals" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own interests" ON "public"."user_interests" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own profile" ON "public"."user_profile" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own reports" ON "public"."reports" FOR SELECT USING (("auth"."uid"() = "reporter_id"));



CREATE POLICY "Users can read their own skills" ON "public"."user_skills" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own timeslots" ON "public"."timeslots" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own company information" ON "public"."user_company" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own profile" ON "public"."user_profile" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own timeslots" ON "public"."timeslots" FOR UPDATE USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."meetings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reports" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reviews" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."timeslots" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_company" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_goals" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_interests" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_profile" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_skills" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."goal_translations" TO "anon";
GRANT ALL ON TABLE "public"."goal_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."goal_translations" TO "service_role";



GRANT ALL ON TABLE "public"."goal_types" TO "anon";
GRANT ALL ON TABLE "public"."goal_types" TO "authenticated";
GRANT ALL ON TABLE "public"."goal_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."goal_types_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."goal_types_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."goal_types_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."interest_translations" TO "anon";
GRANT ALL ON TABLE "public"."interest_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."interest_translations" TO "service_role";



GRANT ALL ON TABLE "public"."interest_types" TO "anon";
GRANT ALL ON TABLE "public"."interest_types" TO "authenticated";
GRANT ALL ON TABLE "public"."interest_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."interest_types_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."interest_types_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."interest_types_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."languages" TO "anon";
GRANT ALL ON TABLE "public"."languages" TO "authenticated";
GRANT ALL ON TABLE "public"."languages" TO "service_role";



GRANT ALL ON TABLE "public"."meetings" TO "anon";
GRANT ALL ON TABLE "public"."meetings" TO "authenticated";
GRANT ALL ON TABLE "public"."meetings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."meetings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."meetings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."meetings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."reports" TO "anon";
GRANT ALL ON TABLE "public"."reports" TO "authenticated";
GRANT ALL ON TABLE "public"."reports" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reports_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reports_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reports_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."reviews" TO "anon";
GRANT ALL ON TABLE "public"."reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."reviews" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."skill_translations" TO "anon";
GRANT ALL ON TABLE "public"."skill_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_translations" TO "service_role";



GRANT ALL ON TABLE "public"."skill_types" TO "anon";
GRANT ALL ON TABLE "public"."skill_types" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."skill_types_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."skill_types_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."skill_types_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."timeslots" TO "anon";
GRANT ALL ON TABLE "public"."timeslots" TO "authenticated";
GRANT ALL ON TABLE "public"."timeslots" TO "service_role";



GRANT ALL ON SEQUENCE "public"."timeslots_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."timeslots_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."timeslots_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_company" TO "anon";
GRANT ALL ON TABLE "public"."user_company" TO "authenticated";
GRANT ALL ON TABLE "public"."user_company" TO "service_role";



GRANT ALL ON TABLE "public"."user_goals" TO "anon";
GRANT ALL ON TABLE "public"."user_goals" TO "authenticated";
GRANT ALL ON TABLE "public"."user_goals" TO "service_role";



GRANT ALL ON TABLE "public"."user_interests" TO "anon";
GRANT ALL ON TABLE "public"."user_interests" TO "authenticated";
GRANT ALL ON TABLE "public"."user_interests" TO "service_role";



GRANT ALL ON TABLE "public"."user_profile" TO "anon";
GRANT ALL ON TABLE "public"."user_profile" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profile" TO "service_role";



GRANT ALL ON TABLE "public"."user_skills" TO "anon";
GRANT ALL ON TABLE "public"."user_skills" TO "authenticated";
GRANT ALL ON TABLE "public"."user_skills" TO "service_role";



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
