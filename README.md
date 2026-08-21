# David Donathan Media

High-converting agency website with lead capture and **Google Calendar** meeting booking.

## Meeting booking (Google Calendar)

The `/book` page embeds your **Google Appointment schedule** so visitors book directly on Google Calendar.

### Setup (one time)

1. Sign in to [Google Calendar](https://calendar.google.com) with **ddonathan84@gmail.com**
2. Click **Create** → **Appointment schedule**
3. Add meeting types (e.g. 15 min / 30 min) and set your availability
4. Open the schedule → **Share** → **Website embed**
5. Copy the iframe **src** URL
6. Add to `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL=https://calendar.google.com/calendar/appointments/schedules/...
```

7. Restart `npm run dev`

When someone books:
- The event is added to David's Google Calendar
- **David gets a Google Calendar email notification**
- **The client gets a calendar invite**

No third-party booking app required.

## Email (contact forms)

```bash
RESEND_API_KEY=re_xxxxxxxx
CLIENT_EMAIL=ddonathan84@gmail.com
```

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
