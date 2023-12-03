
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  const [getQuote, setGetQuote] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allQuotes = await axios.get('/api/quote/get-all-quotes');
        setGetQuote(allQuotes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Set up interval only after fetching quotes
  useEffect(() => {
    let intervalId;

    if (getQuote.length > 0) {
      intervalId = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % getQuote.length);
      }, 1000);
    }

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [getQuote]);

  // Render loading state while fetching quotes
  if (loading) {
    return <div>Loading...</div>;
  }
  
  const sendMotivationalEmail = async (req, res) => {
    try {
      await axios.post('/api/email/sendMotivationalEmail')
      res.status(200).json({message: "succesfully send email"})
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
  
  return (
    <main>
      <section className="max-w-[1200px] mx-auto p-[20px] flex justify-between md:p-[30px] lg:p-[40px] py-[50px] flex-col md:flex-row items-center gap-10 md:gap-2">
        {/* hero */}
        <section className="flex flex-col flex-1 gap-6">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Elevate Your Everyday Journey with Daily Doses of Inspiration Delivered to Your Inbox
            </h1>
            <p>
              Welcome to EpicMotivator, where inspiration meets your inbox every day. In a world filled with challenges, victories, and endless possibilities, we understand the importance of having a constant source of motivation. That's why we present EpicMotivator—a SaaS designed to elevate your everyday journey.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="border rounded-lg px-[20px] py-[10px] w-full max-w-[140px]">
              Sign Up
            </button>
            <button 
              className="border rounded-lg px-[20px] py-[10px] w-full max-w-[140px]"
              onClick={sendMotivationalEmail}
            >
              Get started
            </button>
          </div>
        </section>

        {/* examples */}
        <section className='flex-1 w-full py-[20px] max-w-[500px]'>
          <div
            className='flex flex-col items-center justify-center gap-4 text-center'
          >
            <h1 className='italic font-semibold md:text-xl'>
              "{getQuote[currentQuoteIndex].quote}"
            </h1>
            <p>
              {getQuote[currentQuoteIndex].name}
            </p>
          </div>

        </section>
      </section>
    </main>
  );
};

export default Home;