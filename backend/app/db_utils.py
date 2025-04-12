"""
Shared database utilities for the application.
This module provides a centralized way to access the Supabase client.
"""
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if SUPABASE_URL == None or SUPABASE_KEY == None:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in .env file")

# Create the Supabase client
supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)
