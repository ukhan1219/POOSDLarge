import React from 'react';
import {useNavigate} from 'react-router-dom'
import './styles.css'

interface NavigateButtonProps{
  label : string;
  path : string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({label, path}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return <button onClick={handleClick}>{label}</button> 
};

export default NavigateButton;