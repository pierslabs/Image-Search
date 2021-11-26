import { useState } from 'react';
import './App.css';
import './header.css'
import './content.css'
import './article.css'
import { Formik, Form, Field } from 'formik';
const key = process.env.REACT_APP_USER_KEY;

const App = () => {


  const [photos, setPhotos] = useState([]);  

  const open = url =>  window.open(url);
  

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={ async values => {
            const res = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
              headers:{
                'Authorization' : `Client-ID ${key}`
              }
            })

            const data = await res.json();

            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" placeholder="Search..." />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          
          {photos.map(x => 
            <article key={x.id} onClick={ () => {open(x.links.html)}}>
              <img src={x.urls.regular} alt="" />
              <p>{[x.description, x.alt_description].join(' - ')}</p>
            </article>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
