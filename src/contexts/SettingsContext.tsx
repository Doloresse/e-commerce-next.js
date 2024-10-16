// // src/contexts/SettingsContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface Settings {
//   themeColor: string;
//   brightness: number;
// }

// interface SettingsContextType {
//   settings: Settings;
//   setSettings: React.Dispatch<React.SetStateAction<Settings>>;
// }

// const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [settings, setSettings] = useState<Settings>({
//     themeColor: '#4F46E5', // Couleur par défaut
//     brightness: 100, // Luminosité par défaut
//   });

//   return (
//     <SettingsContext.Provider value={{ settings, setSettings }}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };

// export const useSettings = (): SettingsContextType => {
//   const context = useContext(SettingsContext);
//   if (!context) {
//     throw new Error('useSettings must be used within a SettingsProvider');
//   }
//   return context;
// };
