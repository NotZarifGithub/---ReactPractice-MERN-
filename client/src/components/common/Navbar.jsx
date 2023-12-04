
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <section className="max-w-[1200px] mx-auto p-[20px] flex justify-between md:p-[30px] lg:p-[40px]">
        
        {/* logo */}
        <motion.button
          className="text-2xl"
        >
          <Link to={'/'}>
            InspiroVerse
          </Link>
        </motion.button>


        {/* <motion.button
          className="text-2xl md:hidden"
          whileHover={{
            rotate: 90,
            transition: {
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          while
        >
          <IoEllipsisHorizontalOutline />
        </motion.button> */}

        {/* <div className="hidden md:flex">
          <motion.button 
            className="text-xl"
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
          >
            <Link 
              to={'/login'}
            >
              Sign In
            </Link>
          </motion.button>
        </div> */}
      </section>
    </header>
  )
}

export default Navbar