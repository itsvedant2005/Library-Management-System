function StatCard({
  title,
  value,
  icon
}) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 duration-300">

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="text-gray-500 mt-3">
        {title}
      </h3>

      <h1 className="text-3xl font-bold">
        {value}
      </h1>

    </div>

  );
}

export default StatCard;