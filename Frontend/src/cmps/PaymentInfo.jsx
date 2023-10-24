import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import checkmark from "../assets/img/svg/checkmark.icon.svg"

export function PaymentInfo({ gig, createOrder }) {
  if (gig === null) return <div>loading...</div>

  function onConfirmPayment() {
    createOrder()
  }

  const gigQualities = [
    { title: "1 concept included" },
    { title: "Logo transparency" },
    { title: "Printable file" },
    { title: "Include 3D mockup" },
  ]

  return (
    <section className="payment-info">
      <section className="payment">
        <div className="payment-header">
          <img src={gig.imgUrls[0]} />
          <p>{gig.description}</p>
        </div>

        <div className="payment-price">
          <span>US${gig.price}</span>
          <p>
            1 custom logo+high resolution file+3d mockup+logo transparency+
            300dpi{" "}
          </p>
        </div>

        <div className="gig-qualities">
          <div className="gig-quality">
            <img src={checkmark} />
            <span>1 concept included</span>
          </div>
          <div className="gig-quality">
            <img src={checkmark} />
            <span>Logo transparency</span>
          </div>
          <div className="gig-quality">
            <img src={checkmark} />
            <span>Printable file</span>
          </div>
          {/* {gigQualities.map((gig)=>{
                    <div><img src={checkmark}/><span>{gig.title}</span></div>
                })} */}
        </div>

        <div className="paying-fee">
          <span>Service Fee</span>
          <span>${parseFloat(gig.price * 0.1).toFixed(2)}</span>
        </div>

        <div className="paying-fee">
          <span>VAT</span>
          <span>${parseFloat(gig.price * 0.1).toFixed(2)}</span>
        </div>

        <div className="final paying-fee">
          <span>Total</span>
          <span>${parseFloat(gig.price * 1.2).toFixed(2)}</span>
        </div>

        <div className="not paying-fee">
          <span>Delivery Time</span>
          <span>{gig.daysToMake} Days</span>
        </div>

        <Link to={`/`}>
          <button className="confirm-btn" onClick={onConfirmPayment}>
            Confirm And Pay
          </button>
        </Link>
      </section>
    </section>
  )
}
