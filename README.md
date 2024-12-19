# Cryptocurrency Tracker

A modern, responsive cryptocurrency tracker built with **Next.js**. This application allows users to monitor real-time cryptocurrency prices, trends, and other key market data, with features for filtering, searching, and bookmarking favorite currencies.

---

### Features


- 🔍 **Search & Filter**: Quickly find and filter cryptocurrencies by name, market cap, or price.

- 📊 **Detailed Insights**: View in-depth data, Info on the cryptocurrency.
- 🌐 **Responsive Design**: Fully optimized for desktop.

---

### Upcoming Features

- 📈 **Live Price Tracking**: Real-time updates for the top cryptocurrencies.
- ⭐ **Favorites**: Bookmark and easily access your favorite cryptocurrencies.
- 📊 **Charts/Visualisations**: including price charts, trading volume, and historical trends.
- **Mobile Friendly**: Resonsive for mobile devices.

### Tech Stack

- **Frontend:** Next.js, React.js, Tailwind CSS
- **Backend:** APIs from [CoinGecko](https://www.coingecko.com/) 
- **State Management:** Context API / Redux (to be decided)
- **Styling:** Tailwind CSS

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
   ```

---

### Project Structure

```
crypto-tracker/
├── public/              # Static assets like images and icons
├── src/
│   ├── Components/      # Reusable UI components
│   ├── crypto/          # Next.js Variable ID Page
│   ├── styles/          # Global styles and Tailwind configuration
├── .env.local           # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

### Roadmap

- [ ] Implement filtering and sorting functionality.
- [ ] Add bookmarking feature for favorite cryptocurrencies.
- [ ] Integrate live cryptocurrency price updates.
- [ ] Enhance UI/UX with Tailwind CSS.
- [ ] Deploy the app on Vercel.

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
