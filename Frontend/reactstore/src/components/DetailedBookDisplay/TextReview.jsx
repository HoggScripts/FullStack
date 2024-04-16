import React, { useState, useEffect } from 'react';

const TextReview = () => {
    const [reviewText, setReviewText] = useState('');
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const words = reviewText.match(/\b[-?(\w+)?]+\b/gi);
        let count = words ? words.length : 0;
        if (count > 100) {
            setReviewText(words.slice(0, 100).join(" "));
            count = 100;
        }
        setWordCount(count);
    }, [reviewText]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <form>
                <div className="mb-4">
                    <textarea
                        className="form-control w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                        id="reviewText"
                        rows="5"
                        placeholder="Max 100 words"
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                    />
                    <div id="wordCountFeedback" className="text-sm text-gray-600 mt-2">{wordCount} / 100 words</div>
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default TextReview;