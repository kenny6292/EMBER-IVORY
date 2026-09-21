# EMBER & IVORY backend status

The application frontend is in GitHub and the production database blueprint is now prepared.

## Blocked dependency
A dedicated Supabase project cannot currently be created because the connected Supabase organization has reached its active free-project limit.

## What is ready
- PostgreSQL/Supabase schema blueprint
- RLS enabled on every public table
- Customer ownership policies
- Menu/catalog public-read policies
- TypeScript domain types
- Environment-variable contract

## Still required before production backend launch
1. Create or free a dedicated Supabase project.
2. Apply `supabase/schema.sql`.
3. Verify RLS with authenticated/anonymous test queries.
4. Configure Supabase Auth and staff/admin authorization.
5. Add server-side reservation/order actions.
6. Add Paystack server-side initialization + webhook/verification.
7. Add Resend transactional emails.
8. Run production build and end-to-end tests.

Never commit real API keys, database passwords, or service-role credentials.
