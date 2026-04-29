import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ExternalLink, 
  Mail, 
  Phone, 
  Loader2, 
  X, 
  ImageIcon, 
  Trash2,
  Edit
} from 'lucide-react';
import { fetchClients, createClient, deleteClient, updateClient } from '../api';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', image: '', category: 'IT' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);


  const getClients = async () => {
    setLoading(true);
    try {
      const { data } = await fetchClients();
      setClients(data);
    } catch (err) {
      setError('Failed to fetch clients. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editId) {
        await updateClient(editId, formData);
      } else {
        await createClient(formData);
      }

      setIsModalOpen(false);
      setFormData({ name: '', image: '', category: 'IT' });
      setEditId(null);
      getClients();
    } catch (err) {
      alert(editId ? 'Failed to update client' : 'Failed to add client');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (client) => {
    setFormData({ name: client.name, image: client.image, category: client.category || 'IT' });
    setEditId(client._id);
    setIsModalOpen(true);
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        getClients();
      } catch (err) {
        alert('Failed to delete client');
      }
    }
  };




  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Client Management</h1>
          <p className="text-slate-500 mt-1">Manage your corporate partners and client database.</p>
        </div>

        <button 
          onClick={() => {
            setFormData({ name: '', image: '', category: 'IT' });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Client</span>
        </button>


      </div>


      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          <p className="text-slate-400 font-medium">Loading clients...</p>
        </div>

      ) : error ? (
        <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-2xl text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <>
          {/* Table Section */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter clients..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-orange-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto bg-white">


              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Image Preview</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {clients.length > 0 ? clients.map((client) => (
                    <tr key={client._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-600 font-bold">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{client.name}</p>
                            <p className="text-xs text-slate-500">ID: #{client._id.substring(18)}</p>
                          </div>
                        </div>

                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          {client.category || 'N/A'}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {client.image ? (
                          <img src={client.image} alt={client.name} className="w-12 h-12 object-contain rounded-lg bg-slate-50 p-1 border border-slate-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          </div>
                        )}

                      </td>
                      <td className="px-6 py-5 text-sm text-slate-400 font-medium">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleEdit(client)}
                            className="p-2 text-slate-500 hover:text-orange-400 hover:bg-orange-400/5 rounded-lg transition-all"
                          >
                            <Edit className="w-5 h-5" />
                          </button>

                          <button 
                            onClick={() => handleDelete(client._id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                      </td>

                    </tr>
                  )) : (

                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-slate-500 italic">
                        No clients found. Click "Add New Client" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">

              <button className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors inline-flex items-center">
                View All Clients <ExternalLink className="w-3 h-3 ml-2" />
              </button>
            </div>

          </div>
        </>
      )}
      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{editId ? 'Edit Client' : 'Add New Client'}</h3>


              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">

                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Client Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter client name..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 focus:border-orange-500/50 outline-none transition-all"
                />


              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 focus:border-orange-500/50 outline-none transition-all"
                >
                  <option value="IT">IT</option>
                  <option value="Non-IT">Non-IT</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Client Logo / Photo</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-orange-500/50 transition-colors bg-slate-50 group relative">


                  {formData.image ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-8 h-8 text-orange-500" />
                      </div>

                      <p className="text-slate-500 font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG or SVG (Max 2MB)</p>

                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-orange-600/50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Save Client</span>}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>

  );
};

export default Clients;
