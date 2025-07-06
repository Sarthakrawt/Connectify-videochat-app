import React ,{useState} from 'react'
import UseAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import toast from 'react-hot-toast';
import { LANGUAGES } from '../constant';


function OnBoardingPage() {
    const {authUser} = UseAuthUser();
    const queryClient = useQueryClient();
    const[formState, setFormState]= useState({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic : authUser?.profilePic || ""
    })
    console.log(formState.profilePic)

    const {mutate: onboardingMutation, isPending} = useMutation({
        mutationFn : completeOnboarding,
        onSuccess: ()=>{
            toast.success("Profile onboarded successfully");
            queryClient.invalidateQueries({queryKey:["authUser"]})
        }
    })

    

    const handleSubmit = (e) =>{
        e.preventDefault();
          console.log(formState)
        onboardingMutation(formState);
    }
    const handleRandomAvatar =() =>{
        const idx = Math.floor(Math.random()*100)+1;
    const randomAvatar= `https://i.pravatar.cc/150?img=${idx}`;
    setFormState({...formState, profilePic: randomAvatar})
    }
    return (
      
       <div className=" min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="bg-blue-950 flex justify-center items-center bg-base-200 w-full max-w-3xl shadow-xl">
        <div className=" p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-amber-300 bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-3">
                <button onClick={handleRandomAvatar} className="bg-blue-400 h-9 w-60 rounded-2xl font-bold text-black">
                 
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className=" flex gap-3 flex-col">
              <label >
                <span >Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="  w-full  rounded-2xl pl-2 border-gray-400 h-10 border"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="flex  flex-col gap-2">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className=" w-full  rounded-2xl pl-2 border-gray-400 border h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
              {/* NATIVE LANGUAGE */}
              <div>
                <label className="label ">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className=" w-full  rounded-2xl h-10 pl-2 border-gray-400 mt-3 border bg-blue-950"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="w-full  rounded-2xl h-10  pl-2 border-gray-400 bg-blue-950 mt-3 border"
                >
                  <option value="">{formState.learningLanguage? formState.learningLanguage : "Select language you're learning"}</option>
                  {LANGUAGES.map((lang) => (
                    <option  key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
               
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className=" w-full  rounded-2xl h-10 pl-2 border-gray-400 mt-3 border"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-4xl" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                 
                  Complete Onboarding
                </>
              ) : (
                <>
                  
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
   
    )
}

export default OnBoardingPage
