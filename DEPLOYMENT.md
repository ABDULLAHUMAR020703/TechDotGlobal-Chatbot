# TechDotGlobal Chatbot Deployment Instructions

## 🚀 Quick Start

### 1. Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial TechDotGlobal chatbot setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/techdotglobal-chatbot.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Node.js project

3. **Set Environment Variable:**
   - In Vercel dashboard, go to your project
   - Navigate to Settings → Environment Variables
   - Add: `GROQ_API_KEY` = `your_groq_api_key_here`
   - Make sure it's enabled for Production, Preview, and Development

4. **Deploy:**
   - Click "Deploy" (or it will auto-deploy)
   - Wait for deployment to complete
   - Copy your deployment URL (e.g., `https://your-project-name.vercel.app`)

### 2. Update Widget with Your URL

1. **Open `chatbot-widget.html`**
2. **Find this line (around line 200):**
   ```javascript
   const API_URL = 'https://your-project-name.vercel.app/api/chat';
   ```
3. **Replace with your actual Vercel URL:**
   ```javascript
   const API_URL = 'https://your-actual-project-name.vercel.app/api/chat';
   ```

### 3. Test the Proxy

**Test with curl:**
```bash
curl -X POST https://your-project-name.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, what services does TechDotGlobal offer?"}'
```

**Expected response:**
```json
{
  "message": "TechDotGlobal offers a range of AI/ML services and custom software development solutions...",
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

### 4. Add to GoDaddy

1. **Copy the entire content of `chatbot-widget.html`**
2. **In GoDaddy Website Builder:**
   - Go to your website editor
   - Add an HTML block
   - Paste the entire widget code
   - Save and publish

3. **Alternative - Add to existing HTML:**
   - Copy only the `<style>`, `<div class="chatbot-container">`, and `<script>` sections
   - Paste before the closing `</body>` tag of your existing website

## 🔧 Configuration

### System Prompt Customization

To modify the chatbot's behavior, edit the `systemPrompt` variable in `api/chat.js`:

```javascript
const systemPrompt = `Your custom prompt here...`;
```

### Styling Customization

The widget uses inline CSS in `chatbot-widget.html`. Key customization points:

- **Colors:** Change the gradient colors in `.chat-button` and `.chat-header`
- **Position:** Modify `.chatbot-container` positioning
- **Size:** Adjust `.chat-window` dimensions

## 🧪 Testing

### Local Development

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Run locally:**
   ```bash
   vercel dev
   ```

3. **Test locally:**
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Test message"}'
   ```

### Production Testing

1. **Test the API endpoint directly**
2. **Test the widget on your GoDaddy site**
3. **Verify CORS is working (no console errors)**

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure your Vercel URL is correct in the widget
   - Check that the API endpoint is accessible

2. **API Key Issues:**
   - Verify `GROQ_API_KEY` is set in Vercel environment variables
   - Check Vercel logs for authentication errors

3. **Widget Not Appearing:**
   - Check browser console for JavaScript errors
   - Ensure the HTML is properly pasted into GoDaddy

4. **Slow Responses:**
   - This is normal for AI responses (2-5 seconds)
   - Consider adding a loading indicator (already included)

### Debug Mode

Add this to your widget's JavaScript for debugging:

```javascript
// Add after const API_URL = '...'
console.log('Chatbot API URL:', API_URL);
```

## 📝 File Structure

```
techdotglobal-chatbot/
├── api/
│   └── chat.js              # Vercel serverless function
├── package.json             # Node.js dependencies
├── .gitignore              # Git ignore rules
├── chatbot-widget.html     # Complete widget for GoDaddy
└── DEPLOYMENT.md           # This file
```

## 🔐 Security Notes

- ✅ API key is hidden in environment variables
- ✅ CORS is properly configured
- ✅ Input validation and error handling included
- ✅ No sensitive data exposed in frontend

## 📞 Support

For issues with:
- **Vercel deployment:** Check Vercel documentation
- **Groq API:** Check Groq documentation
- **GoDaddy integration:** Check GoDaddy support
- **Widget customization:** Modify the HTML/CSS as needed
