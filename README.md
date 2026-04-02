# AI Placement Test - Frontend Assessment

A modern, responsive frontend application for an AI Placement Test with real-time result polling and state management.

## 🎯 Features

- ✅ **Test Submission** - Answer 5 multiple-choice questions with client-side validation
- 📊 **Real-time Polling** - Automatic result retrieval with progress indication
- 🎓 **Result Display** - Score, proficiency level, and certificate download
- 🎨 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ⚡ **Type-Safe** - Full TypeScript support
- 🎪 **UX Polish** - Loading states, animations, and error handling

## 🏗️ Project Structure

```
app/
├── api/
│   └── placement-test/
│       ├── submit/route.ts    # POST endpoint to submit answers
│       └── result/route.ts     # GET endpoint to retrieve results
├── layout.tsx                   # Root layout with metadata
├── page.tsx                     # Main page (renders TestContainer)
└── globals.css                  # Global styles

components/
├── TestContainer.tsx            # Main orchestrator component
├── TestSubmissionForm.tsx       # Question display and answer selection
└── ResultDisplay.tsx            # Result view with score and certificate

lib/
├── types.ts                     # TypeScript interface definitions
├── questions.ts                 # Mock question database
└── utils/                       # Utility functions (if needed)

public/                          # Static assets
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Manual Testing Checklist

- [ ] Submit test with all questions answered
- [ ] See loading state while processing
- [ ] View final result with score >= 60%
- [ ] Download certificate PDF
- [ ] Try restarting the test
- [ ] Test on mobile using DevTools
- [ ] Test validation by trying to submit without answering

## 📱 API Endpoints

### Submit Test Answers

**POST** `/api/placement-test/submit`

Request body:

```json
{
  "answers": {
    "q1": "Hyper Text Markup Language",
    "q2": "React",
    "q3": "To style and layout web pages",
    "q4": "GET",
    "q5": "A superset of JavaScript with static typing"
  }
}
```

Response:

```json
{
  "taskId": "task_1234567890_abc123def",
  "status": "processing",
  "message": "Your test has been submitted. Processing your answers..."
}
```

### Get Result

**GET** `/api/placement-test/result?taskId=task_1234567890_abc123def`

Response (processing):

```json
{
  "taskId": "task_1234567890_abc123def",
  "status": "processing",
  "message": "Still processing your answers. Please wait..."
}
```

Response (completed):

```json
{
  "taskId": "task_1234567890_abc123def",
  "status": "completed",
  "score": 85,
  "level": "advanced",
  "certificateUrl": "/certificates/cert_task_1234567890_abc123def.pdf",
  "message": "Test completed! You scored 85% and achieved advanced level."
}
```

## 🎨 Component Architecture

### TestContainer

Main orchestrator that manages:

- View state (test vs result)
- Submission flow
- Result polling logic

### TestSubmissionForm

Displays questions and handles:

- Answer selection
- Client-side validation
- Form submission

### ResultDisplay

Shows results with:

- Loading/processing state
- Final score and level
- Certificate information
- Restart functionality

## 🔄 State Management Flow

```
[Initial: Test Form]
    ↓ (Submit answers)
[Submitting state]
    ↓ (API responds with taskId)
[Result: Processing state]
    ↓ (Poll API every 1.5s)
[Result: Completed with score]
    ↓ (User can Restart)
[Back to Test Form]
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

1. **Connect repository to Vercel**

   ```bash
   vercel
   ```

2. **Deploy**
   ```bash
   vercel deploy --prod
   ```

Or use GitHub integration:

- Push to main branch
- Vercel automatically builds and deploys

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js runtime
- **Deployment**: Vercel

## 📋 Features Yet to Implement

Consider adding:

- [ ] Database integration for real result storage
- [ ] Authentication & user accounts
- [ ] Email notifications when results ready
- [ ] Results history page
- [ ] Leaderboard
- [ ] Analytics dashboard
- [ ] Question randomization
- [ ] Difficulty levels

## 🚨 Known Limitations

- Results are mock-generated (random scores)
- Questions are hardcoded
- No persistent storage (data lost on refresh)
- No authentication required

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 Environment Variables

| Variable                            | Type    | Default                 | Description            |
| ----------------------------------- | ------- | ----------------------- | ---------------------- |
| `NEXT_PUBLIC_API_BASE_URL`          | string  | `http://localhost:3000` | API base URL           |
| `NEXT_PUBLIC_ENABLE_RESULT_POLLING` | boolean | `true`                  | Enable result polling  |
| `NEXT_PUBLIC_POLL_INTERVAL_MS`      | number  | `1500`                  | Polling interval in ms |

## 🐛 Troubleshooting

### Results keep loading forever

- Check browser console for errors
- Verify API routes are working: Open `http://localhost:3000/api/placement-test/result?taskId=test`
- Clear browser cache and restart dev server

### Tailwind styles not applying

- Ensure `npm run dev` is running
- Clear `.next` folder: `rm -rf .next && npm run dev`
- Check `postcss.config.mjs` and `tailwind.config.js` exist

### TypeScript errors

- Run `npm install` to ensure all dependencies are present
- Check `tsconfig.json` for path aliases configuration

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as part of EZclass Frontend Technical Assessment

---

**Need help?** Check the [Next.js documentation](https://nextjs.org/docs) or open an issue!
# test-frontend
