function Main({ children }) {
  return (
    <div className="main">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-2">
        {children}
      </div>
    </div>
  );
}

export default Main;
