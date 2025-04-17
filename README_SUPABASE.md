# Supabase Setup Instructions

This application uses Supabase for authentication and database storage. Follow these steps to set up Supabase for this project.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in.
2. Create a new project and note your project URL and anon key.

## 2. Update Configuration

1. Open `lib/supabase.ts` and update the `supabaseUrl` and `supabaseAnonKey` values with your project's URL and anon key.

## 3. Set Up Database Schema

1. In the Supabase dashboard, go to the SQL Editor.
2. Copy the contents of `db/schema.sql` and execute it to set up the users table and related functions.

## 4. Configure Authentication

1. In the Supabase dashboard, go to Authentication → Settings.
2. Under Email Auth, make sure "Enable Email Confirmations" is **disabled** for development (you can enable it for production later).
3. Customize the Site URL and Redirect URLs if needed (especially for password resets).

## 5. Testing Authentication

Once everything is set up:

1. You can create a new user by signing up with email/password
2. The user data will be stored in both the `auth.users` and `public.users` tables
3. Login should work with the created credentials
4. Password reset emails will be sent to the provided email address

## Row Level Security (RLS)

The schema includes Row Level Security policies to ensure users can only:
- Read their own profile data
- Update their own profile information

The schema also includes a trigger that automatically creates a user record in the `public.users` table when a new authentication user is created.

## JWT Authentication

This application uses Supabase's JWT auth system:
- JWTs are automatically created on login and managed by Supabase client
- Tokens are stored securely in AsyncStorage
- Tokens are automatically refreshed when needed
- Sessions can be managed through the auth state change listener 