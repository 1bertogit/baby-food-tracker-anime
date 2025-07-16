-- This is the initial schema migration for the Baby Food Tracker application

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create food_items table
CREATE TABLE IF NOT EXISTS public.food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  tested BOOLEAN DEFAULT false,
  test_date TIMESTAMP,
  accepted VARCHAR(10),
  acceptance_notes TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) NOT NULL
);

-- Create allergy_tests table
CREATE TABLE IF NOT EXISTS public.allergy_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  tested BOOLEAN DEFAULT false,
  test_date TIMESTAMP,
  result VARCHAR(20),
  severity VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) NOT NULL
);

-- Create supplements table
CREATE TABLE IF NOT EXISTS public.supplements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  taken BOOLEAN DEFAULT false,
  last_taken TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) NOT NULL
);

-- Create todos table
CREATE TABLE IF NOT EXISTS public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  priority VARCHAR(20),
  category VARCHAR(50),
  due_time VARCHAR(10),
  is_auto_generated BOOLEAN DEFAULT false,
  related_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) NOT NULL
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_week INTEGER DEFAULT 1,
  current_day INTEGER DEFAULT 1,
  current_month INTEGER DEFAULT 6,
  show_tutorial BOOLEAN DEFAULT true,
  tutorial_step INTEGER DEFAULT 0,
  is_first_access BOOLEAN DEFAULT true,
  consulta_inicial TIMESTAMP,
  proxima_consulta TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  UNIQUE(user_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allergy_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for food_items
CREATE POLICY "Users can view their own food items" 
ON public.food_items FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food items" 
ON public.food_items FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food items" 
ON public.food_items FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food items" 
ON public.food_items FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for allergy_tests
CREATE POLICY "Users can view their own allergy tests" 
ON public.allergy_tests FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own allergy tests" 
ON public.allergy_tests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own allergy tests" 
ON public.allergy_tests FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own allergy tests" 
ON public.allergy_tests FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for supplements
CREATE POLICY "Users can view their own supplements" 
ON public.supplements FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own supplements" 
ON public.supplements FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own supplements" 
ON public.supplements FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own supplements" 
ON public.supplements FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for todos
CREATE POLICY "Users can view their own todos" 
ON public.todos FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own todos" 
ON public.todos FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos" 
ON public.todos FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos" 
ON public.todos FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for user_settings
CREATE POLICY "Users can view their own settings" 
ON public.user_settings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" 
ON public.user_settings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
ON public.user_settings FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings" 
ON public.user_settings FOR DELETE 
USING (auth.uid() = user_id);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at column
CREATE TRIGGER update_food_items_modtime
BEFORE UPDATE ON public.food_items
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_allergy_tests_modtime
BEFORE UPDATE ON public.allergy_tests
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_supplements_modtime
BEFORE UPDATE ON public.supplements
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_todos_modtime
BEFORE UPDATE ON public.todos
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_user_settings_modtime
BEFORE UPDATE ON public.user_settings
FOR EACH ROW EXECUTE PROCEDURE update_modified_column(); 