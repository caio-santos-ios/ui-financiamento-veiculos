type TProps = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  totalData: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalData, totalPages, totalCount, onPageChange }: TProps) => (
  <div className="flex justify-between items-center mt-4">
    <h4 className="text-sm text-gray-700 dark:text-gray-400">
      Mostrando <span className="font-medium">{totalData}</span> de <span className="font-medium">{totalCount}</span>
    </h4>
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
      >Anterior</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i + 1} onClick={() => onPageChange(i + 1)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors
            ${currentPage === i + 1 ? "bg-brand-500 text-white" : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
        >{i + 1}</button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
      >Próximo</button>
    </div>
  </div>
);

export default Pagination;
