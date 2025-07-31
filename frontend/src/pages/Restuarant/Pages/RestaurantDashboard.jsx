import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  Search,
  Star,
  Clock,
  Users,
  TrendingUp,
  Filter,
  Menu,
  X,
  Receipt,
  Home,
  Package,
  Car,
  Printer,
  Check,
  CreditCard,
  Banknote,
  ArrowRight,
  Mic, 
  MicOff,
  Volume2,
  Bed,
} from "lucide-react";
import { motion } from "framer-motion";
const RestaurantPOS = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("Chinese");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showKOTModal, setShowKOTModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderType, setOrderType] = useState("dine-in");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    tableNumber: "10"
  });
  const [roomDetails, setRoomDetails] = useState({
    roomno: '',
    guestName: '',
  });
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1001);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cuisines = [
    { name: "Indian", icon: "🇮🇳", color: "#f97316" },
    { name: "Chinese", icon: "🇨🇳", color: "#ef4444" },
    { name: "Japanese", icon: "🇯🇵", color: "#ec4899" },
    { name: "Mexican", icon: "🇲🇽", color: "#eab308" },
    { name: "Italian", icon: "🇮🇹", color: "#22c55e" },
    { name: "Thai", icon: "🇹🇭", color: "#3b82f6" },
  ];

  const categoryByCuisine = {
    Indian: [
      { name: "All", icon: "🍽️" },
      { name: "Curries", icon: "🍛" },
      { name: "Biryani", icon: "🍚" },
      { name: "Breads", icon: "🫓" },
      { name: "Snacks", icon: "🥘" },
      { name: "Desserts", icon: "🍮" },
      { name: "Beverages", icon: "🍵" },
    ],
    Chinese: [
      { name: "All", icon: "🍽️" },
      { name: "Noodles", icon: "🍜" },
      { name: "Fried Rice", icon: "🍚" },
      { name: "Dim Sum", icon: "🥟" },
      { name: "Stir Fry", icon: "🥢" },
      { name: "Soups", icon: "🍲" },
      { name: "Appetizers", icon: "🥠" },
      { name: "Desserts", icon: "🥮" },
      { name: "Beverages", icon: "🍵" },
    ],
    Japanese: [
      { name: "All", icon: "🍽️" },
      { name: "Sushi", icon: "🍣" },
      { name: "Ramen", icon: "🍜" },
      { name: "Tempura", icon: "🍤" },
      { name: "Bento", icon: "🍱" },
      { name: "Beverages", icon: "🍵" },
    ],
    Mexican: [
      { name: "All", icon: "🍽️" },
      { name: "Tacos", icon: "🌮" },
      { name: "Burritos", icon: "🌯" },
      { name: "Quesadillas", icon: "🧀" },
      { name: "Beverages", icon: "🥤" },
    ],
    Italian: [
      { name: "All", icon: "🍽️" },
      { name: "Pizza", icon: "🍕" },
      { name: "Pasta", icon: "🍝" },
      { name: "Salads", icon: "🥗" },
      { name: "Beverages", icon: "🥤" },
    ],
    Thai: [
      { name: "All", icon: "🍽️" },
      { name: "Curries", icon: "🍛" },
      { name: "Stir Fry", icon: "🥘" },
      { name: "Soups", icon: "🍲" },
      { name: "Beverages", icon: "🥤" },
    ],
  };

  const menuItems = {
    Indian: [
      // Biryani Varieties
      {
        id: 1,
        name: "Chicken Biryani",
        price: 350,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.8,
        time: "25 min",
      },
      {
        id: 2,
        name: "Mutton Biryani",
        price: 450,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.9,
        time: "30 min",
      },
      {
        id: 3,
        name: "Veg Biryani",
        price: 280,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.5,
        time: "20 min",
      },
      {
        id: 4,
        name: "Hyderabadi Biryani",
        price: 420,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.7,
        time: "35 min",
      },

      // Curry Dishes
      {
        id: 5,
        name: "Butter Chicken",
        price: 380,
        image: "🍗",
        category: "Curry Dishes",
        rating: 4.8,
        time: "20 min",
      },
      {
        id: 6,
        name: "Dal Makhani",
        price: 220,
        image: "🍲",
        category: "Curry Dishes",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 7,
        name: "Paneer Butter Masala",
        price: 280,
        image: "🧀",
        category: "Curry Dishes",
        rating: 4.5,
        time: "18 min",
      },
      {
        id: 8,
        name: "Fish Curry",
        price: 350,
        image: "🐟",
        category: "Curry Dishes",
        rating: 4.7,
        time: "22 min",
      },

      // Chicken Varieties
      {
        id: 9,
        name: "Tandoori Chicken",
        price: 420,
        image: "🍗",
        category: "Chicken Varieties",
        rating: 4.8,
        time: "25 min",
      },
      {
        id: 10,
        name: "Chicken Tikka",
        price: 320,
        image: "🍢",
        category: "Chicken Varieties",
        rating: 4.7,
        time: "18 min",
      },
      {
        id: 11,
        name: "Chicken 65",
        price: 280,
        image: "🍗",
        category: "Chicken Varieties",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 12,
        name: "Chicken Korma",
        price: 350,
        image: "🍗",
        category: "Chicken Varieties",
        rating: 4.5,
        time: "20 min",
      },

      // Snacks & Appetizers
      {
        id: 13,
        name: "Samosa",
        price: 80,
        image: "🥟",
        category: "Snacks & Appetizers",
        rating: 4.4,
        time: "10 min",
      },
      {
        id: 14,
        name: "Pakoras",
        price: 120,
        image: "🥔",
        category: "Snacks & Appetizers",
        rating: 4.3,
        time: "12 min",
      },
      {
        id: 15,
        name: "Chaat",
        price: 100,
        image: "🥗",
        category: "Snacks & Appetizers",
        rating: 4.5,
        time: "8 min",
      },
      {
        id: 16,
        name: "Kebabs",
        price: 200,
        image: "🍢",
        category: "Snacks & Appetizers",
        rating: 4.7,
        time: "15 min",
      },

      // Meals & Thali
      {
        id: 17,
        name: "Veg Thali",
        price: 250,
        image: "🍽️",
        category: "Meals & Thali",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 18,
        name: "Non-Veg Thali",
        price: 350,
        image: "🍽️",
        category: "Meals & Thali",
        rating: 4.8,
        time: "20 min",
      },
      {
        id: 19,
        name: "South Indian Meals",
        price: 280,
        image: "🍽️",
        category: "Meals & Thali",
        rating: 4.5,
        time: "18 min",
      },

      // Bread & Rice
      {
        id: 20,
        name: "Butter Naan",
        price: 60,
        image: "🫓",
        category: "Bread & Rice",
        rating: 4.4,
        time: "8 min",
      },
      {
        id: 21,
        name: "Garlic Naan",
        price: 80,
        image: "🫓",
        category: "Bread & Rice",
        rating: 4.5,
        time: "10 min",
      },
      {
        id: 22,
        name: "Jeera Rice",
        price: 120,
        image: "🍚",
        category: "Bread & Rice",
        rating: 4.3,
        time: "12 min",
      },

      // Desserts
      {
        id: 23,
        name: "Gulab Jamun",
        price: 120,
        image: "🍮",
        category: "Desserts",
        rating: 4.6,
        time: "5 min",
      },
      {
        id: 24,
        name: "Ras Malai",
        price: 140,
        image: "🍰",
        category: "Desserts",
        rating: 4.8,
        time: "5 min",
      },
      {
        id: 25,
        name: "Kulfi",
        price: 100,
        image: "🍦",
        category: "Desserts",
        rating: 4.5,
        time: "5 min",
      },

      // Beverages
      {
        id: 26,
        name: "Masala Chai",
        price: 40,
        image: "☕",
        category: "Beverages",
        rating: 4.5,
        time: "5 min",
      },
      {
        id: 27,
        name: "Mango Lassi",
        price: 80,
        image: "🥭",
        category: "Beverages",
        rating: 4.4,
        time: "5 min",
      },
      {
        id: 28,
        name: "Fresh Lime Soda",
        price: 60,
        image: "🍋",
        category: "Beverages",
        rating: 4.3,
        time: "3 min",
      },
    ],
        Japanese: [
      // Sushi
      {
        id: 41,
        name: "California Roll",
        price: 320,
        image: "🍣",
        category: "Sushi",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 42,
        name: "Salmon Sashimi",
        price: 450,
        image: "🍣",
        category: "Sushi",
        rating: 4.8,
        time: "10 min",
      },
      {
        id: 43,
        name: "Tuna Roll",
        price: 380,
        image: "🍣",
        category: "Sushi",
        rating: 4.7,
        time: "12 min",
      },

      // Ramen
      {
        id: 44,
        name: "Tonkotsu Ramen",
        price: 350,
        image: "🍜",
        category: "Ramen",
        rating: 4.8,
        time: "20 min",
      },
      {
        id: 45,
        name: "Miso Ramen",
        price: 320,
        image: "🍜",
        category: "Ramen",
        rating: 4.6,
        time: "18 min",
      },
      {
        id: 46,
        name: "Shoyu Ramen",
        price: 300,
        image: "🍜",
        category: "Ramen",
        rating: 4.5,
        time: "16 min",
      },

      // Tempura
      {
        id: 47,
        name: "Prawn Tempura",
        price: 380,
        image: "🍤",
        category: "Tempura",
        rating: 4.7,
        time: "15 min",
      },
      {
        id: 48,
        name: "Vegetable Tempura",
        price: 250,
        image: "🥕",
        category: "Tempura",
        rating: 4.4,
        time: "12 min",
      },

      // Bento
      {
        id: 49,
        name: "Chicken Teriyaki Bento",
        price: 420,
        image: "🍱",
        category: "Bento",
        rating: 4.6,
        time: "20 min",
      },
      {
        id: 50,
        name: "Salmon Bento",
        price: 480,
        image: "🍱",
        category: "Bento",
        rating: 4.8,
        time: "22 min",
      },
    ],
    Mexican: [
      // Tacos
      {
        id: 51,
        name: "Chicken Tacos",
        price: 250,
        image: "🌮",
        category: "Tacos",
        rating: 4.5,
        time: "12 min",
      },
      {
        id: 52,
        name: "Beef Tacos",
        price: 280,
        image: "🌮",
        category: "Tacos",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 53,
        name: "Fish Tacos",
        price: 300,
        image: "🌮",
        category: "Tacos",
        rating: 4.7,
        time: "18 min",
      },

      // Burritos
      {
        id: 54,
        name: "Chicken Burrito",
        price: 320,
        image: "🌯",
        category: "Burritos",
        rating: 4.5,
        time: "15 min",
      },
      {
        id: 55,
        name: "Beef Burrito",
        price: 350,
        image: "🌯",
        category: "Burritos",
        rating: 4.6,
        time: "18 min",
      },
      {
        id: 56,
        name: "Veggie Burrito",
        price: 280,
        image: "🌯",
        category: "Burritos",
        rating: 4.4,
        time: "12 min",
      },

      // Quesadillas
      {
        id: 57,
        name: "Cheese Quesadilla",
        price: 200,
        image: "🧀",
        category: "Quesadillas",
        rating: 4.3,
        time: "10 min",
      },
      {
        id: 58,
        name: "Chicken Quesadilla",
        price: 280,
        image: "🧀",
        category: "Quesadillas",
        rating: 4.5,
        time: "15 min",
      },

      // Nachos
      {
        id: 59,
        name: "Loaded Nachos",
        price: 320,
        image: "🌽",
        category: "Nachos",
        rating: 4.6,
        time: "12 min",
      },
      {
        id: 60,
        name: "Cheese Nachos",
        price: 220,
        image: "🌽",
        category: "Nachos",
        rating: 4.4,
        time: "8 min",
      },
    ],
    Italian: [
      // Pizza
      {
        id: 61,
        name: "Margherita Pizza",
        price: 350,
        image: "🍕",
        category: "Pizza",
        rating: 4.5,
        time: "20 min",
      },
      {
        id: 62,
        name: "Pepperoni Pizza",
        price: 420,
        image: "🍕",
        category: "Pizza",
        rating: 4.7,
        time: "22 min",
      },
      {
        id: 63,
        name: "Veggie Supreme",
        price: 380,
        image: "🍕",
        category: "Pizza",
        rating: 4.4,
        time: "25 min",
      },

      // Pasta
      {
        id: 64,
        name: "Spaghetti Carbonara",
        price: 320,
        image: "🍝",
        category: "Pasta",
        rating: 4.6,
        time: "18 min",
      },
      {
        id: 65,
        name: "Penne Arrabbiata",
        price: 280,
        image: "🍝",
        category: "Pasta",
        rating: 4.5,
        time: "16 min",
      },
      {
        id: 66,
        name: "Fettuccine Alfredo",
        price: 350,
        image: "🍝",
        category: "Pasta",
        rating: 4.7,
        time: "20 min",
      },

      // Risotto
      {
        id: 67,
        name: "Mushroom Risotto",
        price: 380,
        image: "🍚",
        category: "Risotto",
        rating: 4.6,
        time: "25 min",
      },
      {
        id: 68,
        name: "Seafood Risotto",
        price: 450,
        image: "🍚",
        category: "Risotto",
        rating: 4.8,
        time: "28 min",
      },
    ],
    Thai: [
      // Curry
      {
        id: 69,
        name: "Green Curry",
        price: 280,
        image: "🍛",
        category: "Curry",
        rating: 4.6,
        time: "18 min",
      },
      {
        id: 70,
        name: "Red Curry",
        price: 300,
        image: "🍛",
        category: "Curry",
        rating: 4.7,
        time: "20 min",
      },
      {
        id: 71,
        name: "Massaman Curry",
        price: 320,
        image: "🍛",
        category: "Curry",
        rating: 4.5,
        time: "22 min",
      },

      // Pad Thai
      {
        id: 72,
        name: "Chicken Pad Thai",
        price: 250,
        image: "🍜",
        category: "Pad Thai",
        rating: 4.5,
        time: "15 min",
      },
      {
        id: 73,
        name: "Prawn Pad Thai",
        price: 300,
        image: "🍜",
        category: "Pad Thai",
        rating: 4.6,
        time: "18 min",
      },

      // Stir Fry
      {
        id: 74,
        name: "Basil Chicken",
        price: 220,
        image: "🥢",
        category: "Stir Fry",
        rating: 4.4,
        time: "12 min",
      },
      {
        id: 75,
        name: "Cashew Chicken",
        price: 280,
        image: "🥢",
        category: "Stir Fry",
        rating: 4.6,
        time: "15 min",
      },
    ], Indian: [
      // Biryani Varieties
      {
        id: 1,
        name: "Chicken Biryani",
        price: 350,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.8,
        time: "25 min",
      },
      {
        id: 2,
        name: "Mutton Biryani",
        price: 450,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.9,
        time: "30 min",
      },
      {
        id: 3,
        name: "Veg Biryani",
        price: 280,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.5,
        time: "20 min",
      },
      {
        id: 4,
        name: "Hyderabadi Biryani",
        price: 420,
        image: "🍛",
        category: "Biryani Varieties",
        rating: 4.7,
        time: "35 min",
      },

      // Curry Dishes
      {
        id: 5,
        name: "Butter Chicken",
        price: 380,
        image: "🍗",
        category: "Curry Dishes",
        rating: 4.8,
        time: "20 min",
      },
      {
        id: 6,
        name: "Dal Makhani",
        price: 220,
        image: "🍲",
        category: "Curry Dishes",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 7,
        name: "Paneer Butter Masala",
        price: 280,
        image: "🧀",
        category: "Curry Dishes",
        rating: 4.5,
        time: "18 min",
      },
      {
        id: 8,
        name: "Fish Curry",
        price: 350,
        image: "🐟",
        category: "Curry Dishes",
        rating: 4.7,
        time: "22 min",
      },

      // Chicken Varieties
      {
        id: 9,
        name: "Tandoori Chicken",
        price: 420,
        image: "🍗",
        category: "Chicken Varieties",
        rating: 4.8,
        time: "25 min",
      },
      {
        id: 10,
        name: "Chicken Tikka",
        price: 320,
        image: "🍢",
        category: "Chicken Varieties",
        rating: 4.7,
        time: "18 min",
      },
      {
        id: 11,
        name: "Chicken 65",
        price: 280,
        image: "🍗",
        category: "Chicken Varieties",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 12,
        name: "Chicken Korma",
        price: 350,
        image: "🍗",
        category: "Chicken Varieties",
        rating: 4.5,
        time: "20 min",
      },

      // Snacks & Appetizers
      {
        id: 13,
        name: "Samosa",
        price: 80,
        image: "🥟",
        category: "Snacks & Appetizers",
        rating: 4.4,
        time: "10 min",
      },
      {
        id: 14,
        name: "Pakoras",
        price: 120,
        image: "🥔",
        category: "Snacks & Appetizers",
        rating: 4.3,
        time: "12 min",
      },
      {
        id: 15,
        name: "Chaat",
        price: 100,
        image: "🥗",
        category: "Snacks & Appetizers",
        rating: 4.5,
        time: "8 min",
      },
      {
        id: 16,
        name: "Kebabs",
        price: 200,
        image: "🍢",
        category: "Snacks & Appetizers",
        rating: 4.7,
        time: "15 min",
      },

      // Meals & Thali
      {
        id: 17,
        name: "Veg Thali",
        price: 250,
        image: "🍽️",
        category: "Meals & Thali",
        rating: 4.6,
        time: "15 min",
      },
      {
        id: 18,
        name: "Non-Veg Thali",
        price: 350,
        image: "🍽️",
        category: "Meals & Thali",
        rating: 4.8,
        time: "20 min",
      },
      {
        id: 19,
        name: "South Indian Meals",
        price: 280,
        image: "🍽️",
        category: "Meals & Thali",
        rating: 4.5,
        time: "18 min",
      },

      // Bread & Rice
      {
        id: 20,
        name: "Butter Naan",
        price: 60,
        image: "🫓",
        category: "Bread & Rice",
        rating: 4.4,
        time: "8 min",
      },
      {
        id: 21,
        name: "Garlic Naan",
        price: 80,
        image: "🫓",
        category: "Bread & Rice",
        rating: 4.5,
        time: "10 min",
      },
      {
        id: 22,
        name: "Jeera Rice",
        price: 120,
        image: "🍚",
        category: "Bread & Rice",
        rating: 4.3,
        time: "12 min",
      },

      // Desserts
      {
        id: 23,
        name: "Gulab Jamun",
        price: 120,
        image: "🍮",
        category: "Desserts",
        rating: 4.6,
        time: "5 min",
      },
      {
        id: 24,
        name: "Ras Malai",
        price: 140,
        image: "🍰",
        category: "Desserts",
        rating: 4.8,
        time: "5 min",
      },
      {
        id: 25,
        name: "Kulfi",
        price: 100,
        image: "🍦",
        category: "Desserts",
        rating: 4.5,
        time: "5 min",
      },

      // Beverages
      {
        id: 26,
        name: "Masala Chai",
        price: 40,
        image: "☕",
        category: "Beverages",
        rating: 4.5,
        time: "5 min",
      },
      {
        id: 27,
        name: "Mango Lassi",
        price: 80,
        image: "🥭",
        category: "Beverages",
        rating: 4.4,
        time: "5 min",
      },
      {
        id: 28,
        name: "Fresh Lime Soda",
        price: 60,
        image: "🍋",
        category: "Beverages",
        rating: 4.3,
        time: "3 min",
      },
    ],
    Chinese: [
      {
        id: 29,
        name: "Hakka Noodles",
        price: 180,
        image: "🍜",
        category: "Noodles",
        rating: 4.5,
        time: "15 min",
      },
      {
        id: 30,
        name: "Schezwan Noodles",
        price: 200,
        image: "🍜",
        category: "Noodles",
        rating: 4.6,
        time: "18 min",
      },
      {
        id: 31,
        name: "Singapore Noodles",
        price: 220,
        image: "🍜",
        category: "Noodles",
        rating: 4.4,
        time: "20 min",
      },
      {
        id: 32,
        name: "Veg Fried Rice",
        price: 160,
        image: "🍚",
        category: "Fried Rice",
        rating: 4.3,
        time: "12 min",
      },
      {
        id: 33,
        name: "Chicken Fried Rice",
        price: 200,
        image: "🍚",
        category: "Fried Rice",
        rating: 4.5,
        time: "15 min",
      },
      {
        id: 34,
        name: "Schezwan Fried Rice",
        price: 180,
        image: "🍚",
        category: "Fried Rice",
        rating: 4.4,
        time: "14 min",
      },
      {
        id: 35,
        name: "Veg Momos",
        price: 120,
        image: "🥟",
        category: "Dim Sum",
        rating: 4.6,
        time: "10 min",
      },
      {
        id: 36,
        name: "Chicken Momos",
        price: 150,
        image: "🥟",
        category: "Dim Sum",
        rating: 4.7,
        time: "12 min",
      },
      {
        id: 37,
        name: "Steamed Dumplings",
        price: 180,
        image: "🥟",
        category: "Dim Sum",
        rating: 4.5,
        time: "15 min",
      },
      {
        id: 38,
        name: "Chilli Chicken",
        price: 280,
        image: "🍗",
        category: "Stir Fry",
        rating: 4.7,
        time: "18 min",
      },
      {
        id: 39,
        name: "Manchurian",
        price: 220,
        image: "🥢",
        category: "Stir Fry",
        rating: 4.5,
        time: "16 min",
      },
      {
        id: 40,
        name: "Honey Chilli Potato",
        price: 180,
        image: "🥔",
        category: "Stir Fry",
        rating: 4.4,
        time: "14 min",
      },
    ],
  };

  const addToOrder = (item) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === item.id
    );
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (itemId) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromOrder(itemId);
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredItems = () => {
    let items = menuItems[selectedCuisine] || [];

    if (selectedCategory !== "All") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  };

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) return;
    setShowKOTModal(true);
  };

  const handleProceedToPay = () => {
    if (orderItems.length === 0) return;
    setShowPaymentModal(true);
  };

  const generateKOT = () => {
    // Get the appropriate customer details based on order type
    let orderCustomerDetails = {};
    
    if (orderType === "dine-in") {
      orderCustomerDetails = { tableNumber: customerDetails.tableNumber };
    } else if (orderType === "roomService") {
      orderCustomerDetails = { 
        roomNumber: roomDetails.roomno, 
        guestName: roomDetails.guestName 
      };
    } else {
      orderCustomerDetails = { ...customerDetails };
    }

    const newOrder = {
      id: orderNumber,
      items: [...orderItems],
      type: orderType,
      customer: orderCustomerDetails,
      total: getTotalAmount(),
      timestamp: new Date(),
      status: "pending",
      paymentMethod: orderType === "dine-in" ? null : paymentMethod
    };

    setOrders([...orders, newOrder]);
    setOrderItems([]);
    setOrderNumber(orderNumber + 1);
    setShowKOTModal(false);
    
    if (orderType === "dine-in") {
      alert(`KOT #${orderNumber} generated and sent to kitchen!`);
      // Reset details for next order
      setCustomerDetails({
        name: "",
        phone: "",
        address: "",
        tableNumber: "10"
      });
    } else {
      alert(`KOT #${orderNumber} generated and sent to kitchen! Please proceed to payment.`);
      // For all other order types, proceed to payment after KOT
      setShowPaymentModal(true);
    }
  };

  const processPayment = () => {
    // Find the current order and update its payment status
    const updatedOrders = orders.map(order => 
      order.id === orderNumber - 1 
        ? { ...order, status: "paid", paymentMethod: paymentMethod }
        : order
    );
    
    setOrders(updatedOrders);
    setShowPaymentModal(false);
    
    // Reset details for next order based on order type
    if (orderType === "roomService") {
      setRoomDetails({
        roomno: '',
        guestName: '',
      });
    } else {
      setCustomerDetails({
        name: "",
        phone: "",
        address: "",
        tableNumber: customerDetails.tableNumber
      });
    }

    alert(`Payment of ₹${orders.find(order => order.id === orderNumber - 1)?.total || 0} processed successfully via ${paymentMethod}!`);
  };

  useEffect(() => {
    setSelectedCategory("All");
  }, [selectedCuisine]);

  // Helper function to get display text for order type
  const getOrderTypeDisplay = (type) => {
    const typeMap = {
      "dine-in": "Dine In",
      "takeaway": "Takeaway",
      "delivery": "Delivery",
      "roomService": "Room Service"
    };
    return typeMap[type] || type;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-[#0b1d34] text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            🍽️ Restaurant Management System
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">
                {orderType === "dine-in" 
                  ? `Table ${customerDetails.tableNumber}` 
                  : orderType === "roomService" 
                    ? `Room ${roomDetails.roomno || "---"}` 
                    : getOrderTypeDisplay(orderType)
                }
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Receipt className="w-5 h-5" />
              <span className="text-sm">Orders: {orders.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cuisine Categories */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 text-xs">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.name}
              onClick={() => setSelectedCuisine(cuisine.name)}
              style={{
                backgroundColor:
                  selectedCuisine === cuisine.name ? cuisine.color : "#f3f4f6",
                color: selectedCuisine === cuisine.name ? "#fff" : "#374151",
                transform:
                  selectedCuisine === cuisine.name
                    ? "translateY(-2px)"
                    : "translateY(0)",
              }}
              className={`
              group relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium 
              transition-all duration-300 ease-out
              hover:shadow-lg hover:scale-105 hover:-translate-y-1
              active:scale-95 active:translate-y-0
              overflow-hidden
              ${
                selectedCuisine === cuisine.name
                  ? "shadow-lg"
                  : "hover:bg-gray-200"
              }
            `}
            >
              <div
                className="absolute inset-0 transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-20"
                style={{ backgroundColor: cuisine.color }}
              />
              <span className="text-xl transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                {cuisine.icon}
              </span>
              <span className="relative z-10 transition-all duration-200 group-hover:tracking-wide">
                {cuisine.name}
              </span>
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-30 group-active:animate-ping transition-opacity duration-150"
                style={{ backgroundColor: cuisine.color }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Categories */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-800">
              {selectedCuisine} Categories
            </h2>
          </div>
          <div className="p-4">
            {categoryByCuisine[selectedCuisine]?.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full text-left p-2 mb-1 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 hover:scale-103 hover:translate-x-1 ${
                  selectedCategory === category.name
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span className="text-xs">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${selectedCuisine} items...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1 p-4">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-800">
                {selectedCuisine} - {selectedCategory} (
                {filteredItems().length} items)
              </h3>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {filteredItems().map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                  onClick={() => addToOrder(item)}
                >
                  <div className="p-2">
                    <div className="text-center mb-2">
                      <div className="text-2xl mb-1">{item.image}</div>
                      <h3 className="font-semibold text-gray-800 text-xs">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600 mb-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                      <span>{item.time}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold text-green-600">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-green-600" />
              Order Summary ({getTotalItems()})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No items in order
              </p>
            ) : (
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-transform"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-transform"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total and Order Buttons */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-700">
                Total
              </span>
              <span className="text-xl font-bold text-green-600">
                ₹{getTotalAmount()}
              </span>
            </div>
            
            {/* Order Type Selection */}
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderType("dine-in")}
                  className={`flex flex-col items-center p-2 rounded-md border transition-colors text-xs ${
                    orderType === "dine-in"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Home className="w-4 h-4 mb-1" />
                  <span>Dine In</span>
                </button>
                <button
                  onClick={() => setOrderType("takeaway")}
                  className={`flex flex-col items-center p-2 rounded-md border transition-colors text-xs ${
                    orderType === "takeaway"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Package className="w-4 h-4 mb-1" />
                  <span>Takeaway</span>
                </button>
                <button
                  onClick={() => setOrderType("delivery")}
                  className={`flex flex-col items-center p-2 rounded-md border transition-colors text-xs ${
                    orderType === "delivery"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Car className="w-4 h-4 mb-1" />
                  <span>Delivery</span>
                </button>
                <button
                  onClick={() => setOrderType("roomService")}
                  className={`flex flex-col items-center p-2 rounded-md border transition-colors text-xs ${
                    orderType === "roomService"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Bed className="w-4 h-4 mb-1" />
                  <span>Room Service</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 disabled:opacity-50 text-sm hover:scale-105 active:scale-95"
                disabled={orderItems.length === 0}
                onClick={handlePlaceOrder}
              >
                {orderType === "dine-in" ? "Place Order" : "Place Order"}
              </button>
              
              {orderType !== "dine-in" && (
                <button
                  className="bg-green-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-800 transition-all duration-200 disabled:opacity-50 flex items-center hover:scale-105 active:scale-95"
                  disabled={orderItems.length === 0}
                  onClick={handleProceedToPay}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KOT Modal */}
      {showKOTModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">KOT Details</h2>
              <button
                onClick={() => setShowKOTModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Order Type Display */}
            <div className="mb-4">
              <div className="flex items-center justify-center p-3 bg-gray-100 rounded-lg">
                {orderType === "dine-in" && <Home className="w-5 h-5 mr-2 text-green-600" />}
                {orderType === "takeaway" && <Package className="w-5 h-5 mr-2 text-blue-600" />}
                {orderType === "delivery" && <Car className="w-5 h-5 mr-2 text-orange-600" />}
                {orderType === "roomService" && <Bed className="w-5 h-5 mr-2 text-purple-600" />}
                <span className="text-sm font-medium text-gray-700">
                  {getOrderTypeDisplay(orderType)} Order
                </span>
              </div>
            </div>

            {/* Customer Details Input */}
            <div className="space-y-3 mb-4">
              {orderType === "dine-in" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Table Number
                  </label>
                  <input
                    type="text"
                    value={customerDetails.tableNumber}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        tableNumber: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}

                           {orderType === "roomService" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Number
                    </label>
                    <input
                      type="text"
                      value={roomDetails.roomno}
                      onChange={(e) =>
                        setRoomDetails({
                          ...roomDetails,
                          roomno: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      value={roomDetails.guestName}
                      onChange={(e) =>
                        setRoomDetails({
                          ...roomDetails,
                          guestName: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </>
              )}

              {(orderType === "delivery" || orderType === "takeaway") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          name: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={customerDetails.phone}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          phone: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  {orderType === "delivery" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        rows={2}
                        value={customerDetails.address}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            address: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      ></textarea>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Confirm Button */}
            <div className="flex justify-end">
              <button
                onClick={generateKOT}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Confirm KOT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
       {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Payment Processing</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center text-green-700">
                <Check className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">KOT #{orderNumber - 1} has been sent to kitchen!</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === "cash"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Banknote className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Cash</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === "card"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Card</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Order Summary - KOT #{orderNumber - 1}
              </h3>
              <div className="space-y-2">
                {orderType !== "roomService" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Customer:</span>
                      <span className="font-medium">{customerDetails.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phone:</span>
                      <span className="font-medium">{customerDetails.phone}</span>
                    </div>
                  </>
                )}
                {orderType === "delivery" && (
                  <div className="flex justify-between text-sm">
                    <span>Address:</span>
                    <span className="font-medium text-right max-w-48">{customerDetails.address}</span>
                  </div>
                )}
                {orderType === "roomService" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>roomNo</span>
                      <span className="font-medium text-right max-w-48">{roomDetails.roomNo}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Guest Name</span>
                      <span className="font-medium text-right max-w-48">{roomDetails.guestName}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold text-gray-800">
                <span>Total Amount</span>
                <span className="text-lg">₹{orders.find(order => order.id === orderNumber - 1)?.total || 0}</span>
              </div>
              
            {/* Process Payment Button */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Process Payment</span>
              </button>
            </div>
        
        </div>
    </motion.div>
  </div>
       )}
   </div>
  );
};

export default RestaurantPOS;
