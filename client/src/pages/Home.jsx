
import axios from 'axios';
import { useState, useEffect } from 'react';
import {motion} from 'framer-motion' 

const Home = () => {
  const [getQuote, setGetQuote] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGetStartedClick, setIsGetStartedClick] = useState(false)
  const [isTryItOutClick, setIsTryItOutClick] = useState(false)
  const [formData, setFormData] = useState({})

  // fetch the quotes data from the backend
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
      }, 5000);
    }

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [getQuote]);

  // Render loading state while fetching quotes
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange= (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  
  const handleSubmitTryItOut = async () => {
    try {
      await axios.post('/api/email/sendMotivationalEmailNow', {emailInput: formData.email});
      console.log("Successfully sent email");
      setIsGetStartedClick(!isGetStartedClick);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };  
  
  const handleSubmitGetStarted = async () => {
    try {
      await axios.post('/api/email/storeUserEmail', {emailInput: formData.email});
      console.log("Successfully sent email");
      setIsGetStartedClick(!isGetStartedClick);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };  
  
  return (
    <main>
      <section className="max-w-[1200px] mx-auto p-[20px] flex justify-between md:p-[30px] lg:p-[40px] py-[50px] flex-col md:flex-row items-center gap-10 md:gap-2">

        {/* hero */}

        <section className={`flex flex-col flex-1 gap-6 ${isGetStartedClick || isTryItOutClick ? "blur": ""}`}>
          <div className="flex flex-col gap-4 max-w-[500px]">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Elevate Your Everyday Journey with Daily Doses of Inspiration Delivered to Your Inbox
            </h1>
            <p>
              Welcome to EpicMotivator, where inspiration meets your inbox every day. In a world filled with challenges, victories, and endless possibilities, we understand the importance of having a constant source of motivation. That&aposs why we present EpicMotivator—a SaaS designed to elevate your everyday journey.
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button 
              className="border rounded-lg px-[20px] py-[10px] w-full max-w-[140px] bg-black text-white"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 1}}
              onClick={() => setIsTryItOutClick(!isTryItOutClick)}
            >
              Try it out 
            </motion.button>
            <motion.button 
              className="border rounded-lg px-[20px] py-[10px] w-full max-w-[140px] bg-black text-white"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 1}}
              onClick={() => setIsGetStartedClick(!isGetStartedClick)}
            >
              Get started
            </motion.button>
          </div>
      
        </section>

        {/* accept input from the user */}
        
        <div 
          className={`items-center justify-center ${isGetStartedClick || isTryItOutClick ? "flex": "hidden"} lg:w-[300px]`}
        >
          <div className=' z-10 border p-[20px] bg-white rounded-xl absolute top-[300px] md:w-[300px] lg:w-[400px] flex flex-col gap-4'>
              
            {/* Email */}

            <form className="flex flex-col gap-4 ">
              <label 
                htmlFor="email"
                className="font-semibold tracking-[3px] flex flex-col gap-2"
              >
                Enter your email
                <span className='text-xs tracking-normal text-black/50'>
                  {isTryItOutClick ? "*Check ur email once submitted*" : "*You can expect a quote to arrive at your email every morning at 8 a.m.*"}
                </span>
              </label>
              <input 
                type="text" 
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="on"
                required
                className="text-white rounded-md bg-black focus:outline-none py-[15px] px-[25px] text-xs  w-full"
                onChange={handleChange}
              />

              {/* button for submitting and cancel */}

              <div className='flex justify-between'>
                <button
                  type='submit'
                  onClick={() => {
                    isTryItOutClick ? handleSubmitTryItOut() : handleSubmitGetStarted()
                  }}
                  className='text-sm font-semibold capitalize'
                >
                  submit
                </button>
                <button
                  onClick={() => {
                    setIsGetStartedClick(false)
                    setIsTryItOutClick(false)
                  }}
                  className='text-sm font-semibold capitalize'
                >
                  cancel
                </button>
              </div>
            </form>
                
          </div>
        </div>

        {/* examples */}

        <section className={`flex-1 w-full py-[20px] max-w-[500px] ${isGetStartedClick || isTryItOutClick ? "blur": ""}`}>
          <div
            className='flex flex-col items-center justify-center gap-4 text-center'
          >
            <h1 className='italic font-semibold md:text-xl'>
            &apos{getQuote[currentQuoteIndex].quote}&apos
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