import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuToogle = (props) => {
  return (
    <>
      {props.isOpen ? (
        <div className={`menuToggle ${props.isOpen && "open"}`}>
          <FontAwesomeIcon icon={faTimes} onClick={props.onToggle} />
        </div>
      ) : (
        <div className="menuToggle">
          <FontAwesomeIcon icon={faBars} onClick={props.onToggle} />
        </div>
      )}
    </>
  );
};

export default MenuToogle;
