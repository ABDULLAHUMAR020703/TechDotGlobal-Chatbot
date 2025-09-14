# TechDotGlobal Chatbot

A complete chatbot solution for TechDotGlobal's website, featuring a Vercel serverless proxy and a simple widget for GoDaddy integration.

## 🎯 Features

- **Secure API Proxy:** Vercel serverless function that keeps your Groq API key hidden
- **Simple Widget:** Ready-to-paste HTML/CSS/JS widget for GoDaddy
- **TechDotGlobal Branded:** Custom system prompt about your services and projects
- **Mobile Responsive:** Works on all devices
- **Error Handling:** Graceful error handling and user feedback

## 🚀 Quick Deploy

1. **Deploy to Vercel:**
   - Push to GitHub
   - Import to Vercel
   - Set `GROQ_API_KEY` environment variable
   - Deploy

2. **Update Widget:**
   - Replace API URL in `chatbot-widget.html`
   - Copy to GoDaddy HTML block

3. **Test:**
   ```bash
   curl -X POST https://your-project.vercel.app/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello!"}'
   ```

## 📁 Files

- `api/chat.js` - Vercel serverless function
- `chatbot-widget.html` - Complete widget for GoDaddy
- `package.json` - Node.js dependencies
- `DEPLOYMENT.md` - Detailed deployment instructions

## 🔧 Customization

- **System Prompt:** Edit in `api/chat.js`
- **Styling:** Modify CSS in `chatbot-widget.html`
- **API Model:** Change model in `api/chat.js` (currently `mixtral-8x7b-instruct`)

## 📞 Support

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.
