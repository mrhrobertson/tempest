import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-8 bg-gradient-to-br from-zinc-700 to-zinc-900">
      <form className='flex flex-col items-center p-8 rounded-2xl gap-4 bg-gradient-to-br from-zinc-300/60 to-zinc-400/60 shadow-lg'>
        <h1>Share what you want!</h1>
        <textarea rows={4} cols={32} placeholder='Type to your hearts content...' className='bg-zinc-800 rounded-lg p-4'></textarea>
        <button className='px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg rounded-lg'>Generate Link</button>
      </form>
    </main>
  )
}
