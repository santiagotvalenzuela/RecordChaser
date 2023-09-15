import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import  styles from '../styles/product.module.css'
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Oval } from 'react-loader-spinner';


export default function Product() {
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter()
    const routerProp = router.query;
    const searchTerm = routerProp.searchTerm
    //console.log(searchTerm)


    useEffect(() => {
      fetch('http://localhost:3000/api/chaser?search='+searchTerm)
      .then(response =>response.json())
      .then((res) => {
        setResults(res)
        console.log(res)
        setLoading(false)
      })
      .catch(err => console.log(err))

      }, []);

      const logoHome = () =>{
        router.push({
          pathname: '/'
        })
      }

  if (isLoading){
    return(
      <div className= {styles.loadingContainer}>
        <Oval
        height={80}
        width={80}
        color="#d90492"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#f03cb4"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      </div>
    )
  }
    else{
      return (
        
        <div className= {styles.mainContainer}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} onClick={logoHome} src='https://res.cloudinary.com/djwdwek3s/image/upload/v1694788849/chaser-logo2_1_ystbiz.png' alt="logo chaser"/>
          </div>
         <Grid className= {styles.gridContainer} container rowGap={3} columnGap={2}>
          {results.map ((item) => (
            <Grid>
            <Card title={item.title} className={styles.card}>
            <CardMedia
              component="img"
              alt={item.title}
              height="140"
              image={item.image}
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div"  noWrap textOverflow={'ellipsis'}>
              {item.title}
              </Typography>
              
              <Typography variant="body2" color='bold'>
                ${item.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=> {window.open(item.url, '_blank')}}>Ir a {item.site}</Button>
            </CardActions>
          </Card>
          </Grid>
          ))}
          </Grid>
        </div>
      )
    }
 
}
