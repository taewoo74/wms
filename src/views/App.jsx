import { useState , useEffect } from 'react'
import { useSelector , useDispatch } from "react-redux";
import '../styles/App.css'
import '../styles/index.css'
import LeftMenu from './LeftMenu'
import ViewPage from './ViewPage'
import axios from 'axios';


function App() {
  const [access_token, setAccess_token] = useState('');
  const dispatch = useDispatch();
  async function login() {
    const data = {
      "email": "master@sirloin.io",
      "password": "qwer1234!"
    }

    let access_token = '';

    await axios.post('http://wms-24.dknote.net:13301/api/accounts/login', data)
      .then(function (response) {
        access_token = response.data.access_token;
        dispatch({  type: "add" ,  "data" : access_token  });
      })
      .catch(function (error) {

        console.log(error);
      })

  }

  useEffect(() => {
    login();
  }, []);

  return (
    <div className='container' >
      <LeftMenu access_token = {access_token} />
      <ViewPage />
    </div>
  )
}

export default App
