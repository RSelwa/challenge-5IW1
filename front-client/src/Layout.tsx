import { Link } from "react-router-dom"

const Layout = () => {
  return (
    <div className="w-full flex justify-between px-5 py-4">
      <div>Logo</div>
      <div className="flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/planning">Planning</Link>
        <Link to="/signin">Signin</Link>
      </div>
    </div>
  )
}

export default Layout
