
import { Link } from 'react-router-dom';
import './styles.css'

function Button() {
  return (
    < >
      <div className='btn'>
        <Link to="/login" className="btn-txt">
          Start Now!
        </Link>
      </div>
    </>
  )
}

const NavigateButton: React.FC<NavigateButtonProps> = ({label, path}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return <button onClick={handleClick}>{label}</button> 
};

export default NavigateButton;