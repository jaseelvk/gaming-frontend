import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productLogo, setProductLogo] = useState(null);
  const [features, setFeatures] = useState([{ product_features_count: '', product_features_items: '' }]);
  const [platformImages, setPlatformImages] = useState([{ short_images: null }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      setErrorMessage('Only admins can add products. Please log in as an admin.');
    }
  }, []);

  const handleFeatureChange = (index, event) => {
    const newFeatures = [...features];
    newFeatures[index][event.target.name] = event.target.value;
    setFeatures(newFeatures);
  };

  const handlePlatformImageChange = (index, event) => {
    const newPlatformImages = [...platformImages];
    newPlatformImages[index][event.target.name] = event.target.files[0];
    setPlatformImages(newPlatformImages);
  };

  const handleAddFeature = () => {
    setFeatures([...features, { product_features_count: '', product_features_items: '' }]);
  };

  const handleAddPlatformImage = () => {
    setPlatformImages([...platformImages, { short_images: null }]);
  };

  const validateImage = (file) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    return validImageTypes.includes(file.type);
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
      throw new Error('Refresh token not found');
    }

    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.access);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('authToken');
    if (!token) {
      setErrorMessage('Authorization token is missing.');
      return;
    }

    try {
      // Attempt to refresh the token if it's expired
      await refreshToken();
      token = localStorage.getItem('authToken');
    } catch (error) {
      setErrorMessage(error.message || 'Token refresh failed');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_description', productDescription);
    formData.append('product_price', productPrice);
    formData.append('product_image', productImage);
    formData.append('product_logo', productLogo);

    features.forEach((feature, index) => {
      formData.append(`features[${index}].product_features_count`, feature.product_features_count);
      formData.append(`features[${index}].product_features_items`, feature.product_features_items);
    });

    platformImages.forEach((platformImage, index) => {
      if (platformImage.short_images) {
        if (validateImage(platformImage.short_images)) {
          formData.append(`short_images[${index}]`, platformImage.short_images);
        } else {
          setErrorMessage('Invalid image format. Only JPEG, PNG, and SVG are allowed.');
          return;
        }
      }
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/products/tasks/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to add product');
      }

      const responseData = await response.json();
      setSuccessMessage('Product added successfully');
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage(null);
      setProductLogo(null);
      setFeatures([{ product_features_count: '', product_features_items: '' }]);
      setPlatformImages([{ short_images: null }]);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to add product');
    }
  };

  return (
    <AddProductContainer>
      <Helmet><title>Add Product Page </title></Helmet>
      <AddProductForm onSubmit={handleProductSubmit}>
        <FormTitle>Add a New Product</FormTitle>
        <FormGroup>
          <Label>Product Name</Label>
          <Input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Product Description</Label>
          <Textarea
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Product Price</Label>
          <Input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Main Logo</Label>
          <FileInput
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Image Short Logo</Label>
          <FileInput
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={(e) => setProductLogo(e.target.files[0])}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Features</Label>
          {features.map((feature, index) => (
            <FeatureInputContainer key={index}>
              <Input
                type="text"
                name="product_features_count"
                placeholder="Feature Count"
                value={feature.product_features_count}
                onChange={(e) => handleFeatureChange(index, e)}
              />
              <Input
                type="text"
                name="product_features_items"
                placeholder="Feature Items"
                value={feature.product_features_items}
                onChange={(e) => handleFeatureChange(index, e)}
              />
            </FeatureInputContainer>
          ))}
          <Button type="button" onClick={handleAddFeature}>Add Feature</Button>
        </FormGroup>
        <FormGroup>
          <Label>Platform Images</Label>
          {platformImages.map((platformImage, index) => (
            <FileInputContainer key={index}>
              <FileInput
                type="file"
                name="short_images"
                accept=".jpg,.jpeg,.png,.svg"
                onChange={(e) => handlePlatformImageChange(index, e)}
              />
            </FileInputContainer>
          ))}
          <Button type="button" onClick={handleAddPlatformImage}>Add Platform Image</Button>
        </FormGroup>
        <SubmitButton type="submit">Add Product</SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </AddProductForm>
    </AddProductContainer>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AddProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  animation: ${fadeIn} 1s ease;
`;

const AddProductForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: 20px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.8s ease;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  animation: ${fadeIn} 1s ease;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const FileInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FeatureInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FileInputContainer = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
  animation: ${fadeIn} 1s ease;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
  text-align: center;
  animation: ${fadeIn} 1s ease;
`;

export default AddProduct;
