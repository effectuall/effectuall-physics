import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <>
    <header className='flex justify-between p-5'>
    <h1>Effec<span>tuall</span></h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    <main>


    <div className="w-full h-[60vh] relative bg-cover  font-bold items-center text-center">
      <h2 className="text-4xl">Physics <span>Interactive 3D </span> <br></br>Simulations</h2>
      <div className="p-5 gap-5">
        <a href="sims.html" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Try Simulations</a>
        <a href="#" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Learn More</a>
      </div>
    </div>

   </main>
   </>
  )
}