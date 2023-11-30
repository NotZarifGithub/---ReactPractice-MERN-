import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";

const AuthButton = ({company}) => {

  const icons = {
    Google: <FcGoogle />,
    Facebook: <SiFacebook />,
    Github: <FaGithub  />,
    Apple: <FaApple />
  }

  const icon = icons[company]

  return (
    <motion.button
      className=" rounded-md bg-black py-[15px] px-[25px] text-xs w-full text-white"
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.95}}
    >
      {icon && (
        <div className="flex justify-center items-center gap-[10px]">
          <div>
            {icon}
          </div>
          <div>
            Sign in with {company}
          </div>
        </div>
      )}
    </motion.button>
  )
}

export default AuthButton