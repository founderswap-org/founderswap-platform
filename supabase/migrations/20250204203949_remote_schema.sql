alter table "public"."goal_translations" enable row level security;

alter table "public"."goal_types" enable row level security;

alter table "public"."interest_translations" enable row level security;

alter table "public"."interest_types" enable row level security;

alter table "public"."languages" enable row level security;

alter table "public"."reports" alter column "reporter_id" set default auth.uid();

alter table "public"."reviews" alter column "reviewer_id" set default auth.uid();

alter table "public"."skill_translations" enable row level security;

alter table "public"."skill_types" enable row level security;

alter table "public"."timeslots" alter column "user_id" set default auth.uid();

alter table "public"."user_company" alter column "user_id" set default auth.uid();

alter table "public"."user_goals" alter column "user_id" set default auth.uid();

alter table "public"."user_interests" alter column "user_id" set default auth.uid();

alter table "public"."user_profile" alter column "user_id" set default auth.uid();

alter table "public"."user_skills" alter column "user_id" set default auth.uid();

create policy "PUBLIC SELECT"
on "public"."goal_translations"
as permissive
for select
to public
using (true);


create policy "PUBLIC SELECT"
on "public"."goal_types"
as permissive
for select
to public
using (true);


create policy "PUBLIC SELECT"
on "public"."interest_translations"
as permissive
for select
to public
using (true);


create policy "PUBLIC SELECT"
on "public"."interest_types"
as permissive
for select
to public
using (true);


create policy "PUBLIC SELECT"
on "public"."languages"
as permissive
for select
to public
using (true);


create policy "PUBLIC SELECT"
on "public"."skill_translations"
as permissive
for select
to public
using (true);


create policy "PUBLIC SELECT"
on "public"."skill_types"
as permissive
for select
to public
using (true);



