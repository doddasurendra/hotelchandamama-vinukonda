import React from 'react';

const KitchenDisplay = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Kitchen Display System</h1>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-600 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
            <p className="text-center text-5xl font-bold">0</p>
          </div>
          <div className="bg-green-600 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Preparing</h2>
            <p className="text-center text-5xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenDisplay;
