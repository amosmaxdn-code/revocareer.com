"use client";

export const ComparisonTable = ({ headers, data }: { headers: string[], data: (string | number)[][] }) => {
  const targetColumnIndex = headers.findIndex(h => h.includes('Canada (Cible)'));
  const nonTargetColumnIndex = headers.findIndex(h => h.includes('Afrique'));

  return (
    <>
      {/* Mobile View: Cards */}
      <div className="space-y-6 md:hidden">
        {data.map((row, i) => (
          <div key={i} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
            <h3 className="font-bold text-lg text-white mb-3">{row[0]}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{headers[nonTargetColumnIndex]}</span>
                <span className="font-mono">{row[nonTargetColumnIndex]}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-900/20 p-2 rounded-md">
                <span className="text-blue-400 font-semibold">{headers[targetColumnIndex]}</span>
                <span className="font-mono font-bold text-blue-300">{row[targetColumnIndex]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-900/50 rounded-lg shadow-xl border border-gray-700/50">
          <thead>
            <tr className="border-b border-gray-700/50">
              {headers.map((header, i) => (
                <th key={i} className={`py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider ${i === targetColumnIndex ? 'text-blue-400' : 'text-gray-400'}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-700/50 last:border-none">
                {row.map((cell, j) => (
                  <td key={j} className={`py-5 px-6 font-mono ${j === targetColumnIndex ? 'bg-blue-900/20 text-blue-300 font-bold' : ''}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
