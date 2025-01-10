```import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [title, setTitle] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [material, setMaterial] = useState('');
  const [brand, setBrand] = useState('');
  const [cost, setCost] = useState('');
  const [numStores, setNumStores] = useState('');
  const [availableStores, setAvailableStores] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<FileList | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('product_details', productDetails);
    formData.append('material', material);
    formData.append('brand', brand);
    formData.append('cost', cost);
    formData.append('numStores', numStores);
    formData.append('available_stores', availableStores);
    formData.append('tags', tags);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={productDetails} onChange={(e) => setProductDetails(e.target.value)} placeholder="Product Details" required />
      <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="Material" required />
      <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" required />
      <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Cost" required />
      <input type="number" value={numStores} onChange={(e) => setNumStores(e.target.value)} placeholder="Number of Stores" required />
      <input type="text" value={availableStores} onChange={(e) => setAvailableStores(e.target.value)} placeholder="Available Stores" required />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" required />
      <input type="file" multiple onChange={handleImageChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;
```