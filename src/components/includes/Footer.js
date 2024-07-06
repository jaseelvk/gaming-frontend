import React from 'react'
import styled from 'styled-components'

import Twitter from '../../assets/images/twitterColour.svg'
import Insta from '../../assets/images/instagramColour.svg'
import Youtube from '../../assets/images/youtbeColour.svg'
import FaceBook from '../../assets/images/facbookColour.svg'
import TWitech from '../../assets/images/twitchColour.svg'

function Footer() {
  return (
    <>
      <FoooterMainContainer>
        <FooterSectionItems>
            <FooterSectionItem href="#">Contact</FooterSectionItem>
            <FooterSectionItem href="#">Careers</FooterSectionItem>
            <FooterSectionItem href="#">Cammunity Guidens</FooterSectionItem>
            <FooterSectionItem href="#">Subscribe</FooterSectionItem>
        </FooterSectionItems>
        <FooterFlexItems>
            <FooterConditionItems>
                <FooterConditionItem href="#">corporate</FooterConditionItem>
                <FooterConditionItem href="#">Privacy</FooterConditionItem>
                <FooterConditionItem href="#">Cookie Settings</FooterConditionItem>
                <FooterConditionItem href="#">Cookie Policy</FooterConditionItem>
                <FooterConditionItem href="#">Leagel</FooterConditionItem>
                <FooterConditionItem href="#">Do Not Sell My Personal Information</FooterConditionItem>
            </FooterConditionItems>
            <FooterPlatformsContainer>
                <FooterPtlaformsItemsConatiner>
                    <FooterPlaItems>
                       <FooterPlatformItem href="#">
                            <FooterPlatform src={Twitter}/>
                        </FooterPlatformItem> 
                    </FooterPlaItems>
                    <FooterPlaItems>
                       <FooterPlatformItem href="#">
                            <FooterPlatform src={Insta}/>
                        </FooterPlatformItem> 
                    </FooterPlaItems>
                    <FooterPlaItems>
                       <FooterPlatformItem href="#">
                            <FooterPlatform src={Youtube}/>
                        </FooterPlatformItem> 
                    </FooterPlaItems>
                    <FooterPlaItems>
                       <FooterPlatformItem href="#">
                            <FooterPlatform src={FaceBook}/>
                        </FooterPlatformItem> 
                    </FooterPlaItems>
                    <FooterPlaItems>
                       <FooterPlatformItem href="#">
                            <FooterPlatform src={TWitech}/>
                        </FooterPlatformItem> 
                    </FooterPlaItems>
                </FooterPtlaformsItemsConatiner>
            </FooterPlatformsContainer>
        </FooterFlexItems>
        <FooterBottomContainer>
            <FooterBottomFlexContainer>
                <FooterBottomItems>
                    <FooterBottomItem>E Sports Games</FooterBottomItem>
                    <FooterContriesContainer>
                        <FooterContries>New York</FooterContries>
                        <FooterContries>London</FooterContries>
                        <FooterContries>Paris</FooterContries>
                        <FooterContries>India</FooterContries>
                    </FooterContriesContainer>
                    <FooterCategroyContainer>
                        <FooterCategory>MCMXCVIII</FooterCategory>
                    </FooterCategroyContainer>
                </FooterBottomItems>
            </FooterBottomFlexContainer>
        </FooterBottomContainer>
      </FoooterMainContainer>
    </>
  )
}

const FoooterMainContainer = styled.section`
    padding: 30px;
`;
const FooterSectionItems = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const FooterSectionItem = styled.a`
    font-size: 21px;
    font-weight: 600;
    text-decoration: underline;
`;
const FooterFlexItems = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
`;
const FooterConditionItems = styled.span`
    padding: 10px;
`;
const FooterConditionItem = styled.a`
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3cm;
    display: block;
    width: fit-content;
`;
const FooterPlatformsContainer = styled.div``;
const FooterPtlaformsItemsConatiner = styled.ul`
    display: flex;
    justify-content: space-between;
    gap: 40px;
    align-items: center;
`;
const FooterPlaItems = styled.li`
    transition: background-color 0.3s, transform 0.3s;
    border-radius: 50%;
    padding: 10px;
    &:hover {
        background-color: #f0f0f0; 
        transform: scale(1.1); 
    }
`;
const FooterPlatformItem = styled.a`
    width: 30px;
    display: block;
`;
const FooterPlatform = styled.img`
    width: 100%;
    display: block;
`;
const FooterBottomContainer  = styled.div`
    padding: 30px;

`;
const FooterBottomFlexContainer  = styled.div`
    width: 100%;

`;
const FooterBottomItems  = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const FooterBottomItem  = styled.h2`
    font-size: 20px;
    font-weight: 600;

`;
const FooterContriesContainer  = styled.ul`
    display: flex;
    gap: 20px;
    align-items: center;

`;
const FooterContries  = styled.li`
    font-size: 19px;
    font-weight: 600;

`;
const FooterCategroyContainer  = styled.div``;
const FooterCategory  = styled.h3`
    font-size: 18px;
    font-weight: 800;
`;

export default Footer;
