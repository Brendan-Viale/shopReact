import star from '../../assets/img/star.png';
import star_grey from '../../assets/img/star_grey.png';
import "./stars.css"

export const Stars = ({rating}) => {
    //Je crée un tableau pour savoir combien d'étoiles je devrai créer
    let starsImg = [];
    for(let i=0;i<5;i++){
        //Dans tous les cas je push un tableau à 2 valeurs : le ratio de l'étoile que je dois afficher (1 entière ou une partie) et la key unique pour le map
        //Si la note est supérieure à i+1 (afin de s'assurer d'une étoile complète)
        if(rating-i>=1)
            starsImg.push([1,i])
        //Sinon on est sur la décimale, que l'on récupère
        else if(rating-i>0)
            starsImg.push([rating-i,i])
        else starsImg.push([0,i])
    }

    return(
        <ul className="stars">
           {starsImg.map((starImg)=>(
                //Je redimensionne la div (elle a la propriété overflow:hidden dans le css afin de n'afficher qu'une partie de l'étoile)
                <li key={starImg[1]}>
                    <div style={{'width' : 30*starImg[0]+'px'}}>
                        <img className="star" src={star} />
                    </div>
                    <img className="star_grey" src={star_grey} />
                </li>
           ))}
        </ul>
    )
}