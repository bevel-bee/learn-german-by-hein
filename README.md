
# Together AI Chat Interface

This project is a web interface for interacting with Together AI's language models. The interface provides a clean, user-friendly chat experience similar to ChatGPT or Claude.

## Features

- Clean, responsive chat interface
- Message history with visual distinction between user and AI
- Input area with send button
- Loading states and error handling
- Prepared for backend integration

## Backend Integration

This frontend is designed to connect to a Python backend that leverages the Together AI API. The backend should implement an endpoint (e.g., `/chat`) that processes messages and returns AI responses.

### Example Python Backend (Flask)

```python
from flask import Flask, request, jsonify
from together import Together
import os

app = Flask(__name__)
client = Together(api_key=os.getenv("TOGETHER_API_KEY"))

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]
    response = client.chat.completions.create(
        model="Qwen/Qwen3-235B-A22B-fp8-tput",
        messages=[{"role": "user", "content": user_input}]
    )
    return jsonify({"reply": response.choices[0].message.content})
```

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Set up your Python backend and update the fetch URL in `src/pages/Index.tsx`

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui for UI components
- Vite for development and building

## Deployment

For the frontend, you can deploy to GitHub Pages, Vercel, or Netlify.
For the backend, services like Render.com, Railway.app, Fly.io, or Vercel Serverless Functions work well.
