'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Book, FileText, Award, Globe, User, LogOut, Save, Plus, Trash, Edit, Undo, Redo, X } from 'lucide-react'

// Define the type for content
type ContentType = {
  [key: string]: string;
};

// Update the defaultContent declaration
const defaultContent: ContentType = {
  profile: "Dr. Bhagaban Patra is a distinguished academic with 45 years of experience in teaching and research, specializing in Fluid Dynamics and Numerical Analysis. Born on August 20, 1941, he has made significant contributions to the field of mathematics throughout his career.",
  publications: "Research Papers Published: 38\nMathematical Articles: 30\n\nBooks Published:\n- Subrahmanyam Chandrasekhar (2014)\n- Contribution of Hindu Mathematics to World Culture (Volume I and Volume II) (Published in Odia, 2023)",
  research: "Dr. Patra's research focuses on Fluid Dynamics and Numerical Analysis. His Ph.D. thesis on Gravitational Thermal Instability has contributed significantly to the field of astrophysics and fluid mechanics.",
  awards: "- Ex-Professor and Head of Mathematics Department at a prestigious university\n- 45 years of distinguished teaching and research experience\n- Published two significant books on mathematics and its cultural impact\n- Contributed 38 research papers and 30 mathematical articles to the academic community",
  conferences: "Professor Patra has been an active participant in the mathematical community, regularly presenting his research and insights at various academic forums:\n- Presented numerous research papers at national conferences\n- Attended various international conferences across India\n- Contributed to the dissemination of mathematical knowledge through conference presentations"
};

export function Portfolio() {
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [activeTab, setActiveTab] = useState<keyof ContentType>('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showNewSectionModal, setShowNewSectionModal] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')
  const [newSectionContent, setNewSectionContent] = useState('')

  const [history, setHistory] = useState([content])
  const [historyIndex, setHistoryIndex] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedContent = localStorage.getItem('portfolioContent');
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
    }
  }, []);

  const handleLogin = () => {
    if (username === 'bhagban' && password === 'bhagban') {
      setIsLoggedIn(true)
      setShowLoginModal(false)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEditMode(false)
  }

  const handleSave = () => {
    setEditMode(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioContent', JSON.stringify(content))
    }
    alert('Changes saved successfully')
  }

  const handleContentChange = (tab: string, newContent: string) => {
    const newState = { ...content, [tab]: newContent };
    setContent(newState);
    setHistory([...history.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(historyIndex + 1);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioContent', JSON.stringify(newState));
    }
  }

  const addNewSection = () => {
    setShowNewSectionModal(true)
  }

  const handleNewSectionSave = () => {
    if (newSectionName && newSectionContent) {
      const newState = { ...content, [newSectionName.toLowerCase()]: newSectionContent }
      setContent(newState)
      setHistory([...history.slice(0, historyIndex + 1), newState])
      setHistoryIndex(historyIndex + 1)
      setActiveTab(newSectionName.toLowerCase() as keyof ContentType)
      setShowNewSectionModal(false)
      setNewSectionName('')
      setNewSectionContent('')
      localStorage.setItem('portfolioContent', JSON.stringify(newState))
    }
  }

  const deleteSection = () => {
    if (activeTab === 'profile') {
      alert("The profile section cannot be deleted.")
      return
    }
    if (confirm(`Are you sure you want to delete the "${activeTab}" section?`)) {
      const newState = { ...content }
      delete newState[activeTab]
      const tabs = Object.keys(newState) as (keyof ContentType)[]
      const newActiveTab = (tabs[tabs.indexOf(activeTab as keyof ContentType) - 1] || tabs[0])
      setContent(newState)
      setHistory([...history.slice(0, historyIndex + 1), newState])
      setHistoryIndex(historyIndex + 1)
      setActiveTab(newActiveTab)
      localStorage.setItem('portfolioContent', JSON.stringify(newState))
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setContent(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setContent(history[historyIndex + 1])
    }
  }

  useEffect(() => {
    const canvas = document.getElementById('mathAnimation') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    let time = 0

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(66, 153, 225, 0.5)'  // Light blue color
      
      // Draw some mathematical curves
      for (let i = 0; i < canvas.width; i += 10) {
        const y1 = Math.sin(i * 0.02 + time) * 20 + canvas.height / 2
        const y2 = Math.cos(i * 0.03 + time) * 15 + canvas.height / 2
        ctx.beginPath()
        ctx.arc(i, y1, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(i, y2, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      
      time += 0.05
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <canvas id="mathAnimation" className="absolute top-0 left-0 w-full h-full" width="1000" height="1000" />
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden relative z-10">
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="md:pr-8 flex-grow">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                <h1 className="text-gray-900 text-4xl font-bold">Mathematics Professor</h1>
              </div>
              <h1 className="mt-1 text-4xl font-bold text-gray-900">
                Professor (Dr.) Bhagaban Patra
              </h1>
              <p className="mt-2 text-gray-600">
                Ex-Professor and Head of Mathematics Department
              </p>
              <p className="text-gray-500">
                Institute of Technical Education and Research, Siksha O&apos; Anusandhan University, Bhubaneswar
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex-shrink-0">
              <img
                className="w-40 h-40 object-contain rounded-lg"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gEuwjZi3knVJA1grv2ZKrWnIVBJVGT.png"
                alt="Professor Bhagaban Patra"
              />
            </div>
          </div>
          <div className="flex justify-end mb-4">
            {isLoggedIn ? (
              <div className="flex space-x-2">
                {editMode ? (
                  <button onClick={handleSave} className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    <Save className="w-5 h-5 mr-2" />
                    <span className="text-white">Save</span>
                  </button>
                ) : (
                  <button onClick={() => setEditMode(true)} className="flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <Edit className="w-5 h-5 mr-2" />
                    <span className="text-white">Edit</span>
                  </button>
                )}
                <button onClick={handleLogout} className="flex items-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  <LogOut className="w-5 h-5 mr-2" />
                  <span className="text-white">Log Out</span>
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="flex items-center px-3 py-2 bg-gray-200 text-black rounded hover:bg-gray-300">
                <User className="w-5 h-5 mr-2" />
                <span className="text-black">Log In</span>
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200">
          <nav className="flex flex-wrap">
            {Object.keys(content).map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm focus:outline-none text-gray-500 ${
                  activeTab === tab
                    ? 'border-indigo-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab as keyof ContentType)}
              >
                <span className="flex items-center justify-center">
                  {tab === 'profile' && <ChevronDown className="w-4 h-4 mr-2" />}
                  {tab === 'publications' && <Book className="w-4 h-4 mr-2" />}
                  {tab === 'research' && <FileText className="w-4 h-4 mr-2" />}
                  {tab === 'awards' && <Award className="w-4 h-4 mr-2" />}
                  {tab === 'conferences' && <Globe className="w-4 h-4 mr-2" />}
                  <span className="capitalize">{tab}</span>
                </span>
              </button>
            ))}
            {isLoggedIn && editMode && (
              <button
                className="flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm focus:outline-none border-transparent text-gray-500 hover:border-gray-300"
                onClick={addNewSection}
              >
                <span className="flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Add Section</span>
                </span>
              </button>
            )}
          </nav>
        </div>

        <div className="p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {editMode ? (
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-2 mb-2">
                  <button
                    onClick={handleUndo}
                    className="px-3 py-1 bg-gray-200 text-gray-500 rounded hover:bg-gray-300"
                    disabled={historyIndex === 0}
                  >
                    <Undo className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleRedo}
                    className="px-3 py-1 bg-gray-200 text-gray-500 rounded hover:bg-gray-300"
                    disabled={historyIndex === history.length - 1}
                  >
                    <Redo className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  className="w-full h-64 p-2 border rounded text-gray-500"
                  value={content[activeTab as keyof ContentType] || ''}
                  onChange={(e) => handleContentChange(activeTab as string, e.target.value)}
                />
                {activeTab !== 'profile' && (
                  <button
                    onClick={deleteSection}
                    className="self-end flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    <span>Delete Section</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="prose max-w-none text-gray-500">
                <h2 className="text-2xl font-bold mb-4 capitalize text-gray-500">{activeTab}</h2>
                {content[activeTab] && content[activeTab].split('\n').map((line: string, index: number) => (
                  <p key={index} className="mb-2 text-gray-500">{line}</p>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <div className="bg-gray-50 px-4 py-5 sm:px-6">
          <div className="text-sm">
            <p className="font-medium text-indigo-600 hover:text-indigo-500 text-gray-500">
              Contact: +91 9861269993
            </p>
            <p className="mt-1 text-gray-500">
              District: Khurda, Odisha, India
            </p>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-500">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 border rounded text-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-500">Add New Section</h2>
            <input
              type="text"
              placeholder="Section Name"
              className="w-full p-2 mb-4 border rounded text-gray-500"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
            <textarea
              placeholder="Section Content"
              className="w-full h-64 p-2 mb-4 border rounded text-gray-500"
              value={newSectionContent}
              onChange={(e) => setNewSectionContent(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewSectionModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-500 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleNewSectionSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}