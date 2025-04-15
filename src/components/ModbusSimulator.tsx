import React from 'react';
import { SensorCard } from './SensorCard';
import { FunctionCodeHelp } from './FunctionCodeHelp';
import { SENSOR_TYPES } from '../types/sensors';
import { Github, RefreshCw, AlertTriangle } from 'lucide-react';

interface ModbusSimulatorProps {
  countdown: number;
}

export function ModbusSimulator({ countdown }: ModbusSimulatorProps) {
  const [showFunctionCodes, setShowFunctionCodes] = React.useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-[1200px] w-full p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* WebSocket Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 text-amber-800">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">Demo Environment Notice</p>
              <div className="text-amber-900 font-mono bg-amber-100/80 px-3 py-1 rounded-full flex items-center gap-2">
                <RefreshCw className="w-3 h-3 animate-spin" />
                {formatTime(countdown)}
              </div>
            </div>
            <p className="text-sm">
              For stability and security reasons, all demo state is reset every 3 minutes. 
              For production usage, please deploy your own instance using the source code provided on GitHub.
            </p>
          </div>
        </div>

        <div className="text-center text-white py-4 lg:py-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Modbus TCP Multi-Sensor Simulator
          </h1>
          <p className="text-sm lg:text-base opacity-90 mb-4">
            Simulate multiple industrial sensors with real-time Modbus TCP frame generation
          </p>
          
          {/* GitHub Repository Section */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="flex items-center gap-2 text-white/90">
              <Github className="w-4 h-4 lg:w-5 lg:h-5" />
              <h2 className="text-base lg:text-lg font-semibold">GitHub Repository</h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="https://github.com/tunasakar/modbus-simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#24292f] text-white rounded-md hover:bg-[#31363d] transition-all duration-200 shadow hover:shadow-md"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium text-sm">modbus-simulator</span>
                <div className="hidden sm:flex gap-2 ml-2 border-l border-gray-600 pl-2">
                  <img 
                    src="https://img.shields.io/github/forks/tunasakar/modbus-simulator?style=flat&labelColor=24292F" 
                    alt="Forks"
                    className="h-4" 
                  />
                  <img 
                    src="https://img.shields.io/github/stars/tunasakar/modbus-simulator?style=flat&labelColor=24292F" 
                    alt="Stars"
                    className="h-4" 
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        
        {/* Function Code Reference Toggle Button (Mobile) */}
        <div className="lg:hidden flex justify-center">
          <button
            onClick={() => setShowFunctionCodes(!showFunctionCodes)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            {showFunctionCodes ? 'Hide' : 'Show'} Function Codes
          </button>
        </div>

        {/* Function Code Reference */}
        <div className={`${showFunctionCodes ? 'block' : 'hidden'} lg:block`}>
          <FunctionCodeHelp />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SENSOR_TYPES.map((sensor) => (
            <SensorCard
              key={sensor.id}
              sensor={sensor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}