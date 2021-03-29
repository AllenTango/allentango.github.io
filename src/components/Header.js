function Header() {
  return (
    <div className="header">
      <div className="flex items-center justify-between lg:px-8 px-4 py-4 sm:px-6">
        <div className="md:flex items-center">
          <a href="/" className="font-bold text-pink-500 text-2xl">
            Allen's Blog
          </a>
        </div>
        <div className="flex text-sm">
          {/* <a href="#2" className="ml-4 font-medium text-gray-500 hover:text-pink-500 sm:ml-12">快</a>
                    <a href="#3" className="ml-4 font-medium text-gray-500 hover:text-pink-500 sm:ml-12">了</a> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
