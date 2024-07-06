import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import Headers from '../../includes/Header';
import Footer from '../../includes/Footer';

const SinglePage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/view/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
    <Helmet><title>Single Page </title></Helmet>
      <Headers />
      <SinglePageMainContainer>
        <SinglePageFlexContainer>
          <SinglePageLeftContainer>
            <SinglePageLeftImageContainer>
              <SinglePageLeftImage src={product.product_image} alt={product.product_name} />
            </SinglePageLeftImageContainer>
            <SinglePageLeftDetailContainer>
              <SinglePageHeader>{product.product_name}</SinglePageHeader>
              <SinglePagePrice>${product.product_price}</SinglePagePrice>
              <SinglePageButtonContainer>
                <SinglePageBuyButton>Buy Now</SinglePageBuyButton>
                <SinglePageWatchButton>Watch Trailer</SinglePageWatchButton>
              </SinglePageButtonContainer>
            </SinglePageLeftDetailContainer>
          </SinglePageLeftContainer>
          <SinglePageRightContainer>
            <SinglePageRightItemsContainer>
              <SinglePageItemLogoContainer>
                <SinglePageItemLogo src={product.product_logo} alt={product.product_name} />
              </SinglePageItemLogoContainer>
              <SinglePageRightHeader>{product.product_name}</SinglePageRightHeader>
              <SinglePageRightDescription>{product.product_description}</SinglePageRightDescription>
              <SinglePageCreator>Created by: {product.created_by}</SinglePageCreator>
            </SinglePageRightItemsContainer>
            <SinglePageNewSection>
              <SinglePageNewHeader>New Exciting Features</SinglePageNewHeader>
              {product.features && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <SinglePageNewItem key={index}>
                    <NewItemHeader>{feature.product_features_count}</NewItemHeader>
                    <NewItemDescription>{feature.product_features_items}</NewItemDescription>
                  </SinglePageNewItem>
                ))
              ) : (
                <div>No features available</div>
              )}
              <SinglePageNewButton>Explore More</SinglePageNewButton>
            </SinglePageNewSection>
            <SinglePageRightBottomContainer>
              <BottomBorderItems>
                <BorderItemHeader>Platform Images</BorderItemHeader>
                <BorderItemsIncludes>Includes:</BorderItemsIncludes>
                <BorderItemsPlatforms>
                  {product.platform_images && product.platform_images.length > 0 ? (
                    product.platform_images.map((image, index) => (
                      <BorderItemPlatform key={index} src={image.short_images} alt="Additional image" />
                    ))
                  ) : (
                    <div>No images available</div>
                  )}
                </BorderItemsPlatforms>
                <BorderItemsButtonContainer>
                  <BorderItemsButton>Select Platform</BorderItemsButton>
                </BorderItemsButtonContainer>
              </BottomBorderItems>
            </SinglePageRightBottomContainer>
          </SinglePageRightContainer>
        </SinglePageFlexContainer>
      </SinglePageMainContainer>
      <Footer />
    </>
  );
};

const SinglePageMainContainer = styled.section`
  padding: 20px;
  width: 100%;
  box-shadow: 0px 8px #f7f6f6;
  border-bottom: 1px solid #DBDBDB;
`;

const SinglePageFlexContainer = styled.div`
  display: flex;
`;

const SinglePageLeftContainer = styled.div`
  width: 40%;
  border-right: 1px solid #DBDBDB;
  box-shadow: 8px 0px #f7f6f6;
  max-height: max-content;
`;

const SinglePageLeftImageContainer = styled.div`
  width: 60%;
  display: block;
  margin: 0 auto;
`;

const SinglePageLeftImage = styled.img`
  width: 100%;
  display: block;
`;

const SinglePageLeftDetailContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const SinglePageHeader = styled.h1`
  font-size: 21px;
  font-weight: 700;
  max-width: 100%;
  height: 75px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
`;

const SinglePagePrice = styled.p`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const SinglePageButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
`;

const SinglePageBuyButton = styled.button`
  border: 1px solid #000;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  background: #000;
  border-radius: 7px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const SinglePageWatchButton = styled.button`
  border: 1px solid #ff4d4d;
  font-size: 20px;
  font-weight: 600;
  color: white;
  background: #ff4d4d;
  border-radius: 7px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #ff1a1a;
    color: white;
  }
`;

const SinglePageRightContainer = styled.div`
  margin-left: 20px;
  width: 60%;
  overflow-y: auto;
  max-height: 576px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SinglePageRightItemsContainer = styled.div``;

const SinglePageItemLogoContainer = styled.span`
  width: 30%;
  display: block;
  margin: 0 auto;
`;

const SinglePageItemLogo = styled.img`
  width: 100%;
  display: block;
`;

const SinglePageRightHeader = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin: 20px 0px;
`;

const SinglePageRightDescription = styled.p`
  font-size: 18px;
  font-family: 'Poppins-Medium';
`;

const SinglePageCreator = styled.p`
  font-size: 16px;
  font-family: 'Poppins-Regular';
  color: #555;
  margin-top: 10px;
`;

const SinglePageRightBottomContainer = styled.div`
  padding-top: 50px;
`;

const BottomBorderItems = styled.div`
  border: 1px solid #000;
  padding: 15px;
  background: #000;
`;

const BorderItemHeader = styled.h2`
  font-size: 21px;
  font-weight: 700;
  color: #fff;
  margin-top: 10px;
`;

const BorderItemsIncludes = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #DBDBDB;
  margin-top: 20px;
`;

const BorderItemsPlatforms = styled.span`
  width: 55%;
  display: flex;
  gap: 35px;
  align-items: center;
  margin-top: 30px;
`;

const BorderItemPlatform = styled.img`
  width: 100%;
  display: block;
`;

const BorderItemsButtonContainer = styled.div`
  width: 60%;
  margin: 40px auto 0px;
  border: 1px solid #fff;
`;

const BorderItemsButton = styled.button`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 15px;
  text-transform: uppercase;
  background-color: #000;
  width: 100%;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const SinglePageNewSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #dbdbdb;
`;

const SinglePageNewHeader = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const SinglePageNewItem = styled.div`
  margin-bottom: 20px;
`;

const NewItemHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const NewItemDescription = styled.p`
  font-size: 16px;
  color: #333;
`;

const SinglePageNewButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #000;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db; 
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

export default SinglePage;
