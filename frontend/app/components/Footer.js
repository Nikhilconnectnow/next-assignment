export default function Footer(){
  return (
    <footer className="site-container mt-12 py-6 text-center subtle text-sm">
      <div className="mx-auto mb-3 h-0.5 w-24 bg-gradient-to-r from-primary to-accent rounded"></div>
      <div>© {new Date().getFullYear()} Next Express Assignment</div>
    </footer>
  )
}
