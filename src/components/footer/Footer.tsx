import "./footer.scss"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <span></span>
      <span>Powered by Wybosoft © {currentYear} . Admin Dashboard</span>
    </div>
  )
}

export default Footer