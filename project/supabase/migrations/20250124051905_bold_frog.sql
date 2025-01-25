/*
  # CV Builder Database Schema

  1. New Tables
    - `cvs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `personal_info` (jsonb)
      - `education` (jsonb[])
      - `experience` (jsonb[])
      - `skills` (jsonb[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `cvs` table
    - Add policies for authenticated users to:
      - Create their own CVs
      - Read their own CVs
      - Update their own CVs
      - Delete their own CVs
*/

CREATE TABLE IF NOT EXISTS cvs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  personal_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  education jsonb[] NOT NULL DEFAULT '{}',
  experience jsonb[] NOT NULL DEFAULT '{}',
  skills jsonb[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own CVs"
  ON cvs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own CVs"
  ON cvs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs"
  ON cvs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs"
  ON cvs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);