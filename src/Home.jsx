import React from "react";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-60 pt-20">
        <main className="container mx-auto p-4">
          {/* Hero Section */}
          <div className="text-center text-white mb-16">
            <h1 className="text-5xl font-bold mb-4">St. Louis REInvestors</h1>
            <p className="text-xl mb-8">
              Your Gateway to Successful Real Estate Investments
            </p>
          </div>

          {/* Investor of the Month */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Investor of the Month
            </h3>
            <h2 className="text-4xl font-bold mt-2 text-gray-800">
              Shawn Estep
            </h2>
            <p className="text-sm mt-1 text-gray-600">
              The Estep Law Firm, LLC
            </p>
            <p className="italic text-lg mt-4 text-gray-700">
              "The St. Louis real estate market offers unique opportunities for
              those who are patient and well-informed."
            </p>
          </div>

          {/* Welcome Section */}
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-600">
              Welcome to Our Real Estate Investing Community
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Start your real estate investment journey with us in St. Louis.
              Explore the latest market trends, manage your portfolio, and get
              AI-powered insights to make informed decisions in the local
              market.
            </p>
          </div>

          {/* Monthly Speakers Section */}
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
            <h3 className="text-3xl font-bold mb-6 text-blue-600">
              Upcoming Monthly Speakers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <h4 className="text-xl font-semibold mb-2 text-blue-800">
                    {speaker.name}
                  </h4>
                  <p className="text-gray-600 mb-3">{speaker.date}</p>
                  <p className="text-gray-700">{speaker.topic}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const speakers = [
  {
    name: "Sarah Johnson",
    date: "November 15, 2023",
    topic: "Emerging Real Estate Markets in St. Louis",
  },
  {
    name: "Michael Chen",
    date: "December 5, 2023",
    topic: "Tax Strategies for St. Louis Property Investors",
  },
  {
    name: "Emily Rodriguez",
    date: "January 20, 2024",
    topic: "Sustainable Real Estate Investments in Urban St. Louis",
  },
];

export default Home;
