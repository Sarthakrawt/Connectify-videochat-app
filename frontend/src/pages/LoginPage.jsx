import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, loginMutation, isSuccess } = useLogin();

  useEffect(()=>{
    isSuccess? navigate('/') : "Do not navigate";
  },[isSuccess,navigate])
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col gap-5">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
           
            <span className="text-3xl font-bold text-blue-500 font-mono bg-clip-text ">
             Connectify
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="mb-4">
              <span className="text-red-600 font-bold">{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70 mt-5">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="w-full space-y-2 mb-4 mt-7">
                    <label className="label">
                      <span className="font-bold">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="yo@example.com"
                      className=" w-full mt-4 border rounded-2xl pl-3 h-10"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="f w-full space-y-2 mb-15">
                    <label className="label">
                      <span className=" font-bold">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full mt-4  border rounded-2xl pl-3 h-10"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-4xl" disabled={isPending}>
                    {isPending ? (
                      <>
                        <span></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className=" text-blue-500 hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="bg-blue-950 hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="../public/Chatting-rafiki.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;