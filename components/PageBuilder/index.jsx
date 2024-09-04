import React from 'react'
//sections
import Banner from "../Banner"
import ListWithSocialicons from "../ListWithSocialicon"
import Introduction from "../Introduction"
import ConntentWithImage from "../ContentWithImageColTwo"
import ImageWithList from "../ImageWithList"




export default function PageBuilder({pageComponents}) {



    let bladeList = pageBuilder(pageComponents.fields.section);

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
            console.log(blade)
			blades.push(<Banner  data={blade?.fields} />);
		} else if (blade.sys?.contentType?.sys?.id === 'intro') {
			blades.push(<Introduction data={blade} />);
		} 
	});

	return blades;
}