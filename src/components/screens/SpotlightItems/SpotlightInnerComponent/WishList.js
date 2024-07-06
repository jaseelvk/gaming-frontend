import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../../includes/Header';
import Footer from '../../../includes/Footer';
import NoProduct from '../../../../assets/images/Noproduct.gif';

function WishList() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('User not authenticated');
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          throw new Error('Token expired');
        }

        const response = await fetch('http://127.0.0.1:8000/api/v1/products/wishlist/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWishlist(data.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <WishListContainer>
      <Helmet><title>My Wishlist Page </title></Helmet>
      <Header />
      <WishListTitle>My Wishlist</WishListTitle>
      {wishlist.length === 0 ? (
        <NoProductContainer>
          <NoProductImage src={NoProduct} alt="No product" />
          <NoProductText>No products found in your wishlist.</NoProductText>
        </NoProductContainer>
      ) : (
        <WishListItems>
          {wishlist.map(item => (
            <WishListItem key={item.product.id}>
              <Link to={`/products/view/${item.product.id}`}>
                <WishListImage src={item.product.product_image} alt={item.product.product_name} />
              </Link>
              <WishListName>{item.product.product_name}</WishListName>
              <AddedBy>Added by: {item.user}</AddedBy>
            </WishListItem>
          ))}
        </WishListItems>
      )}
      <Footer />
    </WishListContainer>
  );
}

const WishListContainer = styled.div`
  padding: 20px;
`;

const WishListTitle = styled.h1`
  margin-top:20px;
  font-weight: 700;
  font-size: 35px;
  text-decoration: underline;
  text-align: center;
`;

const NoProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NoProductImage = styled.img`
  width: 300px;
  height: auto;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NoProductText = styled.p`
  font-size: 20px;
  color: #333;
  margin-top: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
  font-weight: bold;
  color: #ff6347;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const WishListItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

const WishListItem = styled.li`
  width: 25%;
  max-width: fit-content;
  display: block;
  margin: 20px;
  position: relative;
`;

const WishListImage = styled.img`
  width: 100%;
  display: block;
`;

const WishListName = styled.div`
  font-weight: 700;
  text-align: center;
`;

const AddedBy = styled.div`
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
  color: gray;
`;

export default WishList;
