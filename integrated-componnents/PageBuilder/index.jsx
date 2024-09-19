import React from 'react'
//sections
import HeroBanner from "../Herobanner"
import Banner from "../Banner"
import BannerSecond from "../BannerSecond"
import ListWithSocialicons from "../ListWithSocialicon"
import Introduction from "../Introduction"
import ContentWithImage from "../ContentWithImageColTwo"
import ImageWithList from "../ImageWithList"
import ContactForm from "../Contact-form"
import IntroWithCards from "../IntroWithCards"
import GroupContactInfo from "../GroupContactInfo"
import ColFourCards from "../ColFourCards"




export default function PageBuilder({pageComponents}) {

    let bladeList = pageBuilder(pageComponents);
   
    return (
			<>
				{bladeList.map((blade, index) => {
					return (
							<React.Fragment key={index}>
								{blade}
							</React.Fragment>
					);
				})}
            </>
	);
}

function pageBuilder(data) {
	let blades = [];
   
	data.map((blade, index) => {
		if (blade.sys?.contentType?.sys?.id === "heroBanner") {
			blades.push(<HeroBanner  data={blade?.fields} />);
			
		} else if (blade.sys?.contentType?.sys?.id === "bannerSecond") {
			blades.push(<BannerSecond  data={blade?.fields} />);
		
		} else if (blade.sys?.contentType?.sys?.id === "bannerThirdLevel") {
			blades.push(<Banner  data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "intro") {
			blades.push(<Introduction data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "listWithSocialIcon") {
			blades.push(<ListWithSocialicons data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "imageWithList") {
			blades.push(<ImageWithList data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "contentWithImage") {
			blades.push(<ContentWithImage data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "contactForm") {
			blades.push(<ContactForm data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "introWithCards") {
			blades.push(<IntroWithCards data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "groupContactInfo") {
			blades.push(<GroupContactInfo data={blade?.fields} />);

		} else if (blade.sys?.contentType?.sys?.id === "iconWithText") {
			blades.push(<ColFourCards data={blade?.fields} />);

		}
	});

	return blades;
}