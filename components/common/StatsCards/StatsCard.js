const StatsCard = ({ title, count }) => {
  return (
    <li className='flex flex-col gap-2 bg-white rounded-lg p-4 md:p-8 flex-grow'>
      <h3 className='text-sm md:text-base font-bold text-black-500'>{title}</h3>
      <p className='font-bold text-2xl md:text-4xl'>{count}</p>
    </li>
  )
}

export default StatsCard
