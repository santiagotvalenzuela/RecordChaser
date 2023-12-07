const puppeteer = require('puppeteer');
const axios = require ('axios');
const cheerio = require('cheerio');
const csv = require('csvtojson')

export default async function handler(req, res) {
  if (req.method === 'GET'){
        const { search } = req.query;

        try{
            const data = await fetchAll(search)
            res.status(200).json(data)
        } catch (error){
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else{
        res.status(400).json({error: 'error'})
    }
}

async function zivals(busq) { //ready
    const query = busq;
    let url ='';
    let replace = ' ';//searchString
  
    if (query.includes(''))
    {
      const regex = new RegExp(replace, 'g');
      let search = query.replace(regex,'%20');
      url = 'https://www.zivals.com.ar/resultados.aspx?c='+search+'&formatoproducto=vinilo'
    }
    else{
      url ='https://www.zivals.com.ar/resultados.aspx?c='+query+'&formatoproducto=vinilo'
    }
    //console.log(url)
  
    return axios(url)
          .then(response => {
              const html = response.data
              const $ = cheerio.load(html)
              const articles = []
  
              $('.box', html).each(function () { //<-- cannot be a function expression
                  const title = $(this).find('.text-left').find('a').attr('title')
                  const artist = $(this).find('.autor').find('a').text()
                  const url = 'https://www.zivals.com.ar/'+$(this).find('.text-left').find('a').attr('href')
                  const price = $(this).find('.row').find('a').attr('data-precio').replace('<span class="moneda">$AR</span>','')
                  const image = $(this).find('.row').find('a').attr('data-imagen')
                  articles.push({
                      title,
                      artist,
                      url,
                      price,
                      image,
                      site: "Zivals"
                  })
              })
              return articles
          }).catch(err => console.log(err))
    
  };



async function jarana(busq){ //ready

const query = busq;
var url ='';
let replace = ' ';//searchString

if (query.includes(' '))
{
    const regex = new RegExp(replace, 'g');
    let search = query.replace(regex,'+');
    url = 'https://catalogo.jaranarecords.com.ar/?s='+search+'&post_type=product'
}
else{
    url ='https://catalogo.jaranarecords.com.ar/?s='+query+'&post_type=product'
}
const page = await getFinalURL(url)

async function getFinalURL(url){
    return axios(url, {maxRedirects: 2})
        .then( response =>{
            let finalUrl = response.request.res.responseUrl; // This will give you the final URL after following redirects
            return finalUrl
            //console.log(finalUrl)
        }) 

}
    

return axios(page)
        .then(response => {
            if (page.includes('producto')){
                //console.log(page)
                //const page = url
                const html = response.data
                const $ = cheerio.load(html)
                const articles = []
                $('.summary', html).each(function () { //<-- cannot be a function expression
                    const title = $(this).find('h1').text()
                    const artist = $(this).find('h1').text()
                    const price = $(this).find('.price').text().replace('$','')
                    const image = $('.product').find('.woocommerce-product-gallery__wrapper').find('img').attr('src')
                    articles.push({
                        title,
                        artist,
                        url,
                        price,
                        image,
                        site: "Jarana Records"
                    })
                })
                return articles
            }
            else{
            //console.log(page)
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            $('.product', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('a').find('h2').text()
                const artist = $(this).find('h1').text()
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.price').text().replace('$','')
                const image = $(this).find('img').attr('src')
                articles.push({
                    title,
                    artist,
                    url,
                    price,
                    image,
                    site: "Jarana Records"
                })
            })
            return articles
        }
        }).catch(err => console.log(err))

}

async function musicshop(busq){ //ready

const query = busq; //inputString
let url ='';
let replace = ' ';//searchString

if (query.includes(' '))
{
    const regex = new RegExp(replace, 'g');
    let search = query.replace(regex,'%20');
    url = 'https://www.disqueriamusicshop.com/prods/search/?search='+search+'&category=3'
}
else{
    url ='https://www.disqueriamusicshop.com/prods/search/?search='+query+'&category=3'
}

//console.log(url)

return axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            $('.product', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('.title').text()
                const artist = $(this).find('.artist').text()
                const url = 'https://www.disqueriamusicshop.com/'+$(this).attr('href')
                const price = $(this).find('.price').text().trim().replace('ARS','')
                const image = 'https://www.disqueriamusicshop.com/' + $(this).find('.img').attr('src')
                articles.push({
                    title,
                    artist,
                    url,
                    price,
                    image,
                    site: "Musicshop"
                })
            })
            return articles
        }).catch(err => console.log(err))
}

async function vader(busq){ //ready

    const query = busq;
    var url ='';
    let replace = ' ';//searchString
    
    if (query.includes(' '))
    {
        const regex = new RegExp(replace, 'g');
        let search = query.replace(regex,'+');
        url = 'https://www.vaderrecords.com.ar/?s='+search+'&post_type=product&type_aws=true'
    }
    else{
        url ='https://www.vaderrecords.com.ar/?s='+query+'&post_type=product&type_aws=true'
    }
    
    //console.log(url)

    return axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            
            $('.product', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('.woocommerce-loop-product__title').text()
                const artist = $(this).find('.woocommerce-loop-product__title').text()
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.price').text().replace('$','')
                const image = $(this).find('img').attr('src')
                articles.push({
                    title,
                    artist,
                    url,
                    price,
                    image,
                    site: "Vader Records"
                })
            })
            return articles
        }).catch(err => console.log(err))
    
}

async function joey(busq){ //ready
    const query = busq; //inputString
    let url ='';
    let replace = ' ';//searchString

    if (query.includes(' '))
    {
        const regex = new RegExp(replace, 'g');
        let search = query.replace(regex,'+');
        url = 'https://www.joeyrecords.com.ar/search?q='+search
    }
    else{
        url ='https://www.joeyrecords.com.ar/search?q='+query
    }

    //console.log(url)

    return axios(url)
      .then(response => {
          const html = response.data
          const $ = cheerio.load(html)
          const articles = []

          $('.products-feed__product-wrapper', html).each(function () { //<-- cannot be a function expression
              const title = $(this).find('.products-feed__product-name').text().trim()
              const artist = $(this).find('.products-feed__product-name').text().trim()
              const url = $(this).find('a').attr('href')
              const price = $(this).find('.products-feed__product-price').text().trim().replace('$','')
              const image = $(this).find('.products-feed__product-image').attr('src')
              articles.push({
                  title,
                  artist,
                  url,
                  price,
                  image,
                  site: "Joey Records"
              })
          })
          return articles

      }).catch(err => console.log(err))
    }

async function moulin(busq){ //ready
    const query = busq; //inputString
    let url ='';
    let replace = ' ';//searchString

    if (query.includes(' '))
    {
        const regex = new RegExp(replace, 'g');
        let search = query.replace(regex,'+');
        url = 'https://www.moulinrecords.com/search?q='+search
    }
    else{
        url ='https://www.moulinrecords.com/search?q='+query
    }

    //console.log(url)

    return axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.products-feed__product-wrapper', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('.products-feed__product-name').text().trim()
                const artist = $(this).find('.products-feed__product-name').text().trim()
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.products-feed__product-price').text().trim().replace('$','')
                const image = $(this).find('.products-feed__product-image').attr('src')
                articles.push({
                    title,
                    artist,
                    url,
                    price,
                    image,
                    site: "Moulin Records"
                })
            })
            return articles

        }).catch(err => console.log(err))

}

async function ml(busq){ //ready
    const query = busq +' '+'vinilo'

    return axios({
        method: 'get',
        url:'https://api.mercadolibre.com/sites/MLA/search',
        params: {
            category: 'MLA1174',
            q: query, //importante añadir vinilo al string de búsqueda
            limit: 10
        }
    })
    .then(response =>{
        const responseData = response.data.results;

        const records = responseData.map(item => {
            return {
                title: item.title,
                artist: item.title,
                url: item.permalink,
                price: item.price,
                image: item.thumbnail,
                site: "Mercado Libre"
            }
        })
        //console.log(records) // Output: [responseData]
        return records
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    
}

async function blackTorino(busq){ //ready
    const query = busq; //inputString
    let url ='';
    let replace = ' ';//searchString

    if (query.includes(' '))
    {
        const regex = new RegExp(replace, 'g');
        let search = query.replace(regex,'+');
        url = 'https://www.blacktorino.com.ar/search?q='+search
    }
    else{
        url ='https://www.blacktorino.com.ar/search?q='+query
    }

    //console.log(url)

    return axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.products-feed__product-wrapper', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('.products-feed__product-name').text().trim()
                const artist = $(this).find('.products-feed__product-name').text().trim()
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.products-feed__product-price').text().trim().replace('$','')
                const image = $(this).find('.products-feed__product-image').attr('src')
                articles.push({
                    title,
                    artist,
                    url,
                    price,
                    image,
                    site: "Black Torino Records"
                })
            })
            return articles

        }).catch(err => console.log(err))

}

async function insomnio(){

    const csvFile = 
    await axios('https://docs.google.com/spreadsheets/d/1FS_xBceVVUJxUxmBKtEIr_kcojcQP2L6/gviz/tq?tqx=out:csv&gid=0')
    .then(res => {return res.data})

    return csv({
        includeColumns: RegExp('ARTISTA|EFECTIVO')
    })
    .fromString(csvFile)
    .then((jsonObj) =>{
        const newObj = jsonObj.map (item =>({
            title: item['ARTISTA / TITULO'],
            artist: item['ARTISTA / TITULO'],
            price: item['$ EFECTIVO'],
            image: 'https://res.cloudinary.com/djwdwek3s/image/upload/v1696201891/insomnio_eoyw9m.jpg',
            url:'https://www.instagram.com/insomniodiscos/',
            site:'Insomnio Discos'
        }))
        return (newObj)
       
    })
    
}

async function insomnio2(){

    const csvFile = 
    await axios('https://docs.google.com/spreadsheets/d/1FS_xBceVVUJxUxmBKtEIr_kcojcQP2L6/gviz/tq?tqx=out:csv&gid=1705811890')
    .then(res => {return res.data})

    return csv({
        includeColumns: RegExp('ARTISTA|EFECTIVO')
    })
    .fromString(csvFile)
    .then((jsonObj) =>{
        const newObj = jsonObj.map (item =>({
            title: item['ARTISTA / TITULO'],
            artist: item['ARTISTA / TITULO'],
            price: item['$ EFECTIVO'],
            image: 'https://res.cloudinary.com/djwdwek3s/image/upload/v1696201891/insomnio_eoyw9m.jpg',
            url:'https://www.instagram.com/insomniodiscos/',
            site:'Insomnio Discos'
        }))
        return (newObj)
       
    })
    
}

async function lecter(){
    const articles = []
    //const file = 'C:\Users\santiagov\Desktop\Documentos\Project\Puppet\STOCK LECTER.xlsx - STOCK.csv'
    const csvFile = 
    await axios('https://docs.google.com/spreadsheets/d/1V2OYyD74Vtrf7jblBCGI9XD0-VuqZXBC/gviz/tq?tqx=out:csv&gid=0')
    .then(res => {return res.data})

    return csv({
        includeColumns: RegExp('Artista|Album|PVP')
    })
    .fromString(csvFile)
    .then((jsonObj) =>{
        const newObj = jsonObj.map (item =>({
            title: item['Artista'] +' '+ item['Album'],
            artist: item['Artista'],
            price: item['PVP'],
            image: 'https://res.cloudinary.com/djwdwek3s/image/upload/v1696202712/291916079_552279316439538_8254701597113856415_n_ncpeex.jpg',
            url:'https://www.instagram.com/lecterrecords/',
            site:'Lecter Records'
        }))
        return (newObj)
    }) 
    
}


async function choppRock(){
    
    const csvFile = 
    await axios('https://docs.google.com/spreadsheets/d/1UyALKSeVvL2894qegmpfNfQtt43eO0JxroYc8rpKTGE/gviz/tq?tqx=out:csv&gid=0')
    .then(res => {return res.data})

    return csv({
        //includeColumns: RegExp('ACCESORIOS|field2|field3|field4'),
        colParser:{
            "field5":"omit", "field6":"omit","field7":"omit","field8":"omit","field9":"omit","field10":"omit","field11":"omit","field12":"omit","field13":"omit","field14":"omit","field15":"omit","field16":"omit","field17":"omit","field18":"omit","field19":"omit","field20":"omit","field21":"omit","field22":"omit","field23":"omit","field24":"omit","field25":"omit","field26":"omit"
        }
    })
    .fromString(csvFile)
    .then((jsonObj) =>{
        const newObj = jsonObj.map (item =>({
            title: item['field2'],
            artist: item['ACCESORIOS  CEPILLO FIBRA DE CARBONO  CEPILLO PUA CEPILLO FELPA GEL LIMPIAPUA'],
            price: item['field4'],
            image: 'https://res.cloudinary.com/djwdwek3s/image/upload/v1696206233/chopp_fwnbm4.png',
            url:'https://www.instagram.com/choppandrock/',
            site:'Chopp & Rock'
        }))
        return (newObj)
    }) 
       
} 




async function fetchAll(busq){
  const data =[]
  const searchQuery = busq

  const promises = [jarana(busq), joey(busq), moulin(busq), blackTorino(busq), musicshop(busq),lecter(),insomnio(),insomnio2(),choppRock(), ml(busq), vader(busq), zivals(busq)]

  const results = await Promise.allSettled(promises)

  for (let res of results){
      data.push(res.value)
  }
  const simplified = data.flat().map(obj => obj)
  
  
  const finalSearch = busq.toLowerCase()


      const matchingObjects = simplified.filter((obj) => {
        return obj.title.toLowerCase().includes(finalSearch) || obj.artist.toLowerCase().includes(finalSearch)
      });
      
  
  return matchingObjects
}
