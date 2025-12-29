#!/bin/bash
curl -X POST http://localhost:3000/api/generate-resume \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "I am a software engineer with experience in React and Node.js.",
    "existingResume": {
      "name": "John Doe",
      "role": "Developer",
      "experience": []
    }
  }'
