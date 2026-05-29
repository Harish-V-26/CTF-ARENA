import React, { useState, useEffect, useRef } from 'react';

const ShieldIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ChevronUpIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export default function CreateRoom() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    roomName: '',
    description: '',
    roomType: 'Walkthrough',
    difficulty: 'Easy',
    visibility: 'Private',
    tasks: [
      {
        id: Date.now(),
        title: 'Task 1',
        description: '',
        isExpanded: true,
        questions: [{ id: Date.now() + 1, text: '', answer: '', points: 10, hint: '' }]
      }
    ],
    files: [],
    vm: {
      osType: 'Linux',
      osVersion: '',
      ram: '1GB',
      cpu: 1
    },
    tags: [],
    avatar: null,
    categories: []
  });

  const [touched, setTouched] = useState({});
  const [tagInput, setTagInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const updateData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getValidations = () => {
    const isRoomNameValid = formData.roomName.length >= 3 && formData.roomName.length <= 50;
    const hasTasks = formData.tasks.length > 0;
    const allTasksHaveQuestions = formData.tasks.every((t) => t.questions.length > 0);
    const allQuestionsHaveAnswers = formData.tasks.every((t) =>
      t.questions.every((q) => q.answer.trim().length > 0)
    );
    const hasEnoughTags = formData.tags.length >= 4;
    const hasAvatar = formData.avatar !== null;

    return {
      isRoomNameValid,
      hasTasks,
      allTasksHaveQuestions,
      allQuestionsHaveAnswers,
      hasEnoughTags,
      hasAvatar,
      canPublish:
        isRoomNameValid &&
        hasTasks &&
        allTasksHaveQuestions &&
        allQuestionsHaveAnswers &&
        (formData.visibility === 'Private' || (hasEnoughTags && hasAvatar))
    };
  };

  const validations = getValidations();

  const handlePublish = () => {
    if (validations.canPublish) {
      const url = `/room/${formData.roomName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      setPublishedUrl(url);
      setShowModal(true);
    }
  };

  const totalQuestions = formData.tasks.reduce((sum, task) => sum + task.questions.length, 0);

  // Task Helpers
  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: Date.now(),
          title: `Task ${prev.tasks.length + 1}`,
          description: '',
          isExpanded: true,
          questions: []
        }
      ]
    }));
  };

  const removeTask = (taskId) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }));
  };

  const updateTask = (taskId, field, value) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t)
    }));
  };

  const addQuestion = (taskId) => {
    if (totalQuestions >= 15) return;
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            questions: [...t.questions, { id: Date.now(), text: '', answer: '', points: 10, hint: '' }]
          };
        }
        return t;
      })
    }));
  };

  const removeQuestion = (taskId, questionId) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === taskId) {
          return { ...t, questions: t.questions.filter(q => q.id !== questionId) };
        }
        return t;
      })
    }));
  };

  const updateQuestion = (taskId, questionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            questions: t.questions.map(q => q.id === questionId ? { ...q, [field]: value } : q)
          };
        }
        return t;
      })
    }));
  };

  const insertMachineIp = (taskId) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === taskId) {
          return { ...t, description: t.description + '{{machine_ip}}' };
        }
        return t;
      })
    }));
  };

  // Tag Helpers
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        updateData('tags', [...formData.tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    updateData('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const toggleCategory = (cat) => {
    if (formData.categories.includes(cat)) {
      updateData('categories', formData.categories.filter(c => c !== cat));
    } else {
      updateData('categories', [...formData.categories, cat]);
    }
  };

  // File Upload Helpers
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map(f => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
      id: Date.now() + Math.random()
    }));
    updateData('files', [...formData.files, ...uploadedFiles]);
  };

  const removeFile = (fileId) => {
    updateData('files', formData.files.filter(f => f.id !== fileId));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e) => updateData('avatar', e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PNG image.");
    }
  };

  const availableCategories = ['Web', 'Network', 'Crypto', 'Forensics', 'OSINT', 'Reversing', 'Pwn', 'Scripting', 'Steganography', 'Misc'];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-300 font-mono relative">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-8 flex flex-col h-screen overflow-hidden">
        {/* Header & Progress */}
        <header className="mb-6 flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-[#00ff88] mb-4 tracking-widest uppercase border-b border-[#00ff88]/30 pb-4 shadow-[#00ff88]/10 drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]">
            &gt; INIT_ROOM_SEQUENCE
          </h1>
          
          <div className="flex justify-between items-center mb-2 px-2">
            {['Room Info', 'Tasks Builder', 'Assets & VMs', 'Tags & Avatar', 'Review'].map((label, i) => (
              <div key={i} className={`flex flex-col items-center ${step === i + 1 ? 'text-[#00ff88]' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-300 ${
                  step >= i + 1 ? 'border-[#00ff88] bg-[#00ff88]/10 shadow-[0_0_10px_rgba(0,255,136,0.3)]' : 'border-gray-700 bg-gray-900'
                }`}>
                  {step > i + 1 ? <CheckIcon className="w-5 h-5 text-[#00ff88]" /> : i + 1}
                </div>
                <span className="text-[10px] md:text-xs hidden md:block uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
          
          <div className="h-1 w-full bg-gray-800 relative rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.8)] transition-all duration-500 ease-out" 
                 style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
          <div className="animate-fade-in transition-all duration-300">
            {/* --- STEP 1: ROOM INFO --- */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-[#00ff88] mb-2 text-sm uppercase tracking-wider">&gt; Room Name *</label>
                  <input type="text" value={formData.roomName} onChange={e => updateData('roomName', e.target.value)} onBlur={() => handleBlur('roomName')}
                    className={`w-full bg-[#0d1326] border ${touched.roomName && (formData.roomName.length < 3 || formData.roomName.length > 50) ? 'border-red-500' : 'border-[#1a2340] focus:border-[#00ff88]'} p-4 text-white outline-none font-mono transition-colors shadow-inner`}
                    placeholder="e.g., Basic Pentesting" />
                  {touched.roomName && (formData.roomName.length < 3 || formData.roomName.length > 50) && (
                    <span className="text-red-500 text-xs mt-2 block">&gt; ERR: Name must be between 3 and 50 characters.</span>
                  )}
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="block text-[#00ff88] mb-2 text-sm uppercase tracking-wider">&gt; Description</label>
                    <span className={`text-xs ${formData.description.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                      {formData.description.length} / 500
                    </span>
                  </div>
                  <textarea value={formData.description} onChange={e => updateData('description', e.target.value)}
                    className="w-full bg-[#0d1326] border border-[#1a2340] focus:border-[#00ff88] p-4 text-white outline-none font-mono min-h-[150px] transition-colors resize-y"
                    placeholder="Describe the learning objectives..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[#00ff88] mb-3 text-sm uppercase tracking-wider">&gt; Room Type</label>
                    <select value={formData.roomType} onChange={e => updateData('roomType', e.target.value)}
                      className="w-full bg-[#0d1326] border border-[#1a2340] focus:border-[#00ff88] p-4 text-white outline-none font-mono appearance-none cursor-pointer">
                      <option>Walkthrough</option>
                      <option>Challenge</option>
                      <option>Workshop</option>
                      <option>Quiz</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#00ff88] mb-3 text-sm uppercase tracking-wider">&gt; Visibility</label>
                    <div className="flex bg-[#0d1326] border border-[#1a2340] p-1">
                      {['Public', 'Private'].map(vis => (
                        <button key={vis} onClick={() => updateData('visibility', vis)}
                          className={`flex-1 py-3 text-sm uppercase tracking-wider transition-colors ${formData.visibility === vis ? 'bg-[#00ff88] text-[#0a0e1a] font-bold' : 'text-gray-400 hover:text-white'}`}>
                          {vis}
                        </button>
                      ))}
                    </div>
                    {formData.visibility === 'Public' && (
                      <p className="text-yellow-500 text-xs mt-3 flex items-start gap-2">
                        <span className="mt-0.5">⚠️</span> Public rooms require 4+ tags and an avatar.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#00ff88] mb-3 text-sm uppercase tracking-wider">&gt; Difficulty</label>
                  <div className="flex gap-4">
                    {[
                      { label: 'Easy', color: 'text-green-500', border: 'border-green-500', bg: 'bg-green-500/10' },
                      { label: 'Medium', color: 'text-yellow-500', border: 'border-yellow-500', bg: 'bg-yellow-500/10' },
                      { label: 'Hard', color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-500/10' }
                    ].map(diff => (
                      <button key={diff.label} onClick={() => updateData('difficulty', diff.label)}
                        className={`flex-1 py-4 border ${formData.difficulty === diff.label ? `${diff.border} ${diff.bg} ${diff.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]` : 'border-[#1a2340] text-gray-500 hover:border-gray-500'} transition-all uppercase tracking-wider font-bold`}>
                        {diff.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: TASKS BUILDER --- */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl text-[#00ff88] uppercase tracking-wider">&gt; Mission Tasks</h2>
                  <div className="bg-[#0d1326] px-4 py-2 border border-[#1a2340] flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Questions:</span>
                    <span className={`font-bold ${totalQuestions > 15 ? 'text-red-500' : 'text-[#00ff88]'}`}>
                      {totalQuestions} / 15
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {formData.tasks.map((task, index) => (
                    <div key={task.id} className="bg-[#0d1326] border border-[#1a2340] hover:border-[#00ff88]/50 transition-colors">
                      {/* Task Header */}
                      <div className="p-4 bg-[#11182c] border-b border-[#1a2340] flex justify-between items-center cursor-pointer"
                           onClick={() => updateTask(task.id, 'isExpanded', !task.isExpanded)}>
                        <div className="flex items-center gap-4 w-full">
                          <span className="text-[#00ff88] font-bold">#{index + 1}</span>
                          <input type="text" value={task.title} onChange={e => updateTask(task.id, 'title', e.target.value)} onClick={e => e.stopPropagation()}
                            className="bg-transparent border-b border-gray-700 focus:border-[#00ff88] text-white outline-none flex-1 py-1 font-mono"
                            placeholder="Task Title" />
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <button onClick={(e) => { e.stopPropagation(); removeTask(task.id); }} className="text-red-500 hover:text-red-400 p-2">
                            <TrashIcon />
                          </button>
                          {task.isExpanded ? <ChevronUpIcon className="text-gray-400" /> : <ChevronDownIcon className="text-gray-400" />}
                        </div>
                      </div>

                      {/* Task Body */}
                      {task.isExpanded && (
                        <div className="p-6 space-y-6 animate-fade-in">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-xs text-gray-400 uppercase tracking-wider">Markdown Description</label>
                              <button onClick={() => insertMachineIp(task.id)} className="text-xs bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 px-2 py-1 hover:bg-[#00ff88]/20 transition-colors">
                                + {'{{machine_ip}}'}
                              </button>
                            </div>
                            <textarea value={task.description} onChange={e => updateTask(task.id, 'description', e.target.value)}
                              className="w-full bg-[#0a0e1a] border border-[#1a2340] focus:border-[#00ff88] p-3 text-sm text-gray-300 outline-none font-mono min-h-[100px]"
                              placeholder="Explain the task objectives using markdown..."></textarea>
                          </div>

                          <div className="pt-4 border-t border-[#1a2340]">
                            <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">&gt; Questions</h4>
                            <div className="space-y-4">
                              {task.questions.map((q, qIndex) => (
                                <div key={q.id} className="pl-4 border-l-2 border-gray-700 space-y-3 relative group">
                                  <div className="flex items-start gap-4">
                                    <span className="text-gray-600 mt-2">{qIndex + 1}.</span>
                                    <input type="text" value={q.text} onChange={e => updateQuestion(task.id, q.id, 'text', e.target.value)}
                                      className="flex-1 bg-[#0a0e1a] border border-[#1a2340] focus:border-[#00ff88] p-2 text-sm text-white outline-none"
                                      placeholder="Question text (e.g. What is the open port?)" />
                                    <button onClick={() => removeQuestion(task.id, q.id)} className="text-gray-500 hover:text-red-500 mt-2">
                                      <XIcon />
                                    </button>
                                  </div>
                                  <div className="flex gap-4 ml-8">
                                    <input type="password" value={q.answer} onChange={e => updateQuestion(task.id, q.id, 'answer', e.target.value)}
                                      className="flex-1 bg-[#0a0e1a] border border-[#1a2340] focus:border-[#00ff88] p-2 text-sm text-[#00ff88] outline-none"
                                      placeholder="Answer / Flag" />
                                    <input type="number" value={q.points} onChange={e => updateQuestion(task.id, q.id, 'points', parseInt(e.target.value) || 0)}
                                      className="w-20 bg-[#0a0e1a] border border-[#1a2340] focus:border-[#00ff88] p-2 text-sm text-white outline-none text-center"
                                      title="Points" />
                                  </div>
                                  <div className="ml-8">
                                    <input type="text" value={q.hint} onChange={e => updateQuestion(task.id, q.id, 'hint', e.target.value)}
                                      className="w-full bg-[#0a0e1a] border border-[#1a2340] focus:border-yellow-500 p-2 text-xs text-yellow-500/80 outline-none"
                                      placeholder="Hint (optional)" />
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {totalQuestions < 15 && (
                              <button onClick={() => addQuestion(task.id)} className="mt-4 flex items-center gap-2 text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                                <PlusIcon className="w-4 h-4" /> Add Question
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button onClick={addTask} className="w-full py-4 border border-dashed border-[#1a2340] text-gray-500 hover:text-[#00ff88] hover:border-[#00ff88] transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
                  <PlusIcon /> Add New Task
                </button>
              </div>
            )}

            {/* --- STEP 3: ASSETS & VMS --- */}
            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-[#00ff88] mb-4 uppercase tracking-wider">&gt; Virtual Machine Config</h2>
                  <div className="bg-[#0d1326] p-6 border border-[#1a2340] grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">OS Type</label>
                      <select value={formData.vm.osType} onChange={e => updateData('vm', { ...formData.vm, osType: e.target.value })}
                        className="w-full bg-[#0a0e1a] border border-[#1a2340] p-3 text-white outline-none focus:border-[#00ff88]">
                        <option>Linux</option>
                        <option>Windows</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">OS Version (optional)</label>
                      <input type="text" value={formData.vm.osVersion} onChange={e => updateData('vm', { ...formData.vm, osVersion: e.target.value })}
                        className="w-full bg-[#0a0e1a] border border-[#1a2340] p-3 text-white outline-none focus:border-[#00ff88]"
                        placeholder="e.g. Ubuntu 22.04" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">RAM Allocation</label>
                      <select value={formData.vm.ram} onChange={e => updateData('vm', { ...formData.vm, ram: e.target.value })}
                        className="w-full bg-[#0a0e1a] border border-[#1a2340] p-3 text-white outline-none focus:border-[#00ff88]">
                        <option>512MB</option>
                        <option>1GB</option>
                        <option>2GB</option>
                        <option>4GB</option>
                        <option>8GB</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">CPU Cores</label>
                      <input type="number" min="1" max="8" value={formData.vm.cpu} onChange={e => updateData('vm', { ...formData.vm, cpu: parseInt(e.target.value) || 1 })}
                        className="w-full bg-[#0a0e1a] border border-[#1a2340] p-3 text-white outline-none focus:border-[#00ff88]" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[#00ff88] mb-4 uppercase tracking-wider">&gt; Room Assets</h2>
                  <div className="relative border-2 border-dashed border-[#1a2340] bg-[#0d1326] p-10 text-center hover:border-[#00ff88]/50 transition-colors group">
                    <input type="file" multiple accept=".ova,.vmdk,.zip,.pdf,.txt" onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="pointer-events-none">
                      <svg className="mx-auto h-12 w-12 text-gray-500 group-hover:text-[#00ff88] mb-4 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-gray-400">Drag & drop files here, or click to browse</p>
                      <p className="text-xs text-gray-600 mt-2">Accepts .ova, .vmdk, .zip, .pdf, .txt (Max 50MB)</p>
                    </div>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h4 className="text-sm text-gray-400 mb-2">Uploaded Files:</h4>
                      {formData.files.map(file => (
                        <div key={file.id} className="flex justify-between items-center bg-[#0a0e1a] border border-[#1a2340] p-3 text-sm">
                          <div className="flex items-center gap-3">
                            <span className="text-blue-400">📄</span>
                            <span className="text-gray-300">{file.name}</span>
                            <span className="text-gray-600">({file.size})</span>
                          </div>
                          <button onClick={() => removeFile(file.id)} className="text-red-500 hover:text-red-400">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- STEP 4: TAGS & AVATAR --- */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-8">
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <h2 className="text-[#00ff88] uppercase tracking-wider">&gt; Room Tags</h2>
                        <span className={`text-xs px-2 py-1 rounded ${formData.tags.length >= 4 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                          {formData.tags.length} / 4 minimum tags
                        </span>
                      </div>
                      
                      <div className="bg-[#0d1326] border border-[#1a2340] p-4 min-h-[120px] focus-within:border-[#00ff88] transition-colors">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.tags.map(tag => (
                            <span key={tag} onClick={() => removeTag(tag)} className="bg-[#1a2340] text-gray-300 px-3 py-1 text-sm flex items-center gap-2 cursor-pointer hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-500/50 transition-colors group">
                              #{tag}
                              <XIcon className="w-3 h-3 text-gray-500 group-hover:text-red-400" />
                            </span>
                          ))}
                          <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown}
                            className="bg-transparent text-white outline-none flex-1 min-w-[150px] p-1 font-mono text-sm"
                            placeholder="Type a tag and press Enter..." />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-gray-400 mb-4 text-sm uppercase tracking-wider">&gt; Categories</h2>
                      <div className="flex flex-wrap gap-3">
                        {availableCategories.map(cat => (
                          <button key={cat} onClick={() => toggleCategory(cat)}
                            className={`px-4 py-2 text-sm border transition-all ${formData.categories.includes(cat) ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.2)]' : 'bg-[#0a0e1a] border-[#1a2340] text-gray-500 hover:border-gray-500'}`}>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Avatar Upload */}
                  <div>
                    <h2 className="text-[#00ff88] mb-4 uppercase tracking-wider text-center">&gt; Room Avatar</h2>
                    <div className="bg-[#0d1326] border border-[#1a2340] p-6 flex flex-col items-center justify-center">
                      <div className="relative w-40 h-40 rounded-full border-2 border-dashed border-gray-600 bg-[#0a0e1a] flex items-center justify-center mb-6 overflow-hidden group">
                        {formData.avatar ? (
                          <img src={formData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                        ) : (
                          <ShieldIcon className="w-16 h-16 text-gray-700" />
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-white uppercase tracking-widest">Upload</span>
                        </div>
                        <input type="file" accept="image/png" onChange={handleAvatarUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                      <p className="text-xs text-gray-500 text-center">PNG format only. Ideal size 400x400px.</p>
                      {formData.visibility === 'Public' && !formData.avatar && (
                        <p className="text-red-400 text-xs mt-4 text-center">⚠️ Required for public rooms</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 5: REVIEW & PUBLISH --- */}
            {step === 5 && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-6">
                  <h2 className="text-2xl text-white font-bold mb-6">&gt; Room Overview</h2>
                  
                  <div className="bg-[#0d1326] border border-[#1a2340] p-6 shadow-lg">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-24 h-24 rounded bg-[#0a0e1a] border border-[#1a2340] flex items-center justify-center overflow-hidden flex-shrink-0">
                        {formData.avatar ? <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <ShieldIcon className="w-10 h-10 text-gray-700" />}
                      </div>
                      <div>
                        <h3 className="text-2xl text-[#00ff88] font-bold mb-2">{formData.roomName || 'Untitled Room'}</h3>
                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="px-2 py-1 bg-[#1a2340] text-xs text-gray-300">{formData.roomType}</span>
                          <span className={`px-2 py-1 text-xs border ${formData.difficulty === 'Easy' ? 'border-green-500 text-green-500' : formData.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'}`}>
                            {formData.difficulty}
                          </span>
                          <span className={`px-2 py-1 text-xs border ${formData.visibility === 'Public' ? 'border-blue-500 text-blue-400' : 'border-gray-500 text-gray-400'}`}>
                            {formData.visibility}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pt-6 border-t border-[#1a2340]">
                      <div className="text-center">
                        <div className="text-3xl text-white mb-1 font-bold">{formData.tasks.length}</div>
                        <div className="text-xs text-gray-500 uppercase">Tasks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl text-white mb-1 font-bold">{totalQuestions}</div>
                        <div className="text-xs text-gray-500 uppercase">Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl text-white mb-1 font-bold">{formData.tags.length}</div>
                        <div className="text-xs text-gray-500 uppercase">Tags</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl text-white mb-1 font-bold">{formData.files.length}</div>
                        <div className="text-xs text-gray-500 uppercase">Files</div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#1a2340]">
                      <h4 className="text-sm text-gray-400 mb-2 uppercase">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.length > 0 ? formData.tags.map(tag => (
                          <span key={tag} className="text-sm text-[#00ff88]">#{tag}</span>
                        )) : <span className="text-gray-600 text-sm italic">No tags added</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-[#0a0e1a] border border-[#1a2340] p-6 sticky top-0">
                    <h3 className="text-lg text-white mb-6 uppercase tracking-wider border-b border-[#1a2340] pb-4">Pre-Flight Checks</h3>
                    
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        {validations.isRoomNameValid ? <CheckIcon className="w-5 h-5 text-[#00ff88] mt-0.5" /> : <XIcon className="w-5 h-5 text-red-500 mt-0.5" />}
                        <span className={validations.isRoomNameValid ? 'text-gray-300' : 'text-gray-500'}>Room name provided (3-50 chars)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        {validations.hasTasks ? <CheckIcon className="w-5 h-5 text-[#00ff88] mt-0.5" /> : <XIcon className="w-5 h-5 text-red-500 mt-0.5" />}
                        <span className={validations.hasTasks ? 'text-gray-300' : 'text-gray-500'}>At least 1 task created</span>
                      </li>
                      <li className="flex items-start gap-3">
                        {validations.allTasksHaveQuestions ? <CheckIcon className="w-5 h-5 text-[#00ff88] mt-0.5" /> : <XIcon className="w-5 h-5 text-red-500 mt-0.5" />}
                        <span className={validations.allTasksHaveQuestions ? 'text-gray-300' : 'text-gray-500'}>All tasks have >= 1 question</span>
                      </li>
                      <li className="flex items-start gap-3">
                        {validations.allQuestionsHaveAnswers ? <CheckIcon className="w-5 h-5 text-[#00ff88] mt-0.5" /> : <XIcon className="w-5 h-5 text-red-500 mt-0.5" />}
                        <span className={validations.allQuestionsHaveAnswers ? 'text-gray-300' : 'text-gray-500'}>All questions have answers</span>
                      </li>
                      
                      {formData.visibility === 'Public' && (
                        <>
                          <li className="flex items-start gap-3 pt-2 border-t border-[#1a2340]">
                            {validations.hasEnoughTags ? <CheckIcon className="w-5 h-5 text-[#00ff88] mt-0.5" /> : <XIcon className="w-5 h-5 text-red-500 mt-0.5" />}
                            <span className={validations.hasEnoughTags ? 'text-gray-300' : 'text-gray-500'}>4+ tags (Public requirement)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            {validations.hasAvatar ? <CheckIcon className="w-5 h-5 text-[#00ff88] mt-0.5" /> : <XIcon className="w-5 h-5 text-red-500 mt-0.5" />}
                            <span className={validations.hasAvatar ? 'text-gray-300' : 'text-gray-500'}>Avatar uploaded (Public requirement)</span>
                          </li>
                        </>
                      )}
                    </ul>

                    <div className="mt-8 p-4 bg-[#0d1326] border border-[#1a2340]">
                      <p className="text-xs text-gray-400 mb-2">System Status:</p>
                      {validations.canPublish ? (
                        <p className="text-sm text-[#00ff88] animate-pulse">ALL SYSTEMS GO. READY TO DEPLOY.</p>
                      ) : (
                        <p className="text-sm text-red-500">ERRORS DETECTED. CANNOT DEPLOY.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer Navigation */}
        <footer className="flex-shrink-0 mt-4 pt-6 border-t border-[#00ff88]/20 flex justify-between items-center bg-[#0a0e1a]/80 backdrop-blur pb-4">
          <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} 
            className="px-6 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors uppercase tracking-widest text-sm font-bold">
            &lt; Previous
          </button>
          
          {step < 5 ? (
            <button onClick={() => setStep(s => Math.min(5, s + 1))} 
              className="px-8 py-3 bg-[#00ff88]/10 border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/20 transition-all uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(0,255,136,0.15)] hover:shadow-[0_0_25px_rgba(0,255,136,0.3)]">
              Next Step &gt;
            </button>
          ) : (
            <div className="flex gap-4">
              <button className="px-6 py-3 border border-gray-700 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold hidden md:block">
                Save Draft
              </button>
              <button onClick={handlePublish} disabled={!validations.canPublish} 
                className="px-8 py-3 bg-[#00ff88] text-[#0a0e1a] font-bold hover:bg-[#00ff88]/90 transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(0,255,136,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
                DEPLOY ROOM
              </button>
            </div>
          )}
        </footer>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0a0e1a] border border-[#00ff88] p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,255,136,0.2)] animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00ff88]"></div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#00ff88]/10 border border-[#00ff88] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <CheckIcon className="w-8 h-8 text-[#00ff88]" />
              </div>
              <h2 className="text-2xl text-white font-bold mb-2 uppercase tracking-widest">Room Deployed</h2>
              <p className="text-gray-400 text-sm">Your room has been successfully created and published to the network.</p>
            </div>
            
            <div className="bg-[#0d1326] border border-[#1a2340] p-4 mb-6">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Access URL:</p>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={`https://platform.com${publishedUrl}`} className="flex-1 bg-transparent text-[#00ff88] text-sm outline-none font-mono" />
                <button onClick={() => navigator.clipboard.writeText(`https://platform.com${publishedUrl}`)} className="text-gray-400 hover:text-white transition-colors p-2" title="Copy URL">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </button>
              </div>
            </div>

            <button onClick={() => setShowModal(false)} className="w-full py-3 bg-[#0a0e1a] border border-gray-600 text-white hover:border-white transition-colors uppercase tracking-widest text-sm font-bold">
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
