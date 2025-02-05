create policy "User can insert company information"
on "public"."user_company"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."user_profile"
as permissive
for insert
to public
with check ((auth.uid() = user_id));



