import './App.css';
import EmptyNetworkGraph from './components/EmptyNetworkGraph';
import EmptyInfluenceRanking from './components/EmptyInfluenceRanking';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/50 backdrop-blur-sm p-4 border-r border-gray-800">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-full mr-2 flex items-center justify-center">
              <span className="text-white text-sm font-bold">H</span>
            </div>
            <h1 className="text-xl font-bold">handshake</h1>
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <span className="w-2 h-2 bg-transparent rounded-full mr-3"></span>
                  Projects
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <span className="w-2 h-2 bg-transparent rounded-full mr-3"></span>
                  Team
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <span className="w-2 h-2 bg-transparent rounded-full mr-3"></span>
                  Reports
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Top Bar */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Sustainable Finance</h2>
              <p className="text-gray-400 mt-1">Select Navigator</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm">4 Grouped</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-sm">3 Favorites</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs">U</span>
              </div>
            </div>
          </header>

          {/* Search and Filters */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search Influencer, organization or event" 
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 w-96 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" 
                />
                <div className="absolute right-3 top-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Score:</span>
                <span className="text-blue-400 font-semibold">40</span>
                <div className="w-16 h-1 bg-gray-700 rounded-full">
                  <div className="w-1/2 h-1 bg-blue-400 rounded-full"></div>
                </div>
                <span className="text-blue-400 font-semibold">80</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Actors:</span>
                <span className="text-white">All</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Geographic:</span>
                <span className="text-white">USA, Canada</span>
              </div>
            </div>
          </div>

          {/* Network Graph and Ranking */}
          <div className="flex gap-6">
            {/* Network Graph */}
            <div className="w-2/3 bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <div className="flex mb-6">
                <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 mr-2 text-sm font-medium transition-colors">
                  Network
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                  Heatmap
                </button>
                <div className="ml-auto flex items-center space-x-4 text-sm text-gray-400">
                  <button className="hover:text-white transition-colors">+</button>
                  <button className="hover:text-white transition-colors">−</button>
                </div>
              </div>
              <EmptyNetworkGraph />
            </div>

            {/* Influence Ranking */}
            <div className="w-1/3 bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <EmptyInfluenceRanking />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;


