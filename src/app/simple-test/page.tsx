"use client"

import { useState } from "react"

export default function SimpleTabTest() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [clickCount, setClickCount] = useState(0)

  const handleTabChange = (value: string) => {
    console.log("Tab clicked:", value)
    setClickCount(prev => prev + 1)
    setActiveTab(value)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Simple Tab Test</h1>
      
      <div className="mb-4 p-4 bg-white rounded shadow">
        <p>Click Count: {clickCount}</p>
        <p>Active Tab: {activeTab}</p>
      </div>

      <div className="flex gap-2 mb-6">
        {["dashboard", "tracker", "scanner"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-3 rounded-lg text-white font-bold ${
              activeTab === tab ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow">
        {activeTab === "dashboard" && <h2 className="text-xl">Dashboard Content</h2>}
        {activeTab === "tracker" && <h2 className="text-xl">Tracker Content</h2>}
        {activeTab === "scanner" && <h2 className="text-xl">Scanner Content</h2>}
      </div>
    </div>
  )
}