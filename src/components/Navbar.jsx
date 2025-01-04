import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ walletConnected, connectWallet, onLogout, themeToggle, heading }) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 shadow-lg">
      {/* Heading */}
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{heading}</h1>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        {themeToggle}

        {/* Wallet Button */}
        {walletConnected ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  walletConnected: PropTypes.bool.isRequired,
  connectWallet: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  themeToggle: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

export default Navbar;
