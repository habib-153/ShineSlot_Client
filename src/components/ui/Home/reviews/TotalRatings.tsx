type RatingBarProps = {
  rating: number;
  count: number;
  total: number;
};

const RatingBar = ({ rating, count, total }: RatingBarProps) => (
  <div className="flex items-center gap-3">
    <div className="w-10 text-lg font-semibold text-gray-800">{rating}.0</div>
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-400 to-[#1c3aa4]"
        style={{ width: `${(count / total) * 100}%` }}
      />
    </div>
    <div className="w-24 text-sm text-gray-500">{count}K reviews</div>
  </div>
);

const TotalRatings = () => {
  const totalReviews = 35.8;
  const ratings = [
    { rating: 5, count: 30 },
    { rating: 4, count: 18 },
    { rating: 3, count: 14 },
    { rating: 2, count: 8 },
    { rating: 1, count: 3 },
  ];
  return (
    <div className="flex items-start gap-6 mb-6">
      <div className="text-6xl font-extrabold text-gray-800">4.0</div>
      <div className="flex-1">
        {ratings.map((item) => (
          <RatingBar
            key={item.rating}
            rating={item.rating}
            count={item.count}
            total={totalReviews}
          />
        ))}
      </div>
    </div>
  );
};

export default TotalRatings;
