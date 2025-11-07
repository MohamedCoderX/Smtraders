import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/ExploreMenu/exploremenu'
import FlashingOfferBox from '../../components/FlashingOfferBox'
import MetaData from './MetaData'
import Crackerdisplay from '../../components/cracker/Crackerdisplay'
import Footer from '../../components/footer/Footer'
import About from '../../components/about-us/About-us'
import FloatingCard from '../../components/FloatingCard'
import { Link } from 'react-router-dom'
import Product from '../products/Product'
import Combo from '../../components/Combo'
import TestimonialSection from '../../components/TestimonialSection'


const Home = () => {
  return (
 
    <div>
      <Link to='/Mycart'>
      <FloatingCard/>
      </Link>
      <FlashingOfferBox/>
   <MetaData title={`Buy Best Products`}/>
  <Header/>
<Exploremenu/>

<Crackerdisplay/>
<Combo/>
<TestimonialSection/>
{/* <About/> */}
<Footer/>
  </div>


  )
}

export default Home