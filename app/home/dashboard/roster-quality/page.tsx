'use client'

import { useState } from 'react'

export default function RosterQualityPage() {
  const [selectedState, setSelectedState] = useState('All States')
  
  const usStates = [
    'All States',
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ]
  
  // Mock data for charts
  const documentExpirationData = [
    { label: 'Active', value: 45, color: '#22C55E' },
    { label: 'Inactive', value: 28, color: '#06B6D4' },
    { label: 'Expired', value: 18, color: '#F59E0B' },
    { label: 'Suspended', value: 12, color: '#EF4444' }
  ]

  const missingDocumentsData = [
    { label: 'DEA', value: 3, color: '#10B981' },
    { label: 'BLS', value: 8, color: '#F59E0B' },
    { label: 'ACLS', value: 6, color: '#8B5CF6' },
    { label: 'PALS', value: 7, color: '#EF4444' },
    { label: 'LICENSE', value: 4, color: '#F97316' },
    { label: 'COI', value: 5, color: '#3B82F6' }
  ]

  const providerSpecialtyData = [
    { state: 'California', count: 45 },
    { state: 'New York', count: 32 },
    { state: 'Texas', count: 28 },
    { state: 'Florida', count: 38 },
    { state: 'Illinois', count: 22 },
    { state: 'Pennsylvania', count: 35 }
  ]

  const geographicDistributionData = [
    { state: 'CA', count: 85 },
    { state: 'NY', count: 72 },
    { state: 'TX', count: 58 },
    { state: 'FL', count: 43 },
    { state: 'IL', count: 39 },
    { state: 'PA', count: 31 }
  ]

  const BarChart = ({ data, title, color = '#3B82F6', showDropdown = false }: { data: any[], title: string, color?: string, showDropdown?: boolean }) => {
    const maxValue = Math.max(...data.map(d => d.count))
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {showDropdown && (
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-16 text-sm text-gray-600 font-medium">
                {item.month || item.specialty || item.state}
              </div>
              <div className="flex-1 mx-3">
                <div className="bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ 
                      width: `${(item.count / maxValue) * 100}%`,
                      backgroundColor: color
                    }}
                  >
                    <span className="text-white text-xs font-medium">{item.count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const PieChart = ({ data, title }: { data: any[], title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let cumulativePercentage = 0

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100
                const strokeDasharray = `${percentage} ${100 - percentage}`
                const strokeDashoffset = -cumulativePercentage
                cumulativePercentage += percentage
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="15.915"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                )
              })}
            </svg>
          </div>
          <div className="ml-8 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="ml-2 text-sm text-gray-500">
                  {Math.round((item.value / total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 4-section grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Left - License Status Pie Chart */}
        <PieChart 
          data={documentExpirationData} 
          title="License Status"
        />
        
        {/* Top Right - Missing Documents Pie Chart */}
        <PieChart 
          data={missingDocumentsData} 
          title="Missing Documents"
        />
        
        {/* Bottom Left - State Wise Provider Distribution Bar Chart */}
        <BarChart 
          data={providerSpecialtyData} 
          title="State Wise Provider Distribution" 
          color="#10B981"
        />
        
        {/* Bottom Right - City Wise Provider Distribution Bar Chart */}
        <BarChart 
          data={geographicDistributionData} 
          title="City Wise Provider Distribution" 
          color="#F59E0B"
          showDropdown={true}
        />
      </div>
    </div>
  )
}
