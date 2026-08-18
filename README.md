# David Donathan Media

High-converting agency website for **David Donathan Media** — digital marketing, web design, SEO lead capture, and built-in meeting scheduling with email notifications.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion + Lucide React
- React Hook Form + Zod
- Resend (lead + meeting email notifications)

## Pages

- `/` Home (includes booking calendar)
- `/about` About
- `/services` Services + quote form
- `/pricing` Packages, add-ons, FAQ
- `/book` Meeting scheduler
- `/contact` Contact + booking + lead form

## Email setup

1. Copy `.env.local.example` to `.env.local`
2. Add your Resend API key:

```bash
RESEND_API_KEY=re_xxxxxxxx
CLIENT_EMAIL=ddonathan84@gmail.com
```

3. Until a custom domain is verified in Resend, the default sender `onboarding@resend.dev` only delivers to your Resend account email. Verify a domain for production delivery to `ddonathan84@gmail.com`.

## Meeting booking

Visitors schedule meetings directly on the website (homepage, `/book`, `/contact`):

1. Choose **15 or 30 minute** meeting
2. Pick a **date** (Mon–Fri) and **time slot**
3. Enter name, email, and phone
4. Click **Confirm Meeting**

When confirmed:

- **David** receives an email: `Meeting scheduled — [Name] on [Date/Time]`
- **The visitor** receives a confirmation email

No third-party calendar account required.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```
