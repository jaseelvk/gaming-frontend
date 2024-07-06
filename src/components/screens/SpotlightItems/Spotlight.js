import React, { useEffect, useState, useContext } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SaveIcon from '../../../assets/images/save.svg';
import SaveColor from '../../../assets/images/saveColor.svg';
import ProductNotFound from '../../../assets/images/productno.gif';
import { UserContext } from '../../context/Store';

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

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFoundImage = styled.img`
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

const NotFoundText = styled.p`
  font-size: 20px;
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
  margin-top: 20px;
  text-align: center;
`;

function Spotlight({ searchTerm = '' }) {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => {
    if (!userData?.access) {
      navigate('/login');
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userData, navigate]);

  useEffect(() => {
    if (!userData?.access) {
      return;
    }

    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          alert('Token expired. Please log in again.');
          return;
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
        const wishlistProductIds = new Set(data.data.map(item => item.product.id));
        setWishlist(wishlistProductIds);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [userData]);

  const handleSaveClick = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        alert('Token expired. Please log in again.');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/v1/products/wishlist/add/${productId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok) {
        const updatedWishlist = new Set(wishlist).add(productId);
        setWishlist(updatedWishlist);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error adding to wishlist');
    }
  };

  const handleRemoveClick = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        alert('Token expired. Please log in again.');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/v1/products/wishlist/remove/${productId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok) {
        const updatedWishlist = new Set(wishlist);
        updatedWishlist.delete(productId);
        setWishlist(updatedWishlist);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error removing from wishlist');
    }
  };

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

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <NotFoundContainer>
        <NotFoundImage src={ProductNotFound} alt="Product not found" />
        <NotFoundText>No products found matching your search criteria.</NotFoundText>
      </NotFoundContainer>
    );
  }

  return (
    <SpotlightMainContainer>
      <SpotlightTitleContainer>
        <SpotlightTitle>E Sports Games</SpotlightTitle>
      </SpotlightTitleContainer>
      <SpotlightItemsContainer>
        <SpotlightItems>
          {filteredProducts.map((product) => (
            <SpotlightItem key={product.id}>
              <NavLink to={`/products/view/${product.id}`}>
                <SpotlightImageContainer>
                  <SpotlightImage src={product.product_image} alt={product.product_name} />
                </SpotlightImageContainer>
              </NavLink>
              <SpotlightSaveContainer>
                <SpotlightSaveButton onClick={() => wishlist.has(product.id) ? handleRemoveClick(product.id) : handleSaveClick(product.id)}>
                  <SpotlightSaveImage src={wishlist.has(product.id) ? SaveColor : SaveIcon} />
                </SpotlightSaveButton>
              </SpotlightSaveContainer>
            </SpotlightItem>
          ))}
        </SpotlightItems>
      </SpotlightItemsContainer>
    </SpotlightMainContainer>
  );
}

const SpotlightMainContainer = styled.section`
  padding: 20px;
  border-bottom: 1px solid #DBDBDB;
  box-shadow: 0px 8px #f7f6f6;
`;

const SpotlightTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpotlightTitle = styled.h1`
  font-weight: 700;
  font-size: 35px;
  text-decoration: underline;
`;

const SpotlightItemsContainer = styled.div`
  padding-top: 20px;
`;

const SpotlightItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

const SpotlightItem = styled.li`
  width: 25%;
  max-width: fit-content;
  display: block;
  margin-bottom: 20px;
  position: relative;
`;

const SpotlightImageContainer = styled.div`
  width: 90%;
  max-width: fit-content;
  display: block;
  overflow: hidden;

  &:hover img {
    transform: scale(1.1);
  }
`;

const SpotlightImage = styled.img`
  width: 100%;
  display: block;
  transition: transform 0.3s ease-in-out;
`;

const SpotlightSaveContainer = styled.div``;

const SpotlightSaveButton = styled.button`
  position: absolute;
  z-index: 100;
  right: 30px;
  top: 10px;
  width: 20%;
  display: block;
  cursor: pointer;
`;

const SpotlightSaveImage = styled.img`
  display: block;
  width: 100%;
  ${(props) => props.src === SaveColor && css`
    background-color: #fff;
    border: 1px solid #000;
    padding: 7px;
    width: 60%;
    border-radius: 50%;
    position: absolute;
    z-index: 100;
    right: 12px;
    top: 13px;
  `}
`;

export default Spotlight;
