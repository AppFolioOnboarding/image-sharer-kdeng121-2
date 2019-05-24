# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

images_list = [
  { url: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg' },
  { url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
  { url: 'https://cdn.pixabay.com/photo/2017/04/09/09/56/avenue-2215317__340.jpg' },
  { url: 'https://tinyurl.com/yyms7726' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg' },
  { url: 'https://tinyurl.com/yyshlwzk' },
  { url: 'https://cdn.pixabay.com/photo/2017/12/17/19/08/away-3024773_960_720.jpg' },
  { url: 'https://tinyurl.com/y2d8pl6u' },
  { url: 'https://www.kalw.org/sites/kalw/files/styles/medium/public/201601/Nature-Brain.jpg' },
  { url: 'https://cdn.pixabay.com/photo/2017/01/03/19/41/forest-1950402__340.jpg' },
  { url: 'https://tinyurl.com/yyosw5fw' },
  { url: 'https://tinyurl.com/y54ggeb7' },
  { url: 'https://tinyurl.com/y5pc97kr' },
  { url: 'https://tinyurl.com/y2l758p5' },
  { url: 'https://tinyurl.com/ycbrlxvl' },
  { url: 'https://aldf.org/wp-content/uploads/2018/05/baby-lamb-16x9.jpg' },
  { url: 'http://papyrus.greenville.edu/wp-content/uploads/2018/03/featyred.png' },
  { url: 'https://twistedsifter.files.wordpress.com/2018/05/horseal.jpg?w=800&h=500' },
  { url: 'https://ottawa.ca/sites/default/files/banner_petregistration2.png' },
  { url: 'https://r.hswstatic.com/w_907/gif/nonhuman-animals-jobs-1.jpg' }
]

Image.create!(images_list)
