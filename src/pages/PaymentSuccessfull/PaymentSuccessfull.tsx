import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const PaymentSuccessfull = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/search");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col grow bg-base-green/20 items-center justify-center relative overflow-hidden">
        {/* Success Content */}
        <div className="relative z-10 text-center space-y-6 max-w-md mx-auto px-6">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-base-green rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-base-green mb-4">
            Payment Successful! 🎉
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Thank you for your payment
          </p>

          {/* Countdown */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <p className="text-gray-600 mb-2">Redirecting in</p>
            <div className="text-3xl font-bold text-base-green">
              {countdown}
            </div>
            <p className="text-sm text-gray-500 mt-2">seconds</p>
          </div>

          {/* Manual Navigation Button */}
          <button
            onClick={() => navigate("/search")}
            className="bg-base-green hover:bg-base-green/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Let's Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfull;
