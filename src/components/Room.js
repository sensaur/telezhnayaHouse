import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function Room({room}) {
    // console.log(room)
    const {name, slug, images, price,} = room
    return (
        <article className="room">
            <div className="img-container">
                <img src={images[0]} alt="single room"/>
                <div className="price-top">
                    <h6>от {price}₽</h6>
                    <p>за ночь</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">
                    ИНФО
                </Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    );
}

export default Room;

Room.propTypes = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    })
}

//https://youtu.be/LXJOvkVYQqA?t=18007
//ссылка на ютубчик
//
