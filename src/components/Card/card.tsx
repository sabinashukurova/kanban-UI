import style from './card.module.scss'

const Card = (props: any) => {
    return (
        <div className={style.card}>
            {props.children}
        </div>
    )
}

export default Card