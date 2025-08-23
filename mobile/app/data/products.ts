export interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  description?: string;
  category?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    price: 2.5,
    image: require("../../assets/images/partial-react-logo.png"),
    description: "Fresh, organic tomatoes from local farms",
    category: "Vegetables"
  },
  {
    id: "2",
    name: "Organic Potatoes",
    price: 1.8,
    image: require("../../assets/images/partial-react-logo.png"),
    description: "Premium organic potatoes, perfect for cooking",
    category: "Vegetables"
  },
  {
    id: "3",
    name: "Farm Eggs (12pcs)",
    price: 3.0,
    image: require("../../assets/images/partial-react-logo.png"),
    description: "Fresh eggs from free-range chickens",
    category: "Dairy & Eggs"
  },
  {
    id: "4",
    name: "Fresh Carrots",
    price: 2.2,
    image: require("../../assets/images/partial-react-logo.png"),
    description: "Sweet, crunchy carrots from organic farms",
    category: "Vegetables"
  },
  {
    id: "5",
    name: "Organic Milk (1L)",
    price: 4.5,
    image: require("../../assets/images/partial-react-logo.png"),
    description: "Pure organic milk from grass-fed cows",
    category: "Dairy & Eggs"
  },
  {
    id: "6",
    name: "Fresh Lettuce",
    price: 1.5,
    image: require("../../assets/images/partial-react-logo.png"),
    description: "Crisp, fresh lettuce perfect for salads",
    category: "Vegetables"
  }
];
