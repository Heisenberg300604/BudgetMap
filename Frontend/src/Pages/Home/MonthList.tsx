import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { Month } from '../../types';
import { Calendar, Plus } from 'lucide-react';

export default function MonthList() {
  const [months, setMonths] = useState([]);
  const [error, setError] = useState<string>('');
//   const { user } = useAuth();
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMonths = async () => {
//       if (!user?.token) {
//         navigate('/login');
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:5000/api/months', {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch months');
//         }
        
//         const data = await response.json();
//         setMonths(data);
//       } catch (error) {
//         setError('Failed to load months. Please try again later.');
//         console.error('Error fetching months:', error);
//       }
//     };

//     fetchMonths();
//   }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Budget Periods</h1>
        <button
          onClick={() => navigate('/months/new')}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Period
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {months.map((month) => (
          <div
            key={month._id}
            onClick={() => navigate(`/months/${month._id}`)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                {month.name} {month.year}
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                Budget: <span className="font-semibold">${month.budget.toLocaleString()}</span>
              </p>
              <p className="text-gray-600">
                Target Savings:{' '}
                <span className="font-semibold">${month.savingTarget.toLocaleString()}</span>
              </p>
            </div>
          </div>
        ))}

        {months.length === 0 && !error && (
          <div className="col-span-full text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Budget Periods Yet</h3>
            <p className="text-gray-500">Create your first budget period to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}