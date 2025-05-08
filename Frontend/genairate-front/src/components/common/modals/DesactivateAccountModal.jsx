import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function DeactivateAccountModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 max-w-md w-full p-6 rounded-xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold mb-3">Deactivate account</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Deactivating your account will remove it from GenAIrate within a few minutes.
          Deactivation will also immediately cancel any subscription and no money will be reimbursed.
          You can sign back in anytime to reactivate your account and restore its content.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Deactivate account
          </button>
        </div>
      </div>
    </div>
  );
  
}


