import { width } from "@mui/system"
import { utilService } from "../services/util.service"
import SvgIcon from "./SvgIcon"

export function ReviewBreakdown({ reviews }) {
  console.log(reviews)
  let sum = 0
  let averageRating = 0
  reviews.map((review) => (sum += review.rating))
  averageRating = sum / reviews.length
  if (parseInt(averageRating) === averageRating) {
    parseInt(averageRating)
  } else {
    averageRating = averageRating.toFixed(1)
  }
  if (reviews.length === 0) return

  const renderStars = () => {
    let fullStarsCount = Math.floor(averageRating)
    const isHalfStar = averageRating % 1 >= 0.5

    const stars = [...Array(fullStarsCount)].map((_, idx) => (
      <>
      <SvgIcon iconName="star" />
      </>
    ))

    if (isHalfStar) {
      stars.push(<SvgIcon iconName="half-star" />)
      fullStarsCount++
    }

    const emptyStarsCount = 5 - fullStarsCount
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<SvgIcon iconName="emptystar" />)
    }
    return stars
  }
  let i=5
  const renderStarStats = () => {
    const stats = [...Array(5)].map((_, idx) => {
      i--
      let count=0
      reviews.map((review)=>{
        if(review.rating===i+1) count++
      })
      return <div className={`stat-line ${(!count)?'no-count':''}`} key={utilService.makeId()}>
      <span className="rate-level">{i+1} Stars </span>
      <div className="counter"><span className="counter-meter" style={{width:`${(100*count/reviews.length)}%`}}></span></div>
      <span className="rate-count">({count})</span>
      </div>
    })

    return stats
  }

  return (
    <section className="review-breakdown">
      <div className="review-count">
        <span>{reviews.length} reviews for this Gig</span>
        <div className="stars">
          {renderStars()}
          <span className="rating">{averageRating}</span>
        </div>
      </div>
      <div className="breakdown-wrapper">
        <div className="star-counts">
          {renderStarStats()}
        </div>
        <div className="rating-breakdown">
          <span className="title">Rating Breakdown</span>
          <div className="rating-stat"><span>Seller communication level</span>
          <div className="star"><SvgIcon iconName={'star'}/>{averageRating}</div></div>
          <div className="rating-stat"><span>Recommend to a friend</span>
          <div className="star"><SvgIcon iconName={'star'}/>{averageRating}</div></div>
          <div className="rating-stat"><span>Service as described</span>
          <div className="star"><SvgIcon iconName={'star'}/>{averageRating}</div></div>
        </div>
      </div>

    </section>
  )
}
