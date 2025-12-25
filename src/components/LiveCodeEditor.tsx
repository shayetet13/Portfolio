import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Copy, Download, Settings } from "lucide-react";

const LiveCodeEditor = () => {
  const [activeTab, setActiveTab] = useState("react");
  const [isRunning, setIsRunning] = useState(false);

  const codeExamples = {
    react: {
      title: "React Component",
      code: `import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Counter: {count}
      </h2>
      <div className="space-x-2">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter`,
      output: "Interactive counter component rendered successfully!",
    },
    typescript: {
      title: "TypeScript Interface",
      code: `interface User {
  id: number
  name: string
  email: string
  avatar?: string
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}

class UserManager {
  private users: User[] = []
  
  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: Date.now(),
      ...user
    }
    this.users.push(newUser)
    return newUser
  }
  
  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email)
  }
  
  updateUserPreferences(
    userId: number, 
    preferences: Partial<User['preferences']>
  ): boolean {
    const user = this.users.find(u => u.id === userId)
    if (user) {
      user.preferences = { ...user.preferences, ...preferences }
      return true
    }
    return false
  }
}`,
      output: "TypeScript types compiled successfully with full type safety!",
    },
    node: {
      title: "Node.js API",
      code: `const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.sendStatus(401)
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Save user to database
    const user = await User.create({
      email,
      password: hashedPassword
    })
    
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})`,
      output: "Express server started successfully on port 3000!",
    },
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <section className="py-20 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Code Editor
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Interactive code examples showcasing real-world implementations
          </p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm">
            {/* Editor Header */}
            <div className="flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex gap-1">
                  {Object.keys(codeExamples).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
                        activeTab === tab
                          ? "bg-slate-700 text-white border-t border-l border-r border-slate-600"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      {codeExamples[tab as keyof typeof codeExamples].title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded text-sm transition-colors"
                >
                  <Play size={14} />
                  {isRunning ? "Running..." : "Run"}
                </button>
                <button className="p-1.5 text-slate-400 hover:text-white rounded">
                  <Copy size={14} />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-white rounded">
                  <Download size={14} />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-white rounded">
                  <Settings size={14} />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2">
              {/* Code Area */}
              <div className="p-6 border-r border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Code</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live editing</span>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-slate-300 whitespace-pre-wrap">
                    {codeExamples[activeTab as keyof typeof codeExamples].code}
                  </pre>
                </div>
              </div>

              {/* Output Area */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Output</h3>
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      isRunning ? "text-yellow-400" : "text-green-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isRunning
                          ? "bg-yellow-500 animate-pulse"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <span>{isRunning ? "Executing..." : "Ready"}</span>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-lg p-4 min-h-[200px] flex items-center">
                  {isRunning ? (
                    <div className="flex items-center gap-3 text-yellow-400">
                      <div className="animate-spin w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
                      <span>Compiling and executing code...</span>
                    </div>
                  ) : (
                    <div className="text-green-400">
                      <div className="mb-2">✅ Compilation successful</div>
                      <div className="text-slate-300">
                        {
                          codeExamples[activeTab as keyof typeof codeExamples]
                            .output
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveCodeEditor;
