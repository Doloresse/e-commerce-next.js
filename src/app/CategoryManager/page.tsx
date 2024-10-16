// 'use client';

// import React, { useState } from 'react';
// import CategoryTable from '@/app/category/page';
// import CreateCategory from '@/components/CreateCategory';
// // import CreateCategory from '@/app/create_category/page';
// import Navbar from '@/components/Navbar';
// import Sidebar from '@/components/Sidebar';

// const CategoryManager = () => {
//   const [categories, setCategories] = useState([
//     { id: 1, name: 'Électronique', slug: 'electronique', description: 'Gadgets et appareils électroniques', productCount: 150, image: '/images/depositphotos_52013277-stock-photo-african-woman-with-shopping-bags.jpg', selected: false },
//     { id: 2, name: 'Vêtements', slug: 'vetements', description: 'Mode pour hommes et femmes', productCount: 300, image: '/images/life_perf_rosecharmeuse_10ml_3701429818692_1.webp', selected: false },
//     { id: 3, name: 'Maison & Jardin', slug: 'maison-jardin', description: 'Décoration et outils de jardinage', productCount: 200, image: '/images/3081559.png', selected: false },
//   ]);

//   const addCategory = (newCategory) => {
//     setCategories([...categories, { ...newCategory, id: categories.length + 1, productCount: 0, selected: false }]);
//   };

//   return (
//     <div className="flex flex-col h-screen w-full">
//       <Navbar />
//       <div className="flex flex-1 bg-gray-950">
//         <Sidebar />
//         <div className="flex-1 p-8 ml-60 overflow-y-auto">
//         <CreateCategory addCategory={addCategory} />
//           <CategoryTable categories={categories} setCategories={setCategories} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryManager;