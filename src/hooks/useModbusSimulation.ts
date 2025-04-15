import { useState, useEffect } from 'react';
import { ModbusConfig, LogEntry } from '../types/modbus';
import { createModbusFrame, generateRandomValue, formatValue } from '../utils/modbusUtils';
import { formatTimestamp } from '../utils/dateUtils';

interface UseModbusSimulationProps {
  isRunning: boolean;
  config: ModbusConfig;
  range: { min: number; max: number };
  parameterName: string;
  unit: string;
}

export function useModbusSimulation({
  isRunning,
  config,
  range,
  parameterName,
  unit,
}: UseModbusSimulationProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        const value = generateRandomValue(range.min, range.max, config.functionCode);
        const frame = createModbusFrame({ ...config, unitId: config.unitId }, value);
        const timestamp = formatTimestamp(new Date());
        
        const formattedValue = formatValue(value, config.functionCode);
        
        const newLog: LogEntry = {
          timestamp,
          deviceId: config.unitId,
          frame,
          value: formattedValue,
          parameterName,
          unit: config.functionCode <= 2 ? '' : unit, // No unit for boolean values
        };
        
        // Send data through WebSocket if available
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
          fetch('/ws-broadcast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLog),
          }).catch(console.error);
        }

        setLogs((prev) => [...prev.slice(-49), newLog]);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, config, range, parameterName, unit]);

  const clearLogs = () => setLogs([]);

  const exportLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modbus-logs-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { logs, clearLogs, exportLogs };
}