import { Button } from '@chakra-ui/react'
import Aos from 'aos';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Intro() {
    const navigate = useNavigate();
    
    useEffect(()=>{
        Aos.init({
            duration:500,
            delay:300
        });
    },[]);

  return (
    <div className='container-fluid intro'>
        <div className='text-center' data-aos='fade-up'>
        <h1>Welcome to</h1>
        <h1 style={{display: 'flex', justifyContent:'center',alignItems: 'center', color: '#ED8936', fontStyle: 'italic' }}>
            Mess Katta
            <span style={{ marginLeft: '10px',animation:'blink 1s infinite' }}>
                <img src="/iconFinal.png" style={{ width: '40px', height: '40px' }} alt="Icon" />
            </span>
        </h1>

        <br/>
        <br/>
        <h1>Your Menu is One Click Away...</h1>
        <br/>
        <Button rounded={5} variant={'subtle'} bgColor={'orange.400'} color={'white'}
            onClick={()=>navigate('/login')}
        >Get Started</Button>
        </div>
    </div>
  )
}
