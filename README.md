# Vānix 🎧 - Real-Time Audio Rooms

Vānix is a real-time audio room application built with **Vite + React + TypeScript** for the frontend and **Node.js + TypeScript** for the backend. It leverages **Stream API** for seamless audio communication.

## 🚀 Features
- Create and join audio rooms
- Real-time participant updates
- Permission request handling
- Secure authentication with cookies
- Stream API integration for smooth communication

## 🛠️ Tech Stack
### Frontend
- ⚡ **Vite + React + TypeScript**
- 🎨 **CSS** for styling
- 🔊 **@stream-io/video-react-sdk** for real-time audio rooms

### Backend
- 🏗️ **Node.js + TypeScript**
- 🔐 **Stream Chat API** for authentication
- 🍪 **Universal Cookies** for session handling
- 🌍 **dotenv** for environment variables
- 🔒 **CryptoJS** for hashing room names securely

## 📦 Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-repo/vanix.git
cd vanix
```

### 2️⃣ Install dependencies
#### Frontend
```bash
cd frontend
npm install
```
#### Backend
```bash
cd Backend
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file in the **backend** directory and add:
```
STREAM_API_KEY=your_api_key
STREAM_API_SECRET=your_api_secret
```

### 4️⃣ Run the application
#### Start the backend
```bash
cd backend
npx nodemon
```
#### Start the frontend
```bash
cd frontend
npm run dev
```

## Screenshots

![Screenshot 2025-03-26 022347](https://github.com/user-attachments/assets/9bc07547-3769-4b08-a8a5-d2c1ca3a4627)
![Screenshot 2025-03-26 024352](https://github.com/user-attachments/assets/ba6f9825-7d84-41f8-ab34-540464ad60fe)
![Screenshot 2025-03-26 024324](https://github.com/user-attachments/assets/dfd16463-8775-4aca-8a1e-0eb50d947179)
![Screenshot 2025-03-26 023639](https://github.com/user-attachments/assets/a0087b37-33d3-4298-a9a2-f9227b81663c)
![Screenshot 2025-03-26 024408](https://github.com/user-attachments/assets/2319f349-2f94-42b4-bd10-497bdbbfc08f)



## 🎯 Usage
1. **Sign in** with a username & name and get a random avatar.
2. **Create an audio room** and add a description.
3. **Join existing rooms** and communicate in real-time.
4. **Request permissions** for speaking when necessary.

---
💡 *Built with passion and Stream API.*

