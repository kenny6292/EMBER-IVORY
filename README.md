# EMBER & IVORY

Premium contemporary restaurant website and ordering platform.

## Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

## Production integrations
- Supabase/PostgreSQL
- Paystack
- Resend
- Customer authentication
- Admin dashboard
- Reservation and order APIs

## Environment
Copy `.env.example` to your deployment environment. Never commit real secrets.

Required production secrets when integrations are enabled:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `PAYSTACK_SECRET_KEY` (server only)
- `RESEND_API_KEY` (server only)
- `RESEND_WEBHOOK_SECRET` (server only)
- `RESEND_FROM_EMAIL`
- `RESTAURANT_CONTACT_EMAIL`

## Current deployment status
The frontend and API boundaries are in GitHub. The dedicated Supabase project is still blocked by the connected organization's free-project limit. Until it is created, reservation and order creation intentionally return a service-unavailable response rather than fabricating database records or payment success.

## Brand
**Where Fire Meets Flavour.**

Lagos, Nigeria.
