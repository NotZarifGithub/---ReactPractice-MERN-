import AuthButton from "../components/ui/AuthButton"
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";

const SignIn = () => {
  return (
    <main className="px-[10px] py-[30px]">

      <section className="flex flex-col bg bg-[#201c1c] text-white justify-center items-center rounded-2xl py-[80px] gap-6 max-w-[600px] mx-auto md:max-w-[1000px]">

        {/* card title */}
        <div className="flex justify-center items-center flex-col px-[20px] text-center md:py-[40px]">
          <div className="text-xl font-light py-[20px] md:py-[10px] md:text-3xl">
            Create a new account
          </div>
          <div className="hidden md:flex text-sm text-white/40 max-w-[600px]">
            A signup button is a clickable user interface element strategically placed on a webpage or application, inviting users to initiate the account creation process.
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full px-[30px] justify-center mx-auto max-w-[400px] md:max-w-[600px]">

          {/* forms */}
          <div>
            <form 
              action=""
              className="flex flex-col gap-2 w-full"
            >

              {/* Username */}
              <div className="w-full">
                <label 
                  htmlFor="username"
                  className="hidden"
                >
                  username
                </label>
                <input 
                  type="text" 
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="on"
                  required
                  className="text-black rounded-md bg-[#282424] focus:outline-none py-[15px] px-[25px] text-xs  w-full"
                />
              </div>
              
              {/* Email */}
              <div className="">
                <label 
                  htmlFor="email"
                  className="hidden"
                >
                  email
                </label>
                <input 
                  type="text" 
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="on"
                  required
                  className="text-black rounded-md bg-[#282424] focus:outline-none py-[15px] px-[25px] text-xs  w-full"
                />
              </div>
              
              {/* Password */}
              <div>
                <label 
                  htmlFor="password"
                  className="hidden"
                >
                  password
                </label>
                <input 
                  type="" 
                  name="password"
                  id="password"
                  placeholder="password"
                  required
                  className="text-black rounded-md bg-[#282424] focus:outline-none py-[15px] px-[25px] text-xs  w-full"
                />
              </div>

              {/* submit button */}
              <motion.button
                type="submit"
                className=" rounded-md bg-black py-[15px] px-[25px] text-xs w-full text-white flex justify-between items-center"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
              >

                <div>
                  Create a new account
                </div>
                <div className="text-xl">
                  <GoArrowRight />
                </div>
              </motion.button>
            </form>
          </div>

          <div className="flex justify-center items-center">
            or
          </div>

          {/* login socials */}
          <div className="flex flex-col gap-2">
            <AuthButton company={"Google"}/>
            <AuthButton company={"Facebook"}/>
            <AuthButton company={"Github"}/>
            <AuthButton company={"Apple"}/>
          </div>
        </div>

        {/* forgot password */}
        <div>
          <button className="capitalize text-xs underline">
            forgot password?
          </button>
        </div>
      </section>
    </main>
  )
}

export default SignIn