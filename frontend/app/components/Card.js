export default function Card({children, className='', accent=false}){
  const accentClass = accent ? 'card-accent' : '';
  return (
    <div className={`card slide-up ${accentClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
