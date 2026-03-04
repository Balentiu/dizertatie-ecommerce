import { useState, useEffect } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=16');
        const data = await response.json();

        setTimeout(() => {
          setProducts(data.products);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">CSR Shop</h1>
        <p className="text-gray-500">Client-Side Rendering (The browser does all the work)</p>
      </header>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold text-blue-600 animate-pulse">
            The JavaScript and the products are downloading...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-48 object-cover bg-gray-200"
              />
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-800 truncate">{product.title}</h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-black text-blue-600">${product.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App