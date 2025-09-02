<div align="center">
  <img src="mobile/assets/images/icon.png" alt="Farming Marketplace Logo" width="120" height="120">
  
  # Farming Marketplace 🌾
  
  <p><strong>A comprehensive marketplace platform for selling and buying farming products</strong></p>
  <p>Built with React Native for mobile and Python backend</p>
</div>

## 📱 Features

- **Product Marketplace**: Browse and purchase fresh farming products
- **User Authentication**: Secure user registration and login
- **Real-time Chat**: Communicate with sellers and buyers
- **Product Management**: Add, edit, and manage farming products
- **Bank Details Integration**: Secure payment processing
- **Mobile-First Design**: Optimized for mobile devices

## 🏗️ Project Structure

```
fantastic-carnival/
├── mobile/                 # React Native app
│   ├── app/
│   │   ├── (tabs)/        # Tab navigation screens
│   │   │   ├── chat.tsx   # Chat functionality
│   │   │   └── marketplace.tsx # Main marketplace
│   │   └── data/          # Static data files
│   └── assets/            # Images and fonts
├── backend/               # Python backend
│   ├── src/
│   │   ├── model/         # Data models and RAG service
│   │   ├── user/          # User management
│   │   ├── chat/          # Chat functionality
│   │   ├── marketplace/   # Product marketplace
│   │   ├── bank_details/  # Payment processing
│   │   └── home/          # Home routes
│   └── requirements.txt   # Python dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- Expo CLI
- Git

### Mobile App Setup

1. Navigate to the mobile directory:

   ```bash
   cd mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo development server:

   ```bash
   npx expo start
   ```

4. Use Expo Go app on your phone or run on an emulator

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   ```bash
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

4. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Run the backend server:
   ```bash
   python src/main.py
   ```

## 🛠️ Tech Stack

### Mobile App

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **TypeScript** - Type-safe JavaScript
- **NativeWind** - Tailwind CSS for React Native
- **React Navigation** - Navigation library

### Backend

- **Python** - Server-side programming
- **Flask/FastAPI** - Web framework (based on your setup)
- **RAG Service** - Retrieval-Augmented Generation for AI features
- **SQLite/PostgreSQL** - Database (configure as needed)

## 📦 Key Features Breakdown

### Marketplace

- Browse farming products with images and descriptions
- Search and filter products
- View detailed product information
- Add products to cart
- Secure checkout process

### User Management

- User registration and authentication
- Profile management
- Seller dashboard for product management

### Chat System

- Real-time messaging between buyers and sellers
- Product inquiry support
- Order status updates

### Payment Integration

- Secure bank details management
- Payment processing
- Transaction history

## 🔧 Configuration

1. **Environment Variables**: Create `.env` files for both mobile and backend
2. **Database**: Configure your preferred database in the backend
3. **Payment Gateway**: Set up your payment provider credentials
4. **Push Notifications**: Configure for order updates

## 👥 Team

- **Mobile App Development**: Krish Debanjan Rohit
- **Backend Development**: Ahana Arnab Jit

## 🚀 Deployment

### Mobile App

- Use `expo build` for production builds
- Deploy to App Store and Google Play Store

### Backend

- Deploy to cloud platforms (AWS, Heroku, DigitalOcean)
- Set up CI/CD pipelines
- Configure production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

If you encounter any issues, please create an issue on GitHub with:

- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📞 Support

For support and questions, please contact the development team or create an issue on GitHub.
