import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';



export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  

  const searchQuery = () =>{
    if (query == ''){
      alert("Debe ingresar un término de búsqueda!")
    }
    else {
      router.push({
        pathname: '/products',
        query: {searchTerm:query}
      })
    }
    
  }
  

  
  
  return (
    <div className={styles.container}>

        <div className={styles.searchContainer}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src='https://res.cloudinary.com/djwdwek3s/image/upload/v1694788849/chaser-logo2_1_ystbiz.png' alt="logo chaser"/>
          </div>
          <div>
            <div className={styles.search}>              
            <TextField color="secondary" id="outlined-basic" className={styles.searchInput} onChange={(e) => setQuery(e.target.value)} label="Buscá tu disco!" autoComplete='off' variant="outlined" />
          </div>
          <div className={styles.buttonContainer}>
          <Button className={styles.searchButton}  color="secondary" component="label" variant="contained" onClick={searchQuery} startIcon={<SearchIcon/>}>
              Buscar
            </Button>
          </div>
        </div>
      </div>
      </div>
  )
}
