import React from 'react';

const TextReview = ({ review = { headline: '', reviewText: '' }, onReviewChange, onSubmit }) => {
    const { headline, reviewText } = review;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                        placeholder="Review Headline"
                        value={headline}
                        onChange={e => onReviewChange({ ...review, headline: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        className="form-control w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                        rows="5"
                        placeholder="Max 100 words"
                        value={reviewText}
                        onChange={e => onReviewChange({ ...review, reviewText: e.target.value })}
                    />
                    <div className="text-sm text-gray-600 mt-2">{reviewText.split(' ').filter(Boolean).length} / 100 words</div>
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default TextReview;
