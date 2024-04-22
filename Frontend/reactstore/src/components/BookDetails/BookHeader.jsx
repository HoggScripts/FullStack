// BookHeader.jsx
const BookHeader = ({ book }) => (
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">{book.title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{book.authors.join(', ')}</p>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{book.genres.join(', ')}</p>
    </div>
);

export default BookHeader;