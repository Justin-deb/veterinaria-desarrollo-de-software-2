import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="text-center text-white bg-linear-to-b from-black to-purple-950 h-screen flex items-center justify-center">
      <div className="bg-neutral-950/50 p-10 space-y-10 rounded-2xl border-2 border-black/80">
          <h1 className="text-7xl">Sorry!</h1>
          <p className="text-4xl">This page does not exist</p>
          <Link to={'/'} className="bg-neutral-800 hover:bg-neutral-700 py-2 px-3 rounded-md text-2xl">Get me back!</Link>

      </div>

    </div>
  )
}

export default NotFoundPage