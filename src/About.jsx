import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-20">
      <main className="container mx-auto p-8">
        <h2 className="text-4xl font-bold mb-8 text-blue-600 text-center">
          About St.Louis REInvestors
        </h2>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            At St.Louis REInvestors, we are a dedicated team of real estate
            experts and AI enthusiasts committed to revolutionizing the way you
            approach property investments in the St. Louis area.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our mission is to empower investors like you with cutting-edge
            tools, in-depth market insights, and a supportive community to help
            you make smarter, more profitable real estate decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutSections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                {section.title}
              </h3>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const aboutSections = [
  {
    title: "Local Expertise",
    content:
      "Our team has deep roots in the St. Louis real estate market, providing you with invaluable local insights and connections.",
  },
  {
    title: "AI-Powered Analysis",
    content:
      "We leverage cutting-edge AI technology to analyze market trends, predict property values, and identify lucrative investment opportunities.",
  },
  {
    title: "Community-Driven",
    content:
      "Join a thriving community of like-minded investors, share experiences, and grow together in your real estate journey.",
  },
  {
    title: "Educational Resources",
    content:
      "Access a wealth of educational materials, workshops, and webinars to continually enhance your real estate investment knowledge.",
  },
  {
    title: "Personalized Strategies",
    content:
      "We work closely with you to develop tailored investment strategies that align with your goals and risk tolerance.",
  },
  {
    title: "Ethical Investing",
    content:
      "We prioritize ethical and sustainable investment practices, considering the long-term impact on communities and the environment.",
  },
];

export default About;
