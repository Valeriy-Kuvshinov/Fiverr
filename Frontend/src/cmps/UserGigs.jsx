import { Link } from 'react-router-dom'

export function UserGigs({gigs}){

    if(gigs.length===0) return 

    
    return (<section className="user-gigs">
            <div className='info-block title'>
                Active Gigs
            </div>
            <div className='info-block gig'>
                <Link to="gig/edit" className="gig-creation-btn">
                    <button>+</button>
                    <span>Create a new Gig</span>
                </Link>
            </div>
           </section>)
}