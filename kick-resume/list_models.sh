#!/bin/bash
# Check if GEMINI_API_KEY2 is set in .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

curl "https://generativelanguage.googleapis.com/v1beta/models?key=$GEMINI_API_KEY2"
