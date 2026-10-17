# Self-hosted backend setup

The website stores accounts, approvals, sessions, and editable site content in PostgreSQL. Uploaded images live in a private S3-compatible bucket and are served through the website's authenticated media metadata. Both services can run locally with Docker Compose, and can later be moved to a self-hosted server without changing the application's storage interfaces.

## Start the local services

Install Docker Desktop, then open PowerShell in the project directory:

```powershell
Copy-Item .env.example .env
Copy-Item .env.example .env.local
```

Edit **both** files and replace the example PostgreSQL and MinIO passwords with the same strong, unique values. Keep both files private; they are ignored by Git. Then start PostgreSQL and MinIO:

```powershell
docker compose up -d
npm install
```

The Compose configuration binds PostgreSQL and MinIO to loopback only and persists their data in Docker volumes. The MinIO bucket is private; the site API streams uploaded images to visitors.

Create the first admin account in an interactive terminal and start the app:

```powershell
npm run admin:create
npm run dev
```

The setup command prompts for a username and password and stores only a salted scrypt hash. There is no default admin credential. It refuses to create a second administrator. Sign in at `/login`, then use the admin dashboard to approve members and edit site content. New member registrations remain blocked until approved.

## Migrate the existing local database

If you already have `.aura-data/aura.sqlite` and local uploads, stop the running Next.js server. Configure `.env.local` as above, start the Compose services, and migrate **before** starting the website or creating an administrator:

```powershell
npm run backend:migrate-local
```

The importer copies existing accounts, password hashes, sessions, site content, and image files into PostgreSQL and the S3-compatible bucket. Existing users keep their passwords. The importer refuses a non-empty target database so it cannot silently overwrite or mix unrelated data; use a fresh database for migration. It does not delete or modify `.aura-data`; retain a backup until you have checked the migrated website.

If you have no previous SQLite data, skip migration. The site initializes its default content when first used; create the initial admin with `npm run admin:create`.

## Configuration

Next.js reads `.env.local`; Docker Compose reads `.env`. Both files need matching values:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `S3_ENDPOINT` | S3-compatible API endpoint; omit for AWS S3 |
| `S3_REGION` | Storage region |
| `S3_BUCKET` | Private bucket for uploads |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | Storage credentials |
| `S3_FORCE_PATH_STYLE` | Set `true` for MinIO and most self-hosted S3 services |

The local example values are only for loopback development. For a self-hosted deployment, configure the same variables in the app's private runtime environment, use a private PostgreSQL service and private bucket, rotate all example credentials, configure HTTPS, and do not expose the database or object-store ports publicly. The app server must be able to reach both services. Do not use these local development credentials on a public server.

The administrator bootstrap script and migration command use the same `DATABASE_URL` and S3 settings as the running app. Ensure those variables are available in the terminal where you run the commands.

## Backups and restore

Back up PostgreSQL and object storage independently. For example, export a PostgreSQL dump:

```powershell
docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' > aura-backup.sql
```

Use an S3-compatible backup tool such as MinIO Client (`mc`) or your storage provider's backup/snapshot feature to copy the full `aura-media` bucket to a separate location. Keep database and bucket backups together and test restores periodically. Docker volumes are persistence across restarts, not backups.

To restore the SQL dump into an empty database:

```powershell
Get-Content -Raw aura-backup.sql | docker compose exec -T postgres sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

Restore the matching bucket backup with the backup tool or storage provider before starting the app.

## Hosting and security notes

The backend can support multiple app processes when they share the same PostgreSQL database and S3-compatible storage. Before exposing it publicly, deploy behind HTTPS, set strong secrets and private network rules, configure storage/database backups and monitoring, and review rate limiting, account recovery, and operational access. Member dashboards remain placeholders; this backend provides registration, approval, login, and content management rather than department-specific task systems.
