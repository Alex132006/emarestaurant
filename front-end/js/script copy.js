const PRODUCTS = [
  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },

  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },

  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },

  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },

  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },

  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 1,
    name: "Poulet Moambe",
    cat: "congolais",
    price: 3000,
    weight: "≈ 450 g",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 2,
    name: "Pondu / Saka-Saka",
    cat: "congolais",
    price: 2500,
    weight: "≈ 400 g",
    tag: "ORIGINE",
    desc: "",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 3,
    name: "Maboke de Poisson",
    cat: "congolais",
    price: 3200,
    weight: "≈ 450 g",
    tag: "CHEF",
    desc: "",
    img: "https://images.unsplash.com/photo-1544943910-4c1a44b7ad61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 4,
    name: "Ntaba Grillée",
    cat: "grillades",
    price: 3500,
    weight: "≈ 350 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 5,
    name: "Mix Grill E.M.A",
    cat: "grillades",
    price: 6500,
    weight: "≈ 700 g",
    tag: "À PARTAGER",
    desc: "",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    cat: "grillades",
    price: 4500,
    weight: "≈ 320 g",
    tag: "FEU",
    desc: "",
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 7,
    name: "Tacos Poulet",
    cat: "fast",
    price: 2500,
    weight: "≈ 350 g",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Pizza Poulet",
    cat: "fast",
    price: 3500,
    weight: "≈ 30 cm",
    tag: "CRÉATION",
    desc: "",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 9,
    name: "Crevettes Grillées",
    cat: "mer",
    price: 4000,
    weight: "≈ 300 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 10,
    name: "Crevettes Panées",
    cat: "mer",
    price: 3800,
    weight: "≈ 280 g",
    tag: "OCÉAN",
    desc: "",
    img: "https://images.unsplash.com/photo-1625943553852-781c6b2c1a5a?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Jus de Bissap",
    cat: "boissons",
    price: 1000,
    weight: "500 ml",
    tag: "MAISON",
    desc: "",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Cocktail Maison",
    cat: "boissons",
    price: 1800,
    weight: "450 ml",
    tag: "SIGNATURE",
    desc: "",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 13,
    name: "Fondant Chocolat",
    cat: "desserts",
    price: 1500,
    weight: "≈ 160 g",
    tag: "DOUCEUR",
    desc: "",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 14,
    name: "Salade de Fruits",
    cat: "desserts",
    price: 1200,
    weight: "≈ 250 g",
    tag: "FRAIS",
    desc: "",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=88",
  },
];

const catNames = {
  congolais: "Origines",
  grillades: "Feu",
  fast: "Créations",
  mer: "Océan",
  desserts: "Douceurs",
  boissons: "Boissons",
};

const state = {
  cart: JSON.parse(localStorage.getItem("ema_luxe_cart") || "[]"),
  category: "all",
  selected: null,
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const money = (n) => n.toLocaleString("fr-FR") + " F";

function saveCart() {
  localStorage.setItem("ema_luxe_cart", JSON.stringify(state.cart));
}

function toast(message) {
  const box = $("#toast");
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => box.classList.remove("show"), 2500);
}

function renderProducts() {
  const filtered = PRODUCTS.filter(
    (p) => state.category === "all" || p.cat === state.category,
  );
  $("#productGrid").innerHTML = filtered
    .map(
      (p) => `
    <article class="lux-card">
      <div class="lux-image" style="background-image:url('${p.img}')">
        <span class="tag">${p.tag}</span>
      </div>
      <div class="lux-body">
        <span class="cat">${(catNames[p.cat] || p.cat).toUpperCase()}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="lux-foot">
          <strong>${money(p.price)}</strong>
          <button class="circle-plus" data-product="${p.id}" aria-label="Ajouter ${p.name}">+</button>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
  $$(".circle-plus").forEach(
    (btn) => (btn.onclick = () => openProduct(Number(btn.dataset.product))),
  );
}

function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  state.selected = p;
  $("#modalCategory").textContent = (catNames[p.cat] || p.cat).toUpperCase();
  $("#modalName").textContent = p.name;
  $("#modalDescription").textContent = p.desc;
  $("#modalPrice").textContent = money(p.price);
  $("#modalWeight").textContent = p.weight;
  $("#modalImage").style.backgroundImage = `url('${p.img}')`;
  $("#modalQty").value = 1;
  $("#modalNote").value = "";
  $("#productBackdrop").classList.add("open");
  document.body.classList.add("lock");
}

function addProduct(p, qty, note) {
  state.cart.push({
    id: p.id,
    name: p.name,
    price: p.price,
    img: p.img,
    qty,
    note,
  });
  saveCart();
  renderCart();
  $("#productBackdrop").classList.remove("open");
  document.body.classList.remove("lock");
  toast(`${p.name} ajouté à la commande`);
}

function renderCart() {
  const list = $("#cartList");
  if (!state.cart.length) {
    list.innerHTML = "";
    $("#emptyCart").style.display = "block";
  } else {
    $("#emptyCart").style.display = "none";
    list.innerHTML = state.cart
      .map(
        (item, index) => `
      <div class="cart-line">
        <div class="cart-thumb" style="background-image:url('${item.img}')"></div>
        <div>
          <strong>${item.name}</strong>
          <small>${item.qty} × ${money(item.price)}${item.note ? `<br>Note : ${item.note}` : ""}</small>
          <button data-remove="${index}">Retirer</button>
        </div>
        <strong>${money(item.qty * item.price)}</strong>
      </div>
    `,
      )
      .join("");
    $$("[data-remove]").forEach((btn) => {
      btn.onclick = () => {
        state.cart.splice(Number(btn.dataset.remove), 1);
        saveCart();
        renderCart();
      };
    });
  }

  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const fee = state.cart.length ? 1000 : 0;
  $("#subtotal").textContent = money(subtotal);
  $("#delivery").textContent = money(fee);
  $("#grandTotal").textContent = money(subtotal + fee);
  $("#cartBadge").textContent = state.cart.reduce((s, i) => s + i.qty, 0);
  $("#checkoutTotal").textContent = money(subtotal + fee);
}

$("#categoryNav").addEventListener("click", (e) => {
  const button = e.target.closest("button[data-cat]");
  if (!button) return;
  $$("#categoryNav button").forEach((x) => x.classList.remove("active"));
  button.classList.add("active");
  state.category = button.dataset.cat;
  renderProducts();
});

$("#showAllBtn").onclick = () => {
  state.category = "all";
  $$("#categoryNav button").forEach((x) => x.classList.remove("active"));
  $('#categoryNav button[data-cat="all"]').classList.add("active");
  renderProducts();
  document
    .querySelector("#productGrid")
    .scrollIntoView({ behavior: "smooth", block: "start" });
};

$$("[data-product]").forEach((btn) =>
  btn.addEventListener("click", () => openProduct(Number(btn.dataset.product))),
);

$("#addToCart").onclick = () => {
  if (!state.selected) return;
  const qty = Math.max(1, Number($("#modalQty").value) || 1);
  addProduct(state.selected, qty, $("#modalNote").value.trim());
};

$("#cartTrigger").onclick = () => {
  $("#cartBackdrop").classList.add("open");
  document.body.classList.add("lock");
};

$("#checkoutButton").onclick = () => {
  if (!state.cart.length) {
    toast("Votre sélection est vide.");
    return;
  }
  $("#cartBackdrop").classList.remove("open");
  $("#checkoutBackdrop").classList.add("open");
};

$$("[data-close]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.close);
    target.classList.remove("open");
    document.body.classList.remove("lock");
  }),
);

$$(".modal-backdrop,.drawer-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      backdrop.classList.remove("open");
      document.body.classList.remove("lock");
    }
  });
});

$("#checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const orderId = "EMA-" + Math.floor(1000 + Math.random() * 8999);
  const orders = JSON.parse(localStorage.getItem("ema_luxe_orders") || "[]");
  orders.unshift({
    id: orderId,
    name: form.get("name"),
    phone: form.get("phone"),
    mode: form.get("mode"),
    payment: form.get("payment"),
    total: state.cart.reduce((s, i) => s + i.price * i.qty, 0) + 1000,
    status: "Reçue",
    items: state.cart,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("ema_luxe_orders", JSON.stringify(orders));
  state.cart = [];
  saveCart();
  renderCart();
  e.target.reset();
  $("#checkoutBackdrop").classList.remove("open");
  document.body.classList.remove("lock");
  toast(`Commande ${orderId} enregistrée`);
});

$("#reservationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const reservation = Object.fromEntries(new FormData(e.target));
  localStorage.setItem("ema_luxe_reservation", JSON.stringify(reservation));
  $("#reservationStatus").textContent =
    "Votre demande a été enregistrée. Notre équipe vous recontactera pour confirmation.";
  toast("Demande de réservation envoyée");
  e.target.reset();
});

const menuTrigger = $("#menuTrigger");
menuTrigger.onclick = () => {
  menuTrigger.classList.toggle("active");
  $("#fullMenu").classList.toggle("open");
  document.body.classList.toggle("lock");
};
$$(".menu-panel-nav a").forEach(
  (a) =>
    (a.onclick = () => {
      menuTrigger.classList.remove("active");
      $("#fullMenu").classList.remove("open");
      document.body.classList.remove("lock");
    }),
);

window.addEventListener("scroll", () => {
  $("#header").classList.toggle("scrolled", window.scrollY > 60);
});

$("#searchTrigger").onclick = () => {
  const target = document.querySelector("#collection");
  target.scrollIntoView({ behavior: "smooth" });
  toast("Sélectionnez une catégorie pour explorer la carte");
};

window.addEventListener("load", () => {
  setTimeout(() => $("#preloader").classList.add("hide"), 950);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $$(".open").forEach((x) => x.classList.remove("open"));
    $("#menuTrigger").classList.remove("active");
    document.body.classList.remove("lock");
  }
});

renderProducts();
renderCart();
