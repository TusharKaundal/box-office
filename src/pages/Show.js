import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setTimeout(() => {
            setShow(results);
            setIsLoading(false);
          }, 2000);
        }
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>Error occured: {error} </div>;
  }
  console.log('show', show);
  return <div>this is show page</div>;
};

export default Show;
