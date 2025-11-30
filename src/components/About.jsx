import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

const About = ({ onBack }) => {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Info Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                About BookVerse
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                BookVerse is a modern, curated digital space designed for book
                lovers by book lovers. We believe in the power of stories to
                transform, educate, and inspire.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Using the Google Books API, we bring millions of titles to your
                fingertips. Fiction, history, romance, or sci-fi — discover your
                next great adventure.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="text-indigo-500" />
                <span>123 Library Lane, Book City, BK 90210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="text-indigo-500" />
                <span>hello@bookverse.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="text-indigo-500" />
                <span>+91 3412387457</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Get in Touch
            </h3>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
