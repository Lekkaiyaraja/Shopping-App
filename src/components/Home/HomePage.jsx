import React from 'react'
import HeroSection from './HeroSection'
import iphone from '../../assets/iphone/iphone-14-pro.webp';
import mac from '../../assets/iphone/mac-mini.webp'
import FeaturedProducts from './FeaturedProducts'

const HomePage = () => {
  return (
    <div>
        {/* {hero section} */}
        <HeroSection title="Buy iPhone 14 pro" subtitle="Experience the power of iphone 14 pro."
        // link="/product/67d27b51c60a9948500a2644"
        link="/product/67d6b2622154a77e98cf97a0"
        image={iphone}
        />
        {/* {featured Products} */}
        <FeaturedProducts/>
        {/* {hero section} */}
        <HeroSection title="Build the ultimate setup" subtitle="You can add adudio displsy and color-matched magic accessories to your bag after configure your mac mini."
        link="/product/67d27b52c60a9948500a264c"
        image={mac}
        />
        
    </div>
  )
}

export default HomePage;