import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
import { Users, Calendar, UserCheck, User, Shield, Edit, Trash } from 'lucide-react';

const AdminDashboard = () => {
  // const { currentUser } = useAuth();

  // In a real app, you would fetch users and events from Firestore
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', joinDate: '2024-11-05' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'event_manager', joinDate: '2024-10-20' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'user', joinDate: '2024-12-01' },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', joinDate: '2024-12-15' },
    { id: '5', name: 'David Brown', email: 'david@example.com', role: 'event_manager', joinDate: '2024-11-25' },
  ]);

  const [events, setEvents] = useState([
    { id: '1', title: 'Tech Conference 2025', manager: 'Jane Smith', registrations: 124, date: '2025-04-15' },
    { id: '2', title: 'Networking Mixer', manager: 'David Brown', registrations: 42, date: '2025-05-20' },
    { id: '3', title: 'Design Workshop', manager: 'Jane Smith', registrations: 85, date: '2024-12-10' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    setShowUserModal(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Stats
  const totalUsers = users.length;
  const totalEventManagers = users.filter(u => u.role === 'event_manager').length;
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + event.registrations, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="max-w-4xl mx-auto text-white">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Manage users, event managers, and monitor system activity.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Event Managers</p>
                <p className="text-2xl font-bold">{totalEventManagers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Events</p>
                <p className="text-2xl font-bold">{totalEvents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Registrations</p>
                <p className="text-2xl font-bold">{totalRegistrations}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Management */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === 'admin' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Admin
                          </span>
                        ) : user.role === 'event_manager' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            Event Manager
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }} 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Events Management */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Events Management</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registrations
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map(event => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{event.manager}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{event.registrations}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleDeleteEvent(event.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* User Edit Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowUserModal(false)}></div>
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Change User Role</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">User: <span className="font-medium">{selectedUser.name}</span></p>
              <p className="text-sm text-gray-600">Email: <span className="font-medium">{selectedUser.email}</span></p>
              <p className="text-sm text-gray-600 mt-2">Current role: 
                <span className={`ml-1 font-medium ${
                  selectedUser.role === 'admin' ? 'text-red-600' : 
                  selectedUser.role === 'event_manager' ? 'text-purple-600' : 
                  'text-blue-600'
                }`}>
                  {selectedUser.role === 'admin' ? 'Admin' : 
                   selectedUser.role === 'event_manager' ? 'Event Manager' : 
                   'User'}
                </span>
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <button
                onClick={() => handleRoleChange(selectedUser.id, 'user')}
                className="flex items-center w-full px-4 py-2 border rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <User className="h-5 w-5 mr-2 text-blue-600" />
                <span>User</span>
              </button>
              
              <button
                onClick={() => handleRoleChange(selectedUser.id, 'event_manager')}
                className="flex items-center w-full px-4 py-2 border rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                <span>Event Manager</span>
              </button>
              
              <button
                onClick={() => handleRoleChange(selectedUser.id, 'admin')}
                className="flex items-center w-full px-4 py-2 border rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                <span>Admin</span>
              </button>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;