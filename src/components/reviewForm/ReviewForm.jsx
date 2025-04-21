import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ packageId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const accountId = localStorage.getItem('accountId');
    if (!accountId || isNaN(parseInt(accountId))) {
      setSubmitError('Vui lòng đăng nhập để gửi đánh giá.');
      return;
    }

    const reviewData = {
      accountId: accountId,
      packageId: packageId,
      rating:rating,
      comment:comment,
      createDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        'https://exe201tourbook.azurewebsites.net/api/reviews',
        reviewData
      );

      if (response.data.message === 'Review created successfully.') {
        setSubmitSuccess('Gửi đánh giá thành công!');
        setComment('');
        setRating(5);
        onReviewSubmitted(); // Trigger review refresh
      } else {
        throw new Error('Gửi đánh giá thất bại.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi đánh giá:', error);
      setSubmitError('Gửi đánh giá thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="tour-schedule__reviewform">
      <div className="review-form">
        <h4>Viết đánh giá của bạn</h4>
        {submitError && <p className="error-message">{submitError}</p>}
        {submitSuccess && <p className="success-message">{submitSuccess}</p>}
        <form onSubmit={handleSubmitReview}>
          <div className="rating-input">
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} sao
                </option>
              ))}
            </select>
          </div>
          <div className="comment-input">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Viết đánh giá của bạn..."
              required
            />
          </div>
          <button type="submit" className="tour-schedule__button">
            Gửi đánh giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;