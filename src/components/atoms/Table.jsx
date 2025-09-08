import { useState } from 'react';

const Table = ({ 
  columns = [], 
  data = [], 
  emptyMessage = "Aucun élément à afficher",
  className = "",
  stickyHeader = false,
  hoverable = true
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className={`bg-[#232B3E] rounded-xl shadow-panel p-0 overflow-hidden w-full ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left" role="table">
          <thead className={`bg-[#222C3B] text-[#AAB7C6] uppercase text-xs tracking-wide font-semibold
                           ${stickyHeader ? 'sticky top-0 z-10 shadow-sm' : ''}`}>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="py-4 px-6 first:pl-6 last:pr-6"
                  scope="col"
                >
                  {column.label || column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition-all duration-100 ease-[cubic-bezier(0.23,1,0.32,1)]
                            ${hoverable && hoveredRow === rowIndex 
                              ? 'bg-[#222C3B] scale-[1.02] shadow-sm' 
                              : 'hover:bg-[#222C3B] hover:scale-[1.02]'
                            }`}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  tabIndex={hoverable ? 0 : -1}
                  role="row"
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex}
                      className="py-4 px-6 first:pl-6 last:pr-6 text-[#F1F5F9]"
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="text-center py-10 text-[#AAB7C6] text-base"
                  role="cell"
                  aria-live="polite"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
