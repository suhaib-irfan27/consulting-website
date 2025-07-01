import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">


      <section className="bg-gray-50 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Elevate Your Business</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          We provide expert consulting services to help startups and enterprises grow with confidence.
        </p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Get in Touch
        </button>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-4">
        <h3 className="text-2xl font-bold mb-8 text-center">Our Services</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {["Strategy", "Development", "Marketing"].map((service) => (
            <div key={service} className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">{service}</h4>
              <p className="text-gray-600 text-sm">
                {service} consulting tailored to your goals and market.
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Your Consulting Co. All rights reserved.
      </footer>
    </main>
  );
}






// export default function Home() {
//   return (
//     <main className="min-h-screen bg-white text-gray-800">
//       <header className="bg-blue-900 text-white px-6 py-4">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">NSR Consulting Solutions</h1>
//           <nav className="space-x-4">
//             <a href="#" className="hover:underline">Home</a>
//             <a href="#" className="hover:underline">Services</a>
//             <a href="#" className="hover:underline">About</a>
//             <a href="/register" className="hover:underline text-yellow-300 font-semibold">Register</a>
//             <a href="/login" className="font-semibold text-white hover:text-gray-300">Login</a>

//             <a href="#" className="hover:underline">Contact</a>
//           </nav>
//         </div>
//       </header>

//       <section className="bg-gray-50 py-20 text-center">
//         <h2 className="text-4xl font-bold mb-4">Elevate Your Business</h2>
//         <p className="text-lg text-gray-600 max-w-xl mx-auto">
//           We provide expert consulting services to help startups and enterprises grow with confidence.
//         </p>
//         <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
//           Get in Touch
//         </button>
//       </section>

//       <section className="max-w-5xl mx-auto py-16 px-4">
//         <h3 className="text-2xl font-bold mb-8 text-center">Our Services</h3>
//         <div className="grid gap-6 md:grid-cols-3">
//           {["Strategy", "Development", "Marketing"].map((service) => (
//             <div key={service} className="p-6 border rounded-lg shadow hover:shadow-md transition">
//               <h4 className="text-xl font-semibold mb-2">{service}</h4>
//               <p className="text-gray-600 text-sm">
//                 {service} consulting tailored to your goals and market.
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
//         © {new Date().getFullYear()} Your Consulting Co. All rights reserved.
//       </footer>
//     </main>
//   );
// }


