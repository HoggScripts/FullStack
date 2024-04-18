import React from 'react';

const TextReview = ({ review = { headline: '', reviewText: '' }, onReviewChange, onSubmit }) => {
    const { headline, reviewText } = review;

    return (
        <div className="max-w-lg mx-auto my-4 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Review Headline"
                    value={headline}
                    onChange={e => onReviewChange({ ...review, headline: e.target.value })}
                />
                <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    rows="4"
                    placeholder="Max 100 words"
                    value={reviewText}
                    onChange={e => onReviewChange({ ...review, reviewText: e.target.value })}
                />
                <div className="text-right text-sm text-gray-500 mb-2">{reviewText.split(' ').filter(Boolean).length} / 100 words</div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default TextReview;

