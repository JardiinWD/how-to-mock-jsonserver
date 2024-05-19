import React, { useEffect, useState } from 'react';
import { useReviewStore } from '../context/reviewStore';

const ReviewList: React.FC = () => {
  const { reviews, fetchReviews, addReview, updateReview, removeReview } = useReviewStore();
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', productId: 0 });
  const [updateData, setUpdateData] = useState({ id: 0, rating: 0, comment: '', productId: 0 });

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAddReview = async () => {
    await addReview(newReview);
    setNewReview({ rating: 0, comment: '', productId: 0 });
  };

  const handleUpdateReview = async () => {
    await updateReview(updateData.id, updateData);
    setUpdateData({ id: 0, rating: 0, comment: '', productId: 0 });
  };

  const handleDeleteReview = async (id: number) => {
    await removeReview(id);
  };



  return (
    <div>
      <h2>Review List</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            Product {review.productId}: {review.comment} (Rating: {review.rating})
            <button onClick={() => handleDeleteReview(review.id!)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className='flex-col-start'>
        <h3>Add New Review</h3>
        {/* Product ID */}
        <div className='flex-row-start'>
          <label htmlFor="productId">Product ID:</label>
          <input
            className='ml-1' 
            type="number"
            value={newReview.productId}
            onChange={(e) => setNewReview({ ...newReview, productId: +e.target.value })}
            placeholder="Product ID"
          />
        </div>
        {/* Rating */}
        <div className='flex-row-start'>
          <label htmlFor="rating">Rating</label>
          <input
            className='ml-1' 
            type="number"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
            placeholder="Rating"
          />
        </div>
        <div className='flex-row-start'>
          <label htmlFor="comment">Add a Comment</label>
          <input
            className='ml-1' 
            type="text"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Comment"
          />
        </div>
        <button onClick={handleAddReview}>Add Review</button>
      </div>
      <div className='flex-col-start'>
        <h3>Update Review</h3>
        {/* Review ID */}
        <div className='flex-row-start'>
          <label htmlFor="id">Review ID:</label>
          <input
            type="number"
            className='ml-1'
            value={updateData.id}
            onChange={(e) => setUpdateData({ ...updateData, id: +e.target.value })}
            placeholder="ID"
          />
        </div>
        {/* Product ID */}
        <div className='flex-row-start'>
          <label htmlFor="productId">Product ID:</label>
          <input
            className='ml-1'
            type="number"
            value={updateData.productId}
            onChange={(e) => setUpdateData({ ...updateData, productId: +e.target.value })}
            placeholder="Product ID"
          />
        </div>
        {/* Rating */}
        <div className='flex-row-start'>
          <label htmlFor="rating">Rating: </label>
          <input
            type="number"
            className='ml-1'
            value={updateData.rating}
            onChange={(e) => setUpdateData({ ...updateData, rating: +e.target.value })}
            placeholder="Rating"
          />
        </div>
        {/* Comment */}
        <div className='flex-row-start'>
          <label htmlFor="comment">Update Comment</label>
          <input
            type="text"
            value={updateData.comment}
            onChange={(e) => setUpdateData({ ...updateData, comment: e.target.value })}
            placeholder="Comment"
          />
        </div>
        <button onClick={handleUpdateReview}>Update Review</button>
      </div>
    </div>
  );
};

export default ReviewList;
