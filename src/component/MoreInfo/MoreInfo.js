import React from 'react';
import './MoreInfo.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  disable:'mobile'
});

const MoreInfo=()=>{
	
	return (
		<div data-aos="fade-in"  data-aos-offset="350" data-aos-duration="800" id='test2' className='moreInfoStyle'  >
			<h3>My Name</h3>
			<img className='moreInfoImgStyle' alt='empty' src='https://media.koreus.com/201504/135-insolite-01.jpg'/>
			<p className='pMoreInfoStyle'>Lorem ipsum dolor sit amet, 
			consectetur adipiscing elit. Pellentesque diam massa, 
			pretium sit amet ullamcorper nec, fermentum quis ipsum.</p>
		</div>
		)
	
}

export default MoreInfo;