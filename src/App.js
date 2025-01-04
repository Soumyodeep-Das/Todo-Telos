import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ethers } from 'ethers';
import { ThemeProvider } from './ThemeContext';
import rawABI from './TodoABI.json';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [contract, setContract] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const TodoABI = useMemo(() => rawABI, []);
  const provider = useMemo(() => {
    if (typeof window.ethereum !== 'undefined') {
      return new ethers.BrowserProvider(window.ethereum);
    } else {
      console.error('Ethereum provider not found');
      return null;
    }
  }, []);

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const connectWallet = async () => {
    try {
      if (provider) {
        const accounts = await provider.send('eth_requestAccounts', []);
        if (accounts.length > 0) {
          setWalletConnected(true);
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const initializeContract = useCallback(async () => {
    if (provider && walletConnected) {
      try {
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, TodoABI, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    }
  }, [provider, TodoABI, contractAddress, walletConnected]);

  const fetchTasks = useCallback(async () => {
    if (contract) {
      try {
        const tasks = await contract.getTasks();
        const formattedTasks = tasks.map(task => ({
          task: task[0],
          completed: task[1],
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  }, [contract]);

  const addTask = async () => {
    if (contract) {
      try {
        const tx = await contract.addTask(newTask);
        await tx.wait();
        fetchTasks();
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const completeTask = async index => {
    if (contract) {
      try {
        const tx = await contract.completeTask(index);
        await tx.wait();
        fetchTasks();
      } catch (error) {
        console.error('Error completing task:', error);
      }
    }
  };

  const deleteTask = async index => {
    if (contract) {
      try {
        const tx = await contract.deleteTask(index);
        await tx.wait();
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleLogout = () => {
    setWalletConnected(false);
    setContract(null);
    setTasks([]);
  };

  useEffect(() => {
    initializeContract();
  }, [initializeContract]);

  useEffect(() => {
    if (walletConnected) {
      fetchTasks();
    }
  }, [walletConnected, fetchTasks]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100">
        <Navbar
          walletConnected={walletConnected}
          connectWallet={connectWallet}
          onLogout={handleLogout}
          themeToggle={<ThemeToggle />}
          heading="Task Manager"
        />
        <div className="p-4 transition duration-300">
          <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
              Todo List
            </h2>
            <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
            <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
