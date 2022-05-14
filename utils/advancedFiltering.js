export default (input) => {
  const { date, postType, animal, city, gender, age, listing } = input

  let filter = {}

  if (postType) filter.postType = postType
  if (animal) filter.animal = animal
  if (city) filter.city = city
  if (gender) filter.gender = gender
  if (age) filter.age = age
  if (date) {
    const dates = date.split(',')
    if (dates.length === 2) {
      filter.createdAt = {
        $gte: dates[0],
        $lte: dates[1],
      }
    }
  }
  if (listing) filter.listing = listing

  return filter
}
