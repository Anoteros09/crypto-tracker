# Cryptocurrency Tracker

A modern, responsive cryptocurrency tracker built with **Next.js**. This application allows users to monitor real-time cryptocurrency prices, trends, and other key market data, with features for filtering, searching, and bookmarking favorite currencies.

---

### Features

- 🌟 **Welcome Page**: Introduces the app with a sleek and engaging interface.
- 📊 **Dashboard**: Displays a table of top cryptocurrencies with details like:
  - Name, Symbol
  - Current price
  - Market cap
  - 1-hour, 24-hour, and 7-day percentage changes
- 🔍 **Detailed Insights**: Click on any cryptocurrency to view:
  - Detailed information about the coin
  - Historical price graph with customizable ranges: past 1 day, 12 hours, 6 hours, 1 hour, and 30 minutes
  - Option to bookmark the coin (if logged in)
- ⭐ **Bookmarks**: View a dedicated page of bookmarked cryptocurrencies in a grid format with:
  - Current price
  - Today's high & low
  - 1-day change percentage
  - Sparkline for quick trend visualization
- 🔒 **Authentication**: Secure user authentication and management powered by [Clerk](https://clerk.dev/).
- 🌐 **Responsive Design**: Fully optimized for desktop and mobile devices.

---

### Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **DataGrid & Charts:** Material UI
- **Backend:** Neon Serverless DB for storage
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **API:** [CoinGecko API](https://www.coingecko.com/)
- **Authentication:** [Clerk](https://clerk.dev/)
- **Hosting:** Vercel

---

### Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

4. **Set Up Environment Variables:**
   Create a `.env.local` file in the root of the project and add your API key(s):
   ```env
   NEXT_PUBLIC_CRYPTO_API_URL=https://api.coingecko.com/api/v3
   NEXT_PUBLIC_API_KEY=your_api_key_here
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here
   YOUR_DB_KEY=your_db_secret_key_here
   ...
   ```

5. **Configure Clerk:**
   - Sign up on [Clerk](https://clerk.dev/) and create a project.
   - Add your Clerk API key to the `.env.local` file as shown above.
   - Follow Clerk's documentation to integrate authentication into your Next.js app: [Clerk Documentation](https://clerk.dev/docs/nextjs).

---

### Project Structure

```
crypto-tracker/
├── public/              # Static assets like images and icons
├── src/
│   ├── bookmark/        # Bookmark Page & Routes components
│   ├── components/      # Reusable UI components
│   ├── crypto/          # Next.js dynamic routes for cryptocurrency details
│   ├── dashboard/       # Dashboard components
│   ├── store/           # State management folder using Zustand
│   ├── userinfo/        # Next.js Route Handler file for userinfo transaction with db
│   ├── utils/           # Reusable functions
├── .env.local           # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

### Roadmap

- [x] Create a welcome page with app introduction.
- [x] Implement a dashboard to display top cryptocurrencies.
- [x] Add detailed coin pages with historical price graphs.
- [x] Enable bookmarking functionality for logged-in users.
- [x] Build a bookmark page with grid view and sparklines.
- [x] Integrate secure user authentication using Clerk.
- [x] Enhance mobile responsiveness.
- [x] User configurable currency exchange type
- [ ] Globalised Loading state
- [ ] Overall smoothness & stablility

---

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For significant changes, please open an issue to discuss your ideas first.

---

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

### Connect

- 📧 [Email](mailto:anuragas09@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/anurag-shettigar)
