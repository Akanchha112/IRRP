import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Secure({component}) {
  const navigate = useNavigate();
  const Component=component;
  const data = localStorage.getItem('userdata');
  useEffect(() => {
    if (!data) {
      navigate('/signin');
    }
  },[]);
  return <Component />;

}