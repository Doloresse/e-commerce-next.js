"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChartLine, FaBox, FaShoppingCart, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaChevronDown, FaChevronUp, FaClipboardList, FaPlus, FaListUl, FaShoppingBag, FaUserPlus, FaPaintBrush, FaFileInvoiceDollar, FaTruck, FaWarehouse, FaUserTie, FaStore, FaInfoCircle } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('/dashbord');
  const [openMenus, setOpenMenus] = useState({});
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prevState => ({
      ...prevState,
      [menuName]: !prevState[menuName]
    }));
  };

  const isLinkActive = (href: string) => {
    return activeLink === href || activeLink.startsWith(href + '/');
  };

  const isMenuActive = (subMenu: any[]) => {
    return subMenu.some(item => isLinkActive(item.href));
  };

  const links = [
    { href: '/dashbord', icon: FaChartLine, text: 'Tableau de Bord' },
    {
      text: 'Produits', icon: FaBox,
      subMenu: [
        { href: '/products', text: 'Liste des produits', icon: FaClipboardList },
        { href: '/create_products', text: 'Ajouter un produit', icon: FaPlus },
        { href: '/create_category', text: 'Ajouter une Catégorie', icon: FaPlus },
        { href: '/category', text: 'Afficher les Catégories', icon: FaListUl },
      ]
    },
    {
      text: 'Commandes', icon: FaShoppingCart,
      subMenu: [
        { href: '/add_order', text: 'Ajouter une commande', icon: FaPlus},
        { href: '/commandes', text: 'Liste des commandes', icon: FaClipboardList },
        { href: '/pending_order', text: 'Commandes en attente', icon: FaShoppingBag },
      ]
    },
    // { href: '/product_details', icon: FaInfoCircle, text: 'Détails produits' },
    {
      text: 'Stock', icon: FaWarehouse,
      subMenu: [
        { href: '/stockmanagments', icon: FaChartBar, text: 'Gestion du stock' },
        { href: '/entry', icon: FaBox, text: 'Entrées de produits' },
        { href: '/exit', icon: FaShoppingBag, text: 'Sorties de produits' },
      ]
    },
    {
      text: 'Clients', icon: FaUsers,
      subMenu: [
        { href: '/customer', text: 'Liste des clients', icon: FaClipboardList },
        { href: '/add_customer', text: 'Ajouter un client', icon: FaUserPlus },
      ]
    },
    {
      text: 'Boutique', icon: FaStore,
      subMenu: [
        { href: '/boutique', text: 'Apparence', icon: FaPaintBrush },
      ]
    },
    { href: '/fournisseur', icon: FaUserTie, text: 'Fournisseurs' },
    { href: '/rayon', icon: FaBox, text: 'Suivie' },
    // { href: '/facture', icon: FaUserTie, text: 'Factures' },
    { href: '/rapports', icon: FaChartBar, text: 'Rapports' },
    { href: '/finances', icon: FaFileInvoiceDollar, text: 'Finances' },
  ];

  const handleScroll = () => {
    setScrolling(true);
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside className={`bg-gray-950 text-gray-100 w-64 h-screen p-4 fixed top-0 left-0 overflow-y-auto custom-scrollbar ${scrolling ? 'visible' : ''}`}>
      <div className='flex'>
        <a href="/">  
          <img src="images/Sans titre-1.png" alt="Logo" className="w-100 h-40 ml-0 mt-0" />
        </a>  
      </div>
      <nav>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              {link.subMenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(link.text)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                      isMenuActive(link.subMenu) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <link.icon className="mr-3" />
                      <span>{link.text}</span>
                    </div>
                    {openMenus[link.text] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {openMenus[link.text] && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {link.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link 
                            href={subItem.href}
                            className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                              isLinkActive(subItem.href) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                            }`}
                          >
                            {subItem.icon && <subItem.icon className="mr-3" />}
                            {subItem.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link 
                  href={link.href}
                  className={`flex items-center p-2 rounded-lg transition-colors ${
                    isLinkActive(link.href) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <link.icon className="mr-3" />
                  <span>{link.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button className="mt-10 w-full bg-blue-950 font-bold hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
        <FaSignOutAlt className="mr-2" />
        Déconnexion
      </button>
    </aside>
  );
};

export default Sidebar;