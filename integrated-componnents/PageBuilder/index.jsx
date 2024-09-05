import React from 'react'
//sections
import Banner from "../Banner"
import ListWithSocialicons from "../ListWithSocialicon"
import Introduction from "../Introduction"
import ContentWithImage from "../ContentWithImageColTwo"
import ImageWithList from "../ImageWithList"
import ContactForm from "../contactForm"




export default function PageBuilder({pageComponents}) {

    let bladeList = pageBuilder(pageComponents.fields.section);
   
    // console.log(pageComponents.fields.section)
    return (
			<>
            {bladeList.map((blade, index) => {
				return (
						<div key={index}>
							{blade}
						</div>
				);
			})}
            </>
	);
}

function pageBuilder(data) {
	let blades = [];
   
	data.map((blade, index) => {
		if (blade.sys?.contentType?.sys?.id === "bannerThirdLevel") {
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

		}
	});

	return blades;
}