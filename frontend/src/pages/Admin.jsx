import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, LogOut, Mail, Trash2, CheckCircle2, Circle, X, AlertCircle } from 'lucide-react';
import axios from 'axios';

// Ensure axios sends cookies
axios.defaults.withCredentials = true;

const inputClass = `w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3.5 text-white placeholder-slate-600
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60
  transition-all duration-200`;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  
  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('idle');
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [contacts, setContacts] = useState([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/me`);
      setIsAuthenticated(res.data.authenticated);
      if (res.data.authenticated) {
        fetchContacts();
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginStatus('loading');
    setLoginError('');
    try {
      const res = await axios.post(`${apiUrl}/api/admin/login/login`, { username, password });
      if (res.data.success) {
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
        fetchContacts();
      }
    } catch (err) {
      setLoginError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoginStatus('idle');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/api/admin/logout`);
      setIsAuthenticated(false);
      setContacts([]);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchContacts = async () => {
    setIsLoadingContacts(true);
    try {
      const res = await axios.get(`${apiUrl}/api/admin/contacts`);
      setContacts(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const markAsRead = async (id, readStatus) => {
    setIsActionLoading(true);
    try {
      await axios.patch(`${apiUrl}/api/admin/contacts/${id}/read`, { read: readStatus });
      setContacts(contacts.map(c => c._id === id ? { ...c, read: readStatus } : c));
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact({ ...selectedContact, read: readStatus });
      }
    } catch (err) {
      if (err.response?.status === 401) setIsAuthenticated(false);
    } finally {
      setIsActionLoading(false);
    }
  };

  const deleteContact = async (id) => {
    setIsActionLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/admin/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      setDeleteConfirmId(null);
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(null);
      }
    } catch (err) {
      if (err.response?.status === 401) setIsAuthenticated(false);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Username</label>
              <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className={inputClass} placeholder="Enter username" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
            </div>
            
            <AnimatePresence>
              {loginError && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 flex items-center gap-2 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{loginError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={loginStatus === 'loading'} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 shadow-lg">
              {loginStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-wide">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors border border-slate-700/50">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Contacts</h2>
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-sm font-medium">
            {contacts.length} Total
          </span>
        </div>

        {isLoadingContacts ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/20 border border-slate-800 rounded-2xl">
            <p className="text-slate-400">No contact messages yet.</p>
          </div>
        ) : (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-700/50">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {contacts.map((contact) => (
                    <tr 
                      key={contact._id} 
                      onClick={() => setSelectedContact(contact)}
                      className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${!contact.read ? 'bg-blue-500/5' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!contact.read ? (
                          <span className="flex items-center gap-1.5 text-blue-400 font-medium text-sm">
                            <Circle className="w-2.5 h-2.5 fill-current" /> New
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Read
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-medium ${!contact.read ? 'text-white' : 'text-slate-300'}`}>{contact.name}</div>
                        <div className="text-sm text-slate-500 mt-0.5">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-300 max-w-xs truncate">
                        {contact.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => { setSelectedContact(null); setDeleteConfirmId(null); }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/80">
                <h3 className="text-lg font-semibold text-white">Contact Details</h3>
                <button onClick={() => { setSelectedContact(null); setDeleteConfirmId(null); }} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Name</div>
                    <div className="text-white font-medium">{selectedContact.name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</div>
                    <div className="text-slate-300">{new Date(selectedContact.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</div>
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-400 hover:underline">{selectedContact.email}</a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</div>
                    <div className="text-slate-300">{selectedContact.phone || '—'}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Subject</div>
                  <div className="text-white font-medium">{selectedContact.subject}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</div>
                  <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </div>
                </div>
              </div>

              {/* Modal Footer / Actions */}
              <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => markAsRead(selectedContact._id, !selectedContact.read)} 
                    disabled={isActionLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {selectedContact.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <a 
                    href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Reply by Email
                  </a>
                </div>

                {deleteConfirmId === selectedContact._id ? (
                  <div className="flex items-center gap-2 bg-red-500/10 p-1.5 rounded-lg border border-red-500/20">
                    <span className="text-sm text-red-400 font-medium px-2">Are you sure?</span>
                    <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm transition-colors">Cancel</button>
                    <button onClick={() => deleteContact(selectedContact._id)} disabled={isActionLoading} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5">
                      {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmId(selectedContact._id)} className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg text-sm font-medium transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
