import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <>
    <Navbar />
    <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-7">
            <div class="container">
                <h2 class="mt-4">Role Based Access Control Authentication System</h2>
                <hr/>
                <h3 class="mt-3">Authorizing user roles with integrated auth system</h3>
                <hr/>
                <h4>Packages : </h4>
                <ol>
                    <li>bcrypt</li>
                    <li>cookie-parser</li>
                    <li>dotenv</li>
                    <li>express</li>
                    <li>passport</li>
                    <li>mongoose</li>
                </ol>
                <h5>More documentation will be updated soon </h5>
                <h6>Click here for <a href="/NotFound">Quick Links: </a></h6>
            </div>
        </div>
        <div class="col-lg-3"></div>
    </div>
    </>
  )
}

export default About