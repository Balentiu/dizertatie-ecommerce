export default async function Home() {
  const response = await fetch('https://dummyjson.com/products?limit=12', {
    next: { revalidate: 60 } 
  });
  const data = await response.json();
  const products = data.products;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-2">SSG/ISR Shop</h1>
        <p className="text-gray-500">Static Site Generation (The page is pre-built and served instantly from cache)</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product: any) => (
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
                <span className="text-xl font-black text-purple-600">${product.price}</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}