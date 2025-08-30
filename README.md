## Parcel Delivery System – Frontend (React + Vite + RTK Query)

A role-based parcel delivery dashboard for Senders, Receivers, and Admins. It provides parcel creation, tracking, status management, and basic user administration. Built with React, Vite, TypeScript, Tailwind CSS, Redux Toolkit Query, and TanStack Table.

Backend base URLs are configured to `http://localhost:5000` and use cookie-based auth (credentials: include). Run the backend separately with compatible CORS and cookie settings.

## Tech Stack

- React 19 + Vite 7 (TypeScript)
- Tailwind CSS 4 (with `@tailwindcss/vite`)
- Redux Toolkit Query (RTK Query)
- React Router 7
- TanStack React Table v8
- Radix UI primitives and custom UI components

## Features

- Sender: Create parcels, view my parcels, cancel while pending.
- Receiver: View incoming parcels, confirm delivery when in transit.
- Admin: View all parcels, update parcel status, block/unblock parcels, view users.
- Parcel tracking (public) by tracking ID.
- Reusable ParcelTable with search, filters, pagination, and column visibility.

## Getting Started

Prerequisites
- Node.js 18+ (recommend 20 LTS)
- npm, pnpm, or yarn

Install and run
- Install: `npm install`
- Dev: `npm run dev` (default port 6565)
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`

The app expects a backend on `http://localhost:5000` with cookies enabled. Update base URLs if needed (see Configuration).

## Configuration

- API base URL (Auth): `src/redux/features/auth/auth.api.ts:16`
- API base URL (Parcel): `src/redux/features/parcel/parcel.api.ts:13`
- Vite dev server port: `vite.config.ts:15`
- Path alias `@` -> `./src`: `vite.config.ts:10`

If your backend runs on a different host/port, change the `baseUrl` values above or add environment support as needed.

## Key Routes

- Home: `/`
- Auth: `/login`, `/register`
- Dashboard: `/dashboard`
  - Sender overview: `/dashboard/sender`
  - Receiver overview: `/dashboard/receiver`
  - Admin overview: `/dashboard/admin`
  - Sender parcels: `/dashboard/parcel/sender`
  - Receiver parcels: `/dashboard/parcel/receiver`
  - Admin parcels: `/dashboard/parcel/admin`
  - Users (admin): `/dashboard/user`

Route configuration: `src/routes/index.routes.tsx`

## State & Data Layer

- Store: `src/redux/store.ts` (injects `authApi` and `parcelApi`)
- Auth API: `src/redux/features/auth/auth.api.ts`
  - login, register, logout, profile, update profile, toggle block, list users, user stats
- Parcel API: `src/redux/features/parcel/parcel.api.ts`
  - create, my parcels, incoming parcels, track, cancel, confirm, list all, stats, update status, toggle status/block, delete

Both APIs use `credentials: 'include'`. Ensure backend CORS allows credentials and sets proper cookie attributes (sameSite, secure) for your environment.

## UI Patterns

Reusable Parcel Table: `src/components/common/ParcelTable.tsx`
- Supports:
  - Search on designated fields via `searchableColumns`
  - Filter dropdowns via `filterableColumns`
  - Column visibility dropdown and optional `initialHiddenColumns`
  - Pagination and sorting (TanStack Table)

Example usage (Sender, Receiver, Admin pages use the same pattern):

```tsx
<ParcelTable
  columns={columns}
  data={parcels?.data || []}
  searchableColumns={["trackingId", "type", "fromAddress", "toAddress"]}
  filterableColumns={[{
    id: "currentStatus",
    title: "Status",
    options: [
      { label: "Requested", value: "requested" },
      { label: "Approved", value: "approved" },
      { label: "Dispatched", value: "dispatched" },
      { label: "In Transit", value: "in_transit" },
      { label: "Delivered", value: "delivered" },
      { label: "Canceled", value: "canceled" },
    ],
  }]}
  initialHiddenColumns={["currentStatus"]}
/>
```

## Notable Implementation Details

- Sender Add Parcel Modal: `src/pages/Dashboard/Sender/AddParcelModal.tsx`
  - When selecting a receiver by phone, the receiver `_id` is captured and submitted alongside `name` and `phone`.
- Status Updates (Admin): `src/pages/Dashboard/Admin/UpdateParcelStatusModal.tsx`
  - Admin can mutate parcel status with optional note/location.
- Auth in Navbar: `src/components/layouts/Navbar/Navbar.tsx` integrates logout + profile.

## Project Structure (high-level)

- `src/components` – Common and UI components (table, dialogs, inputs, etc.)
- `src/layouts` – MainLayout and DashboardLayout wrappers
- `src/pages` – Home, Dashboard pages (Sender/Receiver/Admin), Auth, etc.
- `src/redux` – RTK store and API slices (auth, parcel)
- `src/routes` – Router configuration
- `src/types` – Shared TypeScript types

## Troubleshooting

- If global search in ParcelTable doesn’t update, ensure you’re passing `searchableColumns` and that fields exist on the row model.
- For filters on hidden fields (like `currentStatus`), add a matching accessor in `columns` and hide it via `initialHiddenColumns`.
- Cookie auth issues usually stem from backend CORS/cookie settings when using `credentials: 'include'`.

## Scripts

- `dev`: start Vite dev server
- `build`: type-check and build for production
- `preview`: preview production build
- `lint`: run ESLint

## License

This project is for educational/demo purposes. Add a license if you intend to distribute.
