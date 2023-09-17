const puppeteer = require('puppeteer');
const axios = require ('axios');
const cheerio = require('cheerio');

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
                  const url = 'https://www.zivals.com.ar/'+$(this).find('.text-left').find('a').attr('href')
                  const price = $(this).find('.row').find('a').attr('data-precio').replace('<span class="moneda">$AR</span>','')
                  const image = $(this).find('.row').find('a').attr('data-imagen')
                  articles.push({
                      title,
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
                    //const url = page
                    const price = $(this).find('.price').text().replace('$','')
                    const image = $('.product').find('.woocommerce-product-gallery__wrapper').find('img').attr('src')
                    articles.push({
                        title,
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
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.price').text().replace('$','')
                const image = $(this).find('img').attr('src')
                articles.push({
                    title,
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
                const url = 'https://www.disqueriamusicshop.com/'+$(this).attr('href')
                const price = $(this).find('.price').text().trim().replace('ARS','')
                const image = 'https://www.disqueriamusicshop.com/' + $(this).find('.img').attr('src')
                articles.push({
                    title,
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
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.price').text().replace('$','')
                const image = $(this).find('img').attr('src')
                articles.push({
                    title,
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
              const url = $(this).find('a').attr('href')
              const price = $(this).find('.products-feed__product-price').text().trim().replace('$','')
              const image = $(this).find('.products-feed__product-image').attr('src')
              articles.push({
                  title,
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
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.products-feed__product-price').text().trim().replace('$','')
                const image = $(this).find('.products-feed__product-image').attr('src')
                articles.push({
                    title,
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
    const query = busq +'vinilo'

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
                const url = $(this).find('a').attr('href')
                const price = $(this).find('.products-feed__product-price').text().trim().replace('$','')
                const image = $(this).find('.products-feed__product-image').attr('src')
                articles.push({
                    title,
                    url,
                    price,
                    image,
                    site: "Black Torino Records"
                })
            })
            return articles

        }).catch(err => console.log(err))

}




async function fetchAll(busq){
  const data =[]

  const promises = [jarana(busq), joey(busq), moulin(busq), blackTorino(busq), musicshop(busq), ml(busq), vader(busq), zivals(busq)]

  const results = await Promise.allSettled(promises)

  for (let res of results){
      data.push(res.value)
  }
  const simplified = data.flat().map(obj => obj)

  const searchWords = busq.split(/\s+/).map((word) => {
    return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  });
  
  // Create a regular expression with the search words joined by a pipe (|) for alternation
  const regexString = searchWords.join('|');
  const regex = new RegExp(regexString, 'i');
  
  // Use the filter method to find matching objects
  const matchingObjects = simplified.filter((obj) => {
    // Test the 'name' and 'description' properties against the regular expression
    return regex.test(obj.title);
  });
  

  
  return matchingObjects
}
