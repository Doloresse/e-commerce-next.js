'use client'; // Indique que ce fichier est un composant client

import { useUserContext } from '@/contexts/UserContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const UserListPage: React.FC = () => {
    const { users } = useUserContext();

    return (
      <div className="flex flex-col h-screen w-full">
          <Navbar />
          <div className="flex flex-1 bg-gray-950 ml-60">
              <Sidebar />
              <div className="container mx-auto mt-10 p-5 bg-gray-950">
                  <h1 className="text-3xl font-bold mb-5 text-white">Liste des Utilisateurs</h1>
                  <table className="min-w-full bg-gray-950 border border-gray-900 mt-8 rounded-lg shadow-md">
                      <thead>
                          <tr className="bg-gray-900 text-white">
                              <th className="py-3 px-4 border-gray-900 border-b">Nom</th>
                              <th className="py-3 px-4 border-gray-900 border-b">Email</th>
                          </tr>
                      </thead>
                      <tbody>
                          {users.length === 0 ? (
                              <tr>
                                  <td className="py-2 px-4 border-b border-gray-900 text-white text-center" colSpan={2}>Aucun utilisateur trouvé</td>
                              </tr>
                          ) : (
                              users.map((user) => (
                                  <tr key={user.id} className="hover:bg-gray-900 text-white">
                                      <td className="py-2 px-4 border-b text-center">{user.name}</td>
                                      <td className="py-2 px-4 border-b text-center">{user.email}</td>
                                  </tr>
                              ))
                          )}
                      </tbody>
                  </table>
              </div>
          </div>    
      </div>            
    );
};

export default UserListPage;
