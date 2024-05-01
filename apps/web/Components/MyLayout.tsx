import Navbar from "./Navbar"
export default function MyLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]" >
         <Navbar />
         <div className="container mt-24 mx-auto px-12 py-4" >
            {children}
         </div>
        </main>
    )
  }