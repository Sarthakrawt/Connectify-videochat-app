import React, {useState} from 'react'
import {Link} from "react-router-dom"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signup } from '../lib/api.js'

function SignUpPage() {
    const [signupData, setSignupData] = useState({
        fullName: "",
        email : "",
        password: "",
    })

    const queryClient  = useQueryClient();
    const {mutate, isPending,error} =  useMutation({
        mutationFn: signup,
        onSuccess:()=> queryClient.invalidateQueries({queryKey: ["authUser"]})
    })
    
    const handleSignup = (e)=>{
        e.preventDefault();
        mutate(signupData)
    }
    

    return (
        <div
      className="bg-gray-800 text-white h-screen w-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          
          <div className="mb-4 flex items-center justify-start gap-2">
            
            <span className=" text-blue-500 text-3xl font-bold font-mono bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wider">
              Connectify
            </span>
          </div>

         
          {error && (
            <div className="mb-4 text-red-500">
                <span>{error}</span>
            </div>
          )}

          <div className="w-full">
            <form  onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-6">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span >Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                       className=" h-10 border rounded-2xl pl-5 w-full mt-2"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className=" h-10 border rounded-2xl pl-5 w-full mt-2"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className=" h-10 border rounded-2xl pl-5 w-full mt-2"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox"  required />
                      <span className="text-xs leading-tight m-1">
                        I agree to the{" "}
                        <span className="text-blue-500 hover:underline">terms of service</span> and{" "}
                        <span className="text-blue-500 hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-4xl" type="submit">
                   {isPending?(
                    <>
                    <span className=''>
                    </span>
                    Loading...
                    </>
                    
                   ):("Create Account")}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

       
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center bg-blue-950">
          <div className="max-w-md p-8">
           
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
    )
}

export default SignUpPage
