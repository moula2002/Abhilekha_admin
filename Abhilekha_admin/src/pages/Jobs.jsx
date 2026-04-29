import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, MapPin, Clock, DollarSign, ArrowUpRight, Search, Loader2, X, GraduationCap, Award, MapPinned, FileText, ChevronRight, Trash2, Edit } from 'lucide-react';
import { fetchJobs, createJob, deleteJob, updateJob } from '../api';






const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',

    experience: '',
    education: '',
    jobLocation: '',
    driveLocation: '',
    type: 'Full-time',
    salary: '',
    description: '',
    howToApply: 'Click the Apply button below to submit your application through our online form.',
    status: 'Open'
  });
  const [editId, setEditId] = useState(null);


  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to load data. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editId) {
        await updateJob(editId, formData);
      } else {
        await createJob(formData);
      }
      setIsModalOpen(false);
      resetForm();
      loadData();
    } catch (err) {
      alert(editId ? 'Failed to update job' : 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      experience: '',
      education: '',
      jobLocation: '',
      driveLocation: '',
      type: 'Full-time',
      salary: '',
      description: '',
      howToApply: 'Click the Apply button below to submit your application through our online form.',
      status: 'Open'
    });
    setEditId(null);
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      category: job.category,
      experience: job.experience,
      education: job.education,
      jobLocation: job.jobLocation,
      driveLocation: job.driveLocation || '',
      type: job.type,
      salary: job.salary || '',
      description: job.description || '',
      howToApply: job.howToApply || 'Click the Apply button below to submit your application through our online form.',
      status: job.status
    });
    setEditId(job._id);
    setIsModalOpen(true);
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await deleteJob(id);
        loadData();
      } catch (err) {
        alert('Failed to delete job');
      }
    }
  };



  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Job Listings</h1>
          <p className="text-slate-500 mt-1">Create and manage active job opportunities.</p>
        </div>

        <button 
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Post New Job</span>
        </button>


      </div>


      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          <p className="text-slate-400 font-medium">Loading job listings...</p>
        </div>

      ) : error ? (
        <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-2xl text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <>
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by title or client..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-orange-500/50 outline-none transition-all"
              />
            </div>
          </div>


          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.length > 0 ? jobs.map((job) => (
              <div key={job._id} className="group relative bg-white border border-slate-200 hover:border-orange-500/30 rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-orange-500/5 overflow-hidden shadow-sm">


                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                   <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                     job.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500' : 
                     job.status === 'Draft' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'
                   }`}>
                     {job.status}
                   </span>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform border border-slate-100">
                    <Briefcase className="w-6 h-6" />
                  </div>


                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEdit(job)}
                      className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all border border-transparent hover:border-orange-200"
                      title="Edit Job"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(job._id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-200"
                      title="Delete Job"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                  </div>
                </div>



                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">{job.title}</h3>
                  </div>




                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs truncate">{job.jobLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Award className="w-4 h-4" />
                      <span className="text-xs">{job.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-500">
                      <DollarSign className="w-4 h-4 text-orange-600" />
                      <span className="text-xs text-slate-900 font-semibold">{job.salary}</span>
                    </div>


                  </div>


                  <button className="w-full mt-4 flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold py-3 rounded-xl transition-all group/btn border border-slate-200">
                    <span>Manage Listing</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-orange-600" />
                  </button>


                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-500 italic">No job listings found. Start by posting a new opportunity.</p>
              </div>
            )}
          </div>
        </>
      )}
      {/* Post New Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white border border-slate-200 w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
            <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{editId ? 'Edit Opportunity' : 'Post New Opportunity'}</h3>
                <p className="text-slate-500 text-sm mt-1">{editId ? 'Update the details of this job listing.' : 'Fill in the details to list a new job on the portal.'}</p>
              </div>


              <button onClick={() => setIsModalOpen(false)} className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all border border-transparent hover:border-slate-200">

                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Job Title</label>

                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />

                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Senior Frontend Developer" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    />
                  </div>
                </div>


              </div>


              {/* Job Details Section */}
              <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-6 space-y-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-orange-600/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-slate-500 uppercase tracking-wider text-xs">Job Details</h4>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase">Category</label>
                    <input 
                      type="text" 
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. IT / Non-IT" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white focus:border-orange-500/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase">Experience</label>
                    <input 
                      type="text" 
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g. 2-5 Years" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white focus:border-orange-500/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase">Education</label>
                    <input 
                      type="text" 
                      required
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      placeholder="e.g. B.Tech / MCA" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white focus:border-orange-500/50 outline-none transition-all"
                    />
                  </div>

                </div>
              </div>

              {/* Location Section */}
              <div className="bg-slate-950/50 border border-slate-800/50 rounded-[24px] p-6 space-y-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-purple-600/10 rounded-lg flex items-center justify-center">
                    <MapPinned className="w-4 h-4 text-purple-500" />
                  </div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">Location Details</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase">Job Location</label>
                    <input 
                      type="text" 
                      required
                      value={formData.jobLocation}
                      onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
                      placeholder="City, State" 
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-900 focus:border-orange-500/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase">Drive Location</label>
                    <input 
                      type="text" 
                      value={formData.driveLocation}
                      onChange={(e) => setFormData({ ...formData, driveLocation: e.target.value })}
                      placeholder="Interview Venue" 
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-900 focus:border-orange-500/50 outline-none transition-all"
                    />
                  </div>


                </div>
              </div>

              {/* Other Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Salary Package</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                    <input 
                      type="text" 
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="e.g. 5 LPA - 8 LPA" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none transition-all"
                    />
                  </div>

                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Job Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 focus:border-orange-500/50 outline-none transition-all"
                  >


                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300 ml-1">Description</label>
                <textarea 
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter job description and responsibilities..." 
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-4 text-slate-900 focus:border-orange-500/50 outline-none transition-all resize-none"
                ></textarea>


              </div>

              <div className="bg-orange-600/5 border border-orange-600/20 rounded-[24px] p-6 space-y-4">
                <label className="text-sm font-bold text-orange-400 uppercase tracking-widest ml-1">How to Apply</label>
                <textarea 
                  rows="2"
                  value={formData.howToApply}
                  onChange={(e) => setFormData({ ...formData, howToApply: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-700 focus:border-orange-500/50 outline-none transition-all resize-none"
                ></textarea>


                <div className="flex items-center space-x-2 text-xs text-slate-500 italic">
                  <ChevronRight className="w-3 h-3" />
                  <span>Instruction: Click the Apply button below to submit your application through our online form.</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4 pb-8">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 transition-all shadow-sm"
                >
                  Cancel
                </button>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-600/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>{editId ? 'Update Job Listing' : 'Publish Job Listing'}</span>}
                </button>


              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

export default Jobs;
