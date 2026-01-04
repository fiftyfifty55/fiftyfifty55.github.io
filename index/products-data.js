// products-data.js
// 三個主題名稱順序固定：生活用品 / 玩具 / 服飾

function resolveImg(src){
  if(!src) return "image/no-image.png";
  if(String(src).startsWith("http")) return src;
  if(String(src).startsWith("image/")) return src;   // ✅ 已經有 image/ 就不要再加
  return "image/" + src;                             // ✅ 沒有才補
}


const THEMES = ["生活用品", "玩具", "服飾"];

const PRODUCTS = [
  // ===== 生活用品 (12) =====
  {
    id: "L001",
    theme: "生活用品",
    name: "除臭貓砂盆墊",
    price: 399,
    boughtCount: 120,
    rating: 5.0,
    reviewCount: 18,
    images: ["image/1-010.png", "image/1-011.png"],
    variantType: "size",
    sizes: ["S","M","L"],
    stockBySize: { S: 10, M: 6, L: 0 },
    description: "商品介紹…",
    specs: "詳細規格…",
    howToUse: "玩法/用法…"
  },
  {
    id: "L002", theme: "生活用品", name: "防滑寵物餐墊", price: 269,
    boughtCount: 73, rating: 4.8, reviewCount: 12, images: ["l002-1.jpg","l002-2.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 8, M: 5, L: 2 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L003", theme: "生活用品", name: "貓咪飲水噴泉濾芯", price: 189,
    boughtCount: 95, rating: 4.7, reviewCount: 21, images: ["l003-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 12, M: 6, L: 3 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L004", theme: "生活用品", name: "天然豆腐砂 6L", price: 320,
    boughtCount: 210, rating: 4.9, reviewCount: 56, images: ["l004-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 20, M: 10, L: 0 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L005", theme: "生活用品", name: "貓抓板補充片", price: 150,
    boughtCount: 66, rating: 4.6, reviewCount: 9, images: ["l005-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 6, M: 4, L: 1 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L006", theme: "生活用品", name: "寵物梳毛除毛刷", price: 199,
    boughtCount: 102, rating: 4.8, reviewCount: 30, images: ["l006-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 10, M: 8, L: 4 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L007", theme: "生活用品", name: "便攜外出餵食水壺", price: 249,
    boughtCount: 51, rating: 4.7, reviewCount: 11, images: ["l007-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 7, M: 2, L: 0 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L008", theme: "生活用品", name: "貓咪指甲剪", price: 129,
    boughtCount: 88, rating: 4.6, reviewCount: 17, images: ["l008-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 9, M: 5, L: 2 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L009", theme: "生活用品", name: "除臭垃圾袋（貓砂用）", price: 159,
    boughtCount: 140, rating: 4.8, reviewCount: 28, images: ["l009-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 15, M: 6, L: 3 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L010", theme: "生活用品", name: "寵物清潔濕紙巾", price: 99,
    boughtCount: 170, rating: 4.7, reviewCount: 34, images: ["l010-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 30, M: 12, L: 5 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L011", theme: "生活用品", name: "外出提籠透氣墊", price: 299,
    boughtCount: 44, rating: 4.6, reviewCount: 7, images: ["l011-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 4, M: 3, L: 0 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },
  {
    id: "L012", theme: "生活用品", name: "防噴砂貓砂盆邊框", price: 349,
    boughtCount: 61, rating: 4.8, reviewCount: 13, images: ["l012-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 6, M: 2, L: 1 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "使用方式…"
  },

  // ===== 玩具 (9) =====
  {
    id: "T001",
    theme: "玩具",
    name: "逗貓羽毛棒",
    price: 199,
    boughtCount: 88,
    rating: 4.8,
    reviewCount: 40,
    images: ["t001-1.jpg","t001-2.jpg","t001-3.jpg"],
    variantType: "color",
    colors: [
      { code: "beige", label: "米色", hex: "#d5bfb4", stock: 12 },
      { code: "taupe", label: "奶茶", hex: "#c9b2a7", stock: 3 },
      { code: "pink",  label: "淡粉", hex: "#ecd9d5", stock: 0 }
    ],
    description: "商品介紹…",
    specs: "詳細規格…",
    howToUse: "玩法/用法…"
  },
  {
    id: "T002", theme: "玩具", name: "自嗨滾動球", price: 239,
    boughtCount: 55, rating: 4.6, reviewCount: 19, images: ["t002-1.jpg"],
    variantType: "color",
    colors: [
      { code:"beige", label:"米色", hex:"#d5bfb4", stock: 8 },
      { code:"gray", label:"灰色", hex:"#bdbdbd", stock: 2 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },
  {
    id: "T003", theme: "玩具", name: "貓薄荷抱抱魚", price: 179,
    boughtCount: 92, rating: 4.7, reviewCount: 26, images: ["t003-1.jpg"],
    variantType: "color",
    colors: [
      { code:"beige", label:"米色", hex:"#d5bfb4", stock: 4 },
      { code:"pink", label:"淡粉", hex:"#ecd9d5", stock: 1 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },
  {
    id: "T004", theme: "玩具", name: "互動鈴鐺逗貓棒", price: 159,
    boughtCount: 77, rating: 4.5, reviewCount: 15, images: ["t004-1.jpg"],
    variantType: "color",
    colors: [
      { code:"taupe", label:"奶茶", hex:"#c9b2a7", stock: 6 },
      { code:"gray", label:"灰色", hex:"#bdbdbd", stock: 0 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },
  {
    id: "T005", theme: "玩具", name: "耐咬麻繩球", price: 129,
    boughtCount: 64, rating: 4.6, reviewCount: 14, images: ["t005-1.jpg"],
    variantType: "color",
    colors: [
      { code:"beige", label:"米色", hex:"#d5bfb4", stock: 10 },
      { code:"taupe", label:"奶茶", hex:"#c9b2a7", stock: 3 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },
  {
    id: "T006", theme: "玩具", name: "隧道躲貓貓玩具", price: 399,
    boughtCount: 48, rating: 4.7, reviewCount: 9, images: ["t006-1.jpg"],
    variantType: "color",
    colors: [
      { code:"gray", label:"灰色", hex:"#bdbdbd", stock: 4 },
      { code:"pink", label:"淡粉", hex:"#ecd9d5", stock: 0 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },
  {
    id: "T007", theme: "玩具", name: "貓咪解謎漏食球", price: 289,
    boughtCount: 58, rating: 4.6, reviewCount: 13, images: ["t007-1.jpg"],
    variantType: "color",
    colors: [
      { code:"beige", label:"米色", hex:"#d5bfb4", stock: 3 },
      { code:"gray", label:"灰色", hex:"#bdbdbd", stock: 2 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },
  {
    id: "T008", theme: "玩具", name: "貓薄荷逗趣枕", price: 149,
    boughtCount: 83, rating: 4.7, reviewCount: 20, images: ["t008-1.jpg"],
    variantType: "color",
    colors: [
      { code:"taupe", label:"奶茶", hex:"#c9b2a7", stock: 5 },
      { code:"pink", label:"淡粉", hex:"#ecd9d5", stock: 1 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },
  {
    id: "T009", theme: "玩具", name: "貓咪彈跳逗貓器", price: 329,
    boughtCount: 37, rating: 4.5, reviewCount: 8, images: ["t009-1.jpg"],
    variantType: "color",
    colors: [
      { code:"beige", label:"米色", hex:"#d5bfb4", stock: 2 },
      { code:"gray", label:"灰色", hex:"#bdbdbd", stock: 0 }
    ],
    description: "商品介紹…", specs: "詳細規格…", howToUse: "玩法/用法…"
  },

  // ===== 服飾 (9) =====
  {
    id: "C001",
    theme: "服飾",
    name: "貓咪小背心",
    price: 259,
    boughtCount: 35,
    rating: 4.9,
    reviewCount: 9,
    images: ["c001-1.jpg"],
    variantType: "size",
    sizes: ["S","M","L"],
    stockBySize: { S: 5, M: 2, L: 1 },
    description: "商品介紹…",
    specs: "詳細規格…",
    howToUse: "玩法/用法…"
  },
  {
    id: "C002", theme: "服飾", name: "冬季保暖連帽衣", price: 499,
    boughtCount: 29, rating: 4.8, reviewCount: 7, images: ["c002-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 2, M: 2, L: 0 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  },
  {
    id: "C003", theme: "服飾", name: "柔軟圍兜兜", price: 179,
    boughtCount: 41, rating: 4.7, reviewCount: 10, images: ["c003-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 6, M: 3, L: 2 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  },
  {
    id: "C004", theme: "服飾", name: "聖誕限定小斗篷", price: 369,
    boughtCount: 18, rating: 4.8, reviewCount: 5, images: ["c004-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 3, M: 1, L: 0 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  },
  {
    id: "C005", theme: "服飾", name: "條紋T恤（寵物）", price: 259,
    boughtCount: 24, rating: 4.6, reviewCount: 6, images: ["c005-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 4, M: 2, L: 1 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  },
  {
    id: "C006", theme: "服飾", name: "防風外出背心", price: 429,
    boughtCount: 16, rating: 4.7, reviewCount: 4, images: ["c006-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 2, M: 1, L: 0 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  },
  {
    id: "C007", theme: "服飾", name: "可愛領巾（款式）", price: 149,
    boughtCount: 52, rating: 4.8, reviewCount: 11, images: ["c007-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 10, M: 6, L: 3 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  },
  {
    id: "C008", theme: "服飾", name: "居家舒適睡衣", price: 339,
    boughtCount: 21, rating: 4.7, reviewCount: 6, images: ["c008-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 3, M: 2, L: 1 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  },
  {
    id: "C009", theme: "服飾", name: "雨天防水雨衣", price: 459,
    boughtCount: 13, rating: 4.6, reviewCount: 3, images: ["c009-1.jpg"],
    variantType: "size", sizes: ["S","M","L"], stockBySize: { S: 2, M: 1, L: 0 },
    description: "商品介紹…", specs: "詳細規格…", howToUse: "穿戴方式…"
  }
];

// ===== 統一處理圖片路徑 & 至少兩張圖 =====
// ===== 保證至少兩張圖 + 相容舊的 p.image =====
PRODUCTS.forEach(p => {
  if (!Array.isArray(p.images)) p.images = [];
  if (p.images.length === 0) p.images = ["no-image.png"];
  while (p.images.length < 2) p.images.push(p.images[0]);

  // 相容舊程式：讓 p.image 可用（等於第一張）
  p.image = p.images[0];
});

window.THEMES = THEMES;
window.PRODUCTS = PRODUCTS;


window.THEMES = THEMES;
window.PRODUCTS = PRODUCTS;

