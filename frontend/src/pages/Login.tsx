import loginImg from "../assets/login-img.jpg";
import bakeryLogo from "../assets/bakery-logo.png";
import cupcakeIcon from "../assets/icon-cupcake.svg";
import mailIcon from "../assets/icon-mail.svg";
import lockIcon from "../assets/icon-lock.svg";

export default function Login() {
  return (
    <div className="flex bg-[#FFFCEF]">
      <img
        src={bakeryLogo}
        className="absolute -mt-12 -ml-5 filter-[brightness(0)_saturate(100%)_invert(36%)_sepia(14%)_saturate(1035%)_hue-rotate(1deg)_brightness(94%)_contrast(91%)]"
      />
      <img src={loginImg} className="h-screen w-[45%] object-cover object-center" />
      <div className="flex justify-center flex-col items-center w-[55%]">
        <div className="title flex items-center gap-4">
          <img src={cupcakeIcon} className="w-20" />
          <h1 className="text-[60px] font-bold tracking-wide">Bakery</h1>
        </div>
        <p className="mt-4 text-[48px] font-semibold tracking-widest">Welcom back!</p>
        <form className="min-w-[40%] max-w-[500px] mt-20 flex flex-col gap-6">
          <div className="border border-[#ABA89E] p-5 w-full flex gap-8 rounded-[10px] overflow-clip">
            <img src={mailIcon} />
            <input type="text" placeholder="Username" className="text-[28px] outline-0 caret-[#ABA89E]" />
          </div>
          <div className="border border-[#ABA89E] p-5 w-full flex gap-8 rounded-[10px] overflow-clip">
            <img src={lockIcon} />
            <input
              type="password"
              placeholder="Password"
              className="text-[28px] outline-0 caret-[#ABA89E] block flex-1"
            />
          </div>
          <button
            type="submit"
            className="p-5 w-full rounded-[10px] bg-[#FFB74A] text-white text-[28px] text-center cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
